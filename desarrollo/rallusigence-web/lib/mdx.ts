import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  author: string
  keywords: string[]
}

export interface PostMeta {
  slug: string
  frontmatter: PostFrontmatter
}

// Parsea el frontmatter YAML sin dependencias externas
function parseFrontmatter(content: string): { frontmatter: PostFrontmatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error('Invalid frontmatter')

  const yamlStr = match[1]
  const body = match[2]

  // Parser simple de YAML (solo necesitamos strings y arrays)
  const frontmatter: Record<string, unknown> = {}
  for (const line of yamlStr.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim()
    if (val.startsWith('[')) {
      // Array simple
      frontmatter[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''))
    } else {
      frontmatter[key] = val.replace(/^["']|["']$/g, '')
    }
  }

  // Validate required fields
  const requiredFields: (keyof PostFrontmatter)[] = ['title', 'description', 'date', 'author', 'keywords']
  for (const field of requiredFields) {
    if (!(field in frontmatter)) {
      throw new Error(`Missing required frontmatter field: ${field}`)
    }
  }

  return {
    frontmatter: frontmatter as unknown as PostFrontmatter,
    body
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace('.mdx', '')
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { frontmatter } = parseFrontmatter(content)
      return { slug, frontmatter }
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''))
}

export function getPostBySlug(slug: string): { frontmatter: PostFrontmatter; body: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const content = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(content)
}
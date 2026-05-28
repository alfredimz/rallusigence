import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override the default link component to use Next.js Link
    ...components,
  }
}
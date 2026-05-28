// Parser simple de markdown para convertir el contenido a HTML
export function parseMarkdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')

    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')

    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" style="color: var(--rs-primary); text-decoration: underline;">$1</a>')

    // Paragraphs (split by double newlines)
    .split('\n\n')
    .map(para => {
      const trimmed = para.trim()
      if (trimmed === '') return ''
      if (trimmed.startsWith('<h')) return trimmed
      if (trimmed.includes('\n- ')) {
        // List handling
        const lines = trimmed.split('\n')
        const listItems = lines
          .filter(line => line.trim().startsWith('- '))
          .map(line => `<li>${line.trim().substring(2)}</li>`)
          .join('')
        const beforeList = lines.filter(line => !line.trim().startsWith('- ')).join('<br/>')
        return beforeList ? `<p>${beforeList}</p><ul>${listItems}</ul>` : `<ul>${listItems}</ul>`
      }
      return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`
    })
    .join('')

  return html
}
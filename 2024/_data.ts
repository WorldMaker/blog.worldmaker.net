export const layout = "post.vto"
export const type = "post"

export function url(page: Lume.Page) {
    const date = page.data.date
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const slug = page.data.slug || page.data.basename
    return `/${year}/${month}/${day}/${slug}/`
}

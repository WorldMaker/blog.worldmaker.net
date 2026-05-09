export const layout = 'post-index.vto'

export default function* postsIndexPages({ search, paginate }: Lume.Data) {
    const posts = search.pages('type=post', 'date=desc')
    const options = {
        size: 50,
        url: (page: number) => page === 1 ? '/' : `/archive/${page}/`,
    }

    for (const page of paginate(posts, options)) {
        yield page
    }
}

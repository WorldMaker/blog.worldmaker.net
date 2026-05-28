export const layout = "tag.vto"

export default function* tagsPages({ search }: Lume.Data) {
    for (const tag of search.values("tags", "type=post")) {
        if (tag === '') {
            continue
        }
        yield {
            url: `/tag/${tag}/`,
            tag,
            lcars_theme: tag === 'fiction' ? 'tngancillary' : undefined,
        }
    }
}

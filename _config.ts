import lume from "lume/mod.ts"
import extractDate from 'lume/plugins/extract_date.ts'
import feed from 'lume/plugins/feed.ts'
import footnote from 'npm:markdown-it-footnote'
import redirects from "lume/plugins/redirects.ts"

const markdown = {
    plugins: [
        footnote,
    ],
}

const site = lume({}, { markdown })

site.copy('assets')
site.copy('favicon.ico')

site.use(extractDate())

site.use(feed({
    output: ['feed.xml', 'rss.xml', 'feed/latest/index.html', 'node/feed/index.html', 'feed.json'],
    query: "type=post",
    sort: "date=desc",
    limit: 20,
}))

site.use(redirects())

export default site

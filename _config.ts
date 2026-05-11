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

const site = lume({ location: new URL('https://blog.worldmaker.net')}, { markdown })

site.copy('assets')
site.copy('favicon.ico')

site.use(extractDate())

const mainFeed = {
    query: "type=post",
    sort: "date=desc",
    limit: 20,
    info: {
        title: "Blog.WorldMaker.net",
        description: "Max Battcher's personal blog",
        authorName: "Max Battcher",
        authorUrl: "https://worldmaker.net",
    }
}

site.use(feed({
    output: ['feed.xml', 'rss.xml', 'feed/latest/index.html', 'node/feed/index.html'],
    ...mainFeed,
    info: {
        ...mainFeed.info,
        self: 'feed.xml',
    }
}))

site.use(feed({
    output: ['feed.json'],
    ...mainFeed,
}))

site.use(redirects())

export default site

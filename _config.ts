import lume from "@lumeland/lume"
import extractDate from "@lumeland/plugin-extract-date"
import feed from "@lumeland/plugin-feed"
import footnote from "markdown-it-footnote"
import { alertPlugin } from "markdown-it-github-alert"
import Shiki from "@shikijs/markdown-it"
import typogr from "typogr"
import redirects from "@lumeland/plugin-redirects"

const markdown = {
    plugins: [
        alertPlugin,
        footnote,
        await Shiki({
            theme: 'laserwave',
        })
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

site.process(['.html'], (pages) => {
    for (const page of pages) {
        const content = page.document.querySelectorAll('.content')
        for (const node of content) {
            node.innerHTML = typogr(node.innerHTML).typogrify()
        }
    }
})

export default site

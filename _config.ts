import lume from "lume/mod.ts"
import feed from 'lume/plugins/feed.ts'
import redirects from "lume/plugins/redirects.ts"

const site = lume()

site.copy('assets')
site.copy('favicon.ico')

site.use(feed({
    output: ['feed.xml', 'rss.xml', 'feed/latest/index.html', 'node/feed/index.html', 'feed.json'],
}))

site.use(redirects())

export default site

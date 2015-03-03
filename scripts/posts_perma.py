#!/usr/bin/env python
import frontmatter
import glob
import os
import os.path
import re
import yaml

SLUG_RE = re.compile('^[^\d]*\d+\-\d+\-\d+\-(?P<slug>[^\.]+)\.html$')
posts = glob.glob('../_posts/*.html')

for fname in posts:
    print fname
    post = frontmatter.load(fname)
    date = post['date']
    slug = SLUG_RE.match(fname).group('slug')
    post['permalink'] = '/%s/%s/' % (date.strftime('%Y/%b/%d').lower(),
        slug)
    # post.content = html.encode('utf8')
    outf = open(fname, 'w')
    # frontmatter.dump(post, outf) # has issues with utf8
    outf.write('---\n')
    yaml.dump(post.metadata, stream=outf, default_flow_style=False)
    outf.write('---\n')
    outf.write(post.content.encode('utf8'))
    outf.close()

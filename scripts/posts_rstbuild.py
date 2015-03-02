#!/usr/bin/env python
from darcsforge.deepdish.formatters import ReStructuredText
import frontmatter
import glob
import os
import os.path
import yaml

posts = glob.glob('../_posts/*.rst')

for fname in posts:
    print fname
    post = frontmatter.load(fname)
    html = ReStructuredText().format(post.content)
    # post.content = html.encode('utf8')
    outf = open(os.path.splitext(fname)[0] + '.html', 'w')
    # frontmatter.dump(post, outf) # has issues with utf8
    outf.write('---\n')
    yaml.dump(post.metadata, stream=outf, default_flow_style=False)
    outf.write('---\n')
    outf.write(html.encode('utf8'))
    outf.close()
    os.rename(fname, os.path.join('../_archive', os.path.basename(fname)))

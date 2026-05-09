from django.contrib.redirects.models import Redirect
from wm.blog.models import *
import os.path
import yaml

REPO = os.path.expanduser("~/Repos/blog.worldmaker.net/")

for world in World.objects.all():
    f = open(os.path.join(REPO, '_worlds', world.slug + ".md"), 'w')
    f.write('---\n')
    fm = { 'title': str(world.name), 'layout': str('world') }
    yaml.dump(fm, stream=f, default_flow_style=False)
    f.write('---\n')
    f.write(world.description)
    f.close()

for work in Work.objects.all():
    f = open(os.path.join(REPO, '_works', work.slug + ".md"), "w")
    f.write('---\n')
    fm = {
        'title': str(work.title),
        'layout': str('work'),
        'worlds': [str(w.slug) for w in work.worlds.all()]
    }
    yaml.dump(fm, stream=f, default_flow_style=False)
    f.write('---\n')
    f.write(work.description)
    f.close()

for entry in Entry.objects.all():
    f = open(os.path.join(REPO, '_posts',
        '%(year)d-%(month)02d-%(day)02d-%(slug)s.%(fmt)s' % {
            'year': entry.posted.year,
            'month': entry.posted.month,
            'day': entry.posted.day,
            'slug': entry.slug,
            'fmt': 'rst' if entry.rst else 'html',
        }), 'w')
    f.write('---\n')
    fm = {
        'title': entry.title.encode('utf8'),
        'layout': str('post'),
        'date': entry.posted,
        'db_id': entry.id,
        'db_updated': entry.updated,
        'tags': str(entry.labels),
        'redirect_from': [],
    }
    story = None
    if len(entry.story_set.all()) > 0:
        story = entry.story_set.all()[0] # should only actually be one
        fm['excerpt'] = fm['story_abstract'] = str(story.abstract)
        fm['story_work'] = str(story.work.slug)
        fm['story_number'] = story.number
        if story.dzissue:
            fm['dz_issue'] = story.dzissue.volis
        fm['story_commentary'] = str(story.commentary)
        fm['redirect_from'].append(str('/work/%s/%s/' % (story.work.slug, story.number)))
    redirs = Redirect.objects.filter(site_id=2, new_path=entry.get_absolute_url())
    for r in redirs:
        fm['redirect_from'].append(str(r.old_path))
    if not fm['redirect_from']: # cleanup
        del fm['redirect_from']
    yaml.dump(fm, stream=f, default_flow_style=False)
    f.write('---\n')
    f.write(entry.body.encode('utf8'))
    f.close()

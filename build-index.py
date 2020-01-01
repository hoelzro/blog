import os
import os.path
import re
import sqlite3
import sys

import bs4

def index_document(db, filename, url):
    with open(filename, 'r') as fp:
        contents = fp.read()
    bs = bs4.BeautifulSoup(contents, 'html5lib')

    tag_elements = bs.select('div.tags a')
    tags = [ e.string for e in tag_elements ]

    title = bs.select_one('head title').string

    content = bs.select_one('#content')

    for tag in content.select('.history-previous'):
        tag.decompose()

    for tag in content.select('.history-next'):
        tag.decompose()

    for tag in content.select('div.tags'):
        tag.decompose()

    for tag in content.select('.publish-date'):
        tag.decompose()

    for tag in content.select('noscript'):
        tag.decompose()

    content_text = ' '.join(content.stripped_strings)

    db.execute('INSERT INTO pages (title, tags, body, url) VALUES (?, ?, ?, ?)', (title, ' '.join(tags), content_text, url))

def main(site_directory, verbose=False):
    index_location = os.path.join(site_directory, 'search-index.db')

    db = sqlite3.connect(index_location)

    db.execute('DROP TABLE IF EXISTS pages')
    db.execute('CREATE VIRTUAL TABLE pages USING fts5(title, tags, body, url UNINDEXED)')

    with db:
        db.execute('BEGIN TRANSACTION')

        for root, _, files in os.walk(site_directory):
            for basename in files:
                if not basename.endswith('.html'):
                    continue

                path = os.path.join(root, basename)
                relative_path = os.path.relpath(path, site_directory)

                # don't index archive or blog series pages
                if relative_path in ('archive.html', 'blog-series.html'):
                    continue

                # don't index tag index pages
                if relative_path.startswith('tag/'):
                    continue

                # don't index blog roll pages
                if re.match(r'blog/\d+[.]html', relative_path) or relative_path == 'blog.html':
                    continue

                # don't index blog drafts
                if relative_path.startswith('blog/drafts/'):
                    continue

                # don't index status pages
                if re.match(r'\d+[.]html', relative_path):
                    continue

                # don't index directory landing pages
                if basename == 'home.html':
                    continue

                # don't index our search template
                if relative_path == 'templates/search.html':
                    continue

                if verbose:
                    print(relative_path)

                index_document(db, path, os.path.splitext(relative_path)[0])

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f'usage: {sys.argv[0]} [site directory]')
        sys.exit(1)
    main(sys.argv[1])

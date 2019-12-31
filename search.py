import contextlib
import sqlite3

from flask import Flask, render_template, request

app = Flask(__name__)
app.jinja_options.update(
    variable_start_string='«',
    variable_end_string='»',
)
# XXX reload templates

@app.route('/search')
def search():
    conn = sqlite3.connect('/var/www/http/hoelz.ro/search-index.db')

    # XXX handle no query
    query = request.args.get('q', '')
    with contextlib.closing(conn.cursor()) as c:
        c.execute('select url, title from pages where pages match ? order by rank', (query,))
        matches = c.fetchall()

    return render_template('search.html', matches=matches)

if __name__ == '__main__':
    app.run()

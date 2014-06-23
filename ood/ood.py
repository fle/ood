from bottle import debug, route, run, view, static_file
from traffic import get_fluidity_data


@route('/app/:path#.+#')
def server_static(path):
    return static_file(path, root='./app/')


@route('/static/:path#.+#')
def server_static(path):
    return static_file(path, root='./static/')


@route('/traffic')
def traffic():
    return get_fluidity_data()


@route('/')
@view('index')
def index():
    company = 'Axio Gestion'
    return dict(company=company)


# debug mode
debug(True)
run(host='localhost', port=8080, reloader=True)
#

# prod mode
"""
run(host='localhost', port=8080)
"""
#
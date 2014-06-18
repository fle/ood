from bottle import debug, route, run, view, static_file
from tan import TANStation
from traffic import get_fluidity_data
CODE_TAN = 'CNAV'


@route('/js/:path#.+#')
def server_static(path):
    return static_file(path, root='./app/js/')


@route('/css/:path#.+#')
def server_static(path):
    return static_file(path, root='./app/css/')


@route('/static/:path#.+#')
def server_static(path):
    return static_file(path, root='./static/')


@route('/tan')
def tan():
    tan_station = TANStation(code=CODE_TAN)
    return tan_station.slots


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
from bottle import debug, route, run, view, static_file, default_app

@route('/app/:path#.+#')
def server_static(path):
    return static_file(path, root='./app/')


@route('/static/:path#.+#')
def server_static(path):
    return static_file(path, root='./static/')


@route('/')
@view('index')
def index():
    company = 'Axio Gestion'
    return dict(company=company)


class StripPathMiddleware(object):
    '''
    Get that slash out of the request
    '''
    def __init__(self, a):
        self.a = a

    def __call__(self, e, h):
        e['PATH_INFO'] = e['PATH_INFO'].rstrip('/')
        return self.a(e, h)


if __name__ == '__main__':
    run(
        host='localhost',
        port=8080)
else:
    application = default_app()

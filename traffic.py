import urllib2


TAN_TEMPSATTENTE_URL = "http://data.nantes.fr/api/getFluiditeAxesRoutiers/1.0/5AJ4BA535ELOG63/?output=json"
TAN_MAX_RESULTS = 3


def get_fluidity_data():

        request = urllib2.Request(TAN_TEMPSATTENTE_URL)
        f = urllib2.urlopen(request)
        return f.read()

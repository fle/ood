import json
import urllib2


TAN_TEMPSATTENTE_URL = "https://open.tan.fr/ewp/tempsattente.json/{}"
TAN_MAX_RESULTS = 3


class TANStation(object):

    def __init__(self, code):
        self.tempsattente_url = TAN_TEMPSATTENTE_URL.format(code)
        self.slots = self._get_data()

    def _get_data(self):
        request = urllib2.Request(self.tempsattente_url)
        request.add_header('Accept-language', 'fr_FR')
        f = urllib2.urlopen(request)
        json_response = f.read()
        data = json.loads(json_response)
        slots = {}
        for item in data:
            slot = {
                'terminus': item['terminus'],
                'time': item['temps'],
                'infotrafic': item['infotrafic'],
            }
            slots.setdefault(item['sens'], []).append(slot)
        slots[1] = slots[1][:TAN_MAX_RESULTS]
        slots[2] = slots[2][:TAN_MAX_RESULTS]
        return slots

    def __repr__(self):
        return "{}".format(self.__dict__)

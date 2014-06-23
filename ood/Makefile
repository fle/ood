requirements:
	pip install -R ../requirements.txt

nodejs:
	cd node && ./install.sh
	cd node && nodejs/bin/npm install togeojson

builddata:
	mkdir -p downloads/opendata
	
	wget -O downloads/opendata/troncons.zip  http://data.nantes.fr/fileadmin/data/datastore/nm/mobilite/24440040400129_NM_NM_00049/LOC_TRONCONS_ROUTIERS_NM_kmz.zip
	cd downloads/opendata/ && unzip troncons.zip
	cd downloads/opendata/ && unzip LOC_TRONCONS_ROUTIERS_NM.kmz
	node/nodejs/bin/node node/node_modules/.bin/togeojson -f kml downloads/opendata/doc.kml > static/geojson/nantes-sections.geo.json

clean:
	rm -rf node/node*
	rm -rf downloads

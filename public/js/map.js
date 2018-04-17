(function(){

	"use strict"

	var map = {
		init: function() {
			this.create();
		},
		create: function() {
			/* create sandboxmap/leaflet */
			var mymap = L.map('mapid').setView([52.3667, 4.9000], 11);

			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
					maxZoom: 18,
					id: 'mapbox.light',
					accessToken: 'pk.eyJ1Ijoic3V1c3RlbnZvb3JkZSIsImEiOiJjamVmc3Q3MDQxbGJ0MzNrdHE4Y3QwMW82In0.AWAlzy0cXMbrfR8Ed-7DOg'
			}).addTo(mymap);

			mymap.scrollWheelZoom.disable();

			/* loading GeoJSON file TO DO: omschrijven naar javascript */
			$.getJSON("/js/amsterdam-stadsdelen.geojson", function (stadsdelen) {
				var allStadsdelenJSONArray = [];
				/* save all stadsdelen in array */
				for (var i = 0; i < stadsdelen.features.length; ++i) {
					var stadsdelenJSON = stadsdelen.features[i].properties.titel;
					allStadsdelenJSONArray.push(stadsdelenJSON);
				}
				map.allStadsdelenJSON = allStadsdelenJSONArray

				// get aside with stadsdelen from allStadsdelenJSON
				// template.renderAside();

				// popup
				function onEachFeature(feature, layer) {
					if (feature.properties && feature.properties.titel) {
							layer.bindPopup(feature.properties.titel);
					}
				}

				L.geoJSON(stadsdelen, {onEachFeature: onEachFeature}).addTo(mymap);

			})
		},
		allStadsdelenJSON: []
	}
	map.init()
})()

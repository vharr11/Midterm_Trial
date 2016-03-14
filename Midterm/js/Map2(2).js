function myfunction(feature, layer) {
if (feature.properties) {
var html = "Place:" + "<br>" + feature.properties.place + "<br><br>" + "Magnitude:" + "<br>" + feature.properties.mag;
layer.bindPopup (html);
  }
}

var map = L.map('map').setView([40.13832330, -99.999396], 4);

var NatGeo_World_Map = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
}).addTo(map);


var satellite  = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});

var baseLayers = {
  "National Geographic World Map": NatGeo_World_Map,
  "Satellite Imagery" : satellite,
};

L.control.layers(baseLayers).addTo(map);


$.getJSON( "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson", function ( geojsonFeatures ) {
L.geoJson(geojsonFeatures, {
onEachFeature: myfunction
}).addTo(map);
});

/* basemaps are selectable once, and will not work after that
error recieved: "t.onAdd is not a function"
"t.onRemove" is not a function */

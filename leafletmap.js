var osm_layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');


var mymap = L.map('mapid').setView([49.49544809215964, 4.9706268310546875], 5);

// All the geo are green
var style = function(geo) {
    return {color: "green"}
};

// Build the popup
var onEachFeature = function(feature,layer) {
    layer.bindPopup('<p><b>' + feature.properties.name + '</b></p><p>'+ parseFloat(turf.length(feature.geometry, {units: 'kilometers'})).toFixed(0) + ' km</p>')
};

// Create Leaflet objects from GeoJson
var routesLayer = L.geoJson(routes, {
        onEachFeature: onEachFeature,
        style: style
});

// Create the title section
var titre = L.control({position: 'topright'});

titre.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'titre'); // create a div with a class "info"
    div.innerHTML = '<h4>Tracés de mes voyages à vélo</h4>';
    return div;
};


routesLayer.addTo(mymap);
L.control.scale().addTo(mymap);
titre.addTo(mymap);
osm_layer.addTo(mymap);
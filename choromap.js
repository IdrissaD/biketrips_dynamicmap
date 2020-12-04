var osm_layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {

	attribution: '<a href = "https://github.com/IdrissaD" target = "_blank">Idrissa Djepa</a> | Map data: Djepa and <a href="https://www.openstreetmap.org/" target = "_blank">OpenStreetMap</a> contributors, ' +
	'<a href="https://creativecommons.org/licenses/by-sa/2.0/" target = "_blank">CC-BY-SA</a>'
});

var choromap = L.map('choroid').setView([45.757523270000576, 4.831581115722656], 6);

// Define color scale according to length
function style_dpts(feature) {
            return {
                opacity: 0,
                fillOpacity: 0.65,
                fillColor: getColor(length)
            }
};


function onEachFeature(feature, layer)
        {layer.bindPopup('<p><b>' + feature.properties.nom + '</b></p><p>'+ parseFloat(length).toFixed(0) + ' km</p>')};


// Prepare layer of dpts, ready to be added data
var dpts_layer = L.geoJSON(null, {
    onEachFeature: onEachFeature,
    style: style_dpts
});

// Loop over dpts and routes
var length = 0

for (dpt of dpts.features) {
	var length = 0
	for (route of routes.features) {
	// take each set of coords
	route.geometry.coordinates.forEach(part => {
		// split the line against the geom of the dpt
		let split = turf.lineSplit(turf.lineString(part), dpt);
		//console.log(split.features);
		// try to check if the route is contained in the dpt, in which case length = full length of the route
		if (turf.booleanPointInPolygon(turf.point(part[0]), dpt) && split.features.length == 0) {
				length = length + turf.length(route);
				//console.log(length);
			}
		let oddPair;
		// check if the first point of the spliced line is in the dpt

		if(turf.booleanPointInPolygon(turf.point(part[0]), dpt)){
			oddPair = 0;
		} else {
			oddPair = 1;
		}
		// only get the length of 1 out of 2 segments of each route (a segment contained in a dpt has to be surrounded by two segments not contained)
		split.features.forEach((splitedPart, i) => {
			//console.log(i+oddPair);
			if(turf.booleanPointInPolygon(turf.point(splitedPart.geometry.coordinates[splitedPart.geometry.coordinates.length -2]), dpt)) {
				//L.geoJSON(splitedPart.geometry, {style: function(feature){return{color: "green"}}}).addTo(choromap);
				length = length + turf.length(splitedPart);
				//console.log(length);
		}});
	})}
	dpts_layer.addData(dpt)
};
       
// Define the colors for the legend
function getColor(d) {
    return d > 250  ? 'rgba(0,68,27,1.0)' :
           d > 200  ? 'rgba(29,134,65,1.0)' :
           d > 150  ? 'rgba(84,181,103,1.0)' :
           d > 100   ? 'rgba(158,216,152,1.0)' :
           d > 50   ? 'rgba(213,239,207,1.0)' :
           d > 0   ? 'rgba(247,252,245,1.0)' :
           'rgba(255,255,255,0.0)';
};

// Crate a legend control
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 50, 100, 150, 200, 250],
        labels = [];

    div.innerHTML = '<p><b>Nombre de kilomètres<br>parcourus dans<br> le département</b></p>';

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        };

    return div;
};

dpts_layer.addTo(choromap);
osm_layer.addTo(choromap);
legend.addTo(choromap);
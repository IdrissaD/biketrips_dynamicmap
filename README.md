# biketripsdynamic_map

An interactive map of my bike trips and the amount of kilometres I rode i each french department, built with Leaflet library. This version is dynamic, i.e., the choropleth map is built via Turf's spatial analysis functions each time the map is opened. Slow, unefficient, but I learned a lot doing that!

Some errors I didn't manage to fix:
 - a route that is fully contained in the limits of one department doesn't add up to the number of kilometres ridden in that department. The fault is the turf.lineSplit function, which doesn't apply if the geometries don't intersect. One route is affected: Port-la-Nouvelle - Narbonne in the Aude department (100km above spain border by the Mediterranea);
 - some routes, for a reason that I don't know, don't split correctly and the length of some splits are added to the number of kilometres of the department near-by. Example: Lyon - Trets and the Gard and Vaucluse departments. Gard should have 169km and Vaucluse 52.

See it here: https://idrissad.github.io/biketrips_dynamicmap/

See the static version here: https://github.com/IdrissaD/biketrips_staticmap

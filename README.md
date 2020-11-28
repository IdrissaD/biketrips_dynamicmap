# biketripsdynamic_map

An interactive map of my bike trips and the amount of kilometres I rode in each french department, built with Leaflet library. This version is dynamic, i.e., the choropleth map is built via Turf's spatial analysis functions each time the map is opened. Slow, unefficient, but I learned a lot doing that!

An "error" I didn't manage to fix (yet): the routes that crosses the limit of a department on the exact same point twice (ex: Lyon - Trets on the bridge of Avignon between departments Gard and Vaucluse) only split once and it distorts the calculation of the length for each department. For instance, Gard should have 169km and Vaucluse 52.

See it here: https://idrissad.github.io/biketrips_dynamicmap/

See the static version here: https://github.com/IdrissaD/biketrips_staticmap

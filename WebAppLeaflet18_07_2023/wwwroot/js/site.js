// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var map = L.map('map', {
    crs: L.CRS.EPSG4326
}).setView([41.0260155, 28.8867775], 15);

//var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
//    layers: 'TOPO-OSM-WMS'
//}).addTo(map);

var basemaps = {
    Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS'
    }),

    Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'OSM-Overlay-WMS'
    }),

    'Topography, then places': L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'TOPO-WMS,OSM-Overlay-WMS'
    }),

    'Places, then topography': L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
        layers: 'OSM-Overlay-WMS,TOPO-WMS'
    })
};

L.control.layers(basemaps).addTo(map);

basemaps.Topography.addTo(map);

var circle = L.circle([40.968665, 29.0985458], {
    color: '#006d2c',
    fillColor: '#41ae76',
    fillOpacity: 0.7,
    radius: 50
}).addTo(map);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
osm.addTo(map);

var marker = L.marker([40.9687364, 29.0986943]).addTo(map);

var polygon = L.polygon([
    [41.031194, 28.883596],
    [41.032589, 28.886959],
    [41.030063, 28.890401],
    [41.030716, 28.892161],
    [41.030544, 28.893072],
    [41.028106, 28.894134],
    [41.027305, 28.894286],
    [41.026664, 28.894498],
    [41.025714, 28.894453],
    [41.024066, 28.896653],
    [41.023562, 28.897017],
    [41.021982, 28.897320],
    [41.021227, 28.898367],
    [41.020574, 28.899475],
    [41.019323, 28.899081],
    [41.019023, 28.896898],
    [41.019295, 28.895075],
    [41.018914, 28.893488],
    [41.018758, 28.892306],
    [41.017423, 28.889491],
    [41.017546, 28.886369],
    [41.020699, 28.887383],
    [41.022089, 28.885835],
    [41.027160, 28.883726],
    [41.029504, 28.884263],
    [41.030998, 28.883702],
], {
    color: '#dd3497',
    fillColor: '#f768a1',
    fillOpacity: 0.3
}).addTo(map);

// zoom the map to the polygon
map.fitBounds(polygon.getBounds());

var latlngs = [
    [[37, -109.05], [41, -109.03], [41, -102.05], [37, -102.04]], // outer ring
    [[37.29, -108.58], [40.71, -108.58], [40.71, -102.50], [37.29, -102.50]] // hole
];
var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);

var latlngs1 = [
    [ // first polygon
        [[37, -109.05], [41, -109.03], [41, -102.05], [37, -102.04]], // outer ring
        [[37.29, -108.58], [40.71, -108.58], [40.71, -102.50], [37.29, -102.50]] // hole
    ],
    [ // second polygon
        [[41, -111.03], [45, -111.04], [45, -104.05], [41, -104.05]]
    ]
];

var polyline = L.polyline(latlngs1, { color: 'pink' }).addTo(map);

marker.bindPopup("<b>Hello!</b><br> Here is The Ofice &#128512").openPopup();
circle.bindPopup("Here is the office area.")
polygon.bindPopup("Davutpasa Yıldız Technical University Campus")

// Sayfa ilk yüklendiğinde tıklamaya gerek olmadan açık bir pop up geliyor.
var popup = L.popup()
    .setLatLng([41.0122022, 28.980467])
    .setContent("Hey! I am Topkapı Palace popup!")
    .openOn(map);

// Adding alert click event
//function onMapClick(e) {
//	alert("You clicked the map at " + e.latlng);
//}

//map.on('click', onMapClick);

// Adding popup click event
var popup2 = L.popup();
var coordList = []
var polygon;
function onMapClick(e) {
    popup2
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);

    var latlon = [e.latlng.lat, e.latlng.lng]
    coordList.push(latlon);
    console.log(latlon);

    if (coordList.length > 2) {
        map.removeLayer(polygon);
    }

    polygon = L.polygon(coordList, {
        color: '#dd3497',
        fillColor: '#f768a1',
        fillOpacity: 0.3
    }).addTo(map);
    EditHandle();
}

map.on('click', onMapClick);
var editable = true;
var editButton = document.getElementById("btn-edit");
function EditHandle() {
    if (editable) {
        map.on('click', onMapClick);
        editButton.innerHTML = "Stop";
        editable = false;
    }

    else {
        editButton.innerHTML = "Edit";
        map.off('click', onMapClick);
        polygon = undefined;
        coordList = [];
    }
};

var greenIcon = L.icon({
    iconUrl: 'images/computer-engineer.png',
    iconSize: [95, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.marker([40.9690162, 29.0965164], { icon: greenIcon }).addTo(map).bindPopup("Hey! I am coding. Are you coding too? &#128526");

// Adding point as geojson. Warning geojson using lon,lat format!
//var geojsonFeature = {
//    "type": "Feature",
//    "properties": {
//        "name": "Coors Field",
//        "amenity": "Futball Stadium",
//        "popupContent": "Fenerbahce is the champion!"
//    },
//    "geometry": {
//        "type": "Point",
//        "coordinates": [29.03695, 40.98762]
//    }
//};

L.geoJSON(geojsonFeature).bindPopup(function (layer) {
    return layer.feature.properties.popupContent;
}).addTo(map);

var Feature = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [28.983393, 41.010605]
    },
    "properties": {
        "popupContent": "Here is old town."
    }
};

L.geoJSON(Feature, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: 'images/fenerbahce.png',
                iconSize: [67, 67],
                iconAnchor: [41, 41],
                popupAnchor: [1, -34]
            })
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
        }
    }
}).addTo(map);


function addMarker() {
    var latitudeInput = document.getElementById('latitudeInput');
    var longitudeInput = document.getElementById('longitudeInput');
    var latitude = parseFloat(latitudeInput.value);
    var longitude = parseFloat(longitudeInput.value);

    // Check if the latitude and lngitude are valid numbers
    if (latitudeInput.value !== '' && !isNaN(latitude) &&
        longitudeInput.value !== '' && !isNaN(longitude) &&
        latitude >= -90 && latitude <= 90 &&
        longitude >= -180 && longitude <= 180) {
        var geojsonFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [longitude, latitude]
            }
        };

        //Create a marker and add it to the map
        L.geoJSON(geojsonFeature, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng);
            }
        }).addTo(map);
    } else {
        alert("Invalid latitude or longitude. Please enter valid numbers");
    }
}

var fenerData = "wwwroot/uploads/rl5j2vou.2p1.json";

fetch(fenerData)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data).addTo(map);
    })
    .catch(error => {
        console.error('Error fetching or parsing GeoJSON file:', error);
    })


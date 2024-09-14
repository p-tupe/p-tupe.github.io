import { Map, View } from "ol"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import KML from "ol/format/KML"
import VectorSource from "ol/source/Vector.js"
import { Vector as VectorLayer } from "ol/layer"
import Link from "ol/interaction/Link"
import { toLonLat } from "ol/proj"
import { Circle, Fill, Stroke, Style } from "ol/style.js"

const fill = new Fill({
  color: "rgba(255,0,0,1)",
})

const stroke = new Stroke({
  color: "#000000",
  width: 1,
})

const customStyles = [
  new Style({
    image: new Circle({
      fill: fill,
      stroke: stroke,
      radius: 5,
    }),
    fill: fill,
    stroke: stroke,
  }),
]

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 1,
  }),
})

const KMLSrc = new VectorSource({
  url: "assets/docs/trans-canada-2024.kml",
  format: new KML({
    extractStyles: false,
  }),
})

function convertCoordsToLonLat() {
  const drivingLonLat = []

  const drivingCoords = KMLSrc.getFeatures()
    .map(f => f.values_.geometry.flatCoordinates)
    .reduce((all, curr) => all.concat(curr), [])

  while (drivingCoords.length) {
    const [lon, lat, _] = drivingCoords.splice(0, 3)
    drivingLonLat.push(new toLonLat([lon, lat]))
  }

  return drivingLonLat
}

window.convertCoordsToLonLat = convertCoordsToLonLat

map.addLayer(
  new VectorLayer({
    source: KMLSrc,
    style: customStyles,
  }),
)

map.addInteraction(new Link())

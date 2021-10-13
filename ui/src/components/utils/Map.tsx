import { LatLngTuple } from 'leaflet'
import React from 'react'
import { TileLayer } from 'react-leaflet'

export const KYIV_COORDINATES: LatLngTuple = [ 50.4387102, 30.4908161 ]

export const titleLayer = <TileLayer
  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

export const parseLatLngTuple = (pointStr: string) => pointStr.match(/\((.*?)\)/)[1].split(',').map(x => parseFloat(x)) as LatLngTuple

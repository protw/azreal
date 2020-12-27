import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { GetLocations_az_sensors_Locations_aggregate_nodes as Location } from 'src/graphql/query/locations/types/GetLocations'
import { useGetSensorById } from 'src/graphql/query/sensors/getSensorById'
import { GetSensorById_az_sensors_Sensors as SensorType } from 'src/graphql/query/sensors/types/GetSensorById'
import { Loading } from '../utils/loading'
import * as yup from 'yup'
import { NotFoundPage } from '../utils/NotFoundPage'
import { apikey } from 'src/components/utils'
import { az_sensors_SensorFactors_insert_input } from 'src/types/graphql-global-types'

const SENSORT_DATA_URL = 'https://airapi.airly.eu/v2/installations'
const SENSORT_FACTORS_IRL = 'https://airapi.airly.eu/v2/measurements/installation?installationId'

const getLocationDataBySensorIdUrl = (id: number) => `${SENSORT_DATA_URL}/${id}`
const getMeasurementsBySensorIdUl = (id: number) => `${SENSORT_FACTORS_IRL}=${id}`

export const loadSensorFactorBySensorId = async (id: number) => {
  try {
    const loadUrl = getMeasurementsBySensorIdUl(id)
    const { data, status, statusText } = await axios.get(loadUrl, { headers: { apikey }})

    if (status !== 200) throw new Error(statusText)

    const { 
      current: {
        values
      }
    } = data

    const sensorFactors: az_sensors_SensorFactors_insert_input[] =
      values.map(({ name }) => ({ factorName: name }))
  
    return { sensorFactors }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export const loadLocationDataBySensorId = async (id: number) => {
  try {
    const loadUrl = getLocationDataBySensorIdUrl(id)
    const res = await axios.get(loadUrl, { headers: { apikey }})

    const {
      location: { latitude, longitude },
      elevation,
      address: { displayAddress2, city, country },
    } = res.data
  
    const location = {
      locationId: id,
      locationPoint: `${latitude}, ${longitude}`,
      elevation,
      address: `${displayAddress2}, ${city}, ${country}`,
      airlyLink: `https://airly.org/map/en/#${latitude},${longitude},i${id}`
    } as Location
  
    return { location }
  } catch (error) {
    console.error(error)
    return { error }
  }

}

export const sensorSchema = yup.object().shape({
  sideNumber: yup.number().required(),
  sensorId: yup.number().required(),
  manufacturer: yup.string(),
  model: yup.string()
})

export type SensorProps = {
  sensor: SensorType
}

export const withLoadSensorFromUrl = (Component: React.ComponentType<SensorProps>) => {
  return () => {
    const { query: { sensorId }} = useRouter()
    const { data, loading, error } = useGetSensorById(parseInt(sensorId as string))

    if (error) return null
  
    if (loading) return <Loading />
  
    const sensor = data?.az_sensors_Sensors.pop()

    if (!sensor) return <NotFoundPage />

    return <Component sensor={sensor} />
  }
}

export const getSensorStatus = (isActive: boolean) => isActive ? 'Активний' : 'Неактивний'
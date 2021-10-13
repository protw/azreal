import axios from 'axios'
/* eslint-disable react-hooks/rules-of-hooks */
import { GetMeasurementsBySensorId, GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors } from './../../graphql/query/measurement/types/GetMeasurementsBySensorId'
import moment from 'moment'
import { CommonAggregationData } from 'src/graphql/query/measurement/getMeasurementBySensorId'
import { aggregationLimit, graphqlUrl } from '../utils'
import { MeasurementType, MeasurementsProps, MeasurementValue } from './types'
import { getAggregationTime } from './utils'

const parseMeasurementData = (measurements: GetMeasurementsBySensorId_az_sensors_Sensors_SensorFactors[]): MeasurementValue[] =>
  measurements.map(({ PollutionFactor }) => {
    const { 
      ukrainianLabel,
      label,
      maxValue,
      name,
      e_measurement_unit: { description },
      Measurements_aggregate:
        { aggregate:
          { avg:
            {
              value,
              CAQI
            }
          }
        }
    } = PollutionFactor
    
    return value
      ? { label: ukrainianLabel || label, maxValue, unit: description, name, value, CAQI }
      : undefined
  })

const createMeasuremntQuery = ({ sensorId, to, from }: CommonAggregationData) => ({
  'query': 'query GetMeasurementsBySensorId($sensorId: Int! = 0, $from: timestamp, $to: timestamp) { az_sensors_Sensors(where: {sensorId: {_eq: $sensorId}}) { SensorFactors { PollutionFactor { e_measurement_unit { description } maxValue name label Measurements_aggregate(where: {timestamp: {_lte: $to, _gte: $from}, sensorId: {_eq: $sensorId}}) { aggregate { avg { value CAQI } } } ukrainianLabel } } } } ',
  'operationName': 'GetMeasurementsBySensorId',
  'variables': { sensorId, to, from }
})

type LoadMeasuremntQuery = {
  data?: GetMeasurementsBySensorId
}

const loadMeasuremntQuery = async ({ sensorId, to, from }: CommonAggregationData, token: string): Promise<MeasurementType | undefined> => {
  const { data, status } = await axios.post<LoadMeasuremntQuery>(
    graphqlUrl,
    createMeasuremntQuery({ sensorId, to, from }),
    { headers: {
      'x-hasura-admin-secret': token,
      'content-type': 'application/json'
    }}
  )

  if (status !== 200) return undefined

  const measurements = parseMeasurementData(data?.data?.az_sensors_Sensors[0].SensorFactors).filter(x => !!x)

  return measurements?.length ? {
    sensorId,
    timestamp: getAggregationTime(from),
    values: measurements
  } : undefined
}

const largeLimit = (count: number) => {
  return count >= aggregationLimit
}

export const getMeasurements = async (variables: MeasurementsProps, token: string) => {
  if (!variables) return undefined

  const { sensorId, type, from: start } = variables

  let { to: end } = variables

  if (start === end) {
    end = moment(end).set('hours', 24).toISOString()
    console.log(end)
  }

  let from = start
  const promises = []

  let isFinish = false

  let count = 0

  while (!isFinish) {
    const to = moment(from).add(1, type).toISOString()

    if (from >= end || largeLimit(count)) {
      isFinish = true
      break
    }

    promises.push(loadMeasuremntQuery({ sensorId, to, from }, token))

    if (to >= end) {
      isFinish = true
      break
    }

    from = to
    count++
  }

  const measurements = await Promise.all(promises)
  return { measurements: measurements.filter(x => !!x), lagreLimit: largeLimit(count) }
}
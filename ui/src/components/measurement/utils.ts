import moment from 'moment'

export const getAggregationTime = (timestamp: string) => moment(timestamp).format('DD-MM-YY kk:mm')

type Low = number
type Medium = number
type High = number
type VeryHigh = number

type Values = [ Low, Medium, High, VeryHigh ]

type ValuesByName = {
  NO2: Values,
  PM10: Values,
  PM25: Values,
  CO: Values,
  SO2: Values,
  O3: Values
}

const valuesByName: ValuesByName = {
  NO2: [ 50, 100, 200, 400 ],
  PM10: [ 25, 50, 90, 180 ],
  PM25: [ 10, 20, 30, 60 ],
  CO: [ 5000, 7500, 1000, 2000 ],
  SO2: [ 50, 100, 350, 500 ],
  O3: [ 60, 120, 180, 240 ]
}

type Measurement = {
  name: string,
  value: number 
}

const getIndex = ({ name, value }: Measurement) => {
  const values = valuesByName[name] as Values
  
  let index = 0

  if (!values) return index 

  for (let i = 0; i <= values.length; i++) {
    const v = values[i]
    if (value < v) {
      index = i + 1
      break
    }
  }

  return index
}

type CAQI = {
  index: number,
  value: number
}

export const calculateCAQI = (measurements: Measurement[]) => {

  let CAQI: CAQI = { index: 0, value: 0 }

  measurements.forEach((v) => {
    const index = getIndex(v)

    if (index > CAQI?.index) {
      CAQI = { index, value: v.value }
    }

  })

  return CAQI.value.toFixed(3)
}
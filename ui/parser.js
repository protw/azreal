const { readFileSync, writeFileSync } = require('fs')
const data = JSON.parse(readFileSync('./csvjson.json'))

let sqlString = ''

const insertMeasurementTemplate = (sensorId, timestamp) => {
  return `INSERT INTO az_measurements."Measurements" ("sensorId","timestamp","locationId")
  VALUES (${sensorId},'${timestamp}',${sensorId});` + '\n'
}

const enumName = {
  'PM25': 2,
  'PM10': 3
}

const insertMeasurementValuesTemplate = (sensorId, timestamp, [ value1, value2 ], [ name1, name2 ]) => {
  return `INSERT INTO az_measurements."MeasurementValues" ("sensorId","timestamp","factorId",value)
  VALUES (${sensorId},'${timestamp}',${enumName[name1]},${value1}), (${sensorId},'${timestamp}',${enumName[name2]},${value2});` + '\n'
}

data.forEach(({ value, name, sensorId, timestamp }, i) => {
  const index = i + 1
  if (index % 2 !== 0) {
    const value1 = value ? value : 5.5
    const data2 = data[i + 1]
    const value2 = data2 ? data2.value : 25.5
    const name2 = data2.name

    if (value1 && value2) {
      sqlString += insertMeasurementTemplate(sensorId, timestamp)
      sqlString += insertMeasurementValuesTemplate(sensorId, timestamp, [ value1, value2 ], [ name, name2 ]) 
      sqlString += '\n'
    }

  }

})

writeFileSync('./insert.sql', sqlString)
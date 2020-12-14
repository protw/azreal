/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import { EuiButton, EuiButtonEmpty, EuiFlexGrid, EuiFlexItem, EuiSpacer, EuiSwitch } from '@elastic/eui'
import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import uiMsg from 'src/i18/ua_msg'
import { MeasurementsData } from './types'

type ChartParams = {
  unit: string,
  maxValue: number
}

const parseChartData = ({ measurements }: MeasurementsData) => {
  const linesSet = new Set<string>()
  const paramsByName = new Map<string, ChartParams>()

  const chartData = measurements.map(({ timestamp, values }) => {
    const params = {}

    values.forEach(({ label, value, maxValue, unit }) => {
      linesSet.add(label)
      params[label] = value.toFixed(3)
      paramsByName.set(label, { maxValue, unit })
    })

    return { time: timestamp, ...params }
  })

  const lines = [ ...linesSet.values() ] as string[]

  return [ lines, chartData, paramsByName ] as [ string[], any[], Map<string, ChartParams> ]
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    const { name, value } = payload[0]
    return (
      <div className="custom-tooltip">
        <p className="label">{`Час: ${label}`}</p>
        <p className="label">{`${name}: ${value}`}</p>
      </div>
    )
  }

  return null
}

export const ChartByParam = (props: MeasurementsData) => {
  if (!props.measurements.length) return null

  const [ lines, data, paramsByName ] = parseChartData(props)
  const [ activeLine, setActiveLine ] = useState(lines[0])
  const [ isLog, setIsLog ] = useState(false)
  const params = paramsByName.get(activeLine)

  if (!params) return null

  const { unit } = params
  const currentArr = data.map(x => x[activeLine])
  const min = Math.min(...currentArr)
  const max = Math.max(...currentArr)
  return <>
    <EuiSpacer size='xxl' />
    <EuiSwitch
      label={isLog ? uiMsg.measurements.chart.type.log : uiMsg.measurements.chart.type.linear}
      checked={isLog}
      onChange={(e) => setIsLog(e.target.checked)}
    />
    <EuiSpacer size='l' />
    <ResponsiveContainer height={500} width="100%">
      <LineChart data={isLog ? data.map(x => ({ ...x, [activeLine]: Math.log(x[activeLine]) })) : data}
        margin={{top: 20, right: 10, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip content={CustomTooltip} />
        <XAxis dataKey="time" />
        <YAxis
          type='number'
          domain={[ min, max ]}
          dataKey={activeLine}
          scale={isLog ? 'log' : 'linear'}
          padding={{ top: 20, bottom: 20 }}
          label={{ value: unit, position: 'top', fill: '#0077ff' }}
        />
        <Tooltip/>
        {/* <ReferenceLine y={GDK} strokeDasharray="25 90" label="ГДК" stroke="red"/> */}
        <Line
          unit={unit}
          type="natural"
          key={activeLine}
          dataKey={activeLine}
          stroke='#0077ff'
        />
      </LineChart>
    </ResponsiveContainer>
    <EuiFlexGrid columns={4} style={{ width: '100%', margin: 0 }}>
      {lines.map(line => <EuiFlexItem key={line}>
        <EuiButton
          size='s'
          onClick={() => setActiveLine(line)}
        >
          {line}
        </EuiButton>
      </EuiFlexItem>)}
    </EuiFlexGrid>
  </>
}

import { EuiDataGridColumn } from '@elastic/eui'
import React from 'react'
import { useGetFactors } from 'src/graphql/query/factors/getFactorsWithSensors'
import uiMsg from 'src/i18/ua_msg'
import { DataGrid } from '../utils/DataGrid'
import { Loading } from '../utils/loading'
import { Page } from '../utils/Page'

type Column = {
  label: string,
  unit: string,
  amount: number
}

const Factors = () => {
  const { data, loading, error } = useGetFactors()

  const columns: EuiDataGridColumn[] = [ {
    id: 'label',
    display: uiMsg.factors.columns.label,
    displayAsText: uiMsg.factors.columns.label
  },
  {
    id: 'unit',
    display: uiMsg.factors.columns.unit,
    displayAsText: uiMsg.factors.columns.unit
  },
  {
    id: 'amount',
    display: uiMsg.factors.columns.amount,
    displayAsText: uiMsg.factors.columns.amount
  }
  ]

  const sensorsData: Column[] = data?.az_sensors_PollutionFactors_aggregate.nodes
    .map(({ ukrainianLabel, label, e_measurement_unit: { description }, maxValue, SensorFactors }) => ({
      label: ukrainianLabel || label,
      unit: description,
      maxValue,
      amount: SensorFactors.length
    }))

  if (error) return null

  if (loading) return <Loading />

  return <Page title='Вимірювальні фактори'>
    <DataGrid data={sensorsData} columns={columns} />
  </Page>
}

export default Factors
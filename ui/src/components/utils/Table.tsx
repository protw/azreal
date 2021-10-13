import React, { Fragment, useState } from 'react'
import {
  EuiInMemoryTable,
  EuiLink,
  EuiHealth,
  EuiSpacer,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCallOut,
  EuiCode,
  EuiBasicTableColumn,
  EuiButton,
} from '@elastic/eui'
import { ExportButton, exportToCsv } from './export'

type TableProps<T> = {
  data: T[]
  columns: EuiBasicTableColumn<T>[],
  fileName?: string
}

export const Table = ({ data, columns, fileName }: TableProps<Record<string, any>>) => {

  const search = {
    box: {
      schema: true,
    },
    toolsRight: <ExportButton data={data} fileName={fileName} />,
    // filters:
    // [
    //       {
    //         type: 'is',
    //         field: 'online',
    //         name: 'Online',
    //         negatedName: 'Offline',
    //       },
    //       {
    //         type: 'field_value_selection',
    //         field: 'nationality',
    //         name: 'Nationality',
    //         multiSelect: false,
    //         options: store.countries.map((country) => ({
    //           value: country.code,
    //           name: country.name,
    //           view: `${country.flag} ${country.name}`,
    //         })),
    //       },
    //     ],
  }

  return (
    <Fragment>
      <EuiInMemoryTable
        items={data}
        columns={columns}
        search={search}
        pagination={true}
        sorting={true}
      />
    </Fragment>
  )
}
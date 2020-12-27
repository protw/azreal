import { EuiDataGrid, EuiDataGridColumn } from '@elastic/eui'
import moment from 'moment'
import React, { useState, useCallback, useMemo } from 'react'
import { ExportButton } from './export'

type ViewDataProps = {
  columns: EuiDataGridColumn[],
  data: Record<string, any>[],
  exportFileName?: string
}

const DEFAULT_PAGINATION_SIZE = 20

export const DataGrid = ({ columns, data, exportFileName = `Exported-${moment().toISOString()}` }: ViewDataProps) => {
  
  // ** Pagination config
  const [ pagination, setPagination ] = useState({ pageIndex: 0, pageSize: data.length < DEFAULT_PAGINATION_SIZE ? data.length : DEFAULT_PAGINATION_SIZE})
  const onChangeItemsPerPage = useCallback(
    (pageSize) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    [ setPagination ]
  )
  const onChangePage = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [ setPagination ]
  )
  
  // ** Sorting config
  const [ sortingColumns, setSortingColumns ] = useState([])
  const onSort = useCallback(
    (sortingColumns) => {
      setSortingColumns(sortingColumns)
    },
    [ setSortingColumns ]
  )
  
  // Column visibility
  const [ visibleColumns, setVisibleColumns ] = useState(() =>
    columns.map(({ id }) => id)
  ) // initialize to the full set of columns
  
  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId }) => {
      return data.hasOwnProperty(rowIndex)
        ? data[rowIndex][columnId] || null
        : null
    }
  }, [ data ])
  
  return <EuiDataGrid
    aria-label="Data grid for data"
    columns={columns}
    columnVisibility={{ visibleColumns, setVisibleColumns }}
    rowCount={data.length}
    renderCellValue={renderCellValue}
    inMemory={{ level: 'sorting' }}
    sorting={{ columns: sortingColumns, onSort }}
    pagination={{
      ...pagination,
      pageSizeOptions: [ DEFAULT_PAGINATION_SIZE, 50, 100 ],
      onChangeItemsPerPage: onChangeItemsPerPage,
      onChangePage: onChangePage,
    }}
    toolbarVisibility={{
      additionalControls: <ExportButton data={data} fileName={exportFileName} />,
    }}
  />
}
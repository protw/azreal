import { EuiButtonEmpty } from '@elastic/eui'
import { ExportToCsv } from 'export-to-csv'
import React from 'react'
 
const options = { 
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true, 
  showTitle: true,
  title: 'Airzoom-CSV',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
}
 
export const exportToCsv = (name: string, data: any[]) => {
  const csvExporter = new ExportToCsv({ ...options, title: name, filename: name })
  return csvExporter.generateCsv(data)
}

type ExportButtonProps = {
  fileName?: string,
  data: any[]
}

export const ExportButton = ({ fileName, data }: ExportButtonProps) => <EuiButtonEmpty
  size="xs"
  iconType="download"
  color='text'
  className="euiDataGrid__controlBtn"
  onClick={() => exportToCsv(fileName, data)}>
      Експортувати
</EuiButtonEmpty>
import dynamic from 'next/dynamic'
const Sensor = dynamic(import('src/components/sensors/ViewSensor'), { ssr: false })

export default Sensor
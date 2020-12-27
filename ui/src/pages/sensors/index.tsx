import dynamic from 'next/dynamic'
const Sensors = dynamic(import('../../components/sensors/ViewSensors'), { ssr: false })

export default Sensors
import dynamic from 'next/dynamic'
const Measurement = dynamic(import('../components/measurement/Measurement'), { ssr: false })

export default Measurement
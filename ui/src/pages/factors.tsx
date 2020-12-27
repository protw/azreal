import dynamic from 'next/dynamic'
const Factors = dynamic(import('../components/factors/Factors'), { ssr: false })

export default Factors
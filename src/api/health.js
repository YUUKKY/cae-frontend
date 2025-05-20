import axios from 'axios'
export const checkProvider = async () => axios.get('/v1/health/provider')
export const checkConsumer = async () => axios.get('/v1/health/consumer')
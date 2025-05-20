import axios from 'axios'
export const fetchOrders = async () => {
  const resp = await axios.get('/v1/orders')
  return resp.data
}
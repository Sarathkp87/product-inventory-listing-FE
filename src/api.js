import axios from 'axios'

const api = axios.create({
  baseURL: 'https://product-inventory-listing-be.onrender.com/api',
})

export default api

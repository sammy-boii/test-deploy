import BASE_API_URL from '@/services/baseUrl'
import { ApolloClient, InMemoryCache } from '@apollo/client'

import Cookies from 'js-cookie'

const token = Cookies.get('token') ?? ''

export const apolloClient = new ApolloClient({
  uri: BASE_API_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${token}`
  }
})

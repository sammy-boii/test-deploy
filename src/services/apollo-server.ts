import { cookies } from 'next/headers'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import BASE_API_URL from './baseUrl'
import { setContext } from '@apollo/client/link/context'

// export const apolloServer = new ApolloClient({
//   ssrMode: true,
//   link: createHttpLink({
//     uri: BASE_API_URL
//   }),
//   cache: new InMemoryCache()
// })

const httpLink = createHttpLink({
  uri: BASE_API_URL
})

const authLink = setContext((req, { headers }) => {
  const token = cookies().get('token')?.value || ''
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const apolloServer = new ApolloClient({
  ssrMode: true,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

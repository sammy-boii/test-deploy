'use client'

import { apolloClient } from '@/services/apollo-client'
import { ApolloProvider } from '@apollo/client'
import { createContext } from 'react'
import { Toaster } from 'react-hot-toast'

export const GlobalContext = createContext({})

export default function GlobalContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <GlobalContext.Provider value='dark'>
      <Toaster />
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </GlobalContext.Provider>
  )
}

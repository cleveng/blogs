import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'

export default function Page({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    uri: 'http://localhost:8090',
    cache: new InMemoryCache()
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

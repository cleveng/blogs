'use client'

import { HttpLink } from '@apollo/client'
import { ApolloClient, ApolloNextAppProvider, InMemoryCache } from '@apollo/experimental-nextjs-app-support'

import { graphqlUri } from '@/app/config'

// have a function to create a client for you
function makeClient() {
  const httpLink = new HttpLink({
    uri: graphqlUri
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}

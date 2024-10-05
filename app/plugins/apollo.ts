import { HttpLink } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { ApolloClient, InMemoryCache, registerApolloClient } from '@apollo/experimental-nextjs-app-support'

import { appid, graphqlUri } from '@/app/config'

if (process.env.NODE_ENV !== 'production') {
  loadDevMessages()
  loadErrorMessages()
}

export const { getClient, query, PreloadQuery } = registerApolloClient(
  () =>
    new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: graphqlUri
      }),
      defaultOptions: {
        query: {
          context: {
            fetchOptions: {
              next: {
                revalidate: 60 * 60 * 3 // 3 hours
              }
            }
          }
        }
      },
      headers: {
        Authorization: process.env.ACCESS_TOKEN ?? '',
        Appid: appid
      }
    })
)

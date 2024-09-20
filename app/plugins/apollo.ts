import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import merge from 'deepmerge'
import isEqual from 'lodash-es/isEqual'

let apolloClient: ApolloClient<NormalizedCacheObject> | null

const COUNTRIES_API = 'https://countries.trevorblades.com'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    uri: COUNTRIES_API,
    cache: new InMemoryCache()
  })
}

export function initializeApollo(initialState?: unknown) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    const existingCache = _apolloClient.cache.extract()

    const data = merge(initialState, existingCache, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      arrayMerge: (destinationArray, sourceArray) => [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...sourceArray,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s)))
      ]
    })
    _apolloClient.cache.restore(data)
  }

  if (typeof window === 'undefined') {
    return _apolloClient
  }

  if (!apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: Record<string, any>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (pageProps?.props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return pageProps
}

import { useMemo } from 'react'

import { APOLLO_STATE_PROP_NAME, initializeApollo } from '../plugins/apollo'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useApollo(pageProps: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const client = useMemo(() => initializeApollo(state), [state])

  return client
}

export default useApollo

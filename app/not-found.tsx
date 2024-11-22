import { Text } from '@radix-ui/themes'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error(_: Props) {
  return (
    <>
      <Text>not found</Text>
    </>
  )
}

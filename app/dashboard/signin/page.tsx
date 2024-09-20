import * as Checkbox from '@radix-ui/react-checkbox'
import * as Form from '@radix-ui/react-form'
import { CheckIcon } from '@radix-ui/react-icons'
import * as Separator from '@radix-ui/react-separator'
import { Button, Grid, Link, Text } from '@radix-ui/themes'

const Page = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-50'>
      <div className='max-w-[520px] rounded-lg bg-white px-6 py-8 shadow sm:p-10 sm:pb-6'>
        <div>
          <h2 className='text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl'>同心异构环形</h2>
          <Text className='mt-2 text-sm text-gray-500'>Suitable to grow steadily.</Text>
        </div>
        <Form.Root className='mt-10 w-full'>
          <Form.Field className='mb-3' name='email'>
            <div className='flex items-center justify-between text-base'>
              <Form.Label className='mb-1.5'>邮箱</Form.Label>
              <Form.Message className='FormMessage' match='valueMissing'>
                Please enter your email
              </Form.Message>
              <Form.Message className='FormMessage' match='typeMismatch'>
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className='h-12 w-full rounded-sm border bg-gray-50' type='email' required />
            </Form.Control>
          </Form.Field>
          <Form.Field className='mb-3' name='password'>
            <div className='flex items-center justify-between text-base'>
              <Form.Label className='mb-1.5'>密码</Form.Label>
              <Form.Message className='FormMessage' match='valueMissing'>
                Please enter a question
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className='h-12 w-full rounded-sm border bg-gray-50' type='password' required />
            </Form.Control>
          </Form.Field>
          <Form.Field className='FormField' name='question'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-start'>
                <Checkbox.Root
                  className='flex h-6 w-6 items-center justify-center rounded shadow'
                  defaultChecked
                  id='remember'
                >
                  <Checkbox.Indicator className='text-base'>
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label className='ml-2.5 text-base leading-none' htmlFor='remember'>
                  Remember me
                </label>
              </div>
              <Link href='#' className='span'>
                Forgot password?
              </Link>
            </div>
          </Form.Field>

          <Form.Submit asChild>
            <Button size='3' variant='solid' className='mt-10 w-full'>
              Sign In
            </Button>
          </Form.Submit>

          <p className='my-10 text-center text-sm text-gray-500'>
            Do not have an account?
            <Link href='#' className='span'>
              Sign Up
            </Link>
          </p>

          <div className='my-5 flex items-center justify-between'>
            <Separator.Root className='h-px w-full flex-auto bg-gray-200' />
            <Text className='w-20 flex-none text-center text-sm text-gray-500'>或</Text>
            <Separator.Root className='h-px w-full flex-auto bg-gray-200' />
          </div>

          <Grid columns='2' gap='4'>
            <Button size='3' variant='solid' className='text-sm'>
              谷歌登录
            </Button>
            <Button size='3' variant='solid' className='text-sm'>
              微信登录
            </Button>
          </Grid>
        </Form.Root>
        <div className='pt-3 text-center text-gray-600 dark:text-gray-400'>
          <p className='text-xs'>
            By proceeding, you agree to our
            <Link href='/privacy-policy/' className='mx-1'>
              Terms of Use
            </Link>
            and confirm you have read our
            <Link href='/privacy-policy/' className='mx-1'>
              Privacy and Cookie Statement
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page

import { Button, Text, Link, Grid } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

const Page = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-50'>
      <div className='max-w-[520px] rounded-lg bg-white px-6 py-8 shadow sm:p-10 sm:pb-6'>
        <div>
          <h2 className='text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl'>同心异构环形</h2>
          <Text className='mt-2 text-sm text-gray-500'>Suitable to grow steadily.</Text>
        </div>
        <Form.Root className='FormRoot'>
          <Form.Field className='FormField' name='email'>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Form.Label className='FormLabel'>Email</Form.Label>
              <Form.Message className='FormMessage' match='valueMissing'>
                Please enter your email
              </Form.Message>
              <Form.Message className='FormMessage' match='typeMismatch'>
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className='Input' type='email' required />
            </Form.Control>
          </Form.Field>
          <Form.Field className='FormField' name='question'>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Form.Label className='FormLabel'>Question</Form.Label>
              <Form.Message className='FormMessage' match='valueMissing'>
                Please enter a question
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className='Textarea' type='password' required />
            </Form.Control>
          </Form.Field>
          <Form.Field className='FormField' name='question'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-start'>
                <Checkbox.Root className='CheckboxRoot' defaultChecked id='c1'>
                  <Checkbox.Indicator className='CheckboxIndicator'>
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label className='Label' htmlFor='c1'>
                  Remember me
                </label>
              </div>
              <span className='span'>Forgot password?</span>
            </div>
          </Form.Field>

          <Form.Submit asChild>
            <Button size='3' variant='solid' className='w-full'>
              Sign In
            </Button>
          </Form.Submit>

          <p className='p'>
            Do not have an account? <span className='span'>Sign Up</span>
          </p>
          <p className='p line'>Or With</p>

          <Grid columns='2' gap='4'>
            <Button size='3' variant='solid'>
              Google
            </Button>
            <Button size='3' variant='solid'>
              Apple
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

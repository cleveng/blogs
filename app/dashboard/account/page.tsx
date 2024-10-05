'use client'

import { useMutation } from '@apollo/client'
import { Signatory } from '@cakioe/kit.js'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Form from '@radix-ui/react-form'
import { CheckIcon } from '@radix-ui/react-icons'
import { Button, Link, Text } from '@radix-ui/themes'
import React from 'react'

import { appid } from '@/app/config'
import { SignupDocument } from '@/app/generated/graphql'

const Page = () => {
  const signer = new Signatory(appid)

  const [fetch, { loading, data }] = useMutation(SignupDocument)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = Object.fromEntries(new FormData(e.currentTarget))
    const code = signer.toBase64String(params)

    try {
      const res = await fetch({
        variables: { input: code },
        context: {
          headers: {
            appid: appid
          }
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }

    console.log('Form Code:', code)
  }

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-50'>
      <div className='max-w-screen-lg w-full rounded-lg bg-white px-6 py-8 shadow sm:p-10 sm:pb-6'>
        <div>
          <h2 className='text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl'>同心异构环形</h2>
          <Text className='mt-2 text-sm text-gray-500'>Suitable to grow steadily.</Text>
        </div>
        {loading && <p>Loading ...</p>}

        {data?.signup && <p>{data.signup}</p>}

        <Form.Root className='mt-10 w-full' onSubmit={handleSubmit}>
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
          <Form.Field className='FormField' name='remember'>
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
        </Form.Root>
      </div>
    </div>
  )
}

export default Page

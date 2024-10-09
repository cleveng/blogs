'use client'
import * as Form from '@radix-ui/react-form'
import { Button, DropdownMenu, SegmentedControl, Switch } from '@radix-ui/themes'

const Page = () => {
  return (
    <>
      <Form.Root autoComplete='off'>
        <Form.Field className='' name='title'>
          <Form.Label className='uppercase'>title</Form.Label>
          <Form.Control asChild>
            <input className='w-full border p-3 rounded-sm' type='text' required />
          </Form.Control>
        </Form.Field>
        <Form.Field className='mt-3' name='keywords'>
          <Form.Label className='uppercase'>keywords</Form.Label>
          <Form.Control asChild>
            <input className='w-full border p-3 rounded-sm' type='text' required />
          </Form.Control>
        </Form.Field>
        <Form.Field className='mt-3' name='description'>
          <Form.Label className='uppercase'>description</Form.Label>
          <Form.Control asChild>
            <textarea className='w-full border p-3 rounded-sm min-h-[120px]' required />
          </Form.Control>
        </Form.Field>
        <Form.Field className='mt-3' name='thumb'>
          <Form.Label className='uppercase'>thumb</Form.Label>
          <Form.Control asChild>
            <input className='w-full border p-3 rounded-sm' type='text' required />
          </Form.Control>
        </Form.Field>
        <Form.Field className='mt-3' name='content_type'>
          <Form.Label className='uppercase'>content_type</Form.Label>
          <Form.Control asChild>
            <SegmentedControl.Root defaultValue='inbox'>
              <SegmentedControl.Item value='inbox'>Inbox</SegmentedControl.Item>
              <SegmentedControl.Item value='drafts'>Drafts</SegmentedControl.Item>
              <SegmentedControl.Item value='sent'>Sent</SegmentedControl.Item>
            </SegmentedControl.Root>
          </Form.Control>
        </Form.Field>

        <Form.Field className='mt-3' name='parent_id'>
          <Form.Label className='uppercase'>parent_id</Form.Label>
          <Form.Control asChild className='block my-2'>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant='soft'>
                  Options
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item shortcut='⌘ E'>Edit</DropdownMenu.Item>
                <DropdownMenu.Item shortcut='⌘ D'>Duplicate</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item shortcut='⌘ N'>Archive</DropdownMenu.Item>

                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent>
                    <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                    <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>

                <DropdownMenu.Separator />
                <DropdownMenu.Item>Share</DropdownMenu.Item>
                <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item shortcut='⌘ ⌫' color='red'>
                  Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Form.Control>
        </Form.Field>
        <Form.Field className='mt-3' name='is_visible'>
          <Form.Label className='uppercase'>is_visible</Form.Label>
          <Form.Control asChild className='block my-2'>
            <Switch defaultChecked />
          </Form.Control>
        </Form.Field>
        <Form.Field className='mt-3' name='sort_idx'>
          <Form.Label className='uppercase'>sort_idx</Form.Label>
          <Form.Control asChild>
            <input className='w-full border p-3 rounded-sm' type='number' required />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button className='uppercase'>Submit</Button>
        </Form.Submit>
      </Form.Root>
    </>
  )
}

export default Page

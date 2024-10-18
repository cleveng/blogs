'use client'

import * as Form from '@radix-ui/react-form'
import { Badge, Button, Container, Dialog, Flex, ScrollArea, Select, Switch, Text } from '@radix-ui/themes'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { useEffect, useState } from 'react'

const Page = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('')

  const token = ''

  /**
   * @description: 编辑器的配置
   */
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    scroll: false,
    MENU_CONF: {
      uploadImage: {
        server: '/api/v1/files',
        fieldName: 'file',
        allowedFileTypes: ['image/*'],
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    },
    onChange({ getHtml }) {
      console.log(getHtml())
    }
  }

  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['fullScreen', 'insertImage', 'insertVideo', 'emotion']
  }

  /**
   * @description: 富文本编辑器销毁
   */
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  return (
    <>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode='default'
        className='w-full z-10 border-0 border-b dark:border-darkblack-400 border-bgray-300 sticky top-0'
      />
      <Container size='4'>
        <Form.Root>
          <Form.Field name='title' className='mt-5'>
            <Flex justify='between' align='baseline'>
              <Form.Label className='FormLabel'>标题</Form.Label>
              <Form.Message className='FormMessage' match='valueMissing'>
                Please enter your email
              </Form.Message>
              <Form.Message className='FormMessage' match='typeMismatch'>
                Please provide a valid email
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <input className='Input' type='email' required />
            </Form.Control>
          </Form.Field>
          <Form.Field name='title' className='mt-5'>
            <Flex justify='between' align='baseline'>
              <Form.Label className='FormLabel'>标题</Form.Label>
              <Form.Message className='FormMessage' match='valueMissing'>
                Please enter your email
              </Form.Message>
              <Form.Message className='FormMessage' match='typeMismatch'>
                Please provide a valid email
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <ScrollArea scrollbars='vertical' style={{ height: 500 }}>
                <Editor
                  defaultConfig={editorConfig}
                  value={html}
                  onCreated={setEditor}
                  onChange={editor => setHtml(editor.getHtml())}
                  mode='default'
                  className='border h-full'
                />
              </ScrollArea>
            </Form.Control>
          </Form.Field>
          <Form.Field name='title' className='mt-5'>
            <Flex justify='between' align='baseline'>
              <Form.Label className='FormLabel'>选择栏目</Form.Label>
            </Flex>
            <Form.Control asChild>
              <Select.Root size='3' defaultValue='apple'>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Fruits</Select.Label>
                    <Select.Item value='orange'>Orange</Select.Item>
                    <Select.Item value='apple'>Apple</Select.Item>
                    <Select.Item value='grape' disabled>
                      Grape
                    </Select.Item>
                  </Select.Group>
                  <Select.Separator />
                  <Select.Group>
                    <Select.Label>Vegetables</Select.Label>
                    <Select.Item value='carrot'>Carrot</Select.Item>
                    <Select.Item value='potato'>Potato</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Form.Control>
          </Form.Field>
          <Form.Field name='title' className='mt-5'>
            <Flex justify='between' align='baseline'>
              <Form.Label className='FormLabel'>描述</Form.Label>
              <Form.Message className='FormMessage' match='valueMissing'>
                Please enter your email
              </Form.Message>
              <Form.Message className='FormMessage' match='typeMismatch'>
                Please provide a valid email
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <textarea className='min-h-20 resize-none w-full border' required />
            </Form.Control>
          </Form.Field>
          <Form.Field name='title' className='mt-5'>
            <Flex justify='between' align='baseline'>
              <Form.Label className='FormLabel'>发布时间</Form.Label>
              <Form.Message className='FormMessage' match='valueMissing'>
                Please enter your email
              </Form.Message>
              <Form.Message className='FormMessage' match='typeMismatch'>
                Please provide a valid email
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <input className='Input' type='email' required />
            </Form.Control>
          </Form.Field>
          <Form.Field name='title' className='mt-5'>
            <Flex justify='between' align='baseline'>
              <Form.Label className='FormLabel'>封面</Form.Label>
            </Flex>
            <Form.Control asChild>1</Form.Control>
          </Form.Field>

          <Form.Field name='title' className='mt-5'>
            <Flex justify='between' align='baseline'>
              <Form.Label className='FormLabel'>标签</Form.Label>
            </Flex>
            <Form.Control asChild>
              <div>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button>Edit profile</Button>
                  </Dialog.Trigger>

                  <Dialog.Content maxWidth='450px'>
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description size='2' mb='4'>
                      Make changes to your profile.
                    </Dialog.Description>

                    <Flex direction='column' gap='3'>
                      <label>
                        <Text as='div' size='2' mb='1' weight='bold'>
                          请输入文本内容
                        </Text>
                      </label>
                    </Flex>

                    <Flex gap='3' mt='4' justify='end'>
                      <Dialog.Close>
                        <Button variant='soft' color='gray'>
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button>Save</Button>
                      </Dialog.Close>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>

                <Flex gap='2'>
                  <Badge color='orange'>In progress</Badge>
                  <Badge color='blue'>In review</Badge>
                  <Badge color='green'>Complete</Badge>
                </Flex>
              </div>
            </Form.Control>
          </Form.Field>

          <Form.Field name='title' className='mt-5'>
            <Flex justify='between' align='baseline'>
              <Form.Label className='FormLabel'>前端显示</Form.Label>
            </Flex>
            <Form.Control asChild>
              <Switch color='crimson' size='3' defaultChecked />
            </Form.Control>
          </Form.Field>
          <Form.Field name='title' className='mt-5'>
            <Flex justify='between' align='baseline'>
              <Form.Label className='FormLabel'>置顶</Form.Label>
            </Flex>
            <Form.Control asChild>
              <Switch color='crimson' size='3' defaultChecked />
            </Form.Control>
          </Form.Field>
          <Flex justify='end' align='center' gap='2' className='my-5'>
            <Button size='3'>提交</Button>
            <Button size='3'>取消</Button>
          </Flex>
        </Form.Root>
      </Container>
    </>
  )
}

export default Page

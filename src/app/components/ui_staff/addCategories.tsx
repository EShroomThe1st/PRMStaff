import { PlusCircleFilled } from '@ant-design/icons'
import { PrimaryButton } from '../button/buttons'
import { useState } from 'react'
import { CustomFormModal } from '../modal/modal'
import { Form } from 'antd'
import { FormInput } from '../input/inputs'
import { DefaultForm } from '../form/form'
import { Category, CreateCategory } from '~/app/models/category'
import { useCategory } from '~/app/hook/useCategory'

export default function CreateCategoryModal() {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false);
  const { createCategory, fetchCategoryData } = useCategory() 

  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = async (values: Category) => {
    setIsLoading(true)
    try {
      await createCategory(values) 
      setOpen(false)
      form.resetFields()
      fetchCategoryData() 
    } catch (error) {
      console.error('Category creation failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const initialValue: CreateCategory = {
    key:""
  }

  return (
    <>
      <PrimaryButton size='large' style={{ display: 'flex', margin: "2rem 2rem 2rem 0"}} onClick={() => setOpen(true)}>
        <PlusCircleFilled
          style={{
            color: 'white',
            fontSize: '1.5rem'
          }}
        />{' '}
        Create New Category
      </PrimaryButton>
      <CustomFormModal
        open={open}
        confirmLoading={isLoading}
        title='Create New Category'
        onCancel={() => {
          handleCancel()
          form.resetFields()
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleSubmit(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <DefaultForm
          form={form}
          name="CreateCategory"
          initialValues={initialValue}
        >
            <Form.Item
              name='key'
              label='Category Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormInput />
            </Form.Item>
        </DefaultForm>
      </CustomFormModal>
    </>
  )
}

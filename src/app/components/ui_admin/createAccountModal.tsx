import { PlusCircleFilled } from '@ant-design/icons'
import { PrimaryButton } from '../button/buttons'
import { useState } from 'react'
import { CustomFormModal } from '../modal/modal'
import { Col, Form, Row, notification } from 'antd'
import { FormInput, FormInputPassword, FormRadioGroup } from '../input/inputs'
import { roleOptions } from '~/app/utils/testData'
import { DefaultForm } from '../form/form'
import { CreateUser } from '~/app/models/user'
import { useUser } from '~/app/hook/useUser'

export default function CreateNewAccount() {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false);
  const { handleUserCreate, handleUserFetching } = useUser() 


  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = async (values: CreateUser) => {
    setIsLoading(true)
    const {
      firstName,
      middleName,
      lastName,
      password,
      email,
      phone_number,
      role_name,
    } = values
    try {
      const response = await handleUserCreate({
        firstName,
        middleName,
        lastName,
        password,
        email,
        phone_number,
        role_name,
      });
      console.log('Account created:', response);
      form.resetFields()
      setOpen(false);
      handleUserFetching()
    } catch (error) {
      notification.error({
        message: 'Account created unsuccessfully',
        description: `${error}`,
        type: 'error',
      });
    }
    finally{
      setIsLoading(false)
    }
  }

  const initialValue: CreateUser= {
      firstName: '',
      middleName: '',
      lastName: '',
      password: '',
      email: '',
      phone_number: '',
      role_name: '',
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
        Create New Account
      </PrimaryButton>
      <CustomFormModal
        open={open}
        title='Creat New Account'
        confirmLoading={isLoading}
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
          name="CreateAccount"
          initialValues={initialValue}
        >
        <Row>
          <Col span={7}>
            <Form.Item
              name='firstName'
              label='First Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormInput />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name='middleName'
              label='Middle Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormInput />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name='lastName'
              label='Last Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormInput />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name='phone_number'
          label='Phone Number'
          rules={[
            {
              required: true,
              type: "string",
              pattern: /^[0-9]+$/,
              len: 10,
              message: "Phone number is invalid",
              whitespace: true,
            }
          ]}
        >
          <FormInput />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              required: true
            }
          ]}
        >
          <FormInput/>
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true
            }
          ]}
        >
          <FormInputPassword />
        </Form.Item>
        <Form.Item
            name='repeatPassword'
            label='Repeat Password'
            dependencies={['password']} 
            rules={[
              {
                required: true,
                message: 'Please repeat your password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <FormInputPassword />
          </Form.Item>
        <Row>
          <Col span={5}>
            <Form.Item
              name='role_name'
              label='Role'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormRadioGroup options={roleOptions} />
            </Form.Item>
          </Col>
        </Row>
        </DefaultForm>
      </CustomFormModal>
    </>
  )
}

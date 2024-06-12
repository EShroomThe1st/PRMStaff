import { EditFilled, EllipsisOutlined, ExclamationCircleFilled, StarFilled } from '@ant-design/icons'
import { Dropdown, Form, MenuProps, Modal, Rate, Table } from 'antd'
import { Key, useState } from 'react'
import { DefaultForm } from '../form/form'
import { FormInput, FormTextArea, InputNumberFix } from '../input/inputs'
import { Product } from '~/app/models/product'
import { useProduct } from '~/app/hook/useProduct'
import UploadProductPicture from '../input/product-img'
import { categoriesTestData } from '~/app/utils/testData'
import { FormSelect } from '../select/select'
import { Column } from '@ant-design/plots'

export type CustomDropdownProps = {
  items: {
    key: Key
    label: React.ReactNode
    disabled?: boolean
    dashed?: boolean
    type?: 'item' | 'divider'
    style?: React.CSSProperties
    className?: string
    [key: string]: any
  }[]
  record: Product
  ratingsData: { review: string; rating: number }[]
}

export function CustomDropdown({ items, record, ratingsData }: CustomDropdownProps) {
  const [modal, contextHolder] = Modal.useModal()
  const [form] = Form.useForm()
  const { handleProductUpdate, handleStatusChange, handleProductFetching } = useProduct()
  const [images, setImages] = useState<Product['img']>(record.img)
  console.log('Image:', images)

  const handleUpdate = async (values: Product) => {
    setImages(images => {
      const productUpdate = {...values, id: record.id, img: images}
      handleProductUpdate(productUpdate)
      handleProductFetching()
      console.log("Update", productUpdate)
      return images; 
    });
  }

  const changeStatus = async () => {
    handleStatusChange(record.id)
    handleProductFetching()
    console.log("Status Update for id:", record.id)
  }

  const onMenuClick: MenuProps['onClick'] = (e) => {
    const { key } = e
    switch (key) {
      case 'update': {
        modal.confirm({
          title: 'Update Product',
          icon: <EditFilled />,
          width:"50%",
          content: (
            <div>
              <DefaultForm form={form} name='Update Product' initialValues={record} onFinish={handleUpdate}>
                <div className='my-[10%]'>
                  <Form.Item
                    name='img'
                    label='Product Image'
                    rules={[
                      {
                        required: false
                      }
                    ]}
                  >
                    <UploadProductPicture value={images} setImages={setImages} />
                  </Form.Item>
                </div>
                <Form.Item
                  name='name'
                  label='Product Name'
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <FormInput />
                </Form.Item>
                <Form.Item
                  name='category'
                  label='Category'
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <FormSelect options={Object.values(categoriesTestData)} defaultValue={record.category}/>
                </Form.Item>
                <Form.Item
                  name='price'
                  label='Product Price'
                  rules={[
                    {
                      type: 'number',
                      required: true,
                      min: 1000
                    }
                  ]}
                >
                  <InputNumberFix />
                </Form.Item>
                <Form.Item
                  name='description'
                  label='Description'
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <FormTextArea maxLength={300} />
                </Form.Item>
              </DefaultForm>
            </div>
          ),
          okText: 'Confirm',
          okType: 'primary',
          cancelText: 'Cancel',
          okButtonProps: { style: { backgroundColor: '#c96612' } },
          cancelButtonProps: {
            className: 'custom-cancel-button',
          },
          onOk() {
            form
              .validateFields()
              .then((values) => {
                handleUpdate(values)
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          },
          onCancel() {}
        })
        break
      }
      case 'status': {
        modal.confirm({
          title: 'Are you sure',
          icon: <ExclamationCircleFilled />,
          content: (
            <div>
              Do you want to change status from{' '}
              <span className={record.status === 'In Stock' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
                {record.status}
              </span>{' '}
              to{' '}
              <span className={record.status === 'In Stock' ? 'text-red-500 font-bold' : 'text-green-500 font-bold'}>
                {record.status === 'In Stock' ? 'Out of stock' : 'In stock'}
              </span>
              ?
            </div>
          ),
          okText: 'Confirm',
          okType: 'danger',
          cancelText: 'Cancel',
          cancelButtonProps: {
            className: 'custom-cancel-button',
          },
          onOk() {
            changeStatus()
          },
          onCancel() {}
        })
        break
      }
      case 'rating': {
        modal.info({
          title: 'Ratings',
          icon: <StarFilled />,
          width:"70%",
          content: (
            <Table dataSource={ratingsData} pagination={false}>
              <Column title="Review" dataIndex="review" key="review" />
              <Column title="Rating" dataIndex="rating" key="rating" render={(rating: number) => <Rate value={rating} disabled />} />            </Table>
          ),
          okButtonProps: { style: { backgroundColor: '#c96612' } },
        });
        break;
      }
      default:
        break
    }
  }

  return (
    <>
      <Dropdown
        menu={{
          items: items.map((item) => ({
            ...item
          })),
          onClick: (e) => onMenuClick(e)
        }}
        placement='bottomLeft'
        trigger={['click']}
      >
        <EllipsisOutlined />
      </Dropdown>
      {contextHolder}
      <style>
        {`
          .custom-cancel-button {
            transition: all 0.3s;
          }

          .custom-cancel-button:hover {
            color: #c96612 !important;
            border-color: #c96612 !important
          }
        `}
      </style>
    </>
  )
}

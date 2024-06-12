import { PlusCircleFilled } from '@ant-design/icons'
import { PrimaryButton } from '../button/buttons'
import { useState } from 'react'
import { CustomFormModal } from '../modal/modal'
import { Form } from 'antd'
import { FormInput, FormTextArea, InputNumberFix } from '../input/inputs'
import { DefaultForm } from '../form/form'
import UploadProductPicture from '../input/product-img'
import { FormSelect } from '../select/select'
import { categoriesTestData } from '~/app/utils/testData'
import { CreateProduct, Product } from '~/app/models/product'
import { useProduct } from '~/app/hook/useProduct'

export default function CreateProductModal() {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Product['img']>()
  const { handleProductCreate, handleProductFetching } = useProduct()
 

  const handleCancel = () => {
    setOpen(false)
  }

const handleSubmit = async (values: Product) => {
  setIsLoading(true);
  try {
    const productWithImages: Product = { ...values, img: images }; 
    console.log("Create Product:", productWithImages);
    await handleProductCreate(productWithImages);
    handleProductFetching();
    setOpen(false);
    form.resetFields();
  } catch (error) {
    console.error('Product creation failed:', error);
  } finally {
    setIsLoading(false);
  }
}


  const initialValue: CreateProduct = {
    img: [],
    category: '', 
    name: '', 
    price: 0, 
    description: '', 
  };

  return (
    <>
      <PrimaryButton size='large' style={{ display: 'flex', margin: "2rem 2rem 2rem 0"}} onClick={() => setOpen(true)}>
        <PlusCircleFilled
          style={{
            color: 'white',
            fontSize: '1.5rem'
          }}
        />{' '}
        Create New Product
      </PrimaryButton>
      <CustomFormModal
        open={open}
        confirmLoading={isLoading}
        title='Creat New Product'
        width="50%"
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
              <DefaultForm form={form} name='Update Product' initialValues={initialValue} onFinish={handleSubmit}>
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
                  <FormSelect options={Object.values(categoriesTestData)}/>
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
      </CustomFormModal>
    </>
  )
}

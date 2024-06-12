import { EllipsisOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { Col, Divider, Dropdown, Image, MenuProps, Modal, Row, Space, Typography } from 'antd'
import { Key } from 'react'
import { CustomCardFullWidth } from '../ui/card/card-full-width'
import { Order } from '~/app/models/order'
import { formatCurrency } from '~/app/utils/generators'
import { useOrder } from '~/app/hook/useOrder'

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
  record: Order
  checkDisabled: (key: Key | undefined, record: Order) => boolean
}

export function CustomDropdown({ items, record, checkDisabled }: CustomDropdownProps) {
  const [modal, contextHolder] = Modal.useModal()
  const { Title } = Typography;
  const { handleStatusChange, handleOrderFetching } = useOrder()


  const changeStatus = async () => {
    handleStatusChange(record.id)
    handleOrderFetching()
    console.log("Status Update for id:", record.id)
  }

  const onMenuClick: MenuProps['onClick'] = (e) => {
    const { key } = e
    switch (key) {
      case 'view': {
        modal.info({
          title: `Order ID: ${record.id}`,
          content: (
            <Space direction='vertical' size={'large'}>
              <Space direction='vertical' size={'small'}>
                <p><strong>Customer Name:</strong> {record.customerName}</p>
                <p><strong>Date:</strong> {record.orderDate}</p>
                <p><strong>Address:</strong> {record.address}</p>
                <p><strong>Payment Method:</strong> {record.paymentMethod}</p>
              </Space>
              <CustomCardFullWidth>
                <Space direction='vertical'>
                  <p><strong>SubTotal:</strong> {formatCurrency(record.subTotal)}</p>
                  <p><strong>Delivery Fee:</strong> {formatCurrency(record.delivery)}</p>
                  <p><strong>Tax:</strong> {formatCurrency(record.tax)}</p>
                  <Divider/>
                  <p><strong>Total:</strong> {formatCurrency(record.orderPrice)}</p>
                </Space>
              </CustomCardFullWidth>
                <Title level={4}>Products:</Title>
                  {record.products.map((product, index) => (
                    <CustomCardFullWidth key={index}>
                      <Row>
                        <Col span={5}>
                          {product.img && product.img.length > 0 && (
                            <p><Image src={product.img[0].url} alt={product.img[0].name} width="50" /></p>
                          )}
                        </Col>
                        <Col span={19}>
                          <Row>
                            <Col span={10}><strong>{product.name}</strong> x {product.amount}</Col>
                          </Row>
                          <Row>
                            <Col>
                              <div><strong>Price:</strong> {formatCurrency(product.price)}</div>
                              <Divider/>
                              <div><strong>Total Price:</strong> {formatCurrency(product.totalPrice)}</div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CustomCardFullWidth>
                  ))}
            </Space>
          ),
          okButtonProps: { style: { backgroundColor: '#c96612' } },
          width: 600,
        });
        break
      }
      case 'status': {
        modal.confirm({
          title: 'Are you sure',
          icon: <ExclamationCircleFilled />,
          content: (
            <div>
              Do you want to change status from{' '}
              <span className={record.status === 'Paid' ? 'text-green-500 font-bold' : 'text-yellow-500 font-bold'}>
                {record.status}
              </span>{' '}
              to{' '}
              <span className='text-red-500 font-bold'>
                Canceled
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
      default:
        break
    }
  }

  return (
    <>
      <Dropdown
        menu={{
          items: items.map((item) => ({
            ...item,
            disabled: checkDisabled(item.key, record)
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

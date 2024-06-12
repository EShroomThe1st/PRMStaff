import { Table, TableProps } from "antd"
import { Key, useEffect } from "react"
import { useOrder } from "../hook/useOrder" 
import { Order } from "../models/order";
import { formatCurrency } from "../utils/generators";
import { CustomDropdown } from "../components/ui_staff/dropDownOrder";
import { CustomDropdownProps } from "../components/ui_staff/dropDownProduct";

const StaffOrderManagement = () => {
  const { state, handleOrderFetching } = useOrder();

  useEffect(() => {
    handleOrderFetching();
  }, []);

  const dropdownItems: CustomDropdownProps["items"] = [
    {
      key: "view",
      label: "View Order",
    },
    {
      key: "status",
      label: "Change Order Status",
      danger: true
    },
  ];

  const checkDisabled = (
    key: Key | undefined,
    record: Order,
  ): boolean => {
    const { status } = record;
    switch (key) {
      case "status":
        return status === "Canceled";
      default:
        return false;
    }
  };

  const columns: TableProps<Order>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Order Price',
      dataIndex: 'orderPrice',
      key: 'orderPrice',
      render: (orderPrice) => formatCurrency(orderPrice),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={status === 'Paid' ? 'text-green-500 font-bold' : status === 'Canceled' ? 'text-red-500 font-bold' : 'text-yellow-500 font-bold'}>
          {status}
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <CustomDropdown items={dropdownItems} record={record} checkDisabled={checkDisabled}/>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={state.orders} pagination={{ position: ['bottomCenter'] }} />
    </div>
  )
}

export default StaffOrderManagement
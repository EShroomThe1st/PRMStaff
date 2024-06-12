import { Image, Rate, Table, TableProps } from "antd"
import { Product } from "../models/product"
import { formatCurrency } from "../utils/generators"
import { useEffect } from "react"
import { CustomDropdown, CustomDropdownProps } from "../components/ui_staff/dropDownProduct"
import { useProduct } from "../hook/useProduct"
import CreateProductModal from "../components/ui_staff/addProductModal"

const StaffProductManagement = () => {
  const { state, handleProductFetching } = useProduct();

  useEffect(() => {
    handleProductFetching();
  }, []);

  const dropdownItems: CustomDropdownProps["items"] = [
    {
      key: "rating",
      label: "View Ratings",
    },
    {
      key: "update",
      label: "Update Product",
    },
    {
      key: "status",
      label: "Change Product Status",
      danger: true
    },
  ];

  const columns: TableProps<Product>['columns'] = [
    {
      title: '',
      dataIndex: 'img',
      key: 'img',
      align: "center",
      render: (img) => (
        <>
          <Image src={img} width={50}/>
        </>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: "19rem"
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatCurrency(price)
    },
    {
      title: 'Ratings',
      dataIndex: 'ratingAmount',
      key: 'rating',
      render: (rating) => (
        <>
          <Rate value={rating} allowHalf disabled/>
        </>
      )
    },
    {
      title: 'Reviews',
      dataIndex: 'reviewAmount',
      key: 'review',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={status === 'In Stock' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
          {status}
        </span>
      )
    },
    {
      title: 'Actions',
      align: "center",
      render: (_, record) => (
        <>
          <CustomDropdown items={dropdownItems} record={record} ratingsData={record.reviews}/>
        </>
      )
    }
  ]

  return (
    <>
    <div className="w-full flex justify-end"><CreateProductModal/></div>
    <Table columns={columns} dataSource={state.products} pagination={{ position: ['bottomCenter'] }} />
    </>
  )
}

export default StaffProductManagement
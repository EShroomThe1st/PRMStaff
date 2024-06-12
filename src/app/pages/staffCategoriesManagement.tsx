import { Table, TableProps, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Category } from "../models/category";
import { useCategory } from "../hook/useCategory";
import { useEffect } from "react";
import CreateCategoryModal from "../components/ui_staff/addCategories";

const { confirm } = Modal;

const StaffCategoriesManagement = () => {
  const { state, fetchCategoryData, changeCategoryStatus } = useCategory();

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const handleStatusChange = (record: Category) => {
    confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleFilled />,
      content: (
        <div>
          Do you want to change status from{' '}
          <span className={record.status === 'Available' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
            {record.status}
          </span>{' '}
          to{' '}
          <span className={record.status === 'Available' ? 'text-red-500 font-bold' : 'text-green-500 font-bold'}>
            {record.status === 'Available' ? 'Unavailable' : 'Available'}
          </span>
          ?
        </div>
      ),
      okText: 'Confirm',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        changeCategoryStatus(record.id);
        fetchCategoryData()
      },
      onCancel() {},
    });
  };

  const columns: TableProps<Category>['columns'] = [
    {
      title: 'Category Name',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Ordered Amount',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <span
          onClick={() => handleStatusChange(record)}
          className={status === 'Available' ? 'text-green-500 font-bold cursor-pointer' : 'text-red-500 font-bold cursor-pointer'}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-end"><CreateCategoryModal/></div>
      <Table columns={columns} dataSource={state.categories} pagination={{ position: ['bottomCenter'] }}/>
    </div>
  );
};

export default StaffCategoriesManagement;

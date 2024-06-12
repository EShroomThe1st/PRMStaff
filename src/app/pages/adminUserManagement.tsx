import { Key, useEffect } from "react"
import { User } from "../models/user"
import { Table, TableProps } from "antd"
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons"
import CreateNewAccount from "../components/ui_admin/createAccountModal"
import { CustomDropdown, CustomDropdownProps } from "../components/ui_admin/dropdown"
import { useUser } from "../hook/useUser"

const AdminUsersManagement = () => {
  const { state, handleUserFetching } = useUser();

  useEffect(() => {
    handleUserFetching();
  }, []);

  const dropdownItems: CustomDropdownProps["items"] = [
    {
      key: "update",
      label: "Update Account",
    },
    {
      key: "disable",
      label: "Disable Account",
      danger: true
    },
  ];

  const checkDisabled = (
    key: Key | undefined,
    record: User,
  ): boolean => {
    const { is_active } = record;
    switch (key) {
      case "disable":
        return !is_active;
      default:
        return false;
    }
  };
  

  const columns: TableProps<User>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.middle_name || ''} ${record.last_name}`
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address: string | null) =>
        address ? (
          address 
        ) : (
          <div className='font-bold text-[1.5rem]'>
            -
          </div>
        )
    },     
    {
      title: 'Role',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive: boolean) =>
        isActive ? (
          <CheckCircleFilled style={{ color: '#0FB900', fontSize: '2rem' }} />
        ) : (
          <CloseCircleFilled style={{ color: '#DB0000', fontSize: '2rem' }} />
        )
    },
    {
      title: 'Actions',
      key: 'actions',
      align: "center",
      render: (_, record) => (
        <>
          <CustomDropdown items={dropdownItems} checkDisabled={checkDisabled} record={record}/>
        </>
      )
    }
  ]

  return (
    <>
      <div className='w-full flex justify-end'>
        <CreateNewAccount/>
      </div>
      <Table columns={columns} dataSource={state.users} pagination={{ position: ['bottomCenter'] }} />
    </>
  )
}

export default AdminUsersManagement
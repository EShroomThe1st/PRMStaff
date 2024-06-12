import Content from '../ui/content'
import AdminHeader from '../ui/header'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <>
    <AdminHeader/>
    <Content children={children}/>
  </>
}

export default AdminLayout

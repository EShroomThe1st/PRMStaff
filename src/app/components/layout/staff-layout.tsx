import Content from '../ui/content'
import StaffHeader from '../ui/header'

const StaffLayout = ({ children }: { children: React.ReactNode }) => {
  return<>
    <StaffHeader />
    <Content children={children} />
  </>
}

export default StaffLayout

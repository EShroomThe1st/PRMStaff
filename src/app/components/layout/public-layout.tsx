import Content from '../ui/content'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <>
    <Content children={children}/>
  </>
}

export default PublicLayout

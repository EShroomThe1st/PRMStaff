// import Icon from '../../../assets/Icon.png'
import { PrimaryButton } from '../button/buttons'
// import { translateRoleFromNonsense } from '~/app/utils/generators';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';


export default function Header(){
  // const role = translateRoleFromNonsense(localStorage.getItem("role"));
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: ItemType[],
  ): ItemType {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const handleLogout = () => {
    localStorage.clear(),
    navigate('/login')
  }
  
  const getConditionalItems = (): ItemType[] => {
    switch (role) {
      case "Staff":
        return [
          getItem("Products", "/staff/products"),
          getItem("Categories", "/staff/categories"),
          getItem("Orders", "/staff/order"),
        ];
      default:
        return [getItem("", "/")];
    }
  };


  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key) navigate(e.key);
  };

  return(
    <div className='flex justify-between p-5 border-b-slate-400 border-[1px] items-center'>
      <div className='flex items-center justify-between w-[30%]'>
        {/* <img src={Icon} className='w-10 object-contain'/> */}
        <div className="flex justify-evenly w-[90%]">
        <Menu
        mode="horizontal"
        items={getConditionalItems()}
        style={{ flex: 1, minWidth: 0 }}
        selectedKeys={[
          `/${location.pathname.split("/").slice(1, 3).join("/")}`,
        ]}
        onClick={onClick}
      />
        </div>
      </div>
      <PrimaryButton onClick={handleLogout}>
        Log Out
      </PrimaryButton>
    </div>
  )
}
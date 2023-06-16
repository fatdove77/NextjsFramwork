import React,{useState} from 'react'
import { useRouter } from 'next/router';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    label: 'Home',
    key: 'Home',
    icon: <MailOutlined />,
  },
  {
    label: 'Test',
    key: 'Test',
    icon: <AppstoreOutlined />,
  },
  
];
function Header() {
  const [current, setCurrent] = useState('Home');
  const router = useRouter();
  const onClick = (e) => {
    console.log('click ', e);
    router.push(e.key);
    setCurrent(e.key);
  };
  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </div>
  )
}

export default Header
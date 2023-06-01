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
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
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
import Link from "next/link";
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
function SideBar() {
  return (
    <>
    <Link  href="/component/login">
      <Button>登陆</Button>
      </Link>
    </>
    
  )
}

export default SideBar
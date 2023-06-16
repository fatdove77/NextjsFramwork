import Link from "next/link";
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';


const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {

  return (
    <>
    <div>
       {/* <Link href="component/login">
        登陆
       </Link> */}
       <Link href="/blog/?id=1">
        博客
       </Link>
    </div>
    </>
    )
};

export default App;
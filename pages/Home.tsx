import React from 'react'
import Link from "next/link";
import useWeb3Hook from '@/store/Web3Provider'
const Home: React.FC = () => {
  let {count} = useWeb3Hook.useContainer();
  return (
    <div>
      home
      <Link href={`/Blog`}>路由跳转</Link>
      测试状态管理工具{count}
    </div>
  )
}

export default Home
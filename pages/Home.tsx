import React from 'react'
import Link from "next/link";
import useWeb3Hook from '@/store/Web3Provider'
import useStorage from '@/store/Web3Provider/storage'
const Home: React.FC = () => {
  let {setNetworkId} = useStorage.useContainer();
  return (
    <div>
      home
      <Link href={`/Blog`}>路由跳转</Link>
      <div>
      </div>
    </div>
  )
}

export default Home
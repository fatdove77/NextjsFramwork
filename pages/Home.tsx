import React from 'react'
import Link from "next/link";
import useWeb3Hook from '@/store/Web3Provider'
import useStorage from '@/store/Web3Provider/storage'
const Home: React.FC = () => {
  let {count} = useWeb3Hook.useContainer();
  let {setNetworkId} = useStorage.useContainer();
  setNetworkId(12306);
  return (
    <div>
      home
      <Link href={`/Blog`}>路由跳转</Link>
      <div>
        unstate-next传参：{count}
      </div>
    </div>
  )
}

export default Home
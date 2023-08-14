import React from 'react'
import Link from "next/link";
import useWeb3Hook from '@/store/Web3Provider'
import useStorage from '@/store/Web3Provider/storage'
import {useMainNetBalances} from '@/hooks/useToken'
const Home: React.FC = () => {
  let {setNetworkId} = useStorage.useContainer();
  //获取主网币
  const {
    value: { balances: mainNetBalances },
  } = useMainNetBalances();
  console.log(mainNetBalances);
  
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
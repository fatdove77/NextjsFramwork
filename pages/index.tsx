import * as React from 'react';
import useWeb3Hook from '@/store/Web3Provider'
import useStorage from '@/store/Web3Provider/storage'
import Web3Provider from '@/store/Web3Provider';
//config
import config from '@/config'
export interface IAppProps {
}

export default function App (props: IAppProps) {
  let {networkId,walletType} = useStorage.useContainer();
  let {connect,account,disconnect,active}  = Web3Provider.useContainer();
  console.log(networkId,walletType);
  
  return (
    <div>
      <div>
        <button onClick = {()=>{connect(config.DEFAULT_NETWORK_ID,config.DEFAULT_WALLET_TYPE)}}>连接钱包</button>
        <button onClick = {()=>{disconnect()}}>退出钱包</button>
        <div>{account}</div>
        <div>状态{active?<div>连接</div>:<div>未连接</div>}</div>
      </div>
    </div>
  );
}

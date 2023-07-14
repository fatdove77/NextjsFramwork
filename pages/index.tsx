import * as React from 'react';
import useWeb3Hook from '@/store/Web3Provider'
import useStorage from '@/store/Web3Provider/storage'
import Web3Provider from '@/store/Web3Provider';
//config
import config from '@/config'
export interface IAppProps {
}

export default function App (props: IAppProps) {
  let {count} = useWeb3Hook.useContainer();
  let {networkId,walletType} = useStorage.useContainer();
  let {connect}  = Web3Provider.useContainer();
  console.log(networkId,walletType);
  
  return (
    <div>
      {count}
      11
      <div>
        <button onClick = {()=>{connect(config.DEFAULT_NETWORK_ID,config.DEFAULT_WALLET_TYPE)}}>连接钱包</button>
      </div>
    </div>
  );
}

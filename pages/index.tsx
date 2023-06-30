import * as React from 'react';
import useWeb3Hook from '@/store/Web3Provider'
import useStorage from '@/store/Web3Provider/storage'
export interface IAppProps {
}

export default function App (props: IAppProps) {
  let {count,add} = useWeb3Hook.useContainer();
  let {networkId} = useStorage.useContainer();
  console.log(networkId);
  
  return (
    <div>
      {count}
      11
    </div>
  );
}

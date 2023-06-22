import  React,{useState,useEffect} from 'react';
//状态管理
import { createContainer } from 'unstated-next';
export interface IWeb3ProviderProps {
  count:number;
  provider:any;
  web3:any;
  account:string;
  active:boolean;
  chainId:number;
  connect:(chainId:number,wallerType:string)=>any;
  disconnect:()=>void;
  loading:boolean;
}

const useWeb3Hook= ():IWeb3ProviderProps => {
  const [count,setCounter] = useState<number>(1);
  //window.ethereum
  
  return{
    count
  } ;
};

export default createContainer(useWeb3Hook);

import  React,{useState,useEffect} from 'react';
//状态管理
import { createContainer } from 'unstated-next';
export interface IWeb3ProviderProps {
  count:number;
  // provider:any;
  // web3:any;
  // account:string;
  // active:boolean;
  // chainId:number;
  // connect:(chainId:number,wallerType:string)=>any;
  // disconnect:()=>void;
  // loading:boolean;
  add:()=>void
}

const useWeb3Hook= ():IWeb3ProviderProps => {
  const [count,setCounter] = useState<number>(1);
  //window.ethereum

  const add  = ()=>{
    setCounter(count+1);
  }

  return{
    count,
    add
  } ;
};

export default createContainer(useWeb3Hook);

import  React,{useState,useEffect} from 'react';
//状态管理
import { createContainer } from 'unstated-next';
export interface IWeb3ProviderProps {
  count:number
}

const useWeb3Hook= ():IWeb3ProviderProps => {
  const [count,setCounter] = useState<number>(1);
  return{
    count

  } ;
};

export default createContainer(useWeb3Hook);

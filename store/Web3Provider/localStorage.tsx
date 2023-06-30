import  React,{useState} from 'react';
import { createContainer } from 'unstated-next';
const STORAGE_PREFIX = 'WEB_';
function useLocalStorage (key:any,value?:any) {
  const [localKey,setLocalKey] = useState();
  const [localValue,setLocalValue] = useState();
  if (value !== undefined) {
    window.localStorage.setItem(STORAGE_PREFIX + key, value);
    return;
  }
  return {
    
  }
}

export default createContainer(useLocalStorage);

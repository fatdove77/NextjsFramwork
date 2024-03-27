import * as React from 'react';
import useStorage from '@/store/Web3Provider/storage'
import Home from './Home';
export interface IAppProps {
}

export default function App (props: IAppProps) {
  
  return (
    <div>
      <Home></Home>
    </div>
  );
}

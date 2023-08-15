import { useMemo, useState, useEffect } from 'react';
//hooks
import { useSingleCallResult, useMessage } from '@/hooks';
//工具类
import { digitalPrecision, setObjBigNumber } from '@/hooks/utils';
import { toCallState, type CallState } from './utils';
//个人钱包方法
import Web3Provider from '@/store/Web3Provider';
//实例化合约方法
import {
  useMultiFactory
} from '@/hooks/useContract'
//逻辑合约地址
import { logicContractAddress } from '@/constance'

import { ethers } from 'ethers';

//生成多签
export const useTest = async () => {
  const { account, provider } = Web3Provider.useContainer();
  const address_1 = '0x666666D834C881ECCcda9fB5441327AaC81A8E5b';
  const address_2 = '0x7777779A61DDAd61f89EF4b3a0AbF152f6083974';
  const address_3 = '0x88888893C7e180D51B2557F76Eba35cff528b79C';
  const name = 'myMultiSig1';
  const _quorum = 2;
  //实例化多签工厂合约
  const MultiFactoryAddress = useMultiFactory();
  console.log(account);
  const getMultiAddress = async () => {
    const saltNonce_1 = await provider.getTransactionCount('0x666666D834C881ECCcda9fB5441327AaC81A8E5b');
    const saltNonce_2 = await provider.getTransactionCount('0x7777779A61DDAd61f89EF4b3a0AbF152f6083974');
    const saltNonce_3 = await provider.getTransactionCount('0x88888893C7e180D51B2557F76Eba35cff528b79C');
    const saltNonce = saltNonce_1 + saltNonce_2 + saltNonce_3;
    console.log(saltNonce);
  }

  // // try {
  //   useSingleCallResult()
  // } catch (error) {

  // }
  useEffect(()=>{
    getMultiAddress()
  },[])


  return useMemo(() => {
    const data = {
      MultiFactoryAddress
    }
    return toCallState(data);
  }, [MultiFactoryAddress])

}
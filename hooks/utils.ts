import { ethers, type Contract } from 'ethers';
import { type BigNumber } from 'bignumber.js';
import { BigNumber as BigNumberJs } from 'bignumber.js';

import config from '@/config';

// Check if the address is correct
export function isAddress(value: any, isAddress = true): string | false {
  try {
    if (isAddress) {
      return ethers.utils.getAddress(value);
    } else {
      return ethers.utils.getContractAddress(value);
    }
  } catch {
    return false;
  }
}

const ETHERSCAN_PREFIXES: Record<number, string> = {
  12307: 'scan.fibochain.org',  //fibo test
  12306: 'scan.fibochain.org',  // fibo div 
};

export function getEtherscanLink(
  chainId: number,
  data: string,
  type: 'transaction' | 'token' | 'address',
): string {
  const prefix = `https://${
    ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[config.CHAIN_ID]
  }`;
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}
export function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatHash(hash: string) {
  if (hash.length <= 12) return hash;
  return `${hash.slice(0, 8)}...${hash.slice(-4)}`;
}

export const digitalPrecision = (
  num: string | number,
  decimals: number,
  isDiv?: boolean, //   By default  
) => {
  // division. High-precision decimal conversion to Arabic numerals
  if (!num) {
    return '';
  }
  if (isDiv) {
    return BigNumberJs(num.toString())
      .div(Math.pow(10, decimals))
      .toFixed(config.precision)
      .toString();
  } else {
    // Convert to high precision decimal by default
    return BigNumberJs(num.toString()).times(Math.pow(10, decimals)).toFixed();
  }
};

// Process object BigNumber data
export const setObjBigNumber = (
  data = {},
  fn = (e: any) => {
    return e;
  },
) => {
  return Object.entries(data)
    .map((item: any) => ({
      [item[0]]: fn(item[1].toString()),
    }))
    .reduce(
      (acc: any, cur: any) => ({
        ...acc,
        ...cur,
      }),
      {},
    );
};

// interface Result extends ReadonlyArray<any> {
//    readonly [key: string]: any;f
// }
type dataType = Record<string, any>;

export type MethodArg = dataType | string | number | BigNumber;

//定义合约返回值的数据类型  返回值 加载状态 错误
export interface CallState {
  readonly value: any; // MethodArg | undefined;
  // true if the result has never been fetched
  readonly loading: boolean;
  // true if the call was made and is synced, but the return data is invalid
  readonly error: boolean;
  [key: string]: any;
}

//合约返回错误  返回下列的非法value
const INVALID_CALL_STATE: CallState = {
  value: undefined,
  loading: false,
  error: false,
};

 
// satte  //返回的是一个对象  包含value loading error
export function toCallState(
  value: MethodArg | undefined = undefined,
  methodName?: string,
): CallState {
  //值不存在  返回定义好的非法state
  if (!value) return INVALID_CALL_STATE;

    
  const obj_data = Object.entries(value)
    .map((item) => item[1])
    .some((item) => (item ?? '') !== ''); 

  if (value) {
    const data: CallState = {
      loading: obj_data,
      error: false,
      value: ethers.BigNumber.isBigNumber(value) ? value.toString() : value,
    };
    if (methodName) {
      data[methodName] = data.value;
    }
    return data;
  }

  return {
    ...INVALID_CALL_STATE,
    error: true,
  };
}

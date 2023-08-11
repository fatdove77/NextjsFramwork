import Web3Provider from '@/store/Web3Provider';
import { useMemo } from 'react';
import { type Contract } from 'ethers';
import { getContract } from './index';
import MultiLogic_ABI from '@/constance/abi/MultiLogicAbi.json';
import MultiFactory_ABI from '@/constance/abi/MultiFactoryAbi.json';
import ERC20_ABI from '@/constance/abi/erc20.json';
import { contractAddress } from '@/constance';



//实例化多签工厂合约
export const useMultiFactory = ()=>{
  const {provider,account} = Web3Provider.useContainer();
  if(!provider || !MultiFactory_ABI) return;
  return getContract(contractAddress,MultiFactory_ABI,provider,account);

}



// TODO: 
export function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible?: boolean,
): Contract | null {
  const { provider, account } = Web3Provider.useContainer();

  return useMemo(() => {
    if (!address || !ABI || !provider) return null;
    try {
      return getContract(
        address,
        ABI,
        provider,
        withSignerIfPossible && account ? account : undefined,  //是否需要签名,如果需要传入account
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, provider, withSignerIfPossible, account]);
}

// erc20 实例化erc20合约
export const useErcContract = () => {
  const { provider, account } = Web3Provider.useContainer();
  return (address: string) => {
    if (!address || !provider || !account) return null;
    return getContract(address, ERC20_ABI, provider, account);
  };
};

// TODO: erc20  实例化代币合约
export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

// // Aww
// export const useAWWContract = () => {
//   const { provider, account } = Web3Provider.useContainer();
//   if (!provider || !FDF_ABI) return;
//   return getContract(contractAddress, FDF_ABI, provider, account);
// };



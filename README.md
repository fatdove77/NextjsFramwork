dapp主要解决两个问题

1. 框架next 搭配ts https://juejin.cn/post/7021674818621669389

2. 状态管理工具 unstated-nex

3. 缓存和链上信息的暴露

4. 连接钱包 metamask  使用metamaskjshttps://docs.metamask.io/wallet/reference/rpc-api/

   连接方法

   断开方法

   切换链

   查询操作：查询余额 块高 链id等

5. 调用合约  使用ethers

   - 只读方法
   - 可写方法

6. svg使用

7. 国际化

8. antd组件

   

   

# 框架next 搭配ts 

https://juejin.cn/post/7021674818621669389

## 泛型的用法

`IProps` 是一个自定义的接口（或类型），用于定义 `Child1` 组件的 props 的类型。通常，`IProps` 是在组件所属的模块或文件中定义的。通过在组件声明中使用 `<IProps>`，可以指定 `Child1` 组件的 props 必须符合 `IProps` 接口所定义的结构。

```ts
interface IProps {
  name: string;
  age: number;
}
const Child1: React.FC<IProps> = (props) => {
  // 在组件中可以使用 props.name 和 props.age
  // ...
}
```

这样，当使用 `Child1` 组件时，传入的 props 必须符合 `IProps` 接口所定义的结构，即包含 `name` 属性（字符串类型）和 `age` 属性（数字类型）。

使用泛型参数可以提供静态类型检查的好处，可以在编译时捕获错误和类型不匹配的问题，提高代码的可维护性和可靠性

**React.FC定义了他是一个jsx的组件，没有任何返回值**



## 定义一般函数式组件

```ts
import React from 'react'

const Home:React.FC = ()=> {
  return (
    <div>
      home
    </div>
  )
}

export default Home
```



## hooks

### useState

```ts
const [count, setCount] = useState<number>(1)
```

```ts
const [count, setCount] = useState<number | null>(null); 
```







## type or interface

https://juejin.cn/post/6978417573050187784

```ts
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
```





```ts
export interface CallState {
  readonly value: any; // MethodArg | undefined;
  // true if the result has never been fetched
  readonly loading: boolean;
  // true if the call was made and is synced, but the return data is invalid
  readonly error: boolean;
  [key: string]: any;   //代表可以额外添加键值为string，value为any的属性
}

```



### 如何选择interface or type

```tex
在 TypeScript 中，interface 和 type 都用于定义自定义类型，但它们有一些不同的特性和用途，适用于不同的情况。以下是一些指导原则，帮助你决定何时使用 interface，何时使用 type：

使用 interface 的情况：

当你需要声明一个类、对象或函数的外部形状（结构）时，使用 interface 是较为常见的选择。interface 更适合用于描述一个接口的合同，即一个对象应该具有哪些属性以及属性的类型。
当你需要通过扩展已有接口来创建一个新接口时，使用 interface 更直观。接口之间可以通过 extends 关键字进行继承。
当你需要在一个类中使用接口实现（类实现一个接口）时，应该使用 interface。
使用 type 的情况：

当你需要定义复杂的联合类型、交叉类型、元组类型等高级类型时，使用 type 更加灵活。type 可以用于创建更多种类的类型别名。
当你需要为一个已存在的类型起一个别名时，使用 type 更直观。类型别名可以更方便地给已有类型取一个更短或更具描述性的名字。
当你需要定义某些类型转换、计算类型、映射类型等较复杂的类型操作时，使用 type 更合适。
当你需要在联合类型中使用字符串字面量类型进行标识时，例如定义状态常量，type 通常更适用。
总的来说，interface 更适合描述对象的形状和类的接口，而 type 更适合创建复杂的类型别名和进行类型操作。在大多数情况下，选择使用哪个取决于你的具体需求以及代码的组织方式。实际使用中，你可能会在项目中同时使用这两种方式。
```





## nextjs 路由传递参数以及子路由的实现

传递参数

```ts
<Link href="/Blog/22222">
	跳转blog2
</Link>
//上面这种传递方式 需要写子组件[id].js用来接受参数 不然跳转的路径是空的
or
<Link href={`Blog?id=${23}`}>
	跳转blog2
</Link>
```

接受

```ts
import React from 'react'
import {useRouter} from 'next/router'
import BlogLayout from './BlogLayout';
  const router = useRouter();
  const {id} = router.query;

```



文件结构树

```
Blog
	--BlogLayout.tsx
	--index.tsx
	--[id].tsx
```







# 状态管理工具 unstated-next

```ts
npm install --save unstated-next
```

**为什么手写的hook不行，因为每次引入手写的hook都会重新初始化，而使用状态管理的不会，所以这就是必须要使用状态管理的原因**

### 在自定义的hook中引入

```ts
import { createContainer } from 'unstated-next';
```

全局调用，不需要每次重新写provider

[React轻量状态管理库 unstated-next使用教程 - 简书 (jianshu.com)](https://www.jianshu.com/p/f5d0d777b523)

### 组件中引用

```js
import useWeb3Hook from '@/store/Web3Provider'
let {count} = useWeb3Hook.useContainer();
```



### 最外层统一封装自定义hooks的provider

把自定义hook引入放到models中

```ts
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from 'next/head'
import useWeb3Hook from '@/store/Web3Provider'
import useStorage from '@/store/Web3Provider/storage'

// Pay attention to the sorting,
const models = {
  useStorage,
  useWeb3Hook,
};


function compose(containers: any) {
  return function Component(props: any) {
    return containers.reduceRight(
      (children: any, Container: any) => (
        <Container.Provider>{children}</Container.Provider>
      ),
      props.children,
    );
  };
}

const ComposedStore = compose(Object.values(models));


function Layout({ children }: any) {

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className="relative h-screen">
        <Header />
        <div id="content" className="w-full relative top-0 left-0">
          <ComposedStore>
            {children}
          </ComposedStore>
          <Footer />
        </div>
      </div>

    </>
  )
}

export default Layout;
```



# 网络信息、链信息以及存入缓存

## 配置可用的链信息

### ./netConfig

```ts
export const chains = [
  {
    name:'Fibo Chain',
    chainId: 12306,  // 1230  //12306 //十六进制 3012
    chainName: 'FIBO',
    rpcUrls: ['https://node.fibochain.org'],
    faucets: ["https://www.fibochain.org/drawdex"],
    explorers: [],
    infoURL: "https://www.fibochain.org/",
    network: "fibochain",
    networkId: 12306,  //12306
    nativeCurrency: {
      name: 'fibo',
      symbol: 'FIBO',
      decimals: 18,
      }
  
  }
]
```

## 导出链信息

### index.ts

```ts
//引入定义好的支持链
import { chains } from "./netConfig";

interface BaseDataType{
  CHAIN_ID:number;
  Contract:string;
  NETWORK_URL:string;
}

const DataType:BaseDataType = {
  CHAIN_ID:12306,
  Contract:'',
  NETWORK_URL:'https://node.fibochain.org' //RPC
}


const {CHAIN_ID, Contract, NETWORK_URL } = DataType;



const config = {
  // env
  BaseLocale: 'zh-cn',  //默认语言
  // 
  DEFAULT_NETWORK_ID: 12306,  //默认网络id号（链id）
  DEFAULT_WALLET_TYPE: 'MetaMask', //默认连接钱包
  chains, // 支持链 
  WEBSITE: 'https://www.fibochain.org/',
  precision: 2,  //
  interestRate: 22.5 / 100,

  // 
  CHAIN_ID,
  NETWORK_URL,
  Contract,
};
export default config;

//暴露出 chainId 钱包type 以及rpcurl
```



## 设置缓存

### storage  

讲chainid和钱包种类放入项目管理中 存储的方式使用缓存实现

因为是服务端渲染无法使用页面缓存 所以使用cookies第三方插件

https://juejin.cn/post/6844903645616537613

```ts
import { useState } from 'react';
import { createContainer } from 'unstated-next';
//链上网络配置
import config from '@/config'
//使用memory cache缓存
import Cookies from 'js-cookie'
const STORAGE_PREFIX = 'WEB_';  //加一个头部描述信息


//如果value不存在那么存入缓存，如果value存在那么取出key值对应的value
export function storage(key: string, value?: any) {
  //传入value
  if (value !== undefined) {
    // localStorage.storePermanentItem(STORAGE_PREFIX + key, value);
    Cookies.set(STORAGE_PREFIX + key, value)
    return;
  }
  return Cookies.get(STORAGE_PREFIX + key);
}


//设置默认值
const defaultStates: any = {
  //缓存中有信息读出来 没有的话使用config的默认值
  NETWORK_ID: storage('NETWORK_ID') ?? config.DEFAULT_NETWORK_ID,
  WALLET_TYPE: storage('WALLET_TYPE') ?? config.DEFAULT_WALLET_TYPE,
}

function useStorage(customInitialStates = {}) {
  const initStates = Object.assign({}, defaultStates, customInitialStates);
  const [networkId, setNetworkId] = useState<number>(initStates.NETWORK_ID);
  const [walletType, setWalletType] = useState(initStates.WALLET_TYPE);
  return {
    networkId: Number(networkId),
    walletType,
    setNetworkId: (payload: any) => {
      storage('NETWORK_ID', payload);
      setNetworkId(payload);
    },
    setWalletType: (payload: any) => {
      storage('WALLET_TYPE', payload);
      setWalletType(payload);
    },
  };
}

export default createContainer(useStorage);


```



# 连接钱包

stort->web3provider->index.js  方法存到unstated中

```tsx
import React, { useState, useEffect, useCallback } from 'react';
//状态管理
import { createContainer, useContainer } from 'unstated-next';
//链的基本配置
import config from '@/config'
//支持链：是个数组
import { chains } from '@/config/netConfig'
//存储链id和钱包id的
import Storage from './storage';
//toast组件
import toast, { Toaster } from 'react-hot-toast';
//metamask 的兼容性更好的 provider
import detectEthereumProvider from '@metamask/detect-provider';
//ETHERS
import { ethers } from 'ethers';
export interface IWeb3ProviderProps {
  provider: any;  //ethers的配置类 包含很多方法
  web3: any;  //web3 
  account: string;
  active: boolean;
  chainId: number;
  connect: (chainId: number, wallerType: string) => any;
  disconnect: () => void;
  loading: boolean;
}

const useWeb3Hook = (): IWeb3ProviderProps => {
  const [web3, setWeb3] = useState<any>(null); // ethereum  //window.ethereum
  const [provider, setProvider] = useState<any>(null); // provider
  const [currentAccount, setCurrentAccount] = useState<any>(null);
  const { walletType, networkId, setNetworkId } = Storage.useContainer();
  const [chainId, setChainId] = useState<number>(config.CHAIN_ID);
  const [loading, setLoading] = useState<boolean>(false);

  //连接钱包的方法
  const handleConnect = useCallback(
    //参数 分别是 网络id:12306 钱包类型  是否自动连接
    async (network_id: number, wallet_type: string, auto_connect?: boolean) => {
      setLoading(true);  //控制按钮加载的loading
      // 限制支持链  find找到第一个符合的值 也就是从符合的链数组中找到networkid一致的链信息
      const chainsInfo = chains.find((item: any) => {
        return item.networkId === network_id;
      });
      if (chainsInfo == null) {
        toast.error(`不支持的网络,需要切换到支持的网络:${network_id}`)
        return true;
      }

      // 生成连接钱包的provider
      try {
        let providerInstance: any = null;
        switch (wallet_type) {
          case 'MetaMask':
            providerInstance = await detectEthereumProvider();
            break;
          default:
            providerInstance = await detectEthereumProvider();
            break;
        }
        let account = [];
        //解锁metamask 获得用户地址
        if (providerInstance) {
          const accounts = await providerInstance.request({
            method: 'eth_requestAccounts',
          });
          account = accounts[0];
          console.log(account);
          
        }
        else {
          if (!auto_connect) {
            toast.error(`Please install ${wallet_type}!`);
            return `please install`
          }
          return;
        }
        //获取当前链id
        const walletChainId = await providerInstance.request({
          method: 'eth_chainId',
        });
        //转化成0x格式
        const providerChainId =  //当前链的0x格式
          walletChainId.toString().indexOf('0x') === 0
            ? parseInt(walletChainId, 16)
            : walletChainId;
        //如果目标网络和当前网络不一样 那么切换网络
        console.log(providerChainId,network_id);
        
        if (network_id !== providerChainId) {
          try {
            //切换network
            await providerInstance.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${network_id.toString(16)}` }],
            });
          } catch (switchError: any) {
            console.error('wallet_switchEthereumChain', switchError);
            // This error code indicates that the chain has not been added to MetaMask.
            //将这条链添加到metamask中
            if (switchError.code === 4902) {
              try {
                const params = {
                  chainId: `0x${network_id.toString(16)}`,
                  chainName: chainsInfo.name,
                  nativeCurrency: chainsInfo.nativeCurrency,
                  rpcUrls: chainsInfo.rpcUrls,
                };
                await providerInstance.request({
                  method: 'wallet_addEthereumChain',
                  params: [params],
                });
              } catch (addError: any) {
                toast.error("添加链错误"+addError);
                console.log(addError);
                return addError.message;
              }
            } else if (switchError.code === 4001) {
              toast.error('❌ 你拒绝了 "切换网络" 的请求');
              return;
            } else if (switchError.code === -32002) {
              // alert(
              //   '😊 已经发送了 "切换网络" 的请求，\n请动动你发财的小手在钱包内确认一下。',
              // );
              return;
            } else {
              toast.error(switchError.message);
              return switchError.message;
            }
          }
        }
        const provider = new ethers.BrowserProvider(providerInstance); // 实例化provider
        const user_Account = await provider._getAddress(account); // 

        // Set
        setProvider(provider);
        setChainId(providerChainId);
        setWeb3(providerInstance);
        setCurrentAccount(user_Account);
        setLoading(false);
        return null;
      } catch (e: any) {
        let message = e.message;
        switch (e.code) {
          case -32002:
            message = '请确认您在MetaMask中的操作'; // 'Please confirm your operation in MetaMask'
            break;
          default:
            break;
        }
        console.error('最终错误', e);
        alert(message);
        return message;

      }
    }, [])

    //断开连接方法
  const handleDisconnect = useCallback(async () => {
    setWeb3(null);
    setProvider(null);
    setCurrentAccount(null);
  }, []);



  // 自动连接
  useEffect(() => {
    if (networkId && walletType) {
      console.log(`网络id${networkId}`);
      
      handleConnect(networkId, walletType, false);
    }
  }, [networkId, walletType]);

  useEffect(() => {
    if (!web3?.on) return;
    web3.on('accountsChanged', (_accounts: any, a: any, b: any) => {
      // / Handle the new _accounts, or lack thereof.
      // “_accounts”/ "_accounts" will always be an array, but it can be empty.
      if (!_accounts.length) {
        return;
      }
      if (currentAccount === _accounts[0]) {
        return;
      }
      setCurrentAccount(_accounts[0]);
      window.location.reload();
    });

    // chainId
    web3.on('chainChanged', async (chainId: any) => {
      const chainIdValue =
        chainId.toString().indexOf('0x') === 0
          ? parseInt(chainId, 16)
          : chainId;
      const network: any = chains.find((element: any) => {
        return element.chainId === Number(chainIdValue);
      });
      setNetworkId(network.networkId);
      window.location.reload();
    });

    // 
    web3.once('disconnect', async () => {
      await handleDisconnect();
    });
  }, [web3, currentAccount, handleDisconnect, setNetworkId]);

  return {
    provider,  
    web3, 
    chainId,  //链id
    account: currentAccount,  //用户地址
    active: !!currentAccount,  //是否连接
    async connect(chain_id: number, wallet_type: string) {
      return await handleConnect(chain_id, wallet_type);
    },
    async disconnect() {
      await handleDisconnect();
    },
    loading
  };
};

export default createContainer(useWeb3Hook);

```







# 封装合约调用

1. ## 封装合约调用的hooks  ./index

   ```ts
   // single call result   //调用合约方法 需要传入 
   export function useSingleCallResult(
     contract: Contract | null | undefined,  //合约实例
     methodName: string,   //合约方法
     inputs?: MethodArg[],  //参数  //代表数据类型为MethoodArg的数组
   ): any {
     const { account } = Web3Provider.useContainer();
     const [data, setData] = useState<MethodArg | undefined>(undefined);
     //检查合约是否有输入的函数方法 checking wether the contract has inputted method 
     const fragment = useMemo(
       () => contract?.interface?.getFunction(methodName.trim()),
       [contract, methodName],
     );
   
     useEffect(() => {
       (async () => {
         if (!fragment) return;
           ////由于方法名是一个字符串，而你想要访问的是 contract 对象中的一个属性（即合约方法），你可以使用方括号记法来实现。
         const res = await contract?.[methodName.trim()](...(inputs ?? []));
         setData(res);
       })();
     }, [contract?.address, account]); // , fragment
   
     return useMemo(() => {
       return toCallState(data, methodName);
     }, [data]);
   }
   ```

   

2. ## 封装实例化合约的hooks  ./index

   ```ts
   //create contract instance  
   export function getContract(
     address: string, //contract address 
     ABI: any,
     library: any,  //provider 
     account?: string,  //alternative account for choosing write and read-only
   ): Contract {
     const AddressZero: string = '0x0000000000000000000000000000000000000000';
     //检验合约地址
     if (!isAddress(address, true) || address === AddressZero) {
       toast.error(`Invalid 'address' parameter '${address}'.`);
     }  
   
     return new ethers.Contract(
       address,
       ABI,
       getProviderOrSigner(library, account),  //如果有acount那么生成signer代表可以write的合约//否则readonly合约
     );
   }
   
   // Provider/Signer  如果传入account那么生成signer 否则返回provider
   export function getProviderOrSigner(library: any, account?: string): any {
     return account ? getSigner(library, account) : library;
   }
   
   // getUncheckedSigner。  由provide+account生成signer
   export function getSigner(library: any, account: string): any {
     return library.getSigner(account).connectUnchecked();
   }
   
   ```

3. ## 封装调用合约实例化的函数（用于传参->实例化合约）  ./useContract

   ```ts
   //实例化多签工厂合约
   export const useMultiFactory = ()=>{
     const {provider,account} = Web3Provider.useContainer();
     if(!provider || !MultiFactory_ABI) return;
     return getContract(contractAddress,MultiFactory_ABI,provider,account);
   }
   
   ```

4. ## 调用合约的提示  ./index

   ```ts
   // message
   export const useMessage = () => {
     const { provider, chainId } = Web3Provider.useContainer();
     const [loading, setLoading] = useState<boolean>(false);
   
     // message
     const Message = (
       hash: string,
       fn?: () => any,
       successText: string = '链上已确认',
     ) => {
       message.loading('链上确认中...', 0);
       setLoading(true);
       try {
         provider?.waitForTransaction(hash).then(() => {
           fn?.();
           message.destroy();
           setLoading(false);
           // message.success(successText, 1000);
           notification.success({
             placement: 'topRight',
             message: successText,
             description: `View on fiboscan:${formatHash(hash)}`,
             onClick: () => {
               window.open(
                 getEtherscanLink(chainId, hash, 'transaction'),
                 '_blank',
               );
             },
           });
         });
       } catch (error) {
         setLoading(false);
       }
     };
     return useMemo(() => {
       return { Message, loading };
     }, [loading]);
   };
   ```

   

5. ## 封装数据类型  ./utils

   ```ts
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
   
   const INVALID_CALL_STATE: CallState = {
     value: undefined,
     loading: false,
     error: false,
   };
   
   
   
   export function toCallState(
     value: MethodArg | undefined = undefined,
     methodName?: string,
   ): CallState {
     if (!value) return INVALID_CALL_STATE;
   
     //检验返回的对象是否有空字符串或者undefined
     const obj_data = Object.entries(value)
       .map((item) => item[1])
       .some((item) => (item ?? '') !== ''); 
   
     if (value) {
       const data: CallState = {
         loading: obj_data,
         error: false,
         value: ethers.BigNumber.isBigNumber(value) ? value.toString() : value,  //value转化成字符串
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
   
   ```

6. ## 封装代币信息 （余额、小数） ./useToken

   ```ts
   // TODO:   封装代币信息
   export function useToken(tokenAddress?: string): CallState {
     const TokenContract = useTokenContract(tokenAddress);
     const { symbol } = useSingleCallResult(TokenContract, 'symbol');
     const { decimals } = useSingleCallResult(TokenContract, 'decimals');
     const { name } = useSingleCallResult(TokenContract, 'name');
   
     // const address = useSingleCallResult(TokenContract, 'address');
   
     return useMemo(() => {
       const data = {
         symbol,
         decimals,
         name,
         address: tokenAddress,
       };
       return toCallState(data);
     }, [symbol, decimals, name]);
   }
   
   ```

   

7. ## 封装获取代币余额  ./useToken

   ```ts
   // currency balance  通过合约获取当前代币
   export const useCurrencyBalances = (tokenAddress?: string): CallState => {
     const { account } = Web3Provider.useContainer();
   
     const TokenContract = useTokenContract(tokenAddress ?? undefined);
     const { decimals } = useSingleCallResult(TokenContract, 'decimals');
     const { balanceOf } = useSingleCallResult(TokenContract, 'balanceOf', [
       account,
     ]);
   
     return useMemo(() => {
       const data = {
         balanceOf,
         balances: balanceOf
           ? BigNumber(balanceOf).div(Math.pow(10, decimals)).toFixed()
           : '',
       };
   
       return toCallState(data);
     }, [decimals, balanceOf, tokenAddress]);
   };
   
   // Mainnet balance  获取主网币 （fibo okx）
   export const useMainNetBalances = (): CallState => {
     const { account, provider } = Web3Provider.useContainer();
     const [pending, setPending] = useState();
   
     useEffect(() => {
       (async () => {
         if (!provider || !account) return;
         const pending = await provider.getBalance(account, 'pending');
         if (pending) {
           setPending(pending.toString());
         }
       })();
     }, [provider, account]);
   
     return useMemo(() => {
       const data = {
         pending,
         balances: pending
           ? BigNumber(pending).div(Math.pow(10, 18)).toFixed()
           : '',
       };
       return toCallState(data);
     }, [pending]);
   };
   
   
   
   ```

   



## 整体调用流程

我们要清楚一个最基本的流程，调用合约需要实例化合约，实例化合约需要合约地址+合约abi，同时也需要ethersjs实例化出provider。

然后调用合约方法，需要向实例化的合约内传递参数



获取代币的值

- 主网代币：通过ethers.getBalance

- erc代币，需要erc代币合约+ercabi，和调用合约一样的方法拿到代币信息

  ```ts
  provider.getBalanceOf.[account]；
  ```

initial

```ts
const { account } = Web3Provider.useContainer();
  const { Message } = useMessage();
  const AWWContract = useAWWContract();

  const [depositLoading, setDepositLoading] = useState(false); // loading
  const { getCurSplit } = useSingleCallResult(AWWContract, 'getCurSplit', [
    account,
  ]); // 

  const {
    value: { address: usdtAddress, decimals },
  } = useGetUSDT();
  const tokenContract = useTokenContract(usdtAddress);
  const { value: usdt_allowance } = useSingleCallResult(
    tokenContract,
    'allowance',
    [account, contractAddress],
  );

  const getErcContract = useErcContract();
```



调起钱包的方法，将hash,loading,msg传如Message，直接使用实例化合约调用，而不是singleCallContract

```typescript
try {
      const res = await Contract?.[name](...data);
      Message(
        res?.hash,
        () => {
          setDepositLoading(false);
        },
        msg,
      );
    } catch (error) {
       ///...
    }
```





## 查询代币

#### 主网代币 

直接调用useMainNetBalances

```ts
 //获取主网币
  const {
    value: { balances: fiboBalances },  //balances是因为合约调用方法methodName是balances
  } = useMainNetBalances();   //结构出值 fiboBalances
```

#### 非主网代币（erc20）

```ts
useTokenContract(address)->实例化合约Contract->调用方法

如果是只想看代币余额，那么直接useCurrencyBalances(address)
```





# 工具类

## 检验地址正确性





## 大数转化

输入num，小数点，乘或者除以

```ts
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

```



## 将参数转化为对象

```ts
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
```



## 省略地址

```ts
export function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatHash(hash: string) {
  if (hash.length <= 12) return hash;
  return `${hash.slice(0, 8)}...${hash.slice(-4)}`;
}

```







# 插件

## 提示toast  轻提示

https://react-hot-toast.com/docs

```ts
npm install react-hot-toast
```



## bigNumber js

https://github.com/MikeMcl/bignumber.js#readme

```js
npm install bignumber.js
```



## antd

```js
$ npm install antd --save
```

### message notication







# package信息

注意ethers js是v5版本 v6有些方法会报错

```

```





# 补充知识点

entires

reduce

无法直接修改item，写一个函数返回

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
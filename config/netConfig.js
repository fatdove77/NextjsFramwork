export const NETWORK = {
  name:'Fibo Chain',
  chainId: '0x3012',  // 1230  //12306 //十六进制 3012
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

};



// const fiboChain: Chain = {
//   id: 43_114,
//   name: 'Avalanche',
//   network: 'avalanche',
//   iconUrl: 'https://example.com/icon.svg',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Avalanche',
//     symbol: 'AVAX',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://api.avax.network/ext/bc/C/rpc'],
//     },
//     public: {
//       http: ['https://public-rpc-url'],
//     },
//   },
//   blockExplorers: {
//     default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//     etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//   },
//   testnet: false,
// };
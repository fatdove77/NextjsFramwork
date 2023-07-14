export const chains = [
  //fibo正式链
  {
    name:'Fibo Chain',
    chainId: 12306,  // 1230  //12306 //十六进制 3012
    chainName: 'FIBO',
    rpcUrls: ['https://node1.fibo-rpc.asia/'],
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
  },
  //okc的测试链
  {
    "name": "OEC Testnet",
    "chainId": 65,
    "shortName": "tokt",
    "chain": "okexchain",
    "network": "testnet",
    "networkId": 65,
    "nativeCurrency": {
      "name": "OEC Global Utility Token in testnet",
      "symbol": "OKT",
      "decimals": 18
    },
    "rpc": ["https://exchaintestrpc.okex.org"],
    "faucets": ["https://www.okex.com/drawdex"],
    "explorers": [
      {
        "name": "OKLink",
        "url": "https://www.oklink.com/okexchain-test",
        "standard": "EIP3091"
      }
    ],
    "infoURL": "https://www.okex.com/okexchain"
  }
]



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
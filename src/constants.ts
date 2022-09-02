import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 11111,
  NILE = 201910292,
  SHASTA = 1
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const INIT_CODE_HASH = '0x515ceede630d54ea899e245e075fe1f8d2574639cfb3fbc20c70fa8b8d9bb884'

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}

// @TRON only
export const FACTORY_ADDRESSES = {
  [ChainId.NILE]: '0x227044d0cd57e257b15c8c3bd5608e241b8b02ca',
  [ChainId.MAINNET]: '0x28d6a74c2e3a4da074011afef9238b59cf4fd825',
  [ChainId.SHASTA]: '0xb9fe040dd98a9718805c976f8a899ef17b0f43ed'
}
export const INIT_CODE_HASHES = {
  [ChainId.NILE]: '0xf18ab5ba2b2ea93d5f80bbf9f1f4b2ccc8ad443571e6a3af023346a5dd669249',
  [ChainId.MAINNET]: '0xd81a8b57892d57f214f7ee297a246d0c81ad5dd2d7621668ea1705ea13da2f25',
  [ChainId.SHASTA]: '0x515ceede630d54ea899e245e075fe1f8d2574639cfb3fbc20c70fa8b8d9bb884'
}

// TODO: build that data structure from a simple array of (tokenA, tokenB, pairAddress) to avoid human error when adding pairs...

interface PairAddresses {
  [token0Address: string]: { [token1Address: string]: string }
}

// @TRON
function buildPairAddresses(list: [string, string, string][]): PairAddresses {
  const res: PairAddresses = {}
  list.forEach(([tokenA, tokenB, pairAddress]) => {
    // deterministically sort addresses (prevents duplicates, e.g. (a, b) vs (b ,a))
    const [token0_, token1_] = tokenA.toLowerCase() < tokenB.toLowerCase() ? [tokenA, tokenB] : [tokenB, tokenA]
    const token0 = token0_.toLowerCase()
    const token1 = token1_.toLowerCase()
    res[token0] = res[token0] || {}
    if (res[token0][token1]) {
      throw new Error(`duplicated pair ${tokenA}, ${tokenB}, ${pairAddress}`)
    }
    res[token0][token1] = pairAddress
  })
  return res
}

// format: token1, token2, pairAddress
export const PAIR_ADDRESSES: { [chainId: string]: PairAddresses } = {
  [ChainId.NILE]: buildPairAddresses([
    [
      // DTKN/WTRX
      '0x42c142500ff7068f326c01a8f1b3cd8ea7d9377f',
      '0x8f44113a985076431b77f6078f0929f949cb8836',
      '0x02a6a10E4C7750a7F8dC159b95936B574c211f0D'
    ],
    [
      // USDT/EOTC
      '0xea51342dabbb928ae1e576bd39eff8aaf070a8c6', //USDT
      '0x2129f037eb93a9a36eac7e2a0fb981f3ad3d0ae8', // EOTC
      '0x025629d29f3b7686a2ab28bfd3b48ad29fbb691c' //pair
    ]
  ]),
  [ChainId.MAINNET]: buildPairAddresses([
    [
      // USDT/EOTC
      '0xa614f803b6fd780986a42c78ec9c7f77e6ded13c', //USDT
      '0xdfe9d10781d0e48bcc03f0fda2067e45aec6a144', // EOTC
      '0x025629d29f3b7686a2ab28bfd3b48ad29fbb691c' //pair
    ]
    // [
    //   // TRX/USDT
    //   '0x891CDB91D149F23B1A45D9C5CA78A88D0CB44C18', // WTRX
    //   '0xA614F803B6FD780986A42C78EC9C7F77E6DED13C', // USDT
    //   '0xE01FF0B9B3862E0FACB4D4BC7320DE6F2C2B354F' // Pair
    // ],
    // [
    //   // TRX/ETH
    //   '0x53908308F4AA220FB10D778B5D1B34489CD6EDFC', // ETH
    //   '0x891CDB91D149F23B1A45D9C5CA78A88D0CB44C18', // WTRX
    //   '0x06D84F4E79F6927DC2C283092873986DBC9C3C30' // Pair
    // ],
    // [
    //   // ETH/USDT
    //   '0x53908308F4AA220FB10D778B5D1B34489CD6EDFC', // ETH
    //   '0xA614F803B6FD780986A42C78EC9C7F77E6DED13C', // USDT
    //   '0x1213E3DA3A5175F7D0D0313113EF12E37C4A98CF' // Pair
    // ],
    // [
    //   // ETH/HKMC
    //   '0x53908308F4AA220FB10D778B5D1B34489CD6EDFC', // ETH
    //   '0x68B0AD0B1FB3811BE676B05047A5A43F8170BAC1', // HKMC
    //   '0x7B10898C51F16CEB6D8C52CBDB31E43F0D55A8B7' // Pair
    // ],
    // [
    //   // TRX/HKMC
    //   '0x68B0AD0B1FB3811BE676B05047A5A43F8170BAC1', // HKMC
    //   '0x891CDB91D149F23B1A45D9C5CA78A88D0CB44C18', // WTRX
    //   '0x56A59AC0FEA1BC021909B0CAEC608C86629BC3B2' // Pair
    // ],
    // [
    //   // BTC/USDT
    //   '0x84716914C0FDF7110A44030D04D0C4923504D9CC', // BTC
    //   '0xA614F803B6FD780986A42C78EC9C7F77E6DED13C', // USDT
    //   '0xA034E2AC4E914FA5D0A2EE8107D3C1384B51DB1D' // Pair
    // ],
    // [
    //   // BTC/HKMC
    //   '0x68B0AD0B1FB3811BE676B05047A5A43F8170BAC1', // HKMC
    //   '0x84716914C0FDF7110A44030D04D0C4923504D9CC', // BTC
    //   '0x68198BCF82EF0C35E522BEE459D48D6FFF40432F' // Pair
    // ],
    // [
    //   // USDT/HKMC
    //   '0x68B0AD0B1FB3811BE676B05047A5A43F8170BAC1', // HKMC
    //   '0xA614F803B6FD780986A42C78EC9C7F77E6DED13C', // USDT
    //   '0xE844013B3EA22B5773D643786A1FCC9849C88961' // Pair
    // ],
    // [
    //   // BTC/ETH
    //   '0x53908308F4AA220FB10D778B5D1B34489CD6EDFC', // ETH
    //   '0x84716914C0FDF7110A44030D04D0C4923504D9CC', // BTC
    //   '0x6151451BD833836694C5295C5A7AC88389D2374A' // Pair
    // ],
    // [
    //   // TRX/BTC
    //   '0x84716914C0FDF7110A44030D04D0C4923504D9CC', // BTC
    //   '0x891CDB91D149F23B1A45D9C5CA78A88D0CB44C18', // WTRX
    //   '0xE77332FF3BCE27E41396F4FA3C4C87D00B8CE958' // Pair
    // ]
  ]),
  [ChainId.SHASTA]: buildPairAddresses([
    [
      // TRX/USDT
      '0xA73FB788C5A6EF2BDB5FF621BC06F3CC8FF01A2A', // TRX
      '0xD7377F28E13C4B255CD532E8182C0EF0F332E33F', // USDT
      '0x0A5F4F46453AC545250BA305FDEF1D36EF3E8AAB'
    ],
    [
      // TRX/ETH
      '0xA73FB788C5A6EF2BDB5FF621BC06F3CC8FF01A2A', // TRX
      '0x4D59F65BA2D66D80F321E66BE5DF152E71AA302F', // ETH
      '0x385EA972AFF458B32A35A7E9487747DEAF1AF054'
    ],
    [
      // TRX/BTC
      '0xA73FB788C5A6EF2BDB5FF621BC06F3CC8FF01A2A', // TRX
      '0x0B511B28D410B729D9D1502445FC1DAFE3B52810', // BTC
      '0x7FEB8618565CE2085A7C6A03BEDB5BC9A5DFB999'
    ],
    [
      // TRX/HKMC
      '0xA73FB788C5A6EF2BDB5FF621BC06F3CC8FF01A2A', // TRX
      '0x50ED1A4BD6335F1FE3570A4C167EF0A765817F67', // HKMC
      '0x4C6A66126A7B3271DCDC1B07C84AB83EEFD1092B'
    ],
    [
      // HKMC/USDT
      '0x50ED1A4BD6335F1FE3570A4C167EF0A765817F67', // HKMC
      '0xD7377F28E13C4B255CD532E8182C0EF0F332E33F', // USDT
      '0x484809750F039BF7A181C7D9367C46E7914A62D4'
    ],
    [
      // HKMC/ETH
      '0x50ED1A4BD6335F1FE3570A4C167EF0A765817F67', // HKMC
      '0x4D59F65BA2D66D80F321E66BE5DF152E71AA302F', // ETH
      '0x6016298F7AD4426B20485BE35CA289EA01A02AD0'
    ],
    [
      // HKMC/BTC
      '0x50ED1A4BD6335F1FE3570A4C167EF0A765817F67', // HKMC
      '0x0B511B28D410B729D9D1502445FC1DAFE3B52810', // BTC
      '0xF0207A39AB5BB096039B953B9A84AE056A03E9CE'
    ],
    [
      // HKMC/BTC
      '0x0B511B28D410B729D9D1502445FC1DAFE3B52810', // BTC
      '0xD7377F28E13C4B255CD532E8182C0EF0F332E33F', // USDT
      '0x18430F57E0EC53BBB7146572258B46D000328243'
    ],
    [
      // HKMC/BTC
      '0x0B511B28D410B729D9D1502445FC1DAFE3B52810', // BTC
      '0x4D59F65BA2D66D80F321E66BE5DF152E71AA302F', // ETH
      '0x9857C2C3C765140342DA51A7231BE2726A04C96D'
    ],
    [
      // ETH/USDT
      '0x4D59F65BA2D66D80F321E66BE5DF152E71AA302F', // ETH
      '0xD7377F28E13C4B255CD532E8182C0EF0F332E33F', // USDT
      '0x3B7E6AEA4ACF5D7884D847411F23B18C0EA62E39'
    ]
  ])
}

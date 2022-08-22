import { Web3Provider } from '@ethersproject/providers'
import { ChainId, Token, Pair, WETH } from '../src'
import { PAIR_ADDRESSES } from '../src/constants'

import createJavaTronProvider from '@opentron/java-tron-provider'

function getNileProvider() {
  const provider = createJavaTronProvider({ network: 'nile' })
  const library = new Web3Provider(provider)
  return library
}

describe('getAddress', () => {
  const DTKN = new Token(ChainId.NILE, '0x42C142500ff7068f326c01A8F1B3cd8ea7D9377f', 6, 'DTKN', 'Demo Token')
  const UnknownToken = new Token(
    ChainId.NILE,
    '0xDeADBEeF0FF7068f326C01a8F1B3cd8Ea7D9377f',
    12,
    'UTKN',
    'Unknown Token'
  )

  describe('getAddress', () => {
    it('returns the correct address', async () => {
      const tokenA = WETH[ChainId.NILE]
      const tokenB = DTKN
      const addr = Pair.getAddress(tokenA, tokenB)
      expect(addr).toEqual('0x02a6a10E4C7750a7F8dC159b95936B574c211f0D')
    })
    it('returns the correct address (reversed order)', async () => {
      const tokenA = WETH[ChainId.NILE]
      const tokenB = DTKN
      const addr = Pair.getAddress(tokenB, tokenA)
      expect(addr).toEqual('0x02a6a10E4C7750a7F8dC159b95936B574c211f0D')
    })

    xit('throw if pair does not exist', async () => {
      const tokenA = WETH[ChainId.NILE]
      const tokenB = UnknownToken
      expect(() => {
        Pair.getAddress(tokenA, tokenB)
      }).toThrow(/Open an issue at/)
    })

    it('warns if pair does not exist', async () => {
      const tokenA = WETH[ChainId.NILE]
      const tokenB = UnknownToken
      let msg = ''
      let count = 0
      window.alert = (m: string) => {
        count += 1
        msg = m
      }
      const addr = Pair.getAddress(tokenA, tokenB)
      // console.log(msg)
      expect(msg).toMatch(/Unknown pair contract address/)
      expect(addr).toEqual('0xdEADBEeF00000000000000000000000000000000')
      Pair.getAddress(tokenA, tokenB)
      // only warns once
      expect(count).toEqual(1)
    })
  })

  describe('PAIR_ADDRESSES', () => {
    it('looks good', async () => {
      // console.log(PAIR_ADDRESSES[ChainId.NILE]['0x42c142500ff7068f326c01a8f1b3cd8ea7d9377f'])
      expect(
        PAIR_ADDRESSES[ChainId.NILE]['0x42c142500ff7068f326c01a8f1b3cd8ea7d9377f'][
          '0x8f44113a985076431b77f6078f0929f949cb8836'
        ]
      ).toEqual('0x02a6a10E4C7750a7F8dC159b95936B574c211f0D')
    })
  })

  xdescribe('getAddressAsync', () => {
    it('returns the correct address', async () => {
      const provider = getNileProvider()
      const tokenA = WETH[ChainId.NILE]
      const tokenB = DTKN
      const addr = await Pair.getAddressAsync(tokenA, tokenB, provider)
      expect(addr).toEqual('0x02a6a10E4C7750a7F8dC159b95936B574c211f0D')
    }, 10000)
  })
})

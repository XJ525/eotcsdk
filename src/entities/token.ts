import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

// TODO: TRON: deploy WTRX and set contract addresses here
export const WETH = {
  // TODO: TRON: deploy WTRX on mainnet
  [ChainId.MAINNET]: new Token(
    // Deployed by Tron Foundation
    // https://tronscan.io/#/token20/TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR/code
    ChainId.MAINNET,
    '0x891cdb91d149f23b1a45d9c5ca78a88d0cb44c18',
    6,
    'WTRX',
    'Wrapped TRX'
  ),
  [ChainId.NILE]: new Token(ChainId.NILE, '0x8f44113A985076431b77f6078f0929f949cB8836', 6, 'WTRX', 'Wrapped Tron'),
  // TODO(tron): didnt deploy on shasta yet...
  [ChainId.SHASTA]: new Token(ChainId.SHASTA, '0xA73FB788C5A6EF2BDB5FF621BC06F3CC8FF01A2A', 6, 'WTRX', 'Wrapped Tron')
}

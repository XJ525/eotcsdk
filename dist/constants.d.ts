import JSBI from 'jsbi';
export declare type BigintIsh = JSBI | bigint | string;
export declare enum ChainId {
    MAINNET = 11111,
    NILE = 201910292,
    SHASTA = 1
}
export declare enum TradeType {
    EXACT_INPUT = 0,
    EXACT_OUTPUT = 1
}
export declare enum Rounding {
    ROUND_DOWN = 0,
    ROUND_HALF_UP = 1,
    ROUND_UP = 2
}
export declare const INIT_CODE_HASH = "0xf18ab5ba2b2ea93d5f80bbf9f1f4b2ccc8ad443571e6a3af023346a5dd669249";
export declare const MINIMUM_LIQUIDITY: JSBI;
export declare const ZERO: JSBI;
export declare const ONE: JSBI;
export declare const TWO: JSBI;
export declare const THREE: JSBI;
export declare const FIVE: JSBI;
export declare const TEN: JSBI;
export declare const _100: JSBI;
export declare const _997: JSBI;
export declare const _1000: JSBI;
export declare enum SolidityType {
    uint8 = "uint8",
    uint256 = "uint256"
}
export declare const SOLIDITY_TYPE_MAXIMA: {
    uint8: JSBI;
    uint256: JSBI;
};
export declare const FACTORY_ADDRESSES: {
    201910292: string;
    11111: string;
    1: string;
};
interface PairAddresses {
    [token0Address: string]: {
        [token1Address: string]: string;
    };
}
export declare const PAIR_ADDRESSES: {
    [chainId: string]: PairAddresses;
};
export {};

import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  Dai,
  DaiMethodNames,
  DaiEventsContext,
  DaiEvents
>;
export type DaiEvents = 'Approval' | 'LogNote' | 'Transfer';
export interface DaiEventsContext {
  Approval(
    parameters: {
      filter?: { src?: string | string[]; guy?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  LogNote(
    parameters: {
      filter?: {
        sig?: string | number[] | string | number[][];
        usr?: string | string[];
        arg1?: string | number[] | string | number[][];
        arg2?: string | number[] | string | number[][];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Transfer(
    parameters: {
      filter?: { src?: string | string[]; dst?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
}
export type DaiMethodNames =
  | 'new'
  | 'DOMAIN_SEPARATOR'
  | 'PERMIT_TYPEHASH'
  | 'allowance'
  | 'approve'
  | 'balanceOf'
  | 'burn'
  | 'decimals'
  | 'deny'
  | 'mint'
  | 'move'
  | 'name'
  | 'nonces'
  | 'permit'
  | 'pull'
  | 'push'
  | 'rely'
  | 'symbol'
  | 'totalSupply'
  | 'transfer'
  | 'transferFrom'
  | 'version'
  | 'wards';
export interface ApprovalEventEmittedResponse {
  src: string;
  guy: string;
  wad: string;
}
export interface LogNoteEventEmittedResponse {
  sig: string | number[];
  usr: string;
  arg1: string | number[];
  arg2: string | number[];
  data: string | number[];
}
export interface TransferEventEmittedResponse {
  src: string;
  dst: string;
  wad: string;
}
export interface Dai {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param chainId_ Type: uint256, Indexed: false
   */
  'new'(chainId_: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DOMAIN_SEPARATOR(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  PERMIT_TYPEHASH(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  allowance(
    parameter0: string,
    parameter1: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param usr Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  approve(usr: string, wad: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  balanceOf(parameter0: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param usr Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  burn(usr: string, wad: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  decimals(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param guy Type: address, Indexed: false
   */
  deny(guy: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param usr Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  mint(usr: string, wad: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param src Type: address, Indexed: false
   * @param dst Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  move(src: string, dst: string, wad: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  nonces(parameter0: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param holder Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param nonce Type: uint256, Indexed: false
   * @param expiry Type: uint256, Indexed: false
   * @param allowed Type: bool, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  permit(
    holder: string,
    spender: string,
    nonce: string,
    expiry: string,
    allowed: boolean,
    v: string | number,
    r: string | number[],
    s: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param usr Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  pull(usr: string, wad: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param usr Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  push(usr: string, wad: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param guy Type: address, Indexed: false
   */
  rely(guy: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param dst Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  transfer(dst: string, wad: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param src Type: address, Indexed: false
   * @param dst Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  transferFrom(src: string, dst: string, wad: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  version(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  wards(parameter0: string): MethodConstantReturnContext<string>;
}

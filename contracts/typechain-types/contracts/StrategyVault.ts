/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface StrategyVaultInterface extends utils.Interface {
  functions: {
    "checkRebalance()": FunctionFragment;
    "rebalance()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "checkRebalance" | "rebalance"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkRebalance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "rebalance", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "checkRebalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rebalance", data: BytesLike): Result;

  events: {};
}

export interface StrategyVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StrategyVaultInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    checkRebalance(overrides?: CallOverrides): Promise<[boolean]>;

    rebalance(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  checkRebalance(overrides?: CallOverrides): Promise<boolean>;

  rebalance(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    checkRebalance(overrides?: CallOverrides): Promise<boolean>;

    rebalance(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    checkRebalance(overrides?: CallOverrides): Promise<BigNumber>;

    rebalance(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    checkRebalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rebalance(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}

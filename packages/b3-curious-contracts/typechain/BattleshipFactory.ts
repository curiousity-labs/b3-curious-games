/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface BattleshipFactoryInterface extends utils.Interface {
  functions: {
    "battleshipImplAddr()": FunctionFragment;
    "deployAndChallange(address)": FunctionFragment;
    "getGame(uint256)": FunctionFragment;
    "getGames()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "battleshipImplAddr"
      | "deployAndChallange"
      | "getGame"
      | "getGames"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "battleshipImplAddr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deployAndChallange",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getGame",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "getGames", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "battleshipImplAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deployAndChallange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getGame", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getGames", data: BytesLike): Result;

  events: {
    "GameCreated(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GameCreated"): EventFragment;
}

export interface GameCreatedEventObject {
  gameAddress: string;
  gameId: BigNumber;
}
export type GameCreatedEvent = TypedEvent<
  [string, BigNumber],
  GameCreatedEventObject
>;

export type GameCreatedEventFilter = TypedEventFilter<GameCreatedEvent>;

export interface BattleshipFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BattleshipFactoryInterface;

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
    battleshipImplAddr(overrides?: CallOverrides): Promise<[string]>;

    deployAndChallange(
      teamtwo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getGame(
      _gameId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getGames(overrides?: CallOverrides): Promise<[string[]]>;
  };

  battleshipImplAddr(overrides?: CallOverrides): Promise<string>;

  deployAndChallange(
    teamtwo: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getGame(
    _gameId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getGames(overrides?: CallOverrides): Promise<string[]>;

  callStatic: {
    battleshipImplAddr(overrides?: CallOverrides): Promise<string>;

    deployAndChallange(
      teamtwo: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getGame(
      _gameId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getGames(overrides?: CallOverrides): Promise<string[]>;
  };

  filters: {
    "GameCreated(address,uint256)"(
      gameAddress?: null,
      gameId?: null
    ): GameCreatedEventFilter;
    GameCreated(gameAddress?: null, gameId?: null): GameCreatedEventFilter;
  };

  estimateGas: {
    battleshipImplAddr(overrides?: CallOverrides): Promise<BigNumber>;

    deployAndChallange(
      teamtwo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getGame(
      _gameId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getGames(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    battleshipImplAddr(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deployAndChallange(
      teamtwo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getGame(
      _gameId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getGames(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}

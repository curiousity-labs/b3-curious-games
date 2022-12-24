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

export interface BattleshipImplInterface extends utils.Interface {
  functions: {
    "currentTurn()": FunctionFragment;
    "init(address,address)": FunctionFragment;
    "setTeamOnePieces(bytes4[15])": FunctionFragment;
    "setTeamTwoPieces(bytes4[15])": FunctionFragment;
    "takeTurn(bytes4)": FunctionFragment;
    "team1()": FunctionFragment;
    "team2()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "currentTurn"
      | "init"
      | "setTeamOnePieces"
      | "setTeamTwoPieces"
      | "takeTurn"
      | "team1"
      | "team2"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "currentTurn",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "init",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTeamOnePieces",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setTeamTwoPieces",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "takeTurn",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "team1", values?: undefined): string;
  encodeFunctionData(functionFragment: "team2", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "currentTurn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTeamOnePieces",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTeamTwoPieces",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "takeTurn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "team1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "team2", data: BytesLike): Result;

  events: {
    "GameCreated(address,address)": EventFragment;
    "GameFinished(address)": EventFragment;
    "TeamReady(address)": EventFragment;
    "TurnFinished(address,bytes4,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GameCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GameFinished"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TeamReady"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TurnFinished"): EventFragment;
}

export interface GameCreatedEventObject {
  team1: string;
  team2: string;
}
export type GameCreatedEvent = TypedEvent<
  [string, string],
  GameCreatedEventObject
>;

export type GameCreatedEventFilter = TypedEventFilter<GameCreatedEvent>;

export interface GameFinishedEventObject {
  winner: string;
}
export type GameFinishedEvent = TypedEvent<[string], GameFinishedEventObject>;

export type GameFinishedEventFilter = TypedEventFilter<GameFinishedEvent>;

export interface TeamReadyEventObject {
  team: string;
}
export type TeamReadyEvent = TypedEvent<[string], TeamReadyEventObject>;

export type TeamReadyEventFilter = TypedEventFilter<TeamReadyEvent>;

export interface TurnFinishedEventObject {
  team: string;
  target: string;
  isSuccessful: boolean;
}
export type TurnFinishedEvent = TypedEvent<
  [string, string, boolean],
  TurnFinishedEventObject
>;

export type TurnFinishedEventFilter = TypedEventFilter<TurnFinishedEvent>;

export interface BattleshipImpl extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BattleshipImplInterface;

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
    currentTurn(overrides?: CallOverrides): Promise<[string]>;

    init(
      _team1: PromiseOrValue<string>,
      _team2: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTeamOnePieces(
      targets: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTeamTwoPieces(
      targets: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    takeTurn(
      target: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    team1(overrides?: CallOverrides): Promise<[string]>;

    team2(overrides?: CallOverrides): Promise<[string]>;
  };

  currentTurn(overrides?: CallOverrides): Promise<string>;

  init(
    _team1: PromiseOrValue<string>,
    _team2: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTeamOnePieces(
    targets: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTeamTwoPieces(
    targets: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  takeTurn(
    target: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  team1(overrides?: CallOverrides): Promise<string>;

  team2(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    currentTurn(overrides?: CallOverrides): Promise<string>;

    init(
      _team1: PromiseOrValue<string>,
      _team2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTeamOnePieces(
      targets: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setTeamTwoPieces(
      targets: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    takeTurn(
      target: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    team1(overrides?: CallOverrides): Promise<string>;

    team2(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "GameCreated(address,address)"(
      team1?: null,
      team2?: null
    ): GameCreatedEventFilter;
    GameCreated(team1?: null, team2?: null): GameCreatedEventFilter;

    "GameFinished(address)"(winner?: null): GameFinishedEventFilter;
    GameFinished(winner?: null): GameFinishedEventFilter;

    "TeamReady(address)"(team?: null): TeamReadyEventFilter;
    TeamReady(team?: null): TeamReadyEventFilter;

    "TurnFinished(address,bytes4,bool)"(
      team?: null,
      target?: null,
      isSuccessful?: null
    ): TurnFinishedEventFilter;
    TurnFinished(
      team?: null,
      target?: null,
      isSuccessful?: null
    ): TurnFinishedEventFilter;
  };

  estimateGas: {
    currentTurn(overrides?: CallOverrides): Promise<BigNumber>;

    init(
      _team1: PromiseOrValue<string>,
      _team2: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTeamOnePieces(
      targets: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTeamTwoPieces(
      targets: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    takeTurn(
      target: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    team1(overrides?: CallOverrides): Promise<BigNumber>;

    team2(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    currentTurn(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    init(
      _team1: PromiseOrValue<string>,
      _team2: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTeamOnePieces(
      targets: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTeamTwoPieces(
      targets: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    takeTurn(
      target: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    team1(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    team2(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}

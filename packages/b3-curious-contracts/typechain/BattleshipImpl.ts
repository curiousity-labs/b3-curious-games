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
    "game_winner()": FunctionFragment;
    "init(address,address)": FunctionFragment;
    "setTeamOnePieces(bytes4[15])": FunctionFragment;
    "setTeamTwoPieces(bytes4[15])": FunctionFragment;
    "takeTurn(bytes4)": FunctionFragment;
    "teamOne()": FunctionFragment;
    "teamTwo()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "currentTurn"
      | "game_winner"
      | "init"
      | "setTeamOnePieces"
      | "setTeamTwoPieces"
      | "takeTurn"
      | "teamOne"
      | "teamTwo"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "currentTurn",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "game_winner",
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
  encodeFunctionData(functionFragment: "teamOne", values?: undefined): string;
  encodeFunctionData(functionFragment: "teamTwo", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "currentTurn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "game_winner",
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
  decodeFunctionResult(functionFragment: "teamOne", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "teamTwo", data: BytesLike): Result;

  events: {
    "GameFinished(address)": EventFragment;
    "TeamReady(uint256)": EventFragment;
    "TurnFinished(address,bytes4,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GameFinished"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TeamReady"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TurnFinished"): EventFragment;
}

export interface GameFinishedEventObject {
  winner: string;
}
export type GameFinishedEvent = TypedEvent<[string], GameFinishedEventObject>;

export type GameFinishedEventFilter = TypedEventFilter<GameFinishedEvent>;

export interface TeamReadyEventObject {
  teamNumber: BigNumber;
}
export type TeamReadyEvent = TypedEvent<[BigNumber], TeamReadyEventObject>;

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

    game_winner(overrides?: CallOverrides): Promise<[string]>;

    init(
      _teamOne: PromiseOrValue<string>,
      _teamTwo: PromiseOrValue<string>,
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

    teamOne(overrides?: CallOverrides): Promise<[string]>;

    teamTwo(overrides?: CallOverrides): Promise<[string]>;
  };

  currentTurn(overrides?: CallOverrides): Promise<string>;

  game_winner(overrides?: CallOverrides): Promise<string>;

  init(
    _teamOne: PromiseOrValue<string>,
    _teamTwo: PromiseOrValue<string>,
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

  teamOne(overrides?: CallOverrides): Promise<string>;

  teamTwo(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    currentTurn(overrides?: CallOverrides): Promise<string>;

    game_winner(overrides?: CallOverrides): Promise<string>;

    init(
      _teamOne: PromiseOrValue<string>,
      _teamTwo: PromiseOrValue<string>,
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

    teamOne(overrides?: CallOverrides): Promise<string>;

    teamTwo(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "GameFinished(address)"(winner?: null): GameFinishedEventFilter;
    GameFinished(winner?: null): GameFinishedEventFilter;

    "TeamReady(uint256)"(teamNumber?: null): TeamReadyEventFilter;
    TeamReady(teamNumber?: null): TeamReadyEventFilter;

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

    game_winner(overrides?: CallOverrides): Promise<BigNumber>;

    init(
      _teamOne: PromiseOrValue<string>,
      _teamTwo: PromiseOrValue<string>,
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

    teamOne(overrides?: CallOverrides): Promise<BigNumber>;

    teamTwo(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    currentTurn(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    game_winner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    init(
      _teamOne: PromiseOrValue<string>,
      _teamTwo: PromiseOrValue<string>,
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

    teamOne(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    teamTwo(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}

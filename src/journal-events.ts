export interface JournalEvent {
  timestamp: Date
  event: string,
}

export enum CombatRank {
  Harmless = 'Harmless',
  MostlyHarmless = 'Mostly Harmless',
  Novice = 'Novice',
  Competent = 'Competent',
  Expert = 'Expert',
  Master = 'Master',
  Dangerous = 'Dangerous',
  Deadly = 'Deadly',
  Elite = 'Elite',
}

export interface ClearSavedGame extends JournalEvent {
  Name: string,
}

export interface NewCommander extends JournalEvent {
  event: 'NewCommander',
  Name: string,
  Package: string,
}

export interface LoadGame extends JournalEvent {
  event: 'LoadGame',
  Commander: string,
  Ship: string,
  ShipID: string,
  StartLanded?: boolean,
  StartDead?: boolean,
  GameMode: 'Open' | 'Solo' | 'Group',
  Group?: string,
  Credits: number,
  Loan: number,
}

export interface Progress extends JournalEvent {
  event: 'Progress',
  Combat: number,
  Trade: number,
  Explore: number,
  Empire: number,
  Federation: number,
  CQC: number,
}

export interface Rank extends JournalEvent {
  event: 'Rank',
  Combat: number,
  Trade: number,
  Explore: number,
  Empire: number,
  Federation: number,
  CQC: number,
}

export interface Docked extends JournalEvent {
  event: 'Docked',
  StationName: string,
  StationType: string,
  StarSystem: string,
  CockpitBreach?: boolean,
  Faction: string,
  FactionState: string,
  Allegiance: string,
  Economy: string,
  Government: string,
  Security: string,
}

export interface DockingCancelled extends JournalEvent {
  StationName: string,
}

export interface DockingDenied extends JournalEvent {
  StationName: string,
  Reason: 'NoSpace' | 'TooLarge' | 'Hostile' | 'Offenses' | 'Distance' | 'ActiveFighter' | 'NoReason'
}

export interface RedeemVoucher extends JournalEvent {
  Type: 'bounty' | 'CombatBond' | 'settlement' | 'scannable',
  Amount: number,
}

export interface MissionAccepted extends JournalEvent {
  DestinationSystem: string,
}

export interface MissionCompleted extends JournalEvent {
  DestinationSystem: string,
}

export interface CommitCrime extends JournalEvent {
  Bounty?: number,
  Fine?: number,
}

export interface SellExplorationData extends JournalEvent {
  BaseValue: number,
}

export interface MarketSell extends JournalEvent {
  Count: number,
  BlackMarket?: boolean,
}

export interface PvPKill extends JournalEvent {
  readonly Victim: string
  readonly CombatRank: number
}

export interface Died extends JournalEvent {
  readonly KillerName?: string
  readonly KillerRank: CombatRank
  readonly Killers?: WingKiller[]
}

export interface WingKiller {
  readonly Name: string
  readonly Rank: number
}
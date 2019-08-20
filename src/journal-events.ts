export interface JournalEvent {
  timestamp: Date
  event: 'ClearSavedGame' | 'NewCommander' | 'LoadGame' | 'Progress' | 'Rank' | 'Docked',
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

export interface StarSystemEvent extends JournalEvent {
  StarSystem: string
}

export interface RedeemVoucherEvent extends JournalEvent {
  Type: 'bounty' | 'CombatBond' | 'settlement' | 'scannable',
  Amount: number,
}

export interface MissionAcceptedEvent extends JournalEvent {
  DestinationSystem: string,
}

export interface MissionCompletedEvent extends JournalEvent {
  DestinationSystem: string,
}

export interface CommitCrimeEvent extends JournalEvent {
  Bounty?: number,
  Fine?: number,
}

export interface SellExplorationDataEvent extends JournalEvent {
  BaseValue: number,
}

export interface MarketSellEvent extends JournalEvent {
  Count: number,
  BlackMarket?: boolean,
}
interface JournalEvent {
  timestamp: Date
  event: 'ClearSavedGame' | 'NewCommander' | 'LoadGame' | 'Progress' | 'Rank' | 'Docked',
}

interface ClearSavedGame extends JournalEvent {
  Name: string,
}

interface NewCommander extends JournalEvent {
  event: 'NewCommander',
  Name: string,
  Package: string,
}

interface LoadGame extends JournalEvent {
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

interface Progress extends JournalEvent {
  event: 'Progress',
  Combat: number,
  Trade: number,
  Explore: number,
  Empire: number,
  Federation: number,
  CQC: number,
}

interface Rank extends JournalEvent {
  event: 'Rank',
  Combat: number,
  Trade: number,
  Explore: number,
  Empire: number,
  Federation: number,
  CQC: number,
}

interface Docked extends JournalEvent {
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

interface DockingCancelled extends JournalEvent {
  StationName: string,
}

interface DockingDenied extends JournalEvent {
  StationName: string,
  Reason: 'NoSpace' | 'TooLarge' | 'Hostile' | 'Offenses' | 'Distance' | 'ActiveFighter' | 'NoReason'
}
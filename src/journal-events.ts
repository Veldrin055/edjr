interface JournalEvent {
  timestamp: Date
  event: 'ClearSavedGame' | 'NewCommander'
}

interface ClearSavedGame extends JournalEvent {
  Name: string,
}

interface NewCommander extends JournalEvent {
  event: 'NewCommander',
  Name: string,
  Package: string,
}
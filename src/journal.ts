import EventEmitter from 'events';
import { Tail } from 'tail'
import { readJournalDir } from './journal-files'
import { JournalEvent } from './journal-events'

export default class Journal extends EventEmitter {
  private tail?: Tail = undefined

  public scan(backfill = false): void {
    readJournalDir(this, { backfill })
  }

  public startWatching(file: string, opts?: object): void {
    if (this.tail) {
      this.tail.unwatch()
    }
    this.tail = new Tail(file, opts)
    this.tail.watch()
    this.tail.on('line', data => this.readJournalLine(data, false))
  }

  public readJournalLine (data: string, backfill = false): void {
    try {
      if (data) {
        const obj: JournalEvent = JSON.parse(data)
        const timestamp = new Date(obj.timestamp)
        this.emit('*', { ...obj, timestamp }, backfill) 
        this.emit(obj.event, { ...obj, timestamp }, backfill)
      }
    } catch (e) {
      console.error(`Problem with line ${data}`, e)
    }
  }
}


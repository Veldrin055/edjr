import EventEmitter from 'events';
import { Tail } from 'tail'

export default class Journal extends EventEmitter {
  private tail?: Tail = undefined

  startWatching(file: string, opts?: object): void {
    if (this.tail) {
      this.tail.unwatch()
    }
    this.tail = new Tail(file, opts)
    this.tail.watch()
    this.tail.on('line', data => this.readJournalLine(data, false))
  }

  readJournalLine (data: string, backfill = false): void {
    const obj: JournalEvent = JSON.parse(data)
    this.emit(obj.event, { ...obj, timestamp: new Date(obj.timestamp) }, backfill)
  }
}


import EventEmitter from 'events';
import { homedir } from 'os'
import * as path from 'path'
import { Watcher } from 'sane'
import { Tail } from 'tail'
import { JournalEvent } from './journal-events'
import { readJournalDir, watch } from './journal-files'

const journalDir = path.normalize(homedir() + '/Saved Games/Frontier Developments/Elite Dangerous')

export class Journal extends EventEmitter {
  private tail?: Tail = undefined
  private watcher?: Watcher = undefined

  /** Scan a journal dir and start tailing it for new events */
  public async scan({ fromBeginning = false, dir = journalDir }: ScanOptions) {
    const readDir = await readJournalDir(dir,(line) => this.readJournalLine(line, fromBeginning))
    this.watcher = watch(dir, (newPath) => this.startWatching(newPath, { fromBeginning: true }))
    this.startWatching(readDir, { fromBeginning: false})
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

  public stop(done?: () => void) {
    this.removeAllListeners()
    if (this.tail) {
      this.tail.unwatch()
    }
    if (this.watcher) {
      this.watcher.close(done)
    }
  }
}

/** Extra options for scanning */
export interface ScanOptions {
  /** Read all journal files from the beginning. Defaults to false */
  fromBeginning?: boolean,
  /** Optional override path to journal directory */
  dir?: string,
}

import { EventEmitter } from 'events';
import { homedir } from 'os'
import * as path from 'path'
import { Watcher } from 'sane'
import { Tail } from 'tail'
import { JournalEvent } from './journal-events'
import { readJournalDir, watch } from './journal-files'

const journalDir = path.normalize(homedir() + '/Saved Games/Frontier Developments/Elite Dangerous')

export declare interface Journal {
  /**
   * Emitted on a journal log event. 
   * obj: Event payload
   * historical: true if the event is from a pre-existing file when `scan({ fromBegninning: true })` is called
   */ 
  on(eventType: string, callback: (obj: any, historical: boolean) => void): this
}

export class Journal extends EventEmitter {
  private tail?: Tail = undefined
  private watcher?: Watcher = undefined

  /** Scan a journal dir and start tailing it for new events */
  public async scan({ fromBeginning = false, dir = journalDir }: ScanOptions, onFinishedFromBeginning = ()=>{ return }) {

    const watchFileOpts = { useWatchFile: true, fromBeginning: false }

    const readDir = await readJournalDir(dir,(line) => this.readJournalLine(line, fromBeginning))
    this.watcher = watch(dir, (newPath) => this.startWatching(newPath, { ...watchFileOpts, fromBeginning: true }))

    this.startWatching(readDir, { ...watchFileOpts })

    onFinishedFromBeginning()
    
    return Promise.resolve()
  }

  public startWatching(file: string, opts?: object): void {
    if (this.tail) {
      this.tail.unwatch()
    }
    this.tail = new Tail(file, opts)
    this.tail.watch()
    this.tail.on('line', data => this.readJournalLine(data, false))
  }

  public readJournalLine(data: string, backfill = false): void {
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

import chokidar, { FSWatcher } from 'chokidar'
import * as fs from 'fs'
import { homedir } from "os"
import * as path from 'path'
import Journal from "./journal"

const journalDir = path.normalize(homedir() + '/Saved Games/Frontier Developments/Elite Dangerous')

export function readJournalDir(journal: Journal, { dir = journalDir, backfill = false }: ReadJournalOpts) {
  fs.readdir(dir, (err, items) => {
    if (err) {
      console.error(err)
      return
    }
    const logFiles = items.filter(name => path.extname(name) === '.log')
    if (!logFiles) {
      console.error(`Unable to read any log files in ${journalDir}`)
      return
    }
    if (backfill) {
      for (const logfile of logFiles) {
        fs.readFileSync(dir + '/' + logfile, 'utf-8')
        .split('\n')
        .forEach(line => journal.readJournalLine(line, true))
      }
    }
    watch(dir, journal)

    journal.startWatching(journalDir + '/' + logFiles[logFiles.length - 1], { fromBeginning: false })
  })

}

export function watch(dir: string, journal: Journal): FSWatcher {
  const watcher = chokidar.watch(dir, {
    ignoreInitial: true,
    ignored: '^|[\/\\])\../',
    persistent: true,
  })
  watcher.on('add', newPath => {
    if (path.extname(newPath) === '.log') {
      journal.startWatching(newPath, { fromBeginning: true })
    }
  })

  return watcher
}

export interface ReadJournalOpts {
  /** Optional path to journal directory */
  dir?: string,
  /** Read all journal files from the begninning. Defaults to false */
  backfill?: boolean
}


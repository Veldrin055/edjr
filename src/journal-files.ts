import chokidar, { FSWatcher } from 'chokidar'
import * as fs from 'fs'
import * as _ from 'lodash'
import * as path from 'path'

/** Scans a dir for log files, executing the callbackFn on each line. Returns the latest logfile */
export function readJournalDir(dir: string, callbackFn: (str: string) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, items) => {
      if (err) {
        console.error(err)
        reject(err)
      }

      const logFiles = items.filter(name => path.extname(name) === '.log')
      if (_.isEmpty(logFiles)) {
        reject(`Unable to read any log files in ${dir}`)
      }

      for (const logfile of logFiles) {
        fs.readFileSync(dir + '/' + logfile, 'utf-8')
        .split('\n')
        .forEach(line => callbackFn(line))
      }

      resolve(dir + '/' + logFiles[logFiles.length - 1])
    })
  })
}

/** Start watching a dir for new .log files */
export function watch(dir: string, callbackFn: (newPath: string) => void): FSWatcher {
  const watcher = chokidar.watch(dir, {
    ignoreInitial: true,
    ignored: '^|[\/\\])\../',
    persistent: true,
  })
  watcher.on('add', newPath => {
    if (path.extname(newPath) === '.log') {
      callbackFn(newPath)
    }
  })

  return watcher
}

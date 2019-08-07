import Journal from './journal'
import { readJournalDir, watch } from './journal-files'

export default Journal

exports.readJournalDir = readJournalDir
exports.watch = watch 


import * as path from 'path'
import { readJournalDir } from './journal-files'

describe('test file functions', () => {

  it('should read the files', async () => {
    const fn = jest.fn()
    const actual = await readJournalDir(path.normalize('src/__tests__'), fn)
    expect(actual).toBe(path.normalize('src/__tests__') + '/Journal.190807213349.01.log')
    expect(fn).toBeCalledTimes(1576)
  })

  it('should throw exception on dir with no log files', async () => {
    const fn = jest.fn()
    const dir = path.normalize('src/__tests__/empty')
    await expect(readJournalDir(dir, fn))
      .rejects.toEqual(`Unable to read any log files in ${dir}`)
  })
})
import Journal from './journal'
import { NewCommander } from './journal-events'

describe('test events', () => {
  it('should emit an event', (done) => {
    const journal = new Journal()
    const ev: NewCommander = {
      Name: 'New Guy',
      Package: 'ImperialBountyHunter',
      event: 'NewCommander',
      timestamp: new Date('2016-06-10T14:32:03Z'),
    }
    journal.on('NewCommander', (obj: NewCommander, backfill: boolean) => {
      expect(obj).toEqual(ev)
      expect(backfill).toBe(false)
      done()
    })

    journal.readJournalLine('{ "timestamp":"2016-06-10T14:32:03Z", "event":"NewCommander", "Name":"New Guy", "Package":"ImperialBountyHunter" }', false)
  })

  it('should emit an all event', (done) => {
    const journal = new Journal()
    const ev: NewCommander = {
      Name: 'New Guy',
      Package: 'ImperialBountyHunter',
      event: 'NewCommander',
      timestamp: new Date('2016-06-10T14:32:03Z'),
    }
    journal.on('*', (obj: object, backfill: boolean) => {
      expect(obj).toEqual(ev)
      expect(backfill).toBe(false)
      done()
    })

    journal.readJournalLine('{ "timestamp":"2016-06-10T14:32:03Z", "event":"NewCommander", "Name":"New Guy", "Package":"ImperialBountyHunter" }', false)
  })

})
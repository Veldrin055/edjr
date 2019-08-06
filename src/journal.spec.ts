import Journal from './journal'

describe('test events', () => {
  it('should emit an event', (done) => {
    const journal = new Journal()
    const ev: NewCommander = {
      event: 'NewCommander',
      timestamp: new Date('2016-06-10T14:32:03Z'),
      Name: 'New Guy',
      Package: 'ImperialBountyHunter',
    }
    journal.on('NewCommander', (obj: NewCommander, backfill: boolean) => {
      expect(obj).toEqual(ev)
      expect(backfill).toBe(false)
      done()
    })

    journal.readJournalLine('{ "timestamp":"2016-06-10T14:32:03Z", "event":"NewCommander", "Name":"New Guy", "Package":"ImperialBountyHunter" }', false)
  })

})
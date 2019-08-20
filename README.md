# Elite Dangerous Journal Reader
A Typescript package for scanning a CMDR's journal directory and emitting events based on journal log messages.

### Install
For yarn...
```bash
yarn add edjr
```

...or for NPM:
```bash
npm i --save edjr
```

### How to use it
`import` or `require edjr`, create a new instance of `Journal` and then subscribe to the events that you are interested in.
Bye default, it will read the journal files located at the user home, `'~/Saved Games/Frontier Developments/Elite Dangerous'`.
It will begin scanning for new messages on the latest file. If you want to scan from the beginning, pass `{fromBeginning: true}` 
as a parameter to the `scan()` function.

```javascript
import { Journal, SupercruiseEntryEvent, JournalEvent, } from 'edjr'

const journal = new Journal()

// Listen to a specific event
journal.on('SupercruiseEntry', (evnt: SupercruiseEntryEvent) => {
    console.log('entered supercruise', evnt)
})

// Listen to any event
journal.on('*', (evnt: JournalEvent, historical: boolean) => {
  if (!historical) { // Only new events (no backfill if fromBeginning = true)
    console.log(`${evnt.event} just happened`))
  }
}

// Start listening
journal.scan()

/*
entered supercruise { timestamp: 2019-08-06T14:14:24.000Z,
  event: 'SupercruiseEntry',
  StarSystem: 'Kappa Fornacis',
  SystemAddress: 1458309141194 }
entered supercruise { timestamp: 2019-08-07T00:38:43.000Z,
  event: 'SupercruiseEntry',
  StarSystem: 'Eurybia',
  SystemAddress: 1458309141194 }
entered supercruise { timestamp: 2019-08-07T00:41:49.000Z,
  event: 'SupercruiseEntry',
  StarSystem: 'Yo Mama',
  SystemAddress: 1458309141194 }
*/  
```

### Scan Options
```typescript
const scanOptions: ScanOptions = {
  fromBeginning: false,
  dir: "my/journal/dir"
}
```

## To Do
Add more event types.


## Legal Notice
This library is not an official tool for the game Elite: Dangerous and is not affiliated with Frontier Developments. All information provided is based on publicly available information and may not be entirely accurate.

Elite © 1984 David Braben & Ian Bell. Frontier © 1993 David Braben, Frontier: First Encounters © 1995 David Braben and Elite: Dangerous © 2012, 2013 Frontier Developments plc. All rights reserved. 'Elite', the Elite logo, the Elite: Dangerous logo, 'Frontier' and the Frontier logo are registered trademarks of Frontier Developments plc. All rights reserved. All other trademarks and copyright are acknowledged as the property of their respective owners.

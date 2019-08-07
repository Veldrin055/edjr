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
It will begin scanning for new messages on the latest file. If you want to scan from the beginning, pass `true` as a parameter to the `scan()` function.

```javascript
const edjr = require('edjr')

const journal = new edjr.Journal()

// Listen to a specific event
journal.on('SupercruiseEntry', (evnt) => {
    console.log('entered supercruise', evnt)
})

// Listen to any event
journal.on('*', (evnt) => console.log(`${evnt.event} just happened`))

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
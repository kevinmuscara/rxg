# rXg-api-wrapper
Simple wrapper with create, read, update, and delete features that interface with rXg's REST API.

## Install

install the wrapper with node
```shell
npm install rxg
```

## Usage

Show Scaffold by ID
```js
const { rXg } = require('rxg')

let client = new rXg({
  apiKey: 'rxg_api_key'
  domain: 'https://your.rxg.domain'
})

client.show('devices', 'id', 1).then(res => console.log(res))
/** Example Response
[
  {
    id: 1,
    account_id: 1,
    name: 'Example Response',
    mac: '00:11:22:33:44:55',
    ...
  }
]
**/
```

Show Scaffolds
```js
const { rXg } = require('rxg')

let client = new rXg({
  apiKey: 'rxg_api_key'
  domain: 'https://your.rxg.domain'
})

client.list('devices').then(res => console.log(res))
/** Example Response
[
  {
    id: 1,
    account_id: 1,
    name: 'Example Device One',
    mac: '00:11:22:33:44:55'
  },
  {
    id: 2,
    account_id: 2,
    name: 'Example Device Two',
    mac: '66:77:88:99:00:11'
  }...
]
```

Create Scaffold
```js
const { rXg } = require('rxg')

let client = new rXg({
  apiKey: 'rxg_api_key'
  domain: 'https://your.rxg.domain'
})

client.create('devices', 
  {
    'utf8': '✓',
    'record[name]': `Example Device One`,
    'record[mac]': `00:11:22:33:44:55`,
    'record[account]': 1,
    'record[static_ip][name]': '',
    'record[static_ip][public_ip]': '',
    'record[static_ip][note]': '',
    'record[static_ip][accounts][]': '',
    'record[static_ip][devices][]': '',
    'record[static_ip][source_ip]': '',
    'record[binat]': 0,
    'record[hidden_from_portal]': 0,
    'record[note]': '',
    'record[scratch]': '',
    'commit': 'Create'
  }
).then(res => console.log(res))
/** Example Response
{ status: 200 }
**/
```

Update Scaffold
```js
const { rXg } = require('rxg')

let client = new rXg({
  apiKey: 'rxg_api_key'
  domain: 'https://your.rxg.domain'
})

client.update('devices', 1,
  {
    'utf8': '✓',
    'record[name]': `RXGAPITest2`,
    'record[mac]': `00:11:22:33:44:55`,
    'record[account]': 2,
    'record[static_ip][name]': '',
    'record[static_ip][public_ip]': '',
    'record[static_ip][note]': '',
    'record[static_ip][accounts][]': '',
    'record[static_ip][devices][]': '',
    'record[static_ip][source_ip]': '',
    'record[binat]': 0,
    'record[hidden_from_portal]': 0,
    'record[note]': '',
    'record[scratch]': '',
    'commit': 'Create'
  }
).then(res => console.log(res))

/** Example Response
{ status: 200 }
**/

```

Delete Scaffold
```js
const { rXg } = require('rxg')

let client = new rXg({
  apiKey: 'rxg_api_key'
  domain: 'https://your.rxg.domain'
})

client.delete('devices', 1).then(res => console.log(res))

/** Example Response
{ status: 200 }
**/
```
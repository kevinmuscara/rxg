const { rXg } = require('../')

let api = new rXg({ baseURL: 'http://guestcc.jessamine.kyschools.us', apiKey: '1234' })
api.searchDevices({ mac: '00:00:00:00:00:00' })
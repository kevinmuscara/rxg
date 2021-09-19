const { 
  search_Devices,
  create_Device
} = require('./controllers/devicesController')

class rXg {
  constructor(config = {}) {
    console.assert(config, `config parameter not found.`)

    let { baseURL, apiKey } = config
    this.baseURL = baseURL
    this.apiKey = apiKey
  }

  searchDevices = (searchParams) => search_Devices({ host: this.baseURL, apiKey: this.apiKey, ...searchParams })
  createDevice  = (deviceParams) => create_Device({ host: this.baseURL, apiKey: this.apiKey, ...deviceParams })
}

module.exports = { rXg }
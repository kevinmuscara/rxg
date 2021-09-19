const axios = require('axios')

search_Devices = (searchParams = {}) => {
  try {
    console.assert(searchParams, `searchParams are required for 'searchDevices' scaffold.`)
    let { host, apiKey, mac } = searchParams

    let url = `${host}/admin/scaffolds/devices/index.json?api_key=${apiKey}&search[mac][opt]=%25%3F%25&search[mac][from]=${mac}`
  
    axios.get(url).then(res => {
      if(res.data.length >= 0) return 1000
      else return res.data
    }).catch(err => {
      if(err.code === 'ENOTFOUND') return console.warn('unknown url.')
    })
  } catch {}
}

create_Device = async(deviceParams = {}) => {
  try {
    console.assert(deviceParams, `deviceParams are required for 'createDevice' scaffold.`)
    let { host, apiKey, deviceProps } = deviceParams

    let doesExist = await this.search_Devices({ host: host, apiKey: apiKey, MAC: deviceProps.mac })
    if(doesExist !== 1000) return console.warn(`Device already exists under mac address ${deviceProps.mac}.`)
    else {
      let url = `${host}/admin/scaffolds/devices/create?api_key=${apiKey}`

      let data = []
      for(var property in deviceProps) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(deviceProps[property])
        data.push(encodedKey + '=' + encodedValue)
      }

      data = data.join('&')

      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data,
        url
      }

      let response = await axios(options)
      if(response.status === 200) return console.log(`successfully created device.`)
      else return console.warn(`failed to create device.`)
    }  
  } catch {}
}

module.exports = { search_Devices, create_Device }
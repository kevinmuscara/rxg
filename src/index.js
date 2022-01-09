const axios = require('axios')

class rXg {
  constructor(config = {}) {
    console.assert(config, 'Config parameter is required.')

    const { apiKey, domain } = config

    if(domain.startsWith('https://')) {
      this.url = `${domain}/admin/scaffolds`
    } else {
      this.url = `https://${domain}/admin/scaffolds`
    }
    this.apiKey = apiKey
  }

  create = async(table, new_record) => {
    return new Promise(async(resolve, reject) => {
      let data = [];

      for(var prop in new_record) {
        var encodeKey = encodeURIComponent(prop)
        var encodedValue = encodeURIComponent(new_record[prop])
        data.push(encodeKey + '=' + encodedValue)
      }

      data = data.join('&')

      let postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data,
        url: `${this.url}/${table}/create?api_key=${this.apiKey}`
      }

      axios(postOptions).then(async(res) => {
        resolve({ status: res.status})
      })
    })
  }

  update = async(table, id, new_record) => {
    return new Promise(async(resolve, reject) => {
      let data = [];

      for(var prop in new_record) {
        var encodeKey = encodeURIComponent(prop)
        var encodedValue = encodeURIComponent(new_record[prop])
        data.push(encodeKey + '=' + encodedValue)
      }

      data = data.join('&')

      let postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data,
        url: `${this.url}/${table}/update/${id}?api_key=${this.apiKey}`
      }
  
      axios(postOptions).then(async(res) => {
        resolve({ status: res.status })
      })
    })
  }

  delete = async(table, id) => {
    return new Promise(async(resolve, reject) => {
      let postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: `${this.url}/${table}/destroy/${id}?api_key=${this.apiKey}`
      }

      axios(postOptions).then(async(res) => {
        resolve({ status: res.status })
      })
    })
  }

  execute = async(table, request) => {
    return new Promise(async(resolve, reject) => {
      let postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: `${this.url}/${table}/execute?api_key=${this.apiKey}`,
        body: {
          request
        }
      }

      axios(postOptions).then(async(res) => {
        resolve(res.data)
      })
    })
  }

  list = async(table) => {
    return new Promise(async(resolve, reject) => {
      axios.get(`${this.url}/${table}/index.json?api_key=${this.apiKey}`).then(async(res) => {
        resolve(res.data)
      })
    })
  }

  show = (table, object, key) => {
    return new Promise(async(resolve, reject) => {
      await axios.get(`${this.url}/${table}/index.json?api_key=${this.apiKey}&${object}=${key}`).then((res) => {
        resolve(res.data)
      })
    })
  }
}

module.exports = { rXg }
global.fetch = require('isomorphic-fetch')
process.env.BASE_API = process.env.BASE_API || 'http://localhost:3000/api/v1'
process.env.BROWSER = false

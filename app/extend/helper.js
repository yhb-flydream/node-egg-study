const moment = require('moment')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  formatTime(date, format = 'YYYY-MM-DD') {
    return moment(date).format(format)
  },
  getUUID() {
    return uuidv4()
  },
}

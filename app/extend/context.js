module.exports = {
  _baseHandler({ code = 0, msg = 'success', data = '' } = {}) {
    this.body = {
      code,
      msg,
      data,
    }
  },
  _successHandler(data = '') {
    this._baseHandler({ code: 0, msg: 'success', data })
  },
  _errorHandler(data = {}) {
    this._baseHandler(data)
  },
}

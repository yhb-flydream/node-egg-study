const { cartsFormatError } = require('../errorType')

const validator =
  ({ rule, type = '' }, app) =>
  async (ctx, next) => {
    try {
      await ctx.validate(rule, type || ctx.request.body)
    } catch (error) {
      console.error('validator error :>> ', error)
      return ctx._errorHandler({ ...cartsFormatError, data: error.errors })
    }
    await next()
  }

module.exports = {
  validator,
}

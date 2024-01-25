const { goodsFormatError } = require('../errorType')

const validator = (options, app) => async (ctx, next) => {
  try {
    ctx.validate({
      goods_name: { type: 'string', required: true },
      goods_price: { type: 'number', required: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true },
    })
  } catch (error) {
    console.error('validator error :>> ', error)
    return ctx._errorHandler({ ...goodsFormatError, data: error.errors })
  }
  await next()
}

module.exports = {
  validator,
}

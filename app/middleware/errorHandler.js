module.exports = (options, app) => async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.logger.error(ctx.response)

    const status = ctx.status || 500
    const error = status === 500 && ctx.app.config.env === 'prod' ? '服务器异常' : ctx.response.message

    if (ctx.acceptJSON) {
      switch (status) {
        case 404:
          ctx.status = 404
          ctx.body = { code: -1, message: 'Not Found' }
          break
        case 500:
          ctx.status = 500
          ctx.body = { code: -1, message: 'Internal Server Error' }
          break
        default:
          ctx.status = status
          ctx.body = { code: status, message: ctx.error }
      }
    } else {
      await ctx.render('500', { msg: JSON.stringify(error) })
    }
  }
}

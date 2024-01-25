const { tokenExpiredError, tokenInvalid, hasNotAdminPermission } = require('../errorType')

const auth = (options, app) => async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  // console.log('token :>> ', token)

  try {
    const user = await ctx.app.jwt.verify(token, ctx.app.config.jwt.JWT_SECRET)
    ctx.state.user = user
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token 过期 :>> ', error)
        return ctx._errorHandler(tokenExpiredError)
      case 'JsonWebTokenError':
        console.error('token 无效 :>> ', error)
        return ctx._errorHandler(tokenInvalid)
    }
  }
  await next()
}

const hadAdminPermission = (options, app) => async (ctx, next) => {
  console.log('hadAdminPermission user :>> ', ctx.state.user);
  const { is_admin } = ctx.state.user
  if (!is_admin) {
    console.log('is_admin :>> ', ctx.state.user)
    return ctx._errorHandler(hasNotAdminPermission)
  }
  await next()
}

module.exports = {
  auth,
  hadAdminPermission,
}

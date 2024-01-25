const BaseController = require('./base')

const { userRegisterError, userLoginError, userPatchPasswordError } = require('../errorType')

class UsersController extends BaseController {
  async register() {
    const { ctx, service } = this
    const { user_name, password } = ctx.request.body

    try {
      const { id } = await service.users.createUser(user_name, password)
      ctx._successHandler({ id, user_name })
    } catch (error) {
      return ctx._errorHandler(userRegisterError)
    }
  }
  async login() {
    const { ctx, service, app, config } = this
    const { user_name } = ctx.request.body
    try {
      const { password, ...info } = await service.users.getUserInfo({ user_name })
      ctx._successHandler({ token: app.jwt.sign(info, config.jwt.JWT_SECRET, { expiresIn: '1d' }) })
    } catch (error) {
      return ctx._errorHandler(userLoginError)
    }
  }

  async changePassword() {
    const { ctx, service } = this
    const { id } = ctx.state.user
    const { password } = ctx.request.body
    try {
      const res = await service.users.updateUserInfo({ id, password })
      if (!res) return ctx._errorHandler(userPatchPasswordError)
      ctx._successHandler()
    } catch (error) {
      ctx._errorHandler(userPatchPasswordError)
    }
  }
  async logout() {
    ctx._successHandler('logout')
  }
}

module.exports = UsersController

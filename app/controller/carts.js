const BaseController = require('./base')

const { cartsFormatError } = require('../errorType')

class CartsController extends BaseController {
  async add() {
    const { ctx, service } = this
    const { id: user_id } = ctx.state.user
    const { goods_id } = ctx.request.body

    try {
      const res = await service.carts.createOrUpdate(user_id, goods_id)
      ctx._successHandler(res)
    } catch (error) {}
  }
  async findAll() {
    const { ctx, service } = this
    const { pageNum = 1, pageSize = 10 } = ctx.query
    const res = await service.carts.findCarts(pageNum, pageSize)
    ctx._successHandler(res)
  }
  async update() {
    const { ctx, service } = this
    const { id } = ctx.params
    const { number, selected } = ctx.request.body
    if (number === undefined && selected === undefined) {
      let msg = 'number 和 selected 不能同时为空'
      return ctx._errorHandler({ ...cartsFormatError, msg })
    }
    const res = await service.carts.updateCarts({ id, number, selected })
    ctx._successHandler(res)
  }
  async remove() {
    const { ctx, service } = this
    let id = ctx.params.id || ''
    let ids = (ctx.request.body && ctx.request.body.ids) || [] || []
    if (id) ids = [...new Set([...ids, +id])]
    const res = await service.carts.removeCarts(ids)
    ctx._successHandler(res)
  }
  async selectAll() {
    const { ctx, service } = this
    const { id: user_id } = ctx.state.user
    const res = await service.carts.selectAllCarts(user_id)
    ctx._successHandler(res)
  }
  async unSelectAll() {
    const { ctx, service } = this
    const { id: user_id } = ctx.state.user
    const res = await service.carts.unSelectAllCarts(user_id)
    ctx._successHandler(res)
  }
  async toggleSelectAll() {
    const { ctx, service } = this
    const { id: user_id } = ctx.state.user
    const { selected } = ctx.request.body
    const res = await service.carts.toggleSelectAllCarts(user_id, selected)
    ctx._successHandler(res)
  }
  async count() {
    const { ctx, service } = this
    const res = await service.carts.cartsCount()
    ctx._successHandler(res)
  }
}

module.exports = CartsController

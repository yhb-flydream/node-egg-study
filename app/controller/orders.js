const BaseController = require('./base')

class OrdersController extends BaseController {
  async create() {
    const { ctx, service } = this
    const { id: user_id } = ctx.state.user
    const order_number = 'AAA' + Date.now()
    const res = await service.orders.createOrder({
      user_id,
      ...ctx.request.body,
      order_number,
    })
    ctx._successHandler(res)
  }
  async findAll() {
    const { ctx, service } = this
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.query
    const res = await service.orders.findAllOrder({ pageNum, pageSize, status })
    ctx._successHandler(res)
  }
  async update() {
    const { ctx, service } = this
    const { id } = ctx.params
    const { status } = ctx.request.body
    const res = await service.orders.updateOrder(id, status)
    ctx._successHandler(res)
  }
}

module.exports = OrdersController

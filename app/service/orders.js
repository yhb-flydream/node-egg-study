const BaseService = require('./base')

class OrdersService extends BaseService {
  async createOrder(order) {
    return await this.ctx.model.Orders.create(order)
  }
  async findAllOrder({ pageNum, pageSize, status }) {
    const { count, rows } = await this.ctx.model.Orders.findAndCountAll({
      attributes: ['goods_info', 'total', 'order_number', 'status'],
      where: {
        status,
      },
      offset: (pageNum - 1) * pageSize,
      limit: +pageSize,
    })
    return {
      pageNum,
      pageSize,
      total: count,
      data: rows,
    }
  }
  async updateOrder(id, status) {
    return await this.ctx.model.Orders.update({ status }, { where: { id } })
  }
}

module.exports = OrdersService

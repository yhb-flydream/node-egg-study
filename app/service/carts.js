const BaseService = require('./base')

const { Op } = require('sequelize')

class CartsService extends BaseService {
  async createOrUpdate(user_id, goods_id) {
    let res = await this.ctx.model.Carts.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    })
    if (res) {
      await res.increment('number')
      return await res.reload()
    } else {
      return await this.ctx.model.Carts.create({ user_id, goods_id })
    }
  }
  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await this.ctx.model.Carts.findAndCountAll({
      attributes: ['id', 'number', 'selected'],
      offset,
      limit: +pageSize,
      include: {
        model: this.ctx.model.Goods,
        as: 'goods_info',
        attributes: ['id', 'goods_name', 'goods_price', 'goods_img'],
      },
    })
    return {
      total: count,
      pageNum,
      pageSize,
      data: rows,
    }
  }
  async updateCarts({ id, number, selected }) {
    const res = await this.ctx.model.Carts.findByPk(+id)
    if (!res) return ''
    number !== undefined ? (res.number = number) : ''
    selected !== undefined ? (res.selected = selected) : ''
    return await res.save()
  }
  async removeCarts(ids) {
    return await this.ctx.model.Carts.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })
  }
  async selectAllCarts(user_id) {
    return await this.ctx.model.Carts.update(
      { selected: true },
      {
        where: { user_id },
      }
    )
  }
  async unSelectAllCarts(user_id) {
    return await this.ctx.model.Carts.update(
      { selected: false },
      {
        where: { user_id },
      }
    )
  }
  async toggleSelectAllCarts(user_id, selected) {
    return await this.ctx.model.Carts.update(
      {
        selected,
      },
      {
        where: { user_id },
      }
    )
  }
  async cartsCount() {
    return await this.ctx.model.Carts.count()
  }
}

module.exports = CartsService

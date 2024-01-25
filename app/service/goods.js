const BaseService = require('./base')

class GoodsService extends BaseService {
  async createGoods(goods) {
    const res = await this.ctx.model.Goods.create(goods)
    return res.dataValues
  }
  async updateGoods({ id, ...goods }) {
    const whereOpt = { id }

    const res = await this.ctx.model.Goods.update(goods, { where: whereOpt })
    return res[0] > 0
  }
  async removeGoods(id) {
    const res = await this.ctx.model.Goods.destroy({ where: { id } })
    return !!res
  }
  async restoreGoods(id) {
    const res = await this.ctx.model.Goods.restore({ where: { id } })
    return !!res
  }
  async findGoods(pageNum, pageSize) {
    // const count = await this.ctx.model.Goods.count()
    // const offset = (pageNum - 1) * pageSize
    // const rows = await this.ctx.model.Goods.findAll({ offset, limit: +pageSize })

    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await this.ctx.model.Goods.findAndCountAll({ offset, limit: +pageSize })
    return {
      total: count,
      pageNum,
      pageSize,
      list: rows,
    }
  }
}

module.exports = GoodsService

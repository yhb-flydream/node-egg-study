const BaseService = require('./base')

class AddressService extends BaseService {
  async createAddress(address) {
    return await this.ctx.model.Address.create(address)
  }
  async findAllAddress(user_id) {
    return await this.ctx.model.Address.findAll({
      attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
      where: { user_id },
    })
  }
  async updateAddress({ id, ...address }) {
    return await this.ctx.model.Address.update(address, { where: { id } })
  }
  async removeAddress(id) {
    return await this.ctx.model.Address.destroy({ where: { id } })
  }
  async setDefaultAddress(user_id, id) {
    await this.ctx.model.Address.update(
      {
        is_default: false,
      },
      {
        where: { user_id },
      }
    )
    return await this.ctx.model.Address.update(
      {
        is_default: true,
      },
      {
        where: { user_id, id },
      }
    )
  }
}

module.exports = AddressService

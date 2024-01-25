const BaseController = require('./base')

class AddressController extends BaseController {
  async create() {
    const { ctx, service } = this
    const { id: user_id } = ctx.state.user
    const { consignee, phone, address } = ctx.request.body
    const res = await service.address.createAddress({ user_id, consignee, phone, address })
    ctx._successHandler(res)
  }
  async findAll() {
    const { ctx, service } = this
    const { id: user_id } = ctx.state.user
    const res = await service.address.findAllAddress(user_id)
    ctx._successHandler(res)
  }
  async update() {
    const { ctx, service } = this
    const { id } = ctx.params
    const { consignee, phone, address } = ctx.request.body
    const res = await service.address.updateAddress({ id, consignee, phone, address })
    ctx._successHandler(res)
  }
  async remove() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.address.removeAddress(id)
    ctx._successHandler(res)
  }
  async setDefault() {
    const { ctx, service } = this
    const { id: user_id } = ctx.state.user
    const { id } = ctx.params
    const res = await service.address.setDefaultAddress(user_id, id)
    ctx._successHandler(res)
  }
}

module.exports = AddressController

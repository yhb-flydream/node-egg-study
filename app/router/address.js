/**
 * @Router address
 */

module.exports = app => {
  const { router, controller, middleware } = app

  // 添加地址
  router.post(
    '/address/add',
    middleware.auth.auth(),
    middleware.address.validator({
      rule: {
        consignee: 'string',
        phone: {
          type: 'string',
          format: /^1\d{10}$/,
        },
        address: 'string',
      },
    }),
    controller.address.create
  )

  // 地址列表
  router.get('/address/list', middleware.auth.auth(), controller.address.findAll)

  // 更新地址
  router.put(
    '/address/update/:id',
    middleware.auth.auth(),
    middleware.address.validator({
      rule: {
        consignee: 'string',
        phone: {
          type: 'string',
          format: /^1\d{10}$/,
        },
        address: 'string',
      },
    }),
    controller.address.update
  )

  // 删除地址
  router.delete('/address/del/:id', middleware.auth.auth(), controller.address.remove)

  // 设置默认地址
  router.patch('/address/default/:id', middleware.auth.auth(), controller.address.setDefault)
}

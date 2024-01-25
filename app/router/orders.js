/**
 * @Router orders
 */

module.exports = app => {
  const { router, controller, middleware } = app

  // 生成订单
  router.post(
    '/orders/create',
    middleware.auth.auth(),
    middleware.orders.validator({
      rule: {
        address_id: 'string',
        goods_info: 'string',
        total: 'string',
      },
    }),
    controller.orders.create
  )
  // 订单列表
  router.get('/orders/list', middleware.auth.auth(), controller.orders.findAll)
  // 更新订单
  router.patch(
    '/orders/update/:id',
    middleware.auth.auth(),
    middleware.orders.validator({
      rule: {
        status: 'number',
      },
    }),
    controller.orders.update
  )
}

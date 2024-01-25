/**
 * @Router carts
 */

module.exports = app => {
  const { router, controller, middleware } = app

  // 加入购物车
  router.post(
    '/carts/add',
    middleware.auth.auth(),
    middleware.carts.validator({
      rule: { goods_id: 'number' },
    }),
    controller.carts.add
  )

  // 获取购物车列表
  router.get('/carts/list', middleware.auth.auth(), controller.carts.findAll)

  // 更新购物车
  router.patch(
    '/carts/update/:id',
    middleware.auth.auth(),
    middleware.carts.validator({
      rule: {
        number: {
          type: 'number',
          required: false,
        },
        selected: {
          type: 'bool',
          required: false,
        },
      },
    }),
    controller.carts.update
  )

  // 删除商品
  router.delete(
    '/carts/del/:id',
    middleware.auth.auth(),
    middleware.carts.validator({
      rule: {
        ids: { type: 'array', required: false },
      },
    }),
    controller.carts.remove
  )

  // 全选/取消全选
  router.post('/carts/selectAll', middleware.auth.auth(), controller.carts.selectAll)
  router.post('/carts/unSelectAll', middleware.auth.auth(), controller.carts.unSelectAll)
  router.post(
    '/carts/toggleSelectAll',
    middleware.auth.auth(),
    middleware.carts.validator({
      rule: { selected: 'bool' },
    }),
    controller.carts.toggleSelectAll
  )

  // 购物车总数
  router.get('/carts/count', middleware.auth.auth(), controller.carts.count)
}

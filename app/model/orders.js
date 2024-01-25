module.exports = app => {
  const { TEXT, DECIMAL, INTEGER, CHAR, TINYINT } = app.Sequelize

  const Orders = app.model.define('zd_orders', {
    user_id: {
      type: INTEGER,
      allowNull: false,
      comment: '用户 ID',
    },
    address_id: {
      type: INTEGER,
      allowNull: false,
      comment: '地址 ID',
    },
    goods_info: {
      type: TEXT,
      allowNull: false,
      comment: '商品信息',
    },
    total: {
      type: DECIMAL(10, 2),
      allowNull: false,
      comment: '订单总金额',
    },
    order_number: {
      type: CHAR(16),
      allowNull: false,
      comment: '订单号',
    },
    status: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '订单状态（0：未支付，1：已支付，2：已发货，3：已签收，4：取消）',
    },
  })

  // 创建数据表
  // Order.sync({ force: true })

  return Orders
}

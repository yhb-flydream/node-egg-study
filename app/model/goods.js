module.exports = app => {
  const { STRING, DECIMAL, INTEGER } = app.Sequelize

  const Goods = app.model.define(
    'zs_goods',
    {
      goods_name: {
        type: STRING,
        allowNull: false,
        comment: '商品名称',
      },
      goods_price: {
        type: DECIMAL(10, 2),
        allowNull: false,
        comment: '商品价格',
      },
      goods_num: {
        type: INTEGER,
        allowNull: false,
        comment: '商品数量',
      },
      goods_img: {
        type: STRING,
        allowNull: false,
        comment: '商品图片',
      },
    },
    {
      paranoid: true,
    }
  )

  // 创建数据表
  // Goods.sync({ force: true })

  return Goods
}

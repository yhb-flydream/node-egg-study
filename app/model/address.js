module.exports = app => {
  const { STRING, CHAR, INTEGER, BOOLEAN } = app.Sequelize

  const Address = app.model.define('zd_addresses', {
    user_id: {
      type: INTEGER,
      allowNull: false,
      comment: '用户 ID',
    },
    consignee: {
      type: STRING,
      allowNull: false,
      comment: '收件人',
    },
    phone: {
      type: CHAR(11),
      allowNull: false,
      comment: '手机号',
    },
    address: {
      type: STRING,
      allowNull: false,
      comment: '地址',
    },
    is_default: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否为默认地址，0：不是（默认），1：是',
    },
  })

  // 创建数据表
  // Addr.sync({ force: true })

  return Address
}

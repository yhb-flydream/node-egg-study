module.exports = app => {
  const { STRING, CHAR, BOOLEAN } = app.Sequelize

  const Users = app.model.define('zd_users', {
    // id 会被自动创建
    user_name: {
      type: STRING,
      allowNull: false,
      unique: true,
      comment: '用户名，唯一',
    },
    password: {
      type: CHAR(64),
      allowNull: false,
      comment: '密码',
    },
    is_admin: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '是否为管理员，0：不是管理员（默认），1：是管理员',
    },
  })

  // 创建数据表
  // Users.sync({ force: true })

  return Users
}

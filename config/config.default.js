/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1705901615116_8716'

  // add your middleware config here
  config.middleware = [] // 'errorHandler'

  // mysql
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '````````',
      database: 'jiegeketang_db',
    },
  }

  // swagger
  // config.swaggerdoc = {
  //   dirScanner: './app/controller', // 配置自动扫描的控制器的目录
  //   // 接口文档的标题，描述或其他
  //   apiInfo: {
  //     title: 'Render',
  //     description: 'swagger-ui for Render document',
  //     version: '1.0.0', // 版本
  //   },
  //   schemes: ['http', 'https'], // 支持的协议
  //   consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
  //   produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
  //   // 配置接口安全授权方式
  //   securityDefinitions: {},
  //   enableSecurity: false, // 是否启用授权，默认 false 不启用
  //   // enableValidate: true, // 是否启用参数校验，默认 true 启用
  //   routerMap: true, // 是否启用自动生成路由，默认 true 启用
  //   enable: true,
  // }

  // jwt
  config.jwt = {
    JWT_SECRET: '123456',
  }

  // cors
  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,POST,PUT,DELETE,UPDATE,HEAD,OPTIONS',
  }

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  }

  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '````````',
    database: 'jiegeketang_db',
    timezone: '+08:00',
    define: {
      // timestamps: true, // 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段.
      // freezeTableName: false, // 强制表名称等于模型名称（默认情况下,当未提供表名时,Sequelize 会自动将模型名复数并将其用作表名.）
    },
  }

  // validate
  config.validate = {
    convert: true, // 对参数可以使用 convertType 规则进行类型转换
    widelyUndefined: true, // 限制被验证值必须是一个对象
  }

  // 上传文件
  config.multipart = {
    mode: 'file',
  }

  // cluster 在 npm start 情况下生效
  // config.cluster = {
  //   listen: {
  //     path: '',
  //     port: 3000,
  //     hostname: '127.0.0.1',
  //   },
  // }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}

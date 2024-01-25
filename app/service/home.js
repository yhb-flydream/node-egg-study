const { Service } = require('egg')

class HomeService extends Service {
  async index() {
    // console.log('object :>> ', this.app.mysql);
    // return await this.app.mysql.query('select * from users2', '')
    // return await this.app.mysql.select('users2')
    // return await this.app.model.User.findAll()
    return 'hi, egg'
  }
}

module.exports = HomeService

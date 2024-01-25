const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    ctx.body = await service.home.index();
  }
}

module.exports = HomeController;

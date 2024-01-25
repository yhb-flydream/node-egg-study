/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  require('./router/users')(app)
  require('./router/address')(app)
  require('./router/carts')(app)
  require('./router/goods')(app)
  require('./router/orders')(app)
}

const path = require('path')
const fs = require('fs')
const BaseController = require('./base')

const { fileUploadError, goodsCreateError, goodsIdError, goodsUpdateError, goodsRemoveError, goodsRestoreError } = require('../errorType')

class GoodsController extends BaseController {
  async upload() {
    const { ctx } = this
    const file = ctx.request.files[0]
    // console.log('file :>> ', file)
    const fileData = await fs.readFileSync(file.filepath)
    const base64Str = Buffer.from(fileData, 'binary').toString('base64')
    const bufferData = Buffer.from(base64Str, 'base64')
    // 获取当前日期，用于文件夹创建
    const dirName = ctx.helper.formatTime(new Date())
    // 指定上传路径
    const uploadBasePath = '../public/uploadForFile'
    // 文件重命名
    const filename = `${ctx.helper.getUUID()}${path.extname(file.filename)}`
    const dir = path.join(__dirname, uploadBasePath, dirName)
    const src = path.join(__dirname, uploadBasePath, dirName, filename)
    // 判断是否存在该文件夹，不存在则创建。
    if (!(await fs.existsSync(dir))) await fs.mkdirSync(dir)
    try {
      await fs.writeFileSync(src, bufferData)
      ctx._successHandler({
        filename,
        url: `/public/uploadForFile/${dirName}/${filename}`,
      })
    } catch (e) {
      ctx._errorHandler(fileUploadError)
    } finally {
      await fs.unlinkSync(file.filepath)
    }
  }
  async create() {
    const { ctx, service } = this
    try {
      const { createdAt, updatedAt, ...res } = await service.goods.createGoods(ctx.request.body)
      ctx._successHandler(res)
    } catch (error) {
      ctx._errorHandler(goodsCreateError)
    }
  }
  async update() {
    const { ctx, service } = this
    try {
      const res = await service.goods.updateGoods({ ...ctx.request.body, id: ctx.params.id })
      if (!res) return ctx._errorHandler(goodsIdError)
      ctx._successHandler()
    } catch (error) {
      ctx._errorHandler(goodsUpdateError)
    }
  }
  async remove() {
    const { ctx, service } = this
    try {
      const res = await service.goods.removeGoods(ctx.params.id)
      if (!res) return ctx._errorHandler(goodsIdError)
      ctx._successHandler()
    } catch (error) {
      ctx._errorHandler(goodsRemoveError)
    }
  }
  async restore() {
    const { ctx, service } = this
    try {
      const res = await service.goods.restoreGoods(ctx.params.id)
      if (!res) return ctx._errorHandler(goodsIdError)
      ctx._successHandler()
    } catch (error) {
      ctx._errorHandler(goodsRestoreError)
    }
  }
  async findAll() {
    const { ctx, service } = this
    const { pageNum = 1, pageSize = 10 } = ctx.query
    const res = await service.goods.findGoods(pageNum, pageSize)
    ctx._successHandler(res)
  }
}

module.exports = GoodsController

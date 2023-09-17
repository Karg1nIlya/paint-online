const Router = require('express').Router
const router = new Router()
const paintController = require('./controllers/paint-controller')

router.post('/image', paintController.setImage)
router.get('/image', paintController.getImage)

module.exports = router

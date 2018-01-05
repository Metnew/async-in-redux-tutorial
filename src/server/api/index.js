import {Router} from 'express'
const router = Router()

router.get('/data', (req, res) => {
	res.send({ok: 'You received this data from server!'})
})

export default router

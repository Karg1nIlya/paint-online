const fs = require('fs')
const path = require('path')

class paintController {

    setImage(req, res) {
        try {
            // console.log(path.resolve(__dirname.replace('\controllers', '')))
            const data = req.body.img.replace(`data:image/png;base64,`, '')
            fs.writeFileSync(path.resolve(__dirname.replace('\controllers', ''), 'files', `${req.query.id}.jpg`), data, 'base64')
            return res.status(200).json({message: 'Download success'})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    getImage(req, res) {
        try {
            const file = fs.readFileSync(path.resolve(__dirname.replace('\controllers', ''), 'files', `${req.query.id}.jpg`))
            const data = `data:image/png;base64,` + file.toString('base64')
            res.json(data)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}


module.exports = new paintController()
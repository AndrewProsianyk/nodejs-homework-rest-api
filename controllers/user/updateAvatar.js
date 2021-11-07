const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../models')
const Jimp = require('jimp')

const updateAvatar = async (req, res, next) => {
    const { _id } = req.user
    const { path: tempDir, originalname } = req.file

    await Jimp.read(tempDir)
        .then(data => {
            return data.resize(250, 250).write(tempDir)
        })
        .catch(err => {
            console.error(err)
        })

    const [extension] = originalname.split('.').reverse()
    const filename = `${_id}.${extension}`
    const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename)

    try {
        await fs.rename(tempDir, uploadDir)
        const image = path.join('avatars', filename)
        await User.findByIdAndUpdate(_id, { avatarURL: image })
        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Success update avatar',
            data: {
                avatarURL: uploadDir
            }
        })
    } catch (error) {
        await fs.unlink(tempDir)
        next(error)
    }
}

module.exports = updateAvatar
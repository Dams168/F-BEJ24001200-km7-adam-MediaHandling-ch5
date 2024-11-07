const imagekit = require("../libs/imagekit");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class mediaController {

    static async uploadImage(req, res) {
        try {
            const { title, description } = req.body;

            if (!title || !description) {
                return res.status(400).json({
                    status: 'error',
                    message: 'title and description harus diisi'
                });
            }

            const stringFile = req.file.buffer.toString('base64');
            // console.log(stringFile);
            const uploadImage = await imagekit.upload({
                fileName: req.file.originalname,
                file: stringFile
            });

            const result = await prisma.image.create({
                data: {
                    title,
                    description,
                    imageUrl: uploadImage.url,
                    imageFileId: uploadImage.fileId
                }
            })

            res.status(201).json({
                status: 'success',
                message: 'upload image success',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = mediaController;
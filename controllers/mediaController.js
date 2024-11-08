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

    static async updateImage(req, res) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const file = req.file;

            if (!title || !description) {
                return res.status(400).json({
                    status: 'error',
                    message: 'title and description harus diisi'
                });
            }
            if (!file) {
                return res.status(400).json({
                    status: 'error',
                    message: 'file harus diisi'
                });
            }
            // console.log(file);

            const image = await prisma.image.findUnique({
                where: {
                    id: Number(id)
                }
            });

            if (!image) {
                return res.status(404).json({
                    status: 'error',
                    message: 'image not found'
                });
            }

            const stringFile = file.buffer.toString('base64');

            const deleteImage = await imagekit.deleteFile(image.imageFileId);
            // console.log(deleteImage);

            const updateImage = await imagekit.upload({
                fileName: file.originalname,
                file: stringFile
            });

            const result = await prisma.image.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title,
                    description,
                    imageUrl: updateImage.url,
                    imageFileId: updateImage.fileId
                }
            });

            res.status(200).json({
                status: 'success',
                message: 'update image success',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }

    }

    static async deleteImage(req, res) {
        try {
            const { id } = req.params;

            const image = await prisma.image.findUnique({
                where: {
                    id: Number(id)
                }
            });

            if (!image) {
                return res.status(404).json({
                    status: 'error',
                    message: 'image not found'
                });
            }

            const deleteImage = await imagekit.deleteFile(image.imageFileId);

            const result = await prisma.image.delete({
                where: {
                    id: Number(id)
                }
            });

            res.status(200).json({
                status: 'success',
                message: 'delete image success',
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
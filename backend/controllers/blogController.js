import fs from 'fs'
import imagekit from '../config/imageKit.js';
import Blog from '../models/Blog.js';

export const addBlog = async(req, res) => {
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if(!title || !description  || !category || !imageFile){
            return res.json({
                success: false,
                message: "Missing required fields"
            })
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        
        //uploading image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        //url transformation through image optimization
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, //auto compression of image file
                {format: 'webp'},  //conversion to mordern format
                {width: '1280'}   //width resizing
            ]
        })

        const image = optimizedImageUrl;
        
        await Blog.create({title, subTitle, description, category, image, isPublished})

        res.json({
            success: true,
            message: "Blog added successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
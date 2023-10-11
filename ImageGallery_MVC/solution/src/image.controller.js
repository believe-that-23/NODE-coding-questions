import multer from 'multer';
import path from 'path';
import Image from './image.model.js';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads/');
    },
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        callback(null, filename);
    }
});

const upload = multer({ storage: storage });

const images = [];

function saveImage(file, description) {
    const image = new Image(file.filename, description);
    images.push(image);
    return image;
}

export { upload, saveImage, images };


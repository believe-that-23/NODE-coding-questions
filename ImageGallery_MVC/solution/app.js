import express from 'express';
import { upload, saveImage, images } from './src/image.controller.js';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('gallery', { images });
});

app.post('/upload', upload.single('file'), (req, res) => {
    const description = req.body.description || 'No Description';
    const image = saveImage(req.file, description);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


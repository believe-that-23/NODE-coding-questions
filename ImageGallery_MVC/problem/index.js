// make necessary imports here

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));


// the below function redirects to the '/' route to view the images. Implement the below function.
app.get('/', (req, res) => {});

// implement the below post route to send images with description
app.post('/upload',);

export default app;
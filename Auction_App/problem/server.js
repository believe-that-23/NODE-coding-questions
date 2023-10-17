import { connectToDatabase } from './db.config.js';

server.listen(3000, () => {
    console.log('Server is running on port 3000');
    connectToDatabase();
});

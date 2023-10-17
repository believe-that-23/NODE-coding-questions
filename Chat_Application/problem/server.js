import app from './index.js';

import { connectUsingMongoose } from './src/config/db.config.js';



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectUsingMongoose();
});


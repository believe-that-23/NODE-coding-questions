import connectDB from "./src/configs/db.js";
import server from "./index.js";

let port = 3000;

server.listen(port, async function (err) {
  if (err) console.log(`Error in running the server: ${err}`);
  else {
    console.log("Server is up and listening on port " + port);
    await connectDB();
  }
});

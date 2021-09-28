const mongoose = require('mongoose')
const path = require('path')
const app = require('../app');
require('dotenv').config();
const { createFolderIsNotExist } = require('../middlewares')

const { DB_HOST, PORT = 3000, AVATAR_OF_USERS, UPLOAD_DIR } = process.env

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
  console.log('Database connection successful')
    app.listen(PORT,async () => {
      await createFolderIsNotExist(UPLOAD_DIR);
      await createFolderIsNotExist(AVATAR_OF_USERS);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(error => {
  console.log(`Error: ${error.message}`)
  process.exit(1)
});
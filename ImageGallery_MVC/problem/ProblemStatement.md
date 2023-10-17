## Title: Image Uploading and Gallery Web App

### Introduction + Scenario:
You are tasked with building a web application that enables users to upload images along with descriptions. The app leverages Multer for handling multipart form data and saves the images to the 'public/uploads' folder. Users can view the uploaded images in a gallery.

### Objectives:

- Implement a web application using Express.js to handle image uploads and gallery display.
- Utilize Multer for parsing multipart form data and saving image files to the 'public/uploads' directory.
- Create a route for displaying the uploaded images in a gallery format.
- Implement a feature that allows users to provide descriptions when uploading images.
- Ensure that the app correctly redirects after image uploads.
- Enhance the gallery display to show both the uploaded images and their associated descriptions.

### Expected Output:

The output should look like: 

### Notes/Hints:

- You need to do the changes in image.controller.js and index.js files only.
- Pay close attention to file path handling for image uploads and serving them in the gallery.
- Use appropriate status codes for redirects (e.g., 302 for temporary redirection).
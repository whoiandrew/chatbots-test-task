# chatbots-test-task
## Test task for chatbots.studio
#### API doc:
* POST /upload/dog/image
  * takes __height__ and __width__ params in request body as values for resizing a source image
  * generates an image via [API](https://random.dog/woof.json)
  * asks DB (PostgreSQL) to store resized image with additional data
* GET /list/dog/images
  * takes __height__ and __width__ params in query string (for the purpose of filtering can be passed at least 1 param, query with no params returns all the images)
  * retrieves images from storage

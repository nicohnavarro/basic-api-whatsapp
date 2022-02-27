# Node.js API Post | TypeScript, Express And MongoDB

# To test the build

clone this project into a local directory and run `npm install` to load dependencies.

Replace .env-example with .env and add a MONGO_DB path, user, password

Run `npm start` to run the app.

Use PostMan or Insomnia to create a post at: `http://localhost:<3000>/api/posts`
Post must contain a title and body

Example:
`{ "title": "Test Title 3", "body": "Test blog post body for third post. Different password." }`

### Sample success response

`{ "post": { "title": "Test Title 3", "body": "Test blog post body for third post. Different password.", "\_id": "61f4ac21f8a0215b70838280", "createdAt": "2022-01-29T02:53:21.632Z", "updatedAt": "2022-01-29T02:53:21.632Z", "\_\_v": 0 } }`

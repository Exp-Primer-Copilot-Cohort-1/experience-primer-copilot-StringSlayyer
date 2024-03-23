// Create web server
// Create a web server
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parse the query string
  const query = url.parse(req.url, true).query;

  if (req.url === '/comments') {
    // Read the comments from the file
    fs.readFile('comments.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Server Error');
        return;
      }

      // Parse the JSON string into an object
      const comments = JSON.parse(data);

      // Send the comments as a JSON string
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(comments));
    });
  } else if (req.url === '/add-comment') {
    // Read the comments from the file
    fs.readFile('comments.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Server Error');
        return;
      }

      // Parse the JSON string into an object
      const comments = JSON.parse(data);

      // Add the new comment to the array
      comments.push({
        name: query.name,
        message: query.message,
      });

      // Write the comments back to the file
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Server Error');
          return;
        }

        // Send the comments as a JSON string
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
// We can now run the server with the following command:
// node comments.js
// This will start the server on http://localhost:3000.
// We can now test the server by making requests to http://localhost:3000/comments to get the comments and http://localhost:3000/add-comment?name=John&message=Hello to add
/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.send("this is /todos route");
})

app.get('todos/:id', (req, res) => {
  res.send("this is /todos/:id route");
})

app.post('/todos', (req, res) => {
  let receivedBody = req.body;
  let id = uuidv4();

  const todo = {
    id: id,
    title: receivedBody.title,
    status: receivedBody.status,
    description: receivedBody.description
  }
  todos.push(todo);
})

app.put('/todos/:id', (req, res) => {
  res.send('this is /todos/:id route for post type');
})

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  for(let i = 0; i< todos.length; i++) {
    if(todos[i].id == id) {
      todos = todos.splice(i, 1);
    }
  }
})

app.get('*', (req, res) => {
  res.status(404).send("Requested route not found");
})

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
})

module.exports = app;

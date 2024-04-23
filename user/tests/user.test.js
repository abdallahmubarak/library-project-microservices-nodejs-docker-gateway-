
const app = require("../index");
const User = require("../models/user.models");
const mongoose = require("mongoose");
const db =require('../config/dbUserConnection')
const supertest = require("supertest");
const request = supertest(app)

//test get all users Endpoint
describe('GET /users', async() => {
  it('should return all users', async () => {
    const response = await request(app).get('/user/users'); 
    expect(response.statusCode).toBe(200);
    
    });
})


describe("GET /users/:id", async () => {
 it('should return user',async () => {
  const user = await User.create({ name: "abdallah mubarak", email: "abdallahmubarak55@gmail.com" });
  await Request.get("/user/users" + user.id)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(user.id);
      expect(response.body.name).toBe(user.name);
      expect(response.body.email).toBe(user.email);
    });
});

 })
  

//----------------------------------------------------------
/*
test("POST /api/posts", async () => {
  const data = { title: "Post 1", content: "Lorem ipsum" };

  await supertest(app).post("/api/posts")
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.title).toBe(data.title);
      expect(response.body.content).toBe(data.content);

      // Check data in the database
      const post = await Post.findOne({ _id: response.body._id });
      expect(post).toBeTruthy();
      expect(post.title).toBe(data.title);
      expect(post.content).toBe(data.content);
    });
});

test("PATCH /api/posts/:id", async () => {
  const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });

  const data = { title: "New title", content: "dolor sit amet" };

  await supertest(app).patch("/api/posts/" + post.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body._id).toBe(post.id);
      expect(response.body.title).toBe(data.title);
      expect(response.body.content).toBe(data.content);

      // Check the data in the database
      const newPost = await Post.findOne({ _id: response.body._id });
      expect(newPost).toBeTruthy();
      expect(newPost.title).toBe(data.title);
      expect(newPost.content).toBe(data.content);
    });
});

test("DELETE /api/posts/:id", async () => {
  const post = await Post.create({
    title: "Post 1",
    content: "Lorem ipsum",
  });

  await supertest(app)
    .delete("/api/posts/" + post.id)
    .expect(204)
    .then(async () => {
      expect(await Post.findOne({ _id: post.id })).toBeFalsy();
    });
});
*/
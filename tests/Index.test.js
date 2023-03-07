import request from "supertest";
import app from "../src/app.js";
import {createBlog} from "./blog.mocks/createBlog.js";
import {signUpdata} from "./user.mocks/userSignup.js";
import {invalidUsercredentilas, validUserCredentials} from "./user.mocks/userLogin.js";
import {createMessage} from "./message.mocks/sendMessage.js";

let userToken = '';
let blogId = '';
describe('My brand Api Test', () =>{

    test('Signup with fully Data', async() => {
        const response = await request(app)
            .post('/api/v1/signup')
            .send(signUpdata);
        expect(response.statusCode).toBe(201);
    })
    test('Login with valid credentials', async() => {
        const response = await request(app)
            .post('/api/v1/login')
            .send(validUserCredentials);
        expect(response.statusCode).toBe(200);
        const cookies = response.headers['set-cookie'];
        const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
        const token = tokenCookie.split(';')[0].split('=')[1];
        userToken = token;
    })

    test('Login with invalid credentials' ,async () => {
        const response=await request(app)
            .post('/api/v1/login')
            .send(invalidUsercredentilas);
        expect(response.statusCode).toBe(400);
    })
    test('Add new Blog for authorized user', async() => {
        const response = await request(app)
            .post('/api/v1/blogs')
            .send(createBlog)
            .set('Cookie', `token=${userToken}`)
        expect(response.statusCode).toBe(201);
        const createdBlog = response.body.data;
        blogId = createdBlog._id;
    })
    test('Add new Blog for unauthorized user', async() => {
        const response = await request(app)
            .post('/api/v1/blogs/')
            .send(createBlog);
        expect(response.statusCode).toBe(401);
    })

    test('Update one blog', async() => {
        const response = await request(app)
            .put(`/api/v1/blogs/${blogId}`)
            .set('Cookie', `token=${userToken}`)
        expect(response.statusCode).toBe(200);
    })
    test('Get all blogs', async() => {
        const response = await request(app)
            .get('/api/v1/blogs')
        expect(response.statusCode).toBe(200);
    })
    test('Delete one blog', async() => {
        const response = await request(app)
            .delete(`/api/v1/blogs/${blogId}`)
            .set('Cookie', `token=${userToken}`)
        expect(response.statusCode).toBe(200);
    })

    test('Send message', async() => {
        const response = await request(app)
            .post('/api/v1/message')
            .send(createMessage);
        expect(response.statusCode).toBe(201);
    })
    test('get messages for authorized user', async() => {
        const response = await request(app)
            .get('/api/v1/message')
            .set('Cookie', `token=${userToken}`)
        expect(response.statusCode).toBe(200);
    })

})
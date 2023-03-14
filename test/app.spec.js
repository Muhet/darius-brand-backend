import app from "../src/app.js";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

describe("Blog API", () => {
  // Test the GET /api/blogs route
  describe("GET /blogs", () => {
    it("should return all blogs", (done) => {
      chai
        .request(app)
        .get("/blogs")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  // Test the GET /api/blogs/:id route
  describe("GET /blogs/:id", () => {
    it("should return a single blog", (done) => {
      const blogId = "put an existing blog id here";
      chai
        .request(app)
        .get(`/blogs/${blogId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("category");
          res.body.should.have.property("image");
          res.body.should.have.property("description");
          res.body.should.have.property("_id").eql(blogId);
          done();
        });
    });
  });

  // Test the POST /api/blogs/create route
  describe("POST /blogs/create", () => {
    it("should create a new blog", (done) => {
      const newBlog = {
        title: "Test blog",
        category: "Test category",
        image: "test-image.png",
        description: "Test description",
      };
      chai
        .request(app)
        .post("/blogs/create")
        .send(newBlog)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("title").eql("Test blog");
          res.body.should.have.property("category").eql("Test category");
          res.body.should.have.property("image").eql("test-image.png");
          res.body.should.have.property("description").eql("Test description");
          done();
        });
    });
  });

  // Test the PUT /api/blogs/update/:id route
  describe("PUT /api/blogs/update/:id", () => {
    it("should update an existing blog", (done) => {
      const blogId = "put an existing blog id here";
      const updatedBlog = {
        title: "Updated test blog",
        category: "Updated test category",
        image: "updated-test-image.png",
        description: "Updated test description",
      };
      chai
        .request(app)
        .put(`/blogs/update/${blogId}`)
        .send(updatedBlog)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("title").eql("Updated test blog");
          res.body.should.have.property("category").eql("Updated test category");
          res.body.should.have.property("image").eql("test-image.png");
          res.body.should.have.property("description").eql("Test description");
          done();
        });
    });
  });
});
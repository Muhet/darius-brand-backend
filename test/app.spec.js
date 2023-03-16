import app from "../src/app.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import assert from "assert";

chai.use(chaiHttp);
chai.should();

describe("Blog API", () => {

  const newBlog = {
    title: "Test blog",
    category: "Test category",
    image: "test-image.png",
    description: "Test description",
  };
  // Test the GET /api/blogs route
  describe("GET /api/blogs", () => {
    it("should return all blogs", (done) => {
      chai
        .request(app)
        .get("/api/blogs")
        .end((err, res) => {
          expect(res).to.have.status(200);
          /* console.log(res.body['data']); */
          done();
        });
    });
  });

  // Test the GET /api/blogs/:id route
  describe("GET /api/blog/:id", () => {

    it("should return a single blog", (done) => {
      const blogId = "64111c016a32f8c3fc43e58b";
      chai
        .request(app)
        .get(`/api/blog/${blogId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          res.body.data['title'];
          res.body.data['category'];
          res.body.data['image'];
          res.body.data['description'];
          res.body.data['createdAt'];
          done();
        });
    });
  });

  // Test the POST /api/blogs/create route
  describe("POST /api/blogs/create", () => {
    it("should create a new blog", (done) => {
      const newBlog = {
        title: "Test blog",
        category: "Test category",
        image: "test-image.png",
        description: "Test description",
      };
      chai
        .request(app)
        .post("/api/blogs/create")
        .send(newBlog)

        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.data[0]).to.have.property('title').eql('Test blog');
          expect(res.body.data[0]).to.have.property('category').eql('Test category');
          expect(res.body.data[0]).to.have.property('image').eql('test-image.png');
          expect(res.body.data[0]).to.have.property('description').eql('Test description');
          newBlog._id = res.body.data[0]._id;
          done();
        });
    });
  });

  // Test the PUT /api/blogs/update/:id route
  describe("PUT /api/blog/update/:id", () => {
    it("should update an existing blog", (done) => {
      const blogId = "64111c016a32f8c3fc43e58b";
      const updatedBlog = {
        title: "Updated test blog",
        category: "Updated test category",
        image: "updated-test-image.png",
        description: "Updated test description",
      };
      chai
        .request(app)
        .put(`/api/blog/update/${blogId}`)
        .send(updatedBlog)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");

          expect(res.body.data).to.have.property('title').eql('Updated test blog');
          expect(res.body.data).to.have.property('category').eql('Updated test category');
          expect(res.body.data).to.have.property('image').eql('updated-test-image.png');
          expect(res.body.data).to.have.property('description').eql('Updated test description');


          done();
        });
    });
  });

  describe("DELETE /api/blog/delete/:id", () => {
    it("should delete an existing blog", (done) => {
      const blogIdToDelete ="64111d9a6bc0ebc393860ed9";
      chai
        .request(app)
        .delete(`/api/blog/delete/${blogIdToDelete}`)
        .end((err, res) => {
         
        expect(res).to.have.status(200); 
        /*   expect(res.body).to.be.an("object"); */

          
                  /*   expect(res.body.message).to.eql('Blog deleted successfully'); */
          done();
        });
    });
  });

});
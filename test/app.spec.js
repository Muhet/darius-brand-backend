import app from "../src/app.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";


chai.use(chaiHttp);
chai.should();

describe("Blog API", () => {
  let blogId = '';
  // Test the GET /api/blogs route
  describe("GET /api/blogs", () => {
    it("should return all blogs", (done) => {
      chai
        .request(app)
        .get("/api/blogs")
        .end((err, res) => {
          expect(res).to.have.status(200);
          /* console.log(res.body['data']); */

        });
      done();
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
        });
      done();
    });
  });




  describe("POST /blogs/create", () => {
    it("should create a new Blog", (done) => {
      const newBlog = {
        title: "Test Title",
        category: "Test Category",
        image: "test-image.png",
        description: "Test description2",
      };
      chai
        .request(app)
        .post("/api/blogs/create")
        .send(newBlog)
        .end((err, res) => {

          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.data[0]).to.have.property('title').eql('Test Title');
          expect(res.body.data[0]).to.have.property('category').eql('Test Category');
          expect(res.body.data[0]).to.have.property('image').eql('test-image.png');
          expect(res.body.data[0]).to.have.property('description').eql('Test description');
          newProject._id = res.body.data[0]._id;

        });
      done();
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



        });
      done();
    });
  });
  // Test the DELETE api/blogs/delete/:id route

  describe("DELETE /api/blog/delete/:id", () => {

    it("should delete an existing blog", (done) => {
      const blogIdToDelete = "64111c016a32f8c3fc43e58b";
      chai.request(app)
        .delete(`/api/blog/delete/${blogIdToDelete}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
      done();
    });
  });

});
describe("Project API", () => {


  const newBlog = {
    title: "Test blog",
    image: "test-image.png",
    description: "Test description",
  };
  // Test the GET /api/Project route
  describe("GET /api/Project", () => {
    it("should return all project", (done) => {
      chai
        .request(app)
        .get("/api/Project")
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
      done();
    });
  });
});
// Test the GET /api/project/:id route
describe("GET /api/project/:id", () => {

  it("should return a single Project", (done) => {
    const projectId = "6410c37d5f9ec1efaa4a5b3c";
    chai
      .request(app)
      .get(`/api/project/${projectId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        res.body.data['title'];
        res.body.data['image'];
        res.body.data['description'];
        res.body.data['createdAt'];

      });
    done();
  });
});

// Test the POST /api/project/create route
describe("POST /project/create", () => {
  it("should create a new project", (done) => {
    const newProject = {
      title: "Test Project2",
      image: "test-image.png2",
      description: "Test description2",
    };
    chai
      .request(app)
      .post("/api/project/create")
      .send(newProject)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.have.status(500);
        expect(res.body).to.be.an("object");
        expect(res.body.data[0]).to.have.property('title').eql('Test Project2');
        expect(res.body.data[0]).to.have.property('image').eql('test-image.png2');
        expect(res.body.data[0]).to.have.property('description').eql('Test description2');
        newProject._id = res.body.data[0]._id;

      });
    done();
  });

});

// Test the PUT /api/project/update/:id route
describe("PUT /project/update/:id", () => {
  it("should update an existing Project", (done) => {
    const projectId = "64111c016a32f8c3fc43e58b";
    const updatedProject = {
      title: "Updated test project",
      image: "updated-test-image.png",
      description: "Updated test description",
    };
    chai
      .request(app)
      .put(`/api/project/update/${projectId}`)
      .send(updatedProject)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.have.status(500);
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.have.property('title').eql('Updated test project');
        expect(res.body.data).to.have.property('image').eql('updated-test-image.png');
        expect(res.body.data).to.have.property('description').eql('Updated test description');

      });
    done();
  });
});

// Test the DELETE api/project/delete/:id route

describe("DELETE /api/project/delete/:id", () => {

  it("should delete an existing project", (done) => {
    const projectIdToDelete = "64111c016a32f8c3fc43e58b";
    chai.request(app)
      .delete(`/api/project/delete/${projectIdToDelete}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.have.status(500);
      });
    done();
  });
});



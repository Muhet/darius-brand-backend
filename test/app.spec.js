import app from "../src/app.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";


chai.use(chaiHttp);
chai.should();

describe("Blog API", () => {

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
    it("should create a new project", (done) => {
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
          console.log('########################################################')
          console.log(res.status)
          console.log('########################################################')
           //*  */
        
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
          expect(res.body).to.be.an("object");
          expect(res.body.data[0]).to.have.property('title').eql('Test Project2');
          expect(res.body.data[0]).to.have.property('image').eql('test-image.png2');
          expect(res.body.data[0]).to.have.property('description').eql('Test description2');
          newProject._id = res.body.data[0]._id;
          console.log('########################################################')
          console.log(res.status)
          console.log('########################################################')
           //*  */
        
      });
      done();
  });  

  });


});

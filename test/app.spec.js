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

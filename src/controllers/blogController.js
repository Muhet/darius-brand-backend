import Blog from "../model/blog.js";


class blogController {
  // get all blogs
  static async getBlogs(req, res) {
    const allBlogs = req.body;
    try {
if(!allBlogs){
res.status(404).json({"status": "failled", "code": 404, "message": "No blog in DataBase"});
return;
}
  const blogs = await Blog.find({}).sort({_id: -1}).limit(10);
      res.status(200).json({"status": "success","code": 200,"message": "All Blog posts", data: blogs});
        
    } catch (error) {
      console.log(error)
      res.status(500).json({'status': 'fail','code': 500, "message" : "Error", "data": null});
    }
  }

  // get one blog
  static async getBlog(req, res) {
    try {
      const { id } = req.params; // using ES6
      const blog = await Blog.findOne({ _id: id });
      if (!blog) {
        return res.status(400).json({'status': 'fail','code': 400,'message' : "Please fill all required data", "data": null});
         
      } else {
        res.status(200).json({"status": "success","code": 200,"message": "Blog post fetched!!", "data": blog});
         
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).json({'status': 'fail','code': 500, "message" : "Error", "data": null});
    }
  }
  // create blog
  static async createBlog(req, res) {
    
   const newBlogPost = req.body;
 
    try {
      //validation
      if(!(newBlogPost)){
        res.status(400).json({'status': 'fail','code': 400,'message' : "Please fill all required data", "data": null});
        return;
      }
      const newBlog = await Blog.create([newBlogPost]);
      res.status(200).json({"status": "success","code": 200,"message": "Blog post created !!", data: newBlog});
      
    } catch (error) {
      console.log(error)
      res.status(500).json({'status': 'fail','code': 500, "message" : "Error", "data": null});
    }
  }

  // update blog
  static async updateBlog(req, res) {
    try {
      const { id } = req.params; // using ES6

      // body to be update
      const { title, category, image, description } = req.body;

      // id
      const _id = id;
      const blogUpdated = await Blog.findByIdAndUpdate(_id, { title, category, image, description }, { new: true });

      if (!blogUpdated) {
        return res.status(404).json({ "status": "failed!!","code": 404,"message": `Blog with id: ${id} was not found`});
      } else {

        res.status(200).json({"status": "success","code": 200,"message": "Blog updated Successfully",  data: blogUpdated});
                return;
         
      }

    } catch (error) {
      res.status(500).json({'status': 'fail','code': 500, "message" : "server error", "data": null});        
    }
    }
  

  // delete blog
  static async deleteBlog(req, res) {
    try {
      const { id } = req.params;
      // find blog
      
      const _id = id

      const blogToBeDeleted = await Blog.findByIdAndDelete(_id)

      if (!blogToBeDeleted) {
        return res.status(404).json({"status":"fail","cade":404, "message": `Blog with id: ${id} was not found`
        });
      } else {
        return res.status(200).json({"status":"success","code": 200," message": "Blog deleted successfully",
        });
      }
    } catch (error) {
      res.status(500).json({'status': 'fail','code': 500, "message" : "server error", "data": null}); 
    }
  }
}

export default blogController;

import Comment from "../model/comment.js";
import commentRoute from "../model/commentroute.js";
import errorFunc from "../utils/errorFunc.js";

// Create a comment

app.post('/blog-posts/:postId/comments', (req, res) => {
    const content = req.body.content;
    const user = req.user._id;
    const blogPost = req.params.postId;
  
    const comment = new Comment({
      content: content,
      user: user,
      blogPost: blogPost
    });
  
    comment.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving comment');
      } else {
        res.redirect(`/blog-posts/${blog}`);
      }
    });
  });
  app.get('/blog-posts/:postId', (req, res) => {
    const blogId = req.params.postId;
  
    Blog.findById(blogId)
      .populate('user')
      .exec((err, blogPost) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error retrieving blog post');
        } else {
          Comment.find({ blogPost: blogId })
            .populate('user')
            .exec((err, comments) => {
              if (err) {
                console.error(err);
                res.status(500).send('Error retrieving comments');
              } else {
                res.render('blog-post', { blogPost: blogPost, comments: comments });
              }
            });
        }
      });
  });
    
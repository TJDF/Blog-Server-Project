import express from "express"
import bodyParser from "body-parser"
import { render } from "ejs"

const app = express()
const port = 3000

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

var posts = []

function Post(title, text){
    this.title = title
    this.text = text
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}



function addPost(title,text){
  let post = new Post(title, text)
  posts.push(post)
}

function applyEdit(index, newPost){
  posts.splice(index, 1, newPost)
}

function deletePost(index){
  posts.splice(index)
}

app.get("/", (req, res) => {
  res.render("index.ejs", {posts: posts})
});

app.get("/create", (req,res) =>{
  res.render("create.ejs")
})

app.get("/view/:id", (req, res) =>{
  let index = req.params.id;
  let post = posts[index]
  res.render("view.ejs", {
    postId: index,
    title: post.title,
    text: post.text
  })
})

app.get("/edit/:id",(req, res) =>{
  let index = req.params.id;
  let post = posts[index]
  res.render("edit.ejs", {
    postId: index,
    title: post.title,
    text: post.text
  })
})

app.post("/delete", (req, res)=>{
  let index = req.body.postId
  console.log(index)
  deletePost(index)
  res.redirect("/")
})

app.post("/apply", (req, res) =>{
  let index = req.body.postId
  const title = req.body.title
  const text = req.body.text
  applyEdit(index, new Post(title, text))
  res.redirect("/")
})

app.post("/submit", (req, res) =>{
    const title = req.body["title"]
    const text = req.body["text"]
    addPost(title, text)

    res.redirect("/")
})

app.listen(port, () => {
  addPost("First Node.JS project","This is my first project using Node, JavaScript and EJS")
  addPost("What is about?","You can write, read, delete and edit any post. It doesn't save data or uses auth yet, but I look forward to adding in the future ")
  console.log(`Listening on port ${port}`);
});


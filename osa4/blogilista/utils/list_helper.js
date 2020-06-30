const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  //console.log(Number(blogs[0].likes.toString).type)
  //console.log(blogs[0].likes.type)
  //console.log(parseInt(blogs[0].likes)-blogs[1].likes)
  let blogsCopy = [...blogs]

  blogsCopy.sort((blog1,blog2) => { 
    console.log(parseInt(blog1.likes) - parseInt(blog2.likes))
    return blog2.likes-blog1.likes
  })

  return blogsCopy[0]
}

const mostBlogs = (blogs) => {
  let authors = [...new Set(blogs.map(blog => blog.author))]
  
  authors = authors.map(author => ({
    author: author,
    blogs: blogs.reduce((sum, blog) =>  { return author === blog.author ? sum + 1 : sum }, 0)
  }))

  authors.sort((object1, object2) => object2.blogs - object1.blogs)
  console.log(authors)
  return authors[0] 
}

const mostLikes = (blogs) => {
  let authors = [...new Set(blogs.map(blog => blog.author))]
  
  authors = authors.map(author => ({
    author: author,
    likes: blogs.reduce((sum, blog) =>  { return author === blog.author ? sum + blog.likes : sum }, 0)
  }))

  authors.sort((object1, object2) => object2.likes - object1.likes)
  console.log(authors)
  return authors[0]
}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.length === 1 ? blogs[0] : blogs.reduce((fav, curr) => {
        if(fav.likes < curr.likes || fav.likes === curr.likes) {       
            fav = curr
        }
        return fav
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return 0
    if (blogs.length === 1) return {"author": blogs[0].author, "blogs": 1}
    
    const authorsDict = blogs.reduce((dict, curr) => {
        dict[curr.author] = (dict[curr.author] || 0) + 1
        return dict
    }, {})
    
    const [author, count] = Object.entries(authorsDict).sort((a, b) => b[1] - a[1])[0]
    
    return {"author": author, "blogs": count}
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return 0 
    if(blogs.length === 1) return {"author": blogs[0].author, "likes": blogs[0].likes}

    const authorsDict = blogs.reduce((dict, curr) => {
        dict[curr.author] = (dict[curr.author] || 0) + curr.likes
        return dict
    }, {})

    const [author, likes] = Object.entries(authorsDict).sort((a,b) => b[1] - a[1])[0]

    return { "author": author, "likes": likes }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
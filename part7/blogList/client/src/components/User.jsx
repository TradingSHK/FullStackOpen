const User = ({user}) => {       
    return(
        <>
            <h2>{user.name}</h2>
            <div>
                <p>added blogs</p>
                <ul>
                    {user.blogs.map(blog => (
                        <li>{blog.title}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default User
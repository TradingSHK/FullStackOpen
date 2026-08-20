import { useParams } from "react-router"
import User from './User'

const UserDetail = ({users}) => {    
    const {id} = useParams()
    const user = users.find(b => b.id === id)

    if(!user) {
        return <div>User not found</div>
    }

    return (
        <User 
            user={user}
        />
    )
}

export default UserDetail
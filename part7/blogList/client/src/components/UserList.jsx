import userService from '../services/users'
import { Button, Table, TableContainer, TableCell, TableBody, TableHead, Paper, TableRow } from '@mui/material'
import { useUsers } from '../userStore'
import { Link } from 'react-router'

const UserList = () => {
    const users = useUsers()    
    return (
        <>
            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="User table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Blogs created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow 
                                key={user.id} 
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                                <TableCell align="right">{user.username}</TableCell>
                                <TableCell align="right">{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default UserList
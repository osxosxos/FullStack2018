import React from 'react'
import { Link } from 'react-router-dom'

const Users = (props) => {
    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Blogs</th>
                    </tr>
                    {props.users.map(user =>
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users
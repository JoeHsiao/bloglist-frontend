import usersService from '../services/users'
import { useState, useEffect } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const userList = await usersService.getAll()
    setUsers(userList)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
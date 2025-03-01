const Users = () => {
  // const [users, setUsers] = useState([])

  const users = [
    {
      "username": "user",
      "name": "Joe",
      "blogs": [],
      "id": "67aef04f0f3d9606d6d3004c"
    },
    {
      "username": "joe.phsiao@gmail.com",
      "name": "Joe",
      "blogs": [],
      "id": "67af7d0be34dd3dc21c920db"
    },
    {
      "username": "abc@gmail.com",
      "name": "ABC",
      "id": "67af801856164ba8ca1178a8",
      "blogs": [
        {
          "title": "xxx",
          "author": "xxx",
          "url": "xxx",
          "id": "67b3b295853e772f48f2e488"
        },
        {
          "title": "555",
          "author": "555",
          "url": "555",
          "id": "67b3b33f853e772f48f2e490"
        },
      ]
    }
  ]
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
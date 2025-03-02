import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)

  if (!user) {
    return <h3>Loading...</h3>
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(x =>
          <li key={`${x.id}`}>
            {x.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User
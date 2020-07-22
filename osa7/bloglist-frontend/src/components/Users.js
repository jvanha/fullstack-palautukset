import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core'

const Users = () => {
  const users = useSelector(({ users }) => users)
  console.log(users)
  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>users</b>
              </TableCell>
              <TableCell>
                <b>total blogs</b>
              </TableCell>
            </TableRow>
            {users.map(user =>
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
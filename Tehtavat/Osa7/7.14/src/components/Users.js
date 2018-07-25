import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Header, Container } from 'semantic-ui-react'

const Users = (props) => {
    return (
        <Container>
            <Header>{'Users who have blogs'}</Header>
            <Table width ={200}>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Header>
                                {'User'}
                            </Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header>
                                {'Blogs'}
                            </Header>
                        </Table.Cell>
                    </Table.Row>
                    {props.users.map(user =>
                        <Table.Row key={user.id}>
                            <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
                            <Table.Cell>{user.blogs.length}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    )
}

export default Users
import React from 'react'
import { Form, Button, Header, Label, Container, Input } from 'semantic-ui-react'

const BlogPostForm = (props) => {
    return (
        <Container>
            <Header>{'Be a hero? Create awesome new blog!'}</Header>
            <Form onSubmit={props.addBlog}>
                <Form.Field>
                    <Label>
                        {'Title'}
                    </Label>
                    <Input
                        type="text"
                        name="newBlogTitle"
                        value={props.state.newBlogTitle}
                        onChange={props.handleFieldChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>
                        {'Author'}
                    </Label>
                    <Input
                        type="text"
                        name="newBlogAuthor"
                        value={props.state.newBlogAuthor}
                        onChange={props.handleFieldChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>
                        {'Url'}
                    </Label>
                    <Input
                        type="text"
                        name="newBlogUrl"
                        value={props.state.newBlogUrl}
                        onChange={props.handleFieldChange}
                    />
                </Form.Field>
                <Button type="submit">{'Send'}</Button>
            </Form>
        </Container>
    )
}

export default BlogPostForm
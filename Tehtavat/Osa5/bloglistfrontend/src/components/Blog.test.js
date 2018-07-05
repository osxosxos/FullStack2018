import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {

    const blog = {
        id: "5404tu0jto34jtr039",
        blogUserName: "Pertti", 
        stateUserName: "Sakari",
        title: "Tuomion blogi",
        author: "Pertti Keinonen",
        url: "www.tuomio.com",
        name: "Pertti Keinonen",
        likes: 4343242,
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<Blog
        blogUserName={blog.blogUserName}
        stateUserName={blog.stateUserName}
        title={blog.title}
        author={blog.author}
        likes={blog.likes}
        url={blog.url}
        name={blog.name}
        id={blog.id}
        likeBlog={mockHandler}
        removeBlog={mockHandler}
    />)

    it('clicking the like button twice calls event handler twice ', () => {
        const likeButton = blogComponent.find('button')
        likeButton.simulate('click')
        likeButton.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(2)
    })


})
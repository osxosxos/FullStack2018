import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {

    const blog = {
        id: "5404tu0jto34jtr039",
        blogUserName: "Pertti",
        stateUserName: "Sakari",
        title: "Tuomion blogi",
        author: "Pertti Speedy Keinonen",
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
        likeBlog={() => mockHandler}
        removeBlog={mockHandler}
    />)

    it('clicking the like button twice calls event handler twice ', () => {
        const likeButton = blogComponent.find('button')
        likeButton.simulate('click')
        likeButton.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(2)
    })

    it('only title and author are displayed before click', () => {

        const limitedInfoDiv = blogComponent.find('.limitedInfo')
        expect(limitedInfoDiv.text()).toContain(blog.title)
        expect(limitedInfoDiv.text()).toContain(blog.author)
        expect(limitedInfoDiv.text()).not.toContain(blog.likes)
        expect(limitedInfoDiv.text()).not.toContain(blog.url)
        expect(limitedInfoDiv.text()).not.toContain(blog.name)

    })

    it('after clicking name the details are displayed', () => {

        const limitedInfoDiv = blogComponent.find('.limitedInfo')
        limitedInfoDiv.simulate('click')
        const allInfoDiv = blogComponent.find('.allInfo')
        expect(allInfoDiv.text()).toContain(blog.title)
        expect(allInfoDiv.text()).toContain(blog.author)
        expect(allInfoDiv.text()).toContain(blog.likes)
        expect(allInfoDiv.text()).toContain(blog.url)
        expect(allInfoDiv.text()).toContain(blog.name)

      })

})
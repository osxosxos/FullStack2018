import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {

    const blog = {
        title: "Tuomion blogi",
        author: "Pertti Keinonen",
        likes: 347293472
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)

    it('rendered content contains title', () => {
        const title = blogComponent.find('.info')
        expect(title.text()).toContain(blog.title)
    })

    it('rendered blog contains author', () => {
        const author = blogComponent.find('.info')
        expect(author.text()).toContain(blog.author)
    })

    it('rendered blog contains likes', () => {
        const likes = blogComponent.find('.likes')
        expect(likes.equals(blog.likes))
    })

})
import React from 'react'
import { shallow, mount } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')
import LoginForm from './components/LoginForm';
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogPostFrom from './components/BlogPostForm'


describe('<App />', () => {
    
    let app

    beforeAll(() => {
        app = mount(<App />)
    })

    it('only login form is rendered', () => {
        app.update()
        const loginForm = app.find('.LoginForm')
        expect(loginForm).not.toBe(null)
        const blogPostForm = app.find('.BlogPostForm')
        expect(blogPostForm).toBe(null)
        const logoutForm = app.find('.LogoutForm')
        expect(logoutForm).toBe(null)
        const blogs = app.state().blogs.length
        expect(blogs).toBe(0)
    })

})

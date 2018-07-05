import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogPostFrom from './components/BlogPostForm'

describe('when user is not logged', () => {
    beforeAll(() => {
        app = mount(<App />)
    })

    it('only login form is rendered', () => {
        app.update()
        const loginForm = app.find('.LoginForm')
        expect(loginForm).toBe(LoginForm)
        const blogPostForm = app.find('.BlogPostForm')
        expect(blogPostForm).toBe(null)
        const logoutForm = app.find('.LogoutForm')
        expect(logoutForm).toBe(null)
        const blogs = app.state().blogs.length
        expect(blogs).toBe(0)
    })

})

describe('when user is logged', () => {
    beforeEach(() => {
        // luo sovellus siten, että käyttäjä on kirjautuneena
    })

    it('all notes are rendered', () => {
        app.update()
        // testataan, että blogit renderöityy oikein
    })
})
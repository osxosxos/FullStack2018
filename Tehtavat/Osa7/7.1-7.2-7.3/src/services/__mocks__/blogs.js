let token = null

const blogs = [
    {
        id: "849u98u83u8h3fh83",
        title: "Testimme",
        author: "Testaajamme",
        url: "www.testimme.com",
        likes: 734208,
        user: {
            _id: "05830t58309430fds",
            username: "TestiMies",
            name: "Testi Testinen"
        }
    },
    {
        id: "849u453trw43u8h3fh83",
        title: "Toinen testimme",
        author: "Toinen testaajamme",
        url: "www.toinentestimme.com",
        likes: 734208,
        user: {
            _id: "fsfserg45458309430fds",
            username: "ToinenTestiMies",
            name: "Toinen Testi Testinen"
        }
    },
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }
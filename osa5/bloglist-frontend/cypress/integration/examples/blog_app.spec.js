
Cypress.Commands.add('createBlog', ({title, author, url, likes }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/blogs',
    body: {title, author, url, likes},
    headers: { 
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', 'http://localhost:3000/api/login', {
      username, password
      }).then(response => {
        window.localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', {
      username: 'testuser', name: 'tester', password: 'secret'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Login to application')
  })
  
  describe('Login',function() {
    it('succeeds with correct credentials', function() {

      cy.get('#username').type('testuser')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('tester logged in')
    })

    it('fails with wrong credentials', function() {

      cy.get('#username').type('wronguser')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'secret'})
      cy.createBlog({
        title: 'the Blog of the day',
        author: 'tester',
        url: 'www.testtest.com'
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('tester')
      cy.get('#url').type('www.test.fi')
      cy.contains('create').click()

      cy.contains('New blog new blog by tester added')
      cy.contains('new blog tester')
    })

    it('and it can be liked', function() {
      cy.contains('show').click()
      cy.contains('like').click()

      cy.contains('likes 1')
    })

    it('and it can be removed by the creator', function() {
      cy.contains('the Blog of the day')
      cy.contains('show').click()
      cy.contains('delete').click()

      cy.get('html').should('not.contain', 'the Blog of the day')
    })
    it('blogs have been sorted according to the likes', function() {
      cy.createBlog({
        title: '1',
        author: 'tester',
        url: 'www.testtest.com',
        likes: 5
      })
      cy.createBlog({
        title: '2',
        author: 'tester',
        url: 'www.testtest.com',
        likes: 4
      })
      cy.createBlog({
        title: '3',
        author: 'tester',
        url: 'www.testtest.com',
        likes: 3
      })
      cy.createBlog({
        title: '4',
        author: 'tester',
        url: 'www.testtest.com',
        likes: 6
      })
      cy.createBlog({
        title: '5',
        author: 'tester',
        url: 'www.testtest.com',
        likes: 2
      })
      cy.createBlog({
        title: '7',
        author: 'tester',
        url: 'www.testtest.com',
        likes: 1
      })

      cy.get('.blog').then( blogs => {
        for(let i=0; i<7; i++) {
          cy.wrap(blogs[i]).contains('show').click()
          cy.wrap(blogs[i]).contains(`likes ${6-i}`)
        }
      })

        
    })
  })

})
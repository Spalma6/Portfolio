describe('multiple tests', () => {

  it('test: visit all pages', () => {
    cy.visit('/')
    cy.visit('/about')
    cy.visit('/project')
    cy.visit('/education')
    cy.visit('/services')
    cy.visit('/contact')
    cy.visit('/signin') 
  })
  it('test: submit a forum', () => {
    cy.visit('/contact')
    cy.get('#root [name="firstName"]').type('TestFName');
    cy.get('#root [name="lastName"]').type('TestLName');
    cy.get('#root [name="phone"]').type('1231231234');
    cy.get('#root [name="email"]').type('testemail@email.com');
    cy.get('#root [name="message"]').type('Test Message');
    cy.get('#root button.button').click();      
  
  })

  it('test: sign-in a user', () => {
    cy.visit('/signin')
    cy.get('#root [name="email"]').type('test3@outlook.com')
    cy.get('#root [name="password"]').type('test33');
    cy.get('#root button.button').click();

  })

});
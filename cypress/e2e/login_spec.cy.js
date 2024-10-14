describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Should verify the login functions', () => {
    cy.get('h1').contains("Feedback Loop")
    .get('form').contains("h2","Please Sign In")
    .get('input[name="email"]').type("leta@turing.io").should('have.value', 'leta@turing.io')
    // .get('input[name="email"]').contains("leta@turing.io")
    .get('input[name="password"]').type("keane20").should('have.value', 'keane20');
  })

  it('Should verify the login page show error message when there is empty field', ()=> {
    cy.get("h1").contains("Feedback Loop")
    .get("button").click()
    .get("p").contains("Please fill out both inputs.");
  })

  it('should be able to fill out the email and password and click Submit, directing the user to a different page', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/login', {
        statusCode: 201,
        body: {
          id: 2,
          image: "https://ca.slack-edge.com/T029P2S9M-U37MJAV0T-007ccf2f5eb2-512",
          name: "Leta Keane"
        }
      })
      .get('input[type="email"]').type('leta@turing.io')
      .get('input[type="password"]').type('keane20')
      .get('button').click()
      .url().should('include', '/dashboard')
  });

  it('should be able to fill the email and password and click on subit, the api will throw 401 error', ()=> {
    cy.intercept('POST',  'http://localhost:3001/api/v1/login', {statusCode: 401, body: {message: 'Email and password do not match'}})
    .get('input[type="email"]').type('leta@turing.io')
    .get('input[type="password"]').type('keane20')
    .get('button').click()
    .get('p').contains('Email and password do not match. Please try again.')
  })

  // Cypress.Commands.add('clickLink', (label) => {
  //   cy.get('a').contains(label).click();
  // })
})



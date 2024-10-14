// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

{/* <reference types="Cypress" ></reference> */}

Cypress.Commands.add('login', ()=> {
    const baseURL = 'http://localhost:3001/api/v1';
    cy.intercept('POST', `${baseURL}/login`, {
        statusCode: 201,
        body: {
            id: 2,
            image: "https://ca.slack-edge.com/T029P2S9M-U37MJAV0T-007ccf2f5eb2-512",
            name: "Leta Keane"
          }
    });

    cy.intercept(`${baseURL}/users/2/teammates`, {
        "teammates": [
          {
            email: "hannah@turing.io",
            id: 1,
            image: "https://ca.slack-edge.com/T029P2S9M-UPE0QSWEQ-d4bebe6f4d88-512",
            name: "Hannah Hudson",
            delivered: false
          },
          {
            email: "khalid@turing.io",
            id: 3,
            image: "https://ca.slack-edge.com/T029P2S9M-UDR1EJKFS-9351230a5443-512",
            name: "Khalid Williams",
            delivered: true
          }
        ]
      });

        // stub our feedback network request
  cy.intercept(`${baseURL}/users/2/feedback`, {
    feedback: [
      {
        feedback: "Your feedback game is TOO strong.",
        senderId: 4,
        receiverId: 2
      },
      {
        feedback: "I appreciate your positive energy and how hard you work in supporting both students and other instructors alike.",
        senderId: 11,
        receiverId: 2
      }
    ]
  });

    // stub Scott's user data
    cy.intercept("GET", "http://localhost:3001/api/v1/users/4", {
        id: 4,
        name: "Scott Ertmer",
        image: "https://ca.slack-edge.com/T029P2S9M-UJ910QEJF-7244f37f7e12-512",
        email: "scott@turing.io",
        password: "ertmer20",
      });

       // stub Travis's user data
  cy.intercept("GET", "http://localhost:3001/api/v1/users/11", {
    id: 11,
    name: "Travis Rollins",
    image: "https://ca.slack-edge.com/T029P2S9M-U4R41TZD2-7661f06e8c71-512",
    email: "travis@turing.io",
    password: "rollins20",
  });

    // Fill in our UI to trigger the network requests and send us to /dashboard
    cy.visit('http://localhost:3000/')
    .get('input[name=email]').type('leta@turing.io')
    .get('input[name=password]').type('keane20')
    .get('button').click()
    
})



describe('Dashboard spec', () => {

  beforeEach(()=> {
    cy.login()
  })

  it('Should render the title of dashboard ', () => {
   cy.contains('h1', 'Feedback Loop')
   .get('p').contains("Scott Ertmer")
   .get('p').should("contain", "Travis Rollins");
  })

  it('should verify the assertion', ()=> {
    cy.xpath("tbody>tr>td").then((element) => {
     expect(element).contains("Hannah");

    })
  });

  it('should verify the team memebers1', ()=> {
    cy.xpath("//tbody/tr").should('have.length', 2);
  });


})
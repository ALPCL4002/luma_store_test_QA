import HomePage from "../support/pages/home.page";
const homePage = new HomePage();

describe('Validade home page', () => {
    beforeEach(() => {
        cy.visit("");
    })

    it('Validade header',() => {
        cy.get(homePage.headerSupport).contains('Support This Project')
        cy.get(homePage.headerLogin).contains('Sign In')
        cy.get(homePage.headerCreate).contains('Create an Account')
    })
    it('Validade logo Page, Search and shopping cart',() => {
        cy.get(homePage.logoPage).should('be.visible');
        cy.get(homePage.searchPage).should('have.attr', 'placeholder', 'Search entire store here...')
        cy.get(homePage.showcartPage).should('be.visible');
    })
  
})
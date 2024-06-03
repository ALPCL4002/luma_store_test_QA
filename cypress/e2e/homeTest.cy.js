import HomePage from "../support/pages/home.page";
const homePage = new HomePage();

describe('Validade home page', () => {
    beforeEach(() => {
        cy.visit("");
    })

    // Validate if the home page was successfully loaded and if the main items on the screen are displayed.
    it('Should load the home page successfully', () => {
        cy.get(homePage.headerSupport).contains('Support This Project')
        cy.get(homePage.headerLogin).contains('Sign In')
        cy.get(homePage.headerCreate).contains('Create an Account')

        cy.get(homePage.logoPage).should('be.visible');
        cy.get(homePage.searchPage).should('have.attr', 'placeholder', 'Search entire store here...')
        cy.get(homePage.showcartPage).should('be.visible');

        cy.get(homePage.menuNav).should('be.visible')
        cy.get(homePage.bannersPromo).should('be.visible')

        cy.get(homePage.textProd).should('contain', 'Hot Sellers')
        cy.get(homePage.textInfo).should('contain', 'Here is what`s trending on Luma right now')

        cy.get(homePage.footer).should('be.visible')
    })
})

import HomePage from "../support/pages/home.page";
const homePage = new HomePage();

import ResultSearch from "../support/pages/resultSearch.page";
const resultSearch = new ResultSearch();


describe('Validade home page', () => {
    beforeEach(() => {
        cy.visit("");
    })

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

        cy.get(homePage.productItems).should('be.visible')
        cy.get(homePage.footer).should('be.visible')
    })
})

describe.only('Product Search and Access Results Page', () => {

    beforeEach(() => {
        cy.visit("");
    })

    it('Search for a product should return options and open selected page', () => {
        cy.intercept({
            method: 'GET',
            url: /\/search\/ajax\/suggest\/\?q=shirt&_=\d+/
        }).as('searchProd')

        homePage.findProduct('shirt')

        cy.wait('@searchProd').then(interception => {
            expect(interception.response.statusCode).to.equal(200);

            const responseBody = interception.response.body;

            const lastItem = responseBody[responseBody.length - 1];

            const lastName = lastItem.title
            cy.wrap(lastName).as('lastnameSearch');

            cy.get(homePage.searchList)
                .contains(lastName)
                .click();
        }).then(() => {
            cy.get('@lastnameSearch').then(lastnameSearch => {
                cy.get(resultSearch.navsearchList).should('contain', 'Home')
                cy.get(resultSearch.navsearchResult).should('contain', 'Search results for:').invoke('text').should('contain', lastnameSearch);
                cy.get(resultSearch.resultSearch).should('contain', 'Search results for:').invoke('text').should('contain', lastnameSearch);

                cy.get(resultSearch.filterToolbar).should('be.visible')
                cy.get(resultSearch.resultSidebar).should('be.visible')
                cy.get(resultSearch.resultSidebaradd).should('be.visible')
                cy.get(resultSearch.relatedSearch).should('be.visible')
                cy.get(resultSearch.listProducts).should('be.visible')
            })
        })
    })
})

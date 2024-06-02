import HomePage from "../support/pages/home.page";
const homePage = new HomePage();

import ResultSearch from "../support/pages/resultSearch.page";
const resultSearch = new ResultSearch();

describe('Product Search and Access Results Page', () => {

    beforeEach(() => {
        cy.visit("");
    })

    //Perform a search for "shirt" and select the last result.
    it('Search for a product should return options and open selected page', () => {
        cy.intercept({
            method: 'GET',
            url: /\/search\/ajax\/suggest\/\?q=shirt&_=\d+/
        }).as('searchProd')

        homePage.findProduct('shirt')

        cy.wait('@searchProd', { timeout: 15000 }).then(interception => {
            expect(interception.response.statusCode).to.equal(200);

            const responseBody = interception.response.body;

            const lastItem = responseBody[responseBody.length - 1];

            const lastName = lastItem.title
            cy.wrap(lastName).as('lastnameSearch');

            cy.get(homePage.searchList)
                .contains(lastName)
                .click();
        }).then(() => {
            //Validate if the search results page matches the search query.
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

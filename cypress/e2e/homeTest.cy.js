import HomePage from "../support/pages/home.page";
const homePage = new HomePage();

import ResultSearch from "../support/pages/resultSearch.page";
const resultSearch = new ResultSearch();

import BuyProduct from "../support/pages/buyProduct.page";
const buyProduct = new BuyProduct();

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



        cy.get(homePage.footer).should('be.visible')
    })
})

describe('Product Search and Access Results Page', () => {

    beforeEach(() => {
        cy.visit("");
    })

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

describe('Add product to cart and proceed to checkout', () => {

    let email, name, lastName, location, city, zipCode, cell

    beforeEach(() => {
        cy.visit("");
    })

    it('Add product to cart from the card and verify if its present in the cart', () => {
        buyProduct.addtoCart('XS', 'Blue')

        cy.get(homePage.messagesucess).should('contain', 'You added Radiant Tee to your shopping cart.')
        cy.get(buyProduct.cartValue).should('be.visible')

        buyProduct.openCart()

        // Verificar a partir daqui se o produto aparece no carrinho conforme selecionado 
    })

    it('Add product and complete checkout correctly', () => {
        buyProduct.addtoCart('XS', 'Blue')

        cy.visit("checkout/");

        cy.request('https://randomuser.me/api/?inc=email,name,location,phone')
            .then((response) => {
                expect(response.status).to.eq(200);

                email = response.body.results[0].email;
                name = response.body.results[0].name.first;
                lastName = response.body.results[0].name.last;
                location = response.body.results[0].location.street.name;
                city = response.body.results[0].location.city;
                zipCode = response.body.results[0].location.postcode;
                cell = response.body.results[0].phone;

                buyProduct.formCheckout(email, name, lastName, location, city, "Alaska", zipCode, "Togo", cell)

                cy.intercept({
                    method: 'POST',
                    url: /\/rest\/default\/V1\/guest-carts\/[a-zA-Z0-9]+\/estimate-shipping-methods/
                }).as('postEstimate')

                cy.wait('@postEstimate').its('response.statusCode').should('eq', 200)

                cy.get(buyProduct.buttonNext).click()

                cy.intercept({
                    method: 'POST',
                    url: /\/rest\/default\/V1\/guest-carts\/[a-zA-Z0-9]+\/set-payment-information/
                }).as('postPayment')

                cy.wait('@postPayment').its('response.statusCode').should('eq', 200)

                cy.get(buyProduct.adressDetails).should('contain', name)
                cy.get(buyProduct.adressDetails).should('contain', lastName)
                cy.get(buyProduct.adressDetails).should('contain', location);
                cy.get(buyProduct.adressDetails).should('contain', "Togo");
                cy.get(buyProduct.adressDetails).should('contain', cell);

                buyProduct.submitCheckout()
// Falta validar se a pagina de sucesso está sendo retornada 
            });
    })
})

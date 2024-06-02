import HomePage from "../support/pages/home.page";
const homePage = new HomePage();

import ResultSearch from "../support/pages/resultSearch.page";
const resultSearch = new ResultSearch();

import BuyProduct from "../support/pages/buyProduct.page";
const buyProduct = new BuyProduct();

describe('Add product and complete checkout correctly', (() => {
    
    let email, name, lastName, location, city, zipCode, cell

    beforeEach(() => {
        cy.visit("");
    })

    it('Add product and complete checkout correctly', () => {
        //Add a product to the cart and proceed to checkout.
        buyProduct.addtoCart('XS', 'Blue')

        cy.visit("checkout/");

        //Fill out the form information randomly.
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

                //Nesse caso não é possivel visualizar nenhuma requisição para ser interceptada
                cy.wait(1000)

                //Validate if the success page is displayed after completion.
                cy.get(resultSearch.resultSearch).should('contain', 'Thank you for your purchase!')
                
            });
            
    })
}));

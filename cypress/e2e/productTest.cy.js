import HomePage from "../support/pages/home.page";
const homePage = new HomePage();

import ResultSearch from "../support/pages/resultSearch.page";
const resultSearch = new ResultSearch();

import BuyProduct from "../support/pages/buyProduct.page";
const buyProduct = new BuyProduct();

describe('Add product to cart and verify its presence', () => {

    beforeEach(() => {
        cy.visit("");
    })

    //Add a product to the cart.
    it('Add product to cart from the card and verify if its present in the cart', () => {
        buyProduct.addtoCart('XS', 'Blue')

        cy.get(homePage.messagesucess).should('contain', 'You added Radiant Tee to your shopping cart.')
        cy.get(buyProduct.cartValue).should('be.visible')

        buyProduct.openCart()

        //Nesse caso não é possivel visualizar nenhuma requisição para ser interceptada
        cy.wait(1000)

        //Verify if the product in the cart matches the one that was added.
        cy.get(buyProduct.cartTotal).should('be.visible').should('contain', '1')
        cy.get(buyProduct.cartTotal).should('be.visible').should('contain', 'Item in Cart')
        cy.get(buyProduct.priceProduct)
        .find(buyProduct.pricevalueProduct)
        .first()
        .invoke('attr', 'data-price-amount')
        .then((price) => {
            cy.get(buyProduct.cartsubtotalPrice).should('contain', price)
            cy.get(buyProduct.cartprodPrice).should('contain', price)
        })
        buyProduct.openDetails
        cy.get(buyProduct.cartSize).should('contain', "XS")
        cy.get(buyProduct.cartColor).should('contain', "Blue")
        
    })
})
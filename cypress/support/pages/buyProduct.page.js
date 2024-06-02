export default class BuyProduct {
    sizeProduct = '.product-items > :nth-child(1) > div > div > div > .size > div'
    colorProduct = '.product-items > :nth-child(1) > div > div > div > .color > div'
    submitProduct = '.product-items > :nth-child(1) > div > div > .product-item-inner > .product-item-actions > .actions-primary > form > button[type="submit"]'
    cartValue = '.showcart > .counter' 
    cartSelect = '.showcart'
    totalItems = '.count'
    cartCheckout = '#top-cart-btn-checkout'
    inputEmail = '#customer-email-fieldset > .required'
    inputName = '[name="shippingAddress.firstname"]'
    inputLast = '[name="shippingAddress.lastname"]'
    inputStreet = 'input[name="street[0]"]'
    inputCity = '[name="shippingAddress.city"]'
    selectState = 'select[name="region_id"]'
    selectCode = 'input[name="postcode"]'
    selectCountry = 'select[name="country_id"]'
    inputCell = '[name="shippingAddress.telephone"]'
    buttonNext = 'button[data-role="opc-continue"]'
    adressDetails = '.billing-address-details'
    placeOrder = 'button[title="Place Order"]'

    addtoCart(size, color){
        cy.get(`${this.sizeProduct} > [aria-label="${size}"]`).click();
        cy.get(`${this.colorProduct} > [aria-label="${color}"]`).click();
        cy.get(this.submitProduct).click({ force: true })
    }

    openCart(){
        cy.get(this.cartSelect).click()
    }

    proceedCheckout(){
        cy.get(this.cartSelect).should('be.visible').click()
        cy.get(this.cartCheckout).should('be.visible').click()
    }

    formCheckout(email, name, lastName, street, city, state, zipCode, coutry, cell){
        cy.get(this.inputEmail, { timeout: 10000 }).should('be.visible').type(email)
        cy.get(this.inputName).type(name)
        cy.get(this.inputLast).type(lastName)
        cy.get(this.inputStreet).type(street)
        cy.get(this.inputCity).type(city)
        cy.get(this.selectState).select(state)
        cy.get(this.selectCode).type(zipCode)
        cy.get(this.selectCountry).select(coutry)
        cy.get(this.inputCell).type(cell)
    }

    submitCheckout(){
        cy.get(this.placeOrder).click()
    }
}
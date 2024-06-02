export default class HomePage {
    headerSupport = 'a[href="https://buymeacoffee.com/softwaretestingboard"]'
    headerLogin = '.authorization-link'
    headerCreate = 'a[href="https://magento.softwaretestingboard.com/customer/account/create/"]'
    logoPage = '.logo > img'
    logoLink = 'a[href="https://magento.softwaretestingboard.com/"]'
    searchPage = 'input#search'
    showcartPage = '.showcart'
    menuNav = '.navigation'
    bannersPromo = '.blocks-promo'
    textProd = '.content-heading .title'
    textInfo = '.content-heading .info'
    productItems = '.product-items'
    footer = '.footer'
    searchList = '#search_autocomplete > ul[role="listbox"] li[role="option"] span.qs-option-name'
    messagesucess = '.message-success'

    findProduct(name){
      cy.get(this.searchPage).type(name)
    }

}
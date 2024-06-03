import ResultSearch from "../support/pages/resultSearch.page";
const resultSearch = new ResultSearch();

import CreateAccount from "../support/pages/createAccount.page"
const createAccount = new CreateAccount();

import HomePage from "../support/pages/home.page";
const homePage = new HomePage();

describe('Registration tests', (() => {
    
    let email, name, lastName, password

    beforeEach(() => {
        cy.visit("customer/account/create/");
    })

    it('Complete registration correctly', (() => {
        cy.get(resultSearch.resultSearch).should('contain', 'Create New Customer Account')
        cy.get(createAccount.information).should('contain', 'Personal Information')

        cy.request('https://randomuser.me/api/?inc=email,name,login')
            .then((response) => {
                expect(response.status).to.eq(200);

                email = response.body.results[0].email;
                name = response.body.results[0].name.first;
                lastName = response.body.results[0].name.last;
                password = response.body.results[0].login.password + ('@65489lk')

                createAccount.createnewAccount(name, lastName, email, password)

                cy.url().should('eq', `${Cypress.config('baseUrl')}customer/account/`)

                cy.get(homePage.messagesucess).should('contain', 'Thank you for registering with Main Website Store.')
                cy.get('.box-content > p').should('contain', name + ' ' + lastName)
                cy.get('.box-content > p').should('contain', email)
            })
    }))
}))

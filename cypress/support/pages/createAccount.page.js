export default class CreateAccount {
    information = '.info > .legend > span'
    inputFirst = '#firstname'
    inputLast = '#lastname'
    inputEmail = '#email_address'
    inputPassword = '#password'
    inputconfirmPassword = '#password-confirmation'
    buttonCreate = 'button[title="Create an Account"]'

    createnewAccount(firstName, lastName, email, password){
        cy.get(this.inputFirst).type(firstName)
        cy.get(this.inputLast).type(lastName)
        cy.get(this.inputEmail).type(email)
        cy.get(this.inputPassword).type(password)
        cy.get(this.inputconfirmPassword).type(password)
        cy.get(this.buttonCreate).click()
    }
}
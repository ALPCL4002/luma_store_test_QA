export default class HomePage {
    headerSupport = 'a[href="https://buymeacoffee.com/softwaretestingboard"]'
    headerLogin = '.authorization-link'
    headerCreate = 'a[href="https://magento.softwaretestingboard.com/customer/account/create/"]'
    logoPage = '.logo > img'
    logoLink = 'a[href="https://magento.softwaretestingboard.com/"]'
    searchPage = '#search'
    showcartPage = '.showcart'
    


    cy.get('#store.menu ul#ui-id-2').children('li').each(($li) => {
        cy.wrap($li).within(() => {
          cy.get('a').should('have.attr', 'href').and('include', 'https://'); // Verifica se o href começa com "https://"
      
          // Verifica o texto dentro do <span>
          cy.get('span').invoke('text').then((text) => {
            // Faça o que desejar com o texto, por exemplo:
            expect(text.trim()).not.to.be.empty; // Verifica se o texto não está vazio
          });
        });
      });
}
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Renan')
    cy.get('#lastName').type('Dias')
    cy.get('#email').type('renan_dm13@hotmail.com')
    cy.get('#open-text-area').type('test')
    cy.contains('button', 'Enviar').click()

})
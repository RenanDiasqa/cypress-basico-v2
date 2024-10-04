/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() { 
  cy.title().should('deep.equal','Central de Atendimento ao Cliente TAT') 
  })
  it('preenche os campo obrigatírios e envia oformulário',function()  {
    const longtext = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'
    cy.get('#firstName').type('Renan')
    cy.get('#lastName').type('Dias')
    cy.get('#email').type('renan_dm13@hotmail.com')
    cy.get('#open-text-area').type(longtext, {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')   
})
it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    const longtext = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'
    cy.get('#firstName').type('Renan')
    cy.get('#lastName').type('Dias')
    cy.get('#email').type('renan_dm13@hotmail=com')
    cy.get('#open-text-area').type(longtext, {delay:0})
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')   
})
it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
    cy.get('#phone')
    .type('adiashjdoasd')
    .should('have.value', '')
})
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function()  {
    cy.get('#firstName').type('Renan')
    cy.get('#lastName').type('Dias')
    cy.get('#email').type('renan_dm13@hotmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
 })
 it('preenche e limpa os campos nome, sobrenome, email , area de texto e telefone', function()  {
    cy.get('#firstName')
    .type('Renan')
    .should('have.value', 'Renan')
    .clear()
    .should('have.value', '')
    cy.get('#lastName')
    .type('Dias')
    .should('have.value','Dias') 
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .type('renan_dm13@hotmail.com') 
    .should('have.value','renan_dm13@hotmail.com')
    .clear()
    .should('have.value', '')
    cy.get('#open-text-area')
    .type('test')
    .should('have.value', 'test')
    .clear()
    .should('have.value','')
    cy.get('#phone')
    .type('182712717')
    .should('have.value','182712717')
    .clear()
    .should('have.value', '')
    cy.get('#phone-checkbox').check()
})
it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function()  {
    cy.contains('button', 'Enviar').click()
 
     cy.get('.error').should('be.visible')
 })
 it('envia o formuário com sucesso usando um comando customizado', function()  {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible') 
 })
 it('seleciona um produto (YouTube) por seu texto ', function()  {
    cy.get('#product')
    .select('YouTube')
    .should('have.value','youtube')
 })
 it('seleciona um produto (Mentoria) por seu valor (value)', function()  {
    cy.get('#product')
    .select('mentoria')
    .should('have.value','mentoria')
 })
 it('seleciona um produto (Blog) por seu índece', function()  {
    cy.get('#product')
    .select(1)
    .should('have.value','blog')
 })
it('marca o tipo de atendimento "Feedback"', function()  {
    cy.get('input[type="radio"][value="feedback"]') .check()
})
it('marca cada tipo de atendimento', function()  {
    cy.get('input[type="radio"]')
    .should('have.length', 3) // verificando que tem 3 elemento radio
    .each(function($radio) { // colocando função no each
    cy.wrap($radio).check() // empacotando os 3
    cy.wrap($radio).should('be.checked') // empacotando cada um e verificando
    })
})
it('marca ambos checkboxes, depois desmarca o último', function()  {
    cy.get('input[type="checkbox"]')
   .check()
   .should('be.checked')
   .last()
   .uncheck()
   .should('not.be.checked')
})
it('seleciona um arquivo da pasta fixtures', function()  {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json') // caminho do arquivo, para fazer o upload
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json') // visto pelo browser pelo comando console.log no elemento input
    })
})
it('seleciona um arquivo simulando um drag-and-drop', function()  {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'}) // caminho do arquivo, para fazer o upload
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json') // visto pelo browser pelo comando console.log no elemento input
    })
})
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function()  {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json') // visto pelo browser pelo comando console.log no elemento input
    })
})
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank') // blank te leva para uma nova aba
})
it('acessa a página da política de privacidade removendo o target e então clicando no link',function()  {
    cy.get('#privacy a') // elemento do link
    .invoke('removeAttr', 'target') // removendo o target
    .click()
    cy.contains('Talking About Testing').should('be.visible') // encontrando o texto na aba
})
 })
  
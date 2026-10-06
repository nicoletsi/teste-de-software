describe('Registro de hóspedes do hotel', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('cadastra um hóspede com sucesso', () => {
    cy.get('#name').type('John Smith');
    cy.get('#email').type('john@example.com');
    cy.get('#phone').type('555123456');
    cy.get('#checkIn').type('2026-10-10');
    cy.get('#checkOut').type('2026-10-15');
    cy.get('#guests').select('2');
    cy.get('#register').click();

    cy.contains('Hóspede registrado com sucesso!').should('be.visible');
  });

  it('exige o nome do hóspede', () => {
    cy.get('#email').type('john@example.com');
    cy.get('#phone').type('555123456');
    cy.get('#checkIn').type('2026-10-10');
    cy.get('#checkOut').type('2026-10-15');
    cy.get('#guests').select('2');
    cy.get('#register').click();

    cy.contains('O nome é obrigatório.').should('be.visible');
  });

  it('rejeita e-mail inválido', () => {
    cy.get('#name').type('John Smith');
    cy.get('#email').type('johnexample.com');
    cy.get('#phone').type('555123456');
    cy.get('#checkIn').type('2026-10-10');
    cy.get('#checkOut').type('2026-10-15');
    cy.get('#guests').select('2');
    cy.get('#register').click();

    cy.contains('Informe um e-mail válido.').should('be.visible');
  });

  it('rejeita data de saída anterior ao check-in', () => {
    cy.get('#name').type('John Smith');
    cy.get('#email').type('john@example.com');
    cy.get('#phone').type('555123456');
    cy.get('#checkIn').type('2026-10-15');
    cy.get('#checkOut').type('2026-10-10');
    cy.get('#guests').select('2');
    cy.get('#register').click();

    cy.contains('A data de saída deve ser posterior à data de entrada.').should('be.visible');
  });

  it('rejeita número de hóspedes igual a zero', () => {
    cy.get('#name').type('John Smith');
    cy.get('#email').type('john@example.com');
    cy.get('#phone').type('555123456');
    cy.get('#checkIn').type('2026-10-10');
    cy.get('#checkOut').type('2026-10-15');
    cy.get('#guests').select('0');
    cy.get('#register').click();

    cy.contains('O número de hóspedes deve ser maior que zero.').should('be.visible');
  });
});

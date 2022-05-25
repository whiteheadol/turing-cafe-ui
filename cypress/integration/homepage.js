/// <reference types="cypress" />

describe('Turing Cafe homepage', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/reservations', {fixture: 'reservations'});

    cy.visit('http://localhost:3000/')

  });

  it('Should display a title, a form, and all current reservations on page load', () => {
    cy.contains('Turing Cafe Reservations')

    cy.get('input[name="name"]').should('exist')
    cy.get('input[name="date"]').should('exist')
    cy.get('input[name="time"]').should('exist')
    cy.get('input[name="number"]').should('exist')
    cy.get('.resy-button').should('exist')

    cy.get('.resy-card').should('have.length', 9)

  });

  it('Should display the correct reservations', () => {
    cy.get('.resy-card').first().contains('Christie')
    cy.get('.resy-card').first().contains('12/29')
    cy.get('.resy-card').first().contains('7:00 pm')
    cy.get('.resy-card').first().contains('Number of guests: 12')

    cy.get('.resy-card').last().contains('Brittany')
    cy.get('.resy-card').last().contains('9/9')
    cy.get('.resy-card').last().contains('7:30 pm')
    cy.get('.resy-card').last().contains('Number of guests: 3')

  });

  it('Should be able to enter input into the form to update its values', () => {
    cy.get('input[name="name"]')
      .type('Olivia')
      .should('have.value', 'Olivia')

    cy.get('input[name="date"]')
      .type('1/6')
      .should('have.value', '1/6')

    cy.get('input[name="time"]')
      .type('6:30')
      .should('have.value', '6:30')

    cy.get('input[name="number"]')
      .type('2')
      .should('have.value', '2')

  });

  it('Should be able to submit a new reservation using the form', () => {
    cy.get('input[name="name"]')
      .type('Olivia')
    cy.get('input[name="date"]')
      .type('1/6')
    cy.get('input[name="time"]')
      .type('6:30')
    cy.get('input[name="number"]')
      .type('2')

    cy.get('.resy-button').click()

    cy.get('.resy-card').should('have.length', 10)

    cy.get('.resy-card').last().contains('Olivia')
    cy.get('.resy-card').last().contains('1/6')
    cy.get('.resy-card').last().contains('6:30 pm')
    cy.get('.resy-card').last().contains('Number of guests: 2')

  })
})

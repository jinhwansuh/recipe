/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('getByCy', (text) => {
  return cy.get(`[data-cy=${text}]`);
});

Cypress.on('uncaught:exception', (err) => {
  // Check if the error message includes "NEXT_REDIRECT"
  if (err.message.includes('NEXT_REDIRECT')) {
    return false;
  }
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.getByCy('email-input').type(email);
  cy.getByCy('password-input').type(`${password}{enter}`, { log: false });
  cy.intercept('GET', 'api/auth/session').as('session');
  cy.wait('@session');
});

Cypress.Commands.add('loginTestId', () => {
  cy.login('test@test.com', '123123');
  cy.url().should('eq', Cypress.config().baseUrl + '/');
  cy.getCookie('authjs.session-token').should('exist');
});

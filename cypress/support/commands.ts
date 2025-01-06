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

/**
 * @description data-cy로 설정된 엘리먼트를 쉽게 찾을 수 있는 커스텀 커맨드
 */
Cypress.Commands.add('getByCy', (text) => {
  return cy.get(`[data-cy=${text}]`);
});

Cypress.on('uncaught:exception', (err) => {
  // Check if the error message includes "NEXT_REDIRECT"
  if (err.message.includes('NEXT_REDIRECT')) {
    return false;
  }
});

/**
 * test ID로 로그인하는 커맨드
 */
Cypress.Commands.add('login', () => {
  cy.visit('/signin');
  cy.getByCy('email-input').type('test@test.com');
  cy.getByCy('password-input').type(`${'123123'}{enter}`, { log: false });
  cy.intercept('GET', 'api/auth/session').as('session');
  cy.wait('@session');
  cy.url().should('eq', Cypress.config().baseUrl + '/');
  cy.getCookie('authjs.session-token').should('exist');
});

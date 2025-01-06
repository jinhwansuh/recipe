describe('로그인 페이지', () => {
  it('테스트아이디로 로그인하면 쿠키에 token이 들어간다.', () => {
    cy.visit('/signin');
    cy.getByCy('email-input').type('test@test.com');
    cy.getByCy('password-input').type(`${'123123'}{enter}`, { log: false });

    cy.intercept('GET', 'api/auth/session').as('session');
    cy.wait('@session');

    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.getCookie('authjs.session-token').should('exist');
  });
});

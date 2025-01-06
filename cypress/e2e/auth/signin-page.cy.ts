describe('로그인 페이지', () => {
  beforeEach(() => {
    // prepare
    cy.visit('/signin');
  });

  it('테스트아이디로 로그인하면 쿠키에 token이 들어간다.', () => {
    cy.loginTestId();
  });

  it('잘못된 아이디로 로그인하면 toast 메세지가 나타난다.', () => {
    cy.login('test123123123123@test.com', '123123123');
    cy.getByCy('toast').should('be.visible');
  });
});

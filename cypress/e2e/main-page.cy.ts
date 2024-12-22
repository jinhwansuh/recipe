describe('메인 페이지', () => {
  beforeEach(() => {
    // prepare
    cy.visit('/');
  });

  it('input에 값을 입력하고 클릭을 누르면 페이지가 이동한다.', () => {
    // action
    const value = '삼겹살';
    cy.getByCy('search-input').type(value);
    cy.getByCy('search-button').click();

    // assertion
    cy.url().should('include', `/search?query=${encodeURIComponent(value)}`);
  });
});

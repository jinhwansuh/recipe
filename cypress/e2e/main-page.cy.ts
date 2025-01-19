import { SearchQueryKey } from '../../constants/key';
import { PAGE_ROUTES } from '../../constants/route';

describe('메인 페이지', () => {
  beforeEach(() => {
    // prepare
    cy.visit('/');
  });

  it('input에 값을 입력하고 클릭을 누르면 페이지가 이동한다.', () => {
    // action
    const value = '삼겹살';
    cy.getByCy('search-input').type(`${value}{enter}`);

    // assertion
    cy.url().should(
      'include',
      `${PAGE_ROUTES.SEARCH}?${SearchQueryKey}=${encodeURIComponent(value)}`,
    );
  });
});

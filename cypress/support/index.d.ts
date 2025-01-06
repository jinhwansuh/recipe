import { HTMLAttributes } from 'react';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * @description data-cy로 설정된 엘리먼트를 쉽게 찾을 수 있는 커스텀 커맨드
       */
      getByCy(value: string): Chainable<HTMLAttributes>;
      /**
       * @description 로그인 커맨드
       */
      login(email: string, password: string): Chainable<void>;
      /**
       * @description test ID로 로그인하는 커맨드
       */
      loginTestId(): Chainable<void>;
    }
  }
}

declare namespace Cypress {
  interface Chainable<Subject = any> {
    setLocale(locale: string): Chainable<void>;
  }
}

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<void>;
  }
}

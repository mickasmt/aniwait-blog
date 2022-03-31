import faker from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    // cy.cleanupUser();
  });

  it("Should allow you to register", () => {
    const loginForm = {
      username: faker.internet.userName(),
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password()
    };
    
    cy.visit("/");
    cy.findByRole("link", { name: /Connexion/i }).click();
    cy.findByRole("link", { name: /S'inscrire !/i }).click();

    cy.findByRole("textbox", { name: /username/i }).type(loginForm.username);
    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /Créer un compte/i }).click();
  });

  it("Should allow you to login and logout", () => {
    cy.visit("/");
    cy.findByRole("link", { name: /Connexion/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type('rachel@remix.run');
    cy.get('input[type=password]').type('racheliscool', { force: true })
    cy.findByRole("button", { name: /Se connecter/i }).click();

    // cy.findByRole("link", { name: /Planning/i }).click();
    // cy.findByRole("link", { name: /Actus/i }).click();
    cy.contains('Voir plus').click();
    cy.findByRole("link", { name: /Compte/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();
  });

  // it("should allow you to create a post", () => {
    //   const testNote = {
    //     title: faker.lorem.words(1),
    //     body: faker.lorem.sentences(1),
    //   };
      // cy.login();
      // cy.visit("/");
      
      // cy.findByRole("link", { name: /Planning/i }).click();
      // cy.findByRole("link", { name: /Actus/i }).click();
      // cy.findByRole("link", { name: /log in/i });
      // cy.findByRole("button", { name: /logout/i }).click();
  
    //   cy.findByRole("link", { name: /notes/i }).click();
    //   cy.findByText("No notes yet");
  
    //   cy.findByRole("link", { name: /\+ new note/i }).click();
  
    //   cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
    //   cy.findByRole("textbox", { name: /body/i }).type(testNote.body);
    //   cy.findByRole("button", { name: /save/i }).click();
  
    //   cy.findByRole("button", { name: /delete/i }).click();
  
    //   cy.findByText("No notes yet");
    // });
});

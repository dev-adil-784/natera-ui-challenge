describe('FieldFromPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('renders the first form by default', () => {
    cy.get('[data-test-id="card-title"]').should('contain', 'Form 1');
    cy.get('input[name="field1"]').should('be.visible');
    cy.get('input[name="field2"]').should('be.visible');
  });

  it('toggles to the second form when the switch is clicked', () => {
    cy.get('input[aria-label="controlled"]').click();

    cy.get('[data-test-id="card-title"]').should('contain', 'Form 2');
    cy.get('input[name="checkbox1"]').should('not.be.checked');
    cy.get('input[name="checkbox2"]').should('not.be.checked');
    cy.get('input[name="field1"]').should('be.visible');
  });

  it('fills out the form and submits', () => {
    cy.get('input[name="field1"]').type('Test Input 1');
    cy.get('input[name="field2"]').type('Test Input 2');
    cy.get('textarea[name="notes"]').type('Sample note for testing.');

    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts', {
      statusCode: 201,
      body: { message: 'Post created successfully!' },
    }).as('createPost');

    cy.get('button[type="submit"]').click();
    cy.wait('@createPost').its('response.statusCode').should('eq', 201);
  });

  it('clears form fields when switching between forms', () => {
    // Fill out the first form
    cy.get('input[name="field1"]').type('Test Input 1');
    cy.get('input[name="field2"]').type('Test Input 2');

    // Switch to the second form
    cy.get('input[aria-label="controlled"]').click();

    // Verify that the fields are cleared
    cy.get('input[name="field1"]').should('have.value', '');
    cy.get('input[name="checkbox1"]').should('not.be.checked');
    cy.get('input[name="checkbox2"]').should('not.be.checked');
  });
});


describe('CI Browser Diagnostic', () => {
    it('should report what the browser receives', () => {
        cy.visit('/auth/login', {
            failOnStatusCode: false
        });

        cy.document().then((doc) => {
            const title = doc.title || '(empty title)';

            const bodyText = (
                doc.body?.innerText ||
                doc.body?.textContent ||
                ''
            )
                .replace(/\s+/g, ' ')
                .trim()
                .slice(0, 500) || '(empty body)';

            // Intentional failure so the diagnostic appears
            // directly in the Cypress test error output.
            throw new Error(
                `CI_DIAGNOSTIC | title=${JSON.stringify(title)} | body=${JSON.stringify(bodyText)}`
            );
        });
    });
});

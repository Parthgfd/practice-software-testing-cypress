import ProductListingPage from "../../pages/ProductListingPage";
describe('Product Search', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('should search for a product', () => {

        ProductListingPage.searchProduct('Pliers');
        ProductListingPage.clickSearch();

        cy.contains('[data-test="product-name"]', 'Pliers')
            .should('be.visible');
    });
    //Concept of intercept begins
    it('should modify the search request before sending it to the API', () => {

        cy.intercept('QUERY', '/products/search', (req) => {
            req.body.q = 'Hammer';
            req.continue();
        }).as('searchProducts');

        ProductListingPage.searchProduct('Pliers');
        ProductListingPage.clickSearch();

        cy.wait('@searchProducts')
          .then((result) => {
             expect(result.request.body.q).to.eq('Hammer');
                expect(result.response.statusCode).to.eq(200);
          });
    });
    it('should inspect request headers', () => {
        cy.intercept('QUERY', '/products/search', (req) => {
            req.continue();
        }).as('searchProducts');

        ProductListingPage.searchProduct('Pliers');
        ProductListingPage.clickSearch();

        cy.wait('@searchProducts')
            .then((result) => {
              console.log(result.request.headers);  
              expect(result.request.headers).to.exist;
        });
    });

    it('checking existing request header', () => {

    cy.intercept('QUERY', '/products/search', (req) => {

        req.headers['content-type'] = 'application/json';

        req.continue();

    }).as('searchProducts');

    ProductListingPage.searchProduct('Pliers');
    ProductListingPage.clickSearch();

    cy.wait('@searchProducts')
        .then((result) => {
            expect(result.request.headers['content-type'])
                .to.eq('application/json');
        });
});

it('should modify the search request conditionally', () => {

    cy.intercept('QUERY', '**/products/search', (req) => {

        if (req.body.q === 'Pliers') {
            req.body.q = 'Hammer';
        }

        req.continue();

    }).as('searchProducts');

    ProductListingPage.searchProduct('Pliers');
    ProductListingPage.clickSearch();

    cy.wait('@searchProducts')
        .then((result) => {
            expect(result.request.body.q).to.eq('Hammer');
            expect(result.response.statusCode).to.eq(200);
        });
});

it('should check the real API response', () => {

    cy.intercept('QUERY', '**/products/search', (req) => {

        req.continue((res) => {
            console.log(res.body);

        });

    }).as('searchProducts');

    ProductListingPage.searchProduct('Pliers');
    ProductListingPage.clickSearch();

    cy.wait('@searchProducts');
});
it.only('should modify the real API response', () => {

    cy.intercept('QUERY', '/products/search', (req) => {

        req.continue((res) => {
            const product = res.body.data.find(
                product => product.name === 'Combination Pliers'
            );

            product.price = 999.99;
        });

    }).as('searchProducts');

    ProductListingPage.searchProduct('Pliers');
    ProductListingPage.clickSearch();

    cy.wait('@searchProducts');
    cy.contains('[data-test="product-name"]', 'Combination Pliers')
    .should('be.visible')
    .parents('.card')
    .within(() => {
        cy.get('[data-test="product-price"]')
            .should('contain.text', '999.99');
    
    });
});

});
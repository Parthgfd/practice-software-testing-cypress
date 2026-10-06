import ProductListingPage from '../../pages/ProductListingPage';
describe('Product Search - Network Interception', () => {

    it('should intercept product search request', () => {
        
    //cy.intercept watches for a network request and .as('') gives that request a nickname(alias)
        cy.intercept({
            method: 'QUERY',
            pathname: '/products/search'
        }).as('searchProducts');
        cy.visit('/');

        cy.get('[data-test="search-query"]')
            .type('Pliers');

        cy.get('[data-test="search-submit"]')
            .click();

        cy.wait('@searchProducts');
        //means wait until network request that I named 'searchProducts' happens and finishes
    });
     it('should intercept product search request-2', () => {

       cy.visit('/');

       cy.intercept('QUERY', '/products/search')
            .as('searchProducts');

        ProductListingPage.searchProduct('Pliers');
        ProductListingPage.clickSearch();

        cy.wait('@searchProducts')
          .then((abc) => {
            //cy.log(JSON.stringify(abc));
            cy.log(abc.request.url); //https://api.practicesoftwaretesting.com/products/search
            cy.log(abc.request.method);//Query
            cy.log(abc.request.body.q);//Pliers
            expect(abc.request.body.q)
                .to.eq('Pliers');
            expect(abc.response.statusCode) //what the server returned
            .to.eq(200);    
            //cy.log(JSON.stringify(abc.response.body));

            const product = abc.response.body.data.find(
            product => product.name === 'Pliers'
            );

            expect(product).to.exist;
        });
    });
    //We'll take the same search request and instead of allowing the real API to respond, 
    // we'll make Cypress return a fake response that we control.Thats stubbing

});
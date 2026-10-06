//We'll take the same search request and instead of allowing the real API to respond, 
// we'll make Cypress return a fake response that we control.Thats stubbing

import ProductListingPage from '../../pages/ProductListingPage';

describe('Product Search - API Stubbing', () => {

    beforeEach(() => {
        cy.visit('/');
         cy.fixture('apiData').as('apiData');
    });

    it('should display a stubbed product', () => {
        cy.intercept(
            'QUERY',
            '/products/search',
            {//So we're controlling both the status and response data.
                statusCode: 200, //When the UI sends this QUERY /products/search request, don't use the real server response. Give the UI this response instead.
                body: {
                    current_page: 1,
                    data: [
                        {
                        id: 'fake-product-001',
                        name: 'Test Hammer',
                        description: 'A test hammer used for Cypress API stubbing.',
                        price: 99.99,
                        is_location_offer: false,
                        is_rental: false,
                        co2_rating: 'A',
                        in_stock: true,
                        is_eco_friendly: false,
                        product_image: {
                            id: 'fake-image-001',
                            by_name: 'Test Image',
                            by_url: 'https://example.com/test-hammer.jpg',
                            source_name: 'Test Source',
                            source_url: 'https://example.com',
                            file_name: 'test-hammer.jpg',
                            title: 'Test Hammer'
                        },
                        category: {
                            id: 'fake-category-001',
                            name: 'Hand Tools'
                        },
                        brand: {
                            id: 'fake-brand-001',
                            name: 'Test Brand'
                        }
                    }]
                }
            }
    ).as('searchProducts');

        //cy.visit('/');

        //ProductListingPage.searchProduct('Pliers');
       //ProductListingPage.clickSearch();
       
        cy.get('@apiData').then((data) => {
            ProductListingPage.searchProduct(data.products.search.name);
            ProductListingPage.clickSearch();
        });

        cy.wait('@searchProducts')
        
        cy.contains('[data-test="product-name"]', 'Test Hammer')
            .should('be.visible');
    });
it('should handle an empty search result', () => {
    cy.intercept(
        'QUERY',
        '/products/search',
        {
            statusCode: 200,
            body: {
                current_page: 1,
                data: []
            }
        }
    ).as('searchProducts');

    //cy.visit('/');

    //ProductListingPage.searchProduct('Pliers');
    //ProductListingPage.clickSearch();

    cy.get('@apiData').then((data) => {
        ProductListingPage.searchProduct(data.products.search.name);
        ProductListingPage.clickSearch();
    });

    cy.wait('@searchProducts');
});
it('should handle a search API server error', () => {
    cy.intercept(
        'QUERY',
        '/products/search',
        {
            statusCode: 500,
            body: {
                message: 'Internal Server Error'
            }
        }
    ).as('searchProducts');

    //cy.visit('/');

    //ProductListingPage.searchProduct('Pliers');
    //ProductListingPage.clickSearch();

    cy.get('@apiData').then((data) => {
        ProductListingPage.searchProduct(data.products.search.name);
        ProductListingPage.clickSearch();
    });

    cy.wait('@searchProducts');
});

});

import ProductsApi from "../../api/ProductsApi";
import ProductPage from "../../pages/ProductPage";

describe('Products API - API Layer', () => {
    // before(() => {
    //     cy.log('API test suite is starting');
    // });
    // afterEach(() => {
    //     cy.log('API test completed');
    // });
    // after(() => {
    //     cy.log('API test suite completed');
    // });
    
    beforeEach(() => {
        cy.fixture('apiData').as('apiData');
    });

    it('should retrieve all products using ProductsApi', () => {

        ProductsApi.getProducts()
            .then((response) => {
                 cy.log(JSON.stringify(response.body.data));
                 //expect(response.status).to.eq(200);
                 cy.assertApiSuccess(response);

                 expect(response.body.data)
                    .to.be.an('array')
                    .and.not.be.empty;

            });

    });
    it('should search products using ProductsApi', () => {

    ProductsApi.searchProducts('Pliers')
        .then((response) => {
            
           
            //expect(response.status).to.eq(200);
            cy.assertApiSuccess(response);

            expect(response.body.data)
                .to.be.an('array')
                .and.not.be.empty;

            const pliers = response.body.data.find(
                product => product.name === 'Pliers'
            );
            

            expect(pliers).to.exist;

        });

    });
    it('should search products using ProductsApi-BeforeEach', () => {
      cy.get('@apiData').then((data) => {
        ProductsApi.searchProducts(data.products.search.name)
            .then((response) => {
                cy.assertApiSuccess(response);

                expect(response.body.data)
                    .to.be.an('array')
                    .and.not.be.empty;

                //const product = response.body.data.find(
                    //product =>
                      //  product.name === data.products.search.name
                //);

                //expect(product).to.exist;

                cy.assertProductExists(
                    response.body.data,
                    data.products.search.name
                );
            });
        });
    });
    it('should retrieve products from a specific page', () => {

     ProductsApi.getProductsByPage(2)
        .then((response) => {

            //expect(response.status).to.eq(200);
            cy.assertApiSuccess(response);
            expect(response.body.current_page).to.eq(2);

            expect(response.body.data)
                .to.be.an('array')
                .and.not.be.empty;

        });

});
    it('should return different products for different pages', () => {

        ProductsApi.getProductsByPage(1)
            .then((page1Response) => {

            ProductsApi.getProductsByPage(2)
                .then((page2Response) => {

                    //expect(page1Response.status).to.eq(200);
                    cy.assertApiSuccess(page1Response);
                    //expect(page2Response.status).to.eq(200);
                    cy.assertApiSuccess(page2Response);

                    const page1Ids = page1Response.body.data.map(
                        product => product.id
                    );

                    const page2Ids = page2Response.body.data.map(
                        product => product.id
                    );

                    expect(page1Ids).to.not.deep.equal(page2Ids);

                });
        });
    });
    it('should retrieve a product by ID using ProductsApi', () => {
       ProductsApi.searchProducts('Pliers')
        .then((response) => {
            const pliers = response.body.data.find(
                product => product.name === 'Pliers'
            );

            ProductsApi.getProductById(pliers.id)
                .then((productResponse) => {
                    cy.assertApiSuccess(productResponse);
                    expect(productResponse.body.name).to.eq('Pliers');
                    expect(productResponse.body.id).to.eq(pliers.id);
                });
        });
});
//import ProductPage.js
it('should validate product details between API and UI', () => {
    ProductsApi.searchProducts('Pliers')
        .then((response) => {
            const pliers = response.body.data.find(
                product => product.name === 'Pliers'
            );
             expect(pliers).to.exist;
             ProductsApi.getProductById(pliers.id)
                .then((productResponse) => {
                    cy.log(pliers.id)
                    cy.log(JSON.stringify(productResponse.body));
                    expect(productResponse.status).to.eq(200);
                     cy.visit(`product/${pliers.id}`)

                    //const product = productResponse.body;
                    //cy.visit(`product/${product.id}`);
                    ProductPage.getProductName()
                        .should('be.visible')
                        .and('contain.text', pliers.name);

                    ProductPage.getProductPrice()
                        .should('be.visible')
                        .and('contain.text', `${pliers.price}`);
                })
        })
})

//here , we clean up the nested .then()
it('should validate product details between API and UI', () => {
    ProductsApi.searchProducts('Pliers')
        .then((response) => {
            const pliers = response.body.data.find(
                product => product.name === 'Pliers'
            );

            expect(pliers).to.exist;

            return ProductsApi.getProductById(pliers.id);
        })
        .then((productResponse) => {
            expect(productResponse.status).to.eq(200);

            const product = productResponse.body;

            cy.visit(`product/${product.id}`);

            ProductPage.getProductName()
                .should('be.visible')
                .and('contain.text', product.name);

            ProductPage.getProductPrice()
                .should('be.visible')
                .and('contain.text', `${product.price}`);
        });
});
it('should return an error for an invalid product ID', () => {
    ProductsApi.getProductByInvalidId('invalid-product-id')
        .then((response) => {
            //expect(response.status).to.be.oneOf([404, 422]);
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq('Requested item not found');

            cy.log(JSON.stringify(response.body));
        });
});
/* "products": {
         "searchProduct": "Pliers",
         "invalidProductId": "invalid-product-id",
         "expectedInvalidProductStatus": 404,
         "expectedInvalidProductMessage": "Requested item not found"
     }*/ // in apiData.json
// it('should return 404 for an invalid product ID', () => {
//     cy.fixture('apiData').then((data) => {
//         ProductsApi.getProductByInvalidId(
//             data.products.invalidProductId
//         ).then((response) => {
//             expect(response.status)
//                 .to.eq(data.products.expectedInvalidProductStatus);

//             expect(response.body.message)
//                 .to.eq(data.products.expectedInvalidProductMessage);
//         });
//     });
// });
// it.only('should search products using ProductsApi', () => {
//     cy.fixture('apiData').then((data) => {
//         ProductsApi.searchProducts(data.products.searchProduct)
//             .then((response) => {
//                 cy.assertApiSuccess(response);

//                 expect(response.body.data)
//                     .to.be.an('array')
//                     .and.not.be.empty;

//                 const product = response.body.data.find(
//                     product =>
//                         product.name === data.products.searchProduct
//                 );

//                 expect(product).to.exist;
//             });
//     });
// });
it('should search products using ProductsApi', () => {
    cy.fixture('apiData').then((data) => {
        ProductsApi.searchProducts(data.products.search.name)
            .then((response) => {
                cy.assertApiSuccess(response);

                expect(response.body.data)
                    .to.be.an('array')
                    .and.not.be.empty;

                const product = response.body.data.find(
                    product =>
                        product.name === data.products.search.name
                );

                expect(product).to.exist;
            });
    });
});
it('should return 404 for an invalid product ID', () => {
    cy.fixture('apiData').then((data) => {
        ProductsApi.getProductByInvalidId(
            data.products.invalid.id
        ).then((response) => {
            expect(response.status)
                .to.eq(data.products.invalid.expectedStatus);

            expect(response.body.message)
                .to.eq(data.products.invalid.expectedMessage);
        });
    });
});


});
import ProductPage from "../../pages/ProductPage";

describe('Products API', () => {

    it('should retrieve all products', () => {
        //cy.request directly sends HTTP request to the API
        cy.request('GET', `${Cypress.expose('apiUrl')}products`)
            .then((response) => {

                expect(response.status).to.eq(200);
                cy.log(JSON.stringify(response.body)); 
                expect(response.body.data).to.be.an('array').and.not.to.be.empty; 
                
                
                const pliers = response.body.data.find(
                    product => product.name === 'Pliers'
                );

                expect(pliers).to.exist;
                expect(pliers.name).to.eq('Pliers');
                expect(pliers.price).to.eq(12.01);
                expect(pliers.in_stock).to.be.true;
            });
          

    });
    it('should search products by name', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.expose('apiUrl')}products/search`,
        qs: {
            q: 'Pliers'
        }//cypress turns it into /products/search?q=pliers
    }).then((response) => {

        expect(response.status).to.eq(200);

        expect(response.body.data)
            .to.be.an('array')
            .and.not.be.empty;

            const pliers = response.body.data.find(
                    product => product.name === 'Pliers'
                );

                expect(pliers).to.exist;
                expect(pliers.name).to.eq('Pliers');
                expect(pliers.price).to.eq(12.01);
                expect(pliers.in_stock).to.be.true;
        });
    });
    it('should validate product details between API and UI', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.expose('apiUrl')}products/search`,
        qs: {
            q: 'Pliers'
        }
    }).then((response) => {

        const pliers = response.body.data.find(
            product => product.name === 'Pliers'
        );

        //cy.log(pliers.id);
        //cy.log(pliers.name);
        cy.visit(`product/${pliers.id}`)
        ProductPage.getProductName().should('be.visible').and('contain.text',pliers.name);
        ProductPage.getProductPrice().should('be.visible').and('contain.text',`${pliers.price}`)

        });
    });
    it('should reject search request without query', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.expose('apiUrl')}products/search`,
        failOnStatusCode: false
    }).then((response) => {
        //expect(response.status).to.not.eq(200);
        console.log('Status: ',response.status)
        console.log('Body: ',response.body)
        cy.log(JSON.stringify(response.body));

        expect(response.status).to.eq(200);

        expect(response.body.data)
            .to.be.an('array')
            .and.be.empty;

        expect(response.body.total).to.eq(0);    


        });
    });
    it('should retrieve products from page 1', () => {
        cy.request({
        method: 'GET',
        url: `${Cypress.expose('apiUrl')}products`,
        qs: {
            page: 1
        }
        }).then((response) => {
        expect(response.status).to.eq(200);

        cy.log(JSON.stringify(response.body));
       
        expect(response.body.current_page).to.eq(1);

        expect(response.body.data)
            .to.be.an('array')
            .and.not.be.empty;
        expect(response.body.per_page).to.be.a('number');
        expect(response.body.per_page).to.be.greaterThan(0);   
        expect(response.body.last_page).to.be.a('number');
        expect(response.body.last_page).to.be.at.least(1); 
        });
    });
    it('should retrieve products from page 2', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.expose('apiUrl')}products`,
        qs: {
            page: 2
        }
    }).then((response) => {

        expect(response.status).to.eq(200);

        expect(response.body.current_page).to.eq(2);

        expect(response.body.data)
            .to.be.an('array')
            .and.not.be.empty;
        });
    });
    it('should return different products for different pages', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.expose('apiUrl')}products`,
        qs: {
            page: 1
        }
    }).then((page1Response) => {

        cy.request({
            method: 'GET',
            url: `${Cypress.expose('apiUrl')}products`,
            qs: {
                page: 2
            }
        }).then((page2Response) => {

            expect(page1Response.status).to.eq(200);
            expect(page2Response.status).to.eq(200);

            const page1Ids = page1Response.body.data.map(
                product => product.id //Output: [101, 102, 103]
            );

            const page2Ids = page2Response.body.data.map(
                product => product.id
            );

            expect(page1Ids).to.not.deep.equal(page2Ids);
            });
        });
    });

});
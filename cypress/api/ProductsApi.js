class ProductsApi {
    apiUrl = Cypress.expose('apiUrl');
    getProducts() {
        return cy.request({
            method: 'GET',
            //url: `${Cypress.expose('apiUrl')}products`
            url: `${this.apiUrl}products`
        })
    }
    searchProducts(query){
        return cy.request({
            method: 'GET',
           //url: `${Cypress.expose('apiUrl')}products/search`,
           url: `${this.apiUrl}products/search`,
            qs: {
                q: query
            }
        })
    }
    getProductsByPage(page) {
        return cy.request({
            method: 'GET',
            //url: `${Cypress.expose('apiUrl')}products`,
            url: `${this.apiUrl}products`,
            qs: {
              page: page
            }
        });
    }
    getProductById(productId) {
        return cy.request({
            method: 'GET',
            //url: `${Cypress.expose('apiUrl')}products/${productId}`
            url: `${this.apiUrl}products/${productId}`,
        });
    }
    getProductByInvalidId(productId) {
        return cy.request({
            method: 'GET',
            url: `${this.apiUrl}products/${productId}`,
            failOnStatusCode: false
        });
    }
}
export default new ProductsApi();
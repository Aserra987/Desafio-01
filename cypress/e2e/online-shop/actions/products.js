import { productsPage } from "../pages/products";
export const productActions = {
    
    searchProduct({id, name}) {
        if (id) {
            cy.getElement({dataCy: productsPage.elements.dataCys.searchTypeList}).select('ID');
            cy.getElement({dataCy: productsPage.elements.dataCys.searchProductBar}).clear().type(id).type('{enter}')
        }
        if (name) {
            cy.getElement({dataCy: productsPage.elements.dataCys.searchTypeList}).select('name');
            cy.getElement({dataCy: productsPage.elements.dataCys.searchProductBar}).clear().type(name).type('{enter}')
        }
    },

    completeAddProductForm({name, price, imageUrl, id }) {
        cy.getElement({dataCy: productsPage.elements.dataCys.addProductButton}).click()
        cy.getElement({dataCy: productsPage.elements.dataCys.productNameTextBox}).type(name)
        cy.getElement({dataCy: productsPage.elements.dataCys.productPriceTextBox}).type(price)
        cy.getElement({dataCy: productsPage.elements.dataCys.productImage}).type(imageUrl)
        cy.getElement({dataCy: productsPage.elements.dataCys.productIdTextBox}).type(id)
    }, 

    clickDeleteProductButton({productId}) {
        cy.get(`[data-cy="delete-${productId}"]`).should('be.visible').click();
    }
    
}
   
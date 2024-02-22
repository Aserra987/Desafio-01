/// <reference types="cypress" />
import { createUserPage } from "../pages/createUser";
import { homePage } from "../pages/home";
import { productsPage } from "../pages/products" 
import { productActions } from "../actions/products"; 

describe('Desafio-01', () => {
  
  before(() => {
    cy.fixture('users').then(data => {
      cy.visit('/');
      cy.getElement({dataCy: createUserPage.elements.dataCys.loginPageLink}).dblclick();
      cy.login(data.username, data.password);
      cy.getElement({dataCy: homePage.elements.dataCys.onlineshoplink}).click();
    });
  })

  it('Desafio-01', () => {
    cy.fixture('products').then(product => {
      const productId = Math.floor(Math.random() * 9999);

      // Create Product
      productActions.completeAddProductForm({
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl, 
        id: productId 
      });
      cy.getElement({dataCy: productsPage.elements.dataCys.createProductButton}).click();
      cy.contains('Remera AS has been added').should('be.visible');
      cy.getElement({selector: productsPage.elements.selectors.closeModalButton}).click();

      productActions.searchProduct({id: productId});

      // Verify search result
      cy.get(productsPage.elements.selectors.productImage)
      .should('have.length', 1)
      .should('be.visible')
      .invoke('attr', 'src')
      .should('eq', product.imageUrl);
      cy.getElement({selector: productsPage.elements.selectors.productNameLabel}).should('contains.text', product.name);
      cy.getElement({selector: productsPage.elements.selectors.producPriceLabel}).should('contains.text', product.price);
      
      // Delete Product
      productActions.clickDeleteProductButton({productId: productId});
      cy.contains(`Are you sure you want to delete ${product.name}`).should('be.visible');
      cy.getElement({selector: productsPage.elements.selectors.saveEditButton}).click();
      cy.contains('Remera AS has been deleted');
      cy.getElement({selector: productsPage.elements.selectors.closeModalButton}).click();

      productActions.searchProduct({id: productId});

      // Verify search result
      cy.get(productsPage.elements.selectors.productImage).should('have.length', 0).should('not.exist');
    });
  })
})

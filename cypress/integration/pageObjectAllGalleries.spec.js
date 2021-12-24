import { authLogin } from '../page_objects/authLogin';
import { validEmail , password, title } from "../../config";
import { header } from '../page_objects/header';
import { allGalleries } from '../page_objects/allGalleries';

describe('POM all galleries', () => {

    before(function(){
        cy.visit("/");
        header.login.click()
        authLogin.login(validEmail, password)
        cy.url().should('not.include', 'login')
        
    })
    it('find all galleries with same name', () => {
        allGalleries.searchField.type('Deeee')
        allGalleries.filterBtn.click()
        allGalleries.galleryCard.should('have.length', 5)
            .and('contain', 'Dejan Dejann')
    });

    it('load more button open 10 galleries', () => {
        allGalleries.galleryCard.should('have.length', 10)
        allGalleries.loadMoreBtn.click()
        allGalleries.galleryCard.should('have.length', 20)
        allGalleries.loadMoreBtn.click()
        allGalleries.galleryCard.should('have.length', 30)
        allGalleries.loadMoreBtn.should('exist')
        
    });

    it.only('open gallery and send comment', () => {
        allGalleries.galleryCard.contains(title).click()
        allGalleries.commentField.type('ajskld')
        allGalleries.submitBtn.click()
        cy.get('li[class="list-group-item"]').should('contain', 'ajskld')
        allGalleries.getAllGalleryTitle(title).should('be.visible')
            .and('have.css', 'color', 'rgb(72, 73, 75)')

    });
});
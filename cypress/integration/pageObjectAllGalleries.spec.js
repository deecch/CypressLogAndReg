import { validEmail , password, title } from "../../config";
import { allGalleries } from '../page_objects/allGalleries';

describe('POM all galleries', () => {

    let userData = {
        title: 'Title',
        comment: 'some comment'
    }

    before(function(){
        cy.loginViaBackend()
        cy.visit("/");
        
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

    it('open gallery and send comment', () => {
        allGalleries.galleryCard.contains(userData.title).click()
        allGalleries.commentField.type(userData.comment)
        allGalleries.submitBtn.click()
        allGalleries.commentBox.should('contain', userData.comment)
        allGalleries.getAllGalleryTitle(userData.title).should('be.visible')
            .and('have.css', 'color', 'rgb(72, 73, 75)')

    });
});
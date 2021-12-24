import { createGallery, createGalley } from '../page_objects/createGallery';
import { validEmail , password, title, space } from "../../config";
const faker = require('faker');
import { header } from '../page_objects/header';
import { authLogin } from '../page_objects/authLogin';
import { validationMsg } from "../fixtures/validationMsg.json";
import { allGalleries } from '../page_objects/allGalleries';

describe('POM create gallery', () => {

    let userData = {
        randomTitle : faker.lorem.word(1),
        randomTitle1 : faker.lorem.words(256),
        randomDescription : faker.lorem.words(20),
        randomDescription1 : faker.lorem.words(1001),
        randomImg : faker.image.imageUrl() + '.jpg',
        randomImg1 : faker.image.imageUrl() + '.gif'
    }

    before(function(){
        cy.visit("/");
        header.login.click()
        authLogin.login(validEmail, password)
        cy.url().should('not.include', 'login')
        createGallery.create.click()
        
    })
    
    it('create gallery with empty fields', () => {
        createGallery.createGalleryWithOneImg(space, space, space)
        createGallery.submitBtn.should('exist')
        createGallery.title.should('have.value', space)
        createGallery.errorMsg.should('contain', validationMsg.msgWrongImgFormat)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        createGallery.createGalleryTitle.should('be.visible')
            .and('have.css', 'color', 'rgb(72, 73, 75)')
    
    });

    it('create gallery with title which has less then 2 characters', () => {
        cy.reload()
        createGallery.createGalleryWithOneImg(userData.randomTitle, userData.randomDescription, userData.randomImg)
        createGallery.errorMsg.should('contain', validationMsg.msgTitleLessChart)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        createGallery.errorMsg.should('contain', validationMsg.msgWrongImgFormat)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        createGallery.createGalleryTitle.should('be.visible')
            .and('have.css', 'color', 'rgb(72, 73, 75)')
    
    });

    it('create gallery with title which has more then 256 characters', () => {
        cy.reload()
        createGallery.createGalleryWithOneImg(userData.randomTitle1, userData.randomDescription, userData.randomImg)
        createGallery.errorMsg.should('contain', validationMsg.msgTitleMoreChart)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
    
    });

    it('create gallery with description which has more then 1000 characters', () => {
        cy.reload()
        createGallery.createGalleryWithOneImg(title, userData.randomDescription1, userData.randomImg)
        createGallery.errorMsg.should('contain', validationMsg.msgDescriptionMoreChart)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        createGallery.errorMsg.should('contain', validationMsg.msgWrongImgFormat)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        createGallery.createGalleryTitle.should('be.visible')
            .and('have.css', 'color', 'rgb(72, 73, 75)')
    
    });

    it('create gallery with wrong image format', () => {
        cy.reload()
        createGallery.createGalleryWithOneImg(title, userData.randomDescription, userData.randomImg1)
        createGallery.errorMsg.should('contain', validationMsg.msgWrongImgFormat)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        createGallery.createGalleryTitle.should('be.visible')
            .and('have.css', 'color', 'rgb(72, 73, 75)')
    
    });

    it('create gallery without image url', () => {
        cy.reload()
        createGallery.createGalleryWithOneImg(title, userData.randomDescription, title)
        createGallery.submitBtn.shoud('exist')
        createGallery.errorMsg.should('contain', validationMsg.msgWrongImgFormat)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.length', 1)
        createGallery.createGalleryTitle.should('be.visible')
            .and('have.css', 'color', 'rgb(72, 73, 75)')
    
    });

    it('checking image button funkcionality', () => {
        cy.reload()
        createGallery.title.type(title)
        createGallery.image.type(userData.randomImg)
        createGallery.addBtn.click()
        createGallery.image.eq(1).type(userData.randomImg1)
        createGallery.upBtn.eq(1).click()
        createGallery.image.eq(0).should('have.value', userData.randomImg1)
        createGallery.deleteBtn.eq(1).click()
        createGallery.deleteBtn.should('not.exist')
    
    });

    it('create valid gallery with one image', () => {
        cy.reload()
        createGallery.createGalleryWithOneImg(title, userData.randomDescription, userData.randomImg)
        allGalleries.galleryCard.eq(0).should('contain', title)
        allGalleries.loadMoreBtn.should('exist')
    
    });

    it('create valid gallery with more image', () => {
        createGallery.create.click()
        createGallery.createGalleryWithMoreImg(title, userData.randomDescription, userData.randomImg, userData.randomImg)
        allGalleries.galleryCard.eq(0).should('have.value', title)
        allGalleries.loadMoreBtn.should('exist')
    
    });
});
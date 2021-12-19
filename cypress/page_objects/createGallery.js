import { describe } from "mocha"

class CreateGallery {

    get create () {
        return cy.contains('Create Gallery')
    }

    get title () {
        return cy.get('#title')
    }

    get description () {
        return cy.get('#description')
    }

    get image () {
        return cy.get('input[placeholder="image url"]') 
    }

    get moreImage (number) {
        for (let i = 1; i <= number; i++) {
            this.addBtn.click()
            return cy.get('input[placeholder="image url"]').eq(i)
        }
    }

    get addBtn () {
        return cy.contains('Add image')
    }

    get submitBtn () {
        return cy.contains('Submit')
    }

    getcancelBtn () {
        return cy.contains('Cancel')
    }

    createGalleryWithOneImg(title, description, image) {
        this.title.clear().type(title)
        this.description.clear().type(description)
        this.image.clear().type(image)
        this.submitBtn.click()
    }

    createGalleryWithMoreImg(title, description, image, image2, number) {
        this.title.clear().type(title)
        this.description.clear().type(description)
        this.image.clear().type(image)
        this.moreImage(number).clear().type(image2)
        this.submitBtn.click()
    }

}

export const createGallery = new CreateGallery();
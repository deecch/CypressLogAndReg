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

    get maxImages () {
        for (let i = 1; i <= 3; i++) {
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

    get cancelBtn () {
        return cy.contains('Cancel')
    }

    get deleteBtn () {
        return cy.get('i[class="fas fa-trash"]')
    }

    get upBtn () {
        return cy.get('i[class="fas fa-chevron-circle-up"]')
    }

    get errorMsg () {
        return cy.get('p[class="alert alert-danger"]')
    }

    get createGalleryTitle () {
        return cy.get('h1').contains('Create Gallery')
    }

    createGalleryWithOneImg(title, description, image) {
        this.title.clear().type(title)
        this.description.clear().type(description)
        this.image.clear().type(image)
        this.submitBtn.click()
    }

    createGalleryWithMoreImg(title, description, image, image2) {
        this.title.clear().type(title)
        this.description.clear().type(description)
        this.image.clear().type(image)
        this.maxImages.clear().type(image2)
        this.submitBtn.click()
    }

}

export const createGallery = new CreateGallery();
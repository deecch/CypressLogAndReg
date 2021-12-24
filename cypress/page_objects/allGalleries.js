class AllGalleries {

    get galleryCard () {
        return cy.get('div[class="cell"]')
    }

    getgalleryAuthor (author){
        return this.galleryCard.find('h2').contains(author)
    }

    get allGalleries () {
        return cy.contains('All Galleries')
    }

    getAllGalleryTitle (title) {
        return cy.get('h1').contains(title)
    }

    get searchField () {
        return cy.get('input[placeholder="Search..."]')
    }

    get filterBtn () {
        return cy.get('button').contains('Filter')
    }

    get loadMoreBtn () {
        return cy.contains('Load More')
    }

    get commentField () {
        return cy.get()
    }

    get commentField () {
        return cy.get('textarea[placeholder="Comment..."]')
    }

    get submitBtn () {
        return cy.get('button').contains('Submit')
    }

}

export const allGalleries = new AllGalleries();


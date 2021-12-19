class AllGalleries {

    get allGalleries () {
        return cy.contains('All Galleries').click()
    }

    get searchField () {
        return cy.get('input[placeholder="Search..."]')
    }

    get filterBtn () {
        return cy.contains('Filter')
    }

    get loadMoreBtn () {
        return cy.contains('Load More')
    }
}

export const allGalleries = new AllGalleries();


/// <reference types="Cypress" />
const boardName = "testRajivBoard"

describe('Sample WebSocket test', () => {

    beforeEach(() => {

        cy
          .request('POST', '/reset');
      
      });

    it('check websocket', () => {
        
        cy.visit('/')
        cy.request('POST', '/api/boards', { name: boardName })

        cy.get('.board_item').should('be.visible').and('have.length', 1)

        // const app = new Vue({
        //     //...
        // }).$mount('#trello-app');

        // if(window.Cypress) {
        //     window.app = app;
        // }

        cy.window().then(({ app }) => {
            console.log(app)
        })

        cy.window().should(({ app }) => {

            const boardCollection = app.$children.find(e => e.$options.name === 'board-collection')
            expect(boardCollection.boards).to.have.length(1)
            expect(boardCollection.boards[0].id).to.exist
            expect(boardCollection.boards[0].name).to.eq(boardName)
            expect(boardCollection.boards[0].starred).to.be.false
            expect(boardCollection.boards[0].user).to.eq(0)
        })
    })

})

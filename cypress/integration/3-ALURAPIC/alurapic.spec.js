describe("Login e registro de usuários alura pic", ()=>{
    beforeEach(()=>{
        cy.visit("https://alura-fotos.herokuapp.com")
    })

    it('verifica mensagens de validacao', ()=>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    })


    it('verifica mensagem de email invalido', ()=>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('Maycon')
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
    })

    it('verifica mensagem de senha com menos de 8 caracteres', ()=>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('123')
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
    })

    it('verifica mensagem de user name com letra maiúscula', ()=>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"]').type('Maycon')
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
    })

    it.only('fazer login com usuario inválido', ()=>{
        cy.login("maycon", "12345")
        cy.on('window:alert', (str)=>{
            expect(str).to.equal('Invalid user name or password')
        })
    })
    it.only('fazer login com usuario válido', ()=>{
        cy.login("maycon", "12345678")
        cy.contains('a', '(Logout)').should('be.visible')
    })
})
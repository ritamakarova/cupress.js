    import * as data from "../helpers/default_data.json"

    describe('Проверка aвторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');// Зайти на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');// Проверить цвет кнопки "Забыли пароль?""
        });

    afterEach('Конец теста', function () {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');// Есть крестик и он виден пользователю
        });

    it('Верный логин и верный пароль', function () {
        
        cy.get('#mail').type(data.login);// Ввели правильный логин
        cy.get('#pass').type(data.password);// Ввели правильный пароль
        cy.get('#loginButton').click();// Нажали Войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно');// Проверяем, что после авторизации видим текст
        cy.get('#messageHeader').should('be.visible');// Текст виден пользователю
        
        })

    it('Проверка востановления пароля', function () {
        
        cy.get('#forgotEmailButton').click();// Нажали Забыли пароль
        cy.get('#forgotForm > .header').contains('Восстановите пароль');// Проверяем, что видим такой текст
        cy.get('#mailForgot') .type('german@dolnikov.ru');// Вводим почту для восстановления пароля
        cy.get('#restoreEmailButton').click();// Нажали Отправить код
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Провнряем, что видим такой текст
        cy.get('#messageHeader').should('be.visible');// Текст виден пользователю
        
        })

    it('Верный логин и НЕверный пароль', function () {
        
        cy.get('#mail').type(data.login);// Ввели правильный логин
        cy.get('#pass').type('iLoveqastudio6');// Ввели НЕправильный пароль
        cy.get('#loginButton').click();// Нажали Войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет');// Проверяем, что после авторизации видим текст
        cy.get('#messageHeader').should('be.visible');// Текст виден пользователю
        
        })
               
   it('НЕерный логин и верный пароль', function () {
        
        cy.get('#mail').type('germandolnikov@qa_studio.ru');// Ввели НЕправильный логин
        cy.get('#pass').type(data.password);// Ввели правильный пароль
        cy.get('#loginButton').click();// Нажали Войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет');// Проверяем, что после авторизации видим текст
        cy.get('#messageHeader').should('be.visible');// Текст виден пользователю
        
         })

    it('Проверка на валидацию логина без собачки', function () {
        
        cy.get('#mail').type('germandolnikov.ru');// Ввели логин без собачки
        cy.get('#pass').type(data.password);// Ввели правильный пароль
        cy.get('#loginButton').click();// Нажали Войти
    
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');// Проверяем, что после авторизации видим текст
        cy.get('#messageHeader').should('be.visible');// Текст виден пользователю
        
        })

    it('Проверка на приведение к строчным буквам в логине', function () {
        
        cy.get('#mail').type('GerMan@Dolnikov.ru');// Ввели логин с заглавными буквами
        cy.get('#pass').type(data.password);// Ввели правильный пароль
        cy.get('#loginButton').click();// Нажали Войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно');// Проверяем, что после авторизации видим текст
        cy.get('#messageHeader').should('be.visible');// Текст виден пользователю
        
         })
    })


// запуск через теринал: npx cypress run --spec cypress/e2e/login_qa.studio.cy.js --browser chrome
// План
// Найти поле логин и ввести правильный логин
// Найти поле пароль и ввести верный пароль
// Найти кнопку Войти и нажать на неё
// Проверить, что авторизация прошла успешно
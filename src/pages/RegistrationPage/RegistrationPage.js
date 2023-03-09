import React from 'react';
import './RegistrationPage.css';

const RegistrationPage = () => {
    return (
        <div className="registration-page">
            <div className="registration-page__background">
                <div className="registration-page__background__shape"></div>
                <div className="registration-page__background__shape"></div>
            </div>

            <form className="registration-page__form" >
                <h3>Регистрация</h3>

                <label className="registration-page__form__label" htmlFor="email">Email</label>
                <input className="registration-page__form__input" type="email" placeholder="Email" id="email" required/>

                <label className="registration-page__form__label" htmlFor="password">Пароль</label>
                <input className="registration-page__form__input" type="password" placeholder="Пароль" id="password" required/>

                <label className="registration-page__form__label" htmlFor="repeatPassword">Повторите пароль</label>
                <input className="registration-page__form__input" type="password" placeholder="Повторите пароль" id="repeatPassword" required/>

                <button className="registration-page__form__button" type="submit">Создать аккаунт</button>
                {/*<div className="registration-page__form__social">*/}
                {/*    <div className="go"><i className="fab fa-google"></i> Google</div>*/}
                {/*    <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>*/}
                {/*</div>*/}
            </form>

        </div>
    );
};

export default RegistrationPage;
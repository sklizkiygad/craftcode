import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-page__background">
                <div className="login-page__background__shape"></div>
                <div className="login-page__background__shape"></div>
            </div>

            <form className="login-page__form" >
                <h3>Login Here</h3>

                <label className="login-page__form__label" htmlFor="email">Email</label>
                <input className="login-page__form__input" type="text" placeholder="Email" id="email" required/>

                    <label className="login-page__form__label" htmlFor="password">Пароль</label>
                    <input className="login-page__form__input" type="password" placeholder="Пароль" id="password" required/>

                        <button className="login-page__form__button" type="submit">Войти</button>
                {/*<div className="login-page__form__social">*/}
                {/*    <div className="go"><i className="fab fa-google"></i> Google</div>*/}
                {/*    <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>*/}
                {/*</div>*/}
            </form>

        </div>
    );
};

export default LoginPage;
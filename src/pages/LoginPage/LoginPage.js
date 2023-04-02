import React from 'react';
import './LoginPage.css';
import '../../components/css/forms.css'
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";


const LoginPage = () => {

    const navigate = useNavigate();

    const { register, handleSubmit , formState:{errors}} = useForm();
    const onSubmit = (data) => {
        const dataLogin={
            email:data.inputEmail,
            password:data.inputPassword
        }
        window.localStorage.setItem('craftCodeUser',JSON.stringify(dataLogin))
        navigate('/')
    };

    return (
        <div className="login-page">
            <div className="login-page__background">
                <div className="login-page__background__shape"></div>
                <div className="login-page__background__shape"></div>
            </div>

            <form className="form-main" onSubmit={handleSubmit(onSubmit)}>
                <h3>Авторизация</h3>


                <div className="form-main__item">
                <label className="form-main__item__label" htmlFor="email">Email</label>
                <input className="form-main__item__input"
                       {...register("inputEmail",
                           { required: 'Обязательное поле',
                               maxLength: {
                                 value: 20,
                                 message: "Не более 20 символов"
                               },

                               minLength: {
                                   value: 2,
                                   message: "Не менее 2 символов"
                               },

                               pattern:{
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                   message: "Неверный формат почты"
                               }


                                 })
                        }  placeholder="Email" />
                {errors.inputEmail && <p className="form-main__item__error">{errors.inputEmail.message}</p>}
                </div>

                <div className="form-main__item">
                    <label className="form-main__item__label" htmlFor="password">Пароль</label>
                    <input className="form-main__item__input" {...register("inputPassword",
                        { required: 'Обязательное поле',
                            maxLength: {
                                value:20,
                                message:"Не более 20 символов"
                            },
                            minLength: {
                                value: 2,
                                message: "Не менее 2 символов"
                            },


                        })}
                           type="password" placeholder="Пароль" />
                    {errors.inputPassword && <p className="form-main__item__error">{errors.inputPassword.message}</p>}
                </div>


                        <button className="form-main__button" type="submit">Войти</button>




                <div className="form-main__social">
                    <Link className="go" to='/registration'>Регистрация</Link>
                </div>


            </form>

        </div>
    );
};

export default LoginPage;
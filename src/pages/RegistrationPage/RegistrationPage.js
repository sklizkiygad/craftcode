import React from 'react';
import './RegistrationPage.css';
import '../../components/css/forms.css'
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

const RegistrationPage = () => {

    const navigate = useNavigate();
    const { register, handleSubmit , formState:{errors}} = useForm();
    const onSubmit = (data) => {

        const dataRegistration={
            email:data.inputEmail,
            password:data.inputPassword
        }
        // window.localStorage.setItem('craftCodeUser',JSON.stringify(dataRegistration))
        navigate('/login')
    };


    return (
        <div className="registration-page">
            <div className="registration-page__background">
                <div className="registration-page__background__shape"></div>
                <div className="registration-page__background__shape"></div>
            </div>

            <form className="form-main" onSubmit={handleSubmit(onSubmit)}>
                <h3>Регистрация</h3>

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

                <div className="form-main__item">
                    <label className="form-main__item__label" htmlFor="password">Повторите пароль</label>
                    <input className="form-main__item__input" {...register("inputPasswordRepeat",
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
                    {errors.inputPasswordRepeat && <p className="form-main__item__error">{errors.inputPasswordRepeat.message}</p>}
                </div>

                <button className="form-main__button" type="submit">Создать аккаунт</button>

                <div className="form-main__social">
                    <Link className="go" to='/login'>Авторизация</Link>
                </div>
                {/*<div className="registration-page__form__social">*/}
                {/*    <div className="go"><i className="fab fa-google"></i> Google</div>*/}
                {/*    <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>*/}
                {/*</div>*/}
            </form>

        </div>
    );
};

export default RegistrationPage;
import React, {useEffect, useRef, useState} from 'react';
import {faArrowRightToBracket, faLaptopCode} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './WelcomePage.css';
import '../../assets/slider.scss';
import mainPage from '../../assets/img/main.jpg';

import codePen from '../../assets/img/codepen.png';
import codeSandbox from '../../assets/img/codesandbox.png';
import sublime from '../../assets/img/sublime.png';
import vsCode from '../../assets/img/vscode.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import s1 from '../../assets/img/s1.gif';
import s2 from '../../assets/img/s2.gif';
import s3 from '../../assets/img/s3.gif';
import s4 from '../../assets/img/s4.gif';
import s5 from '../../assets/img/s5.gif';
import s6 from '../../assets/img/s6.gif';


import p1 from '../../assets/img/p1.png';
import p2 from '../../assets/img/p2.png';
import p3 from '../../assets/img/p3.png';
import p4 from '../../assets/img/p4.png';
import p5 from '../../assets/img/p5.png';
import p6 from '../../assets/img/p6.png';
import p7 from '../../assets/img/p7.png';
import p8 from '../../assets/img/p8.jpg';
import p9 from '../../assets/img/p9.png';
import {Link} from "react-router-dom";

import linesBotton from '../../assets/img/lines.png';





const WelcomePage = () => {

    const onParallaxListener=()=>{
    window.addEventListener('scroll', e =>{

        document.body.style.cssText=`--scrollTop: ${window.pageYOffset}px`
    })
    }

    const [isElementVisible,setIsElementVisible]=useState(false)

    const intersectionBlock=()=>{
        const observer = new IntersectionObserver(entries => {
            const entry = entries[0]
            setIsElementVisible(entry.isIntersecting)
            console.log(entry.isIntersecting)

        },{ rootMargin: "0px",
            threshold: 0.5})

        observer.observe(myRef.current)

    }

    const myRef=useRef()
    const animationBlock=useRef()

    useEffect(()=>{
        onParallaxListener()
        intersectionBlock()
        sliderFunction()


    },[])


    function sliderFunction() {

        let declareFunct = function(selector, myContext) {
            let mainContext = myContext || document;
            let elements = mainContext.querySelectorAll(selector);
            return [].slice.call(elements);
        };

        function _fncSliderInit(mySlider, options) {
            let prefix = ".fnc-";

            let currentSlider = mySlider;
            let $slidesCont = currentSlider.querySelector(prefix + "slider__slides");
            let $slides = declareFunct(prefix + "slide", currentSlider);
            let $controls = declareFunct(prefix + "nav__control", currentSlider);
            let $controlsBgs = declareFunct(prefix + "nav__bg", currentSlider);
            let $progressAS = declareFunct(prefix + "nav__control-progress", currentSlider);

            let numOfSlides = $slides.length;
            let curSlide = 1;
            let sliding = false;
            let slidingAT = +parseFloat(getComputedStyle($slidesCont)["transition-duration"]) * 1000;
            let slidingDelay = +parseFloat(getComputedStyle($slidesCont)["transition-delay"]) * 1000;

            let autoSlidingActive = false;
            let autoSlidingTO;
            let autoSlidingDelay = 5000; // default autosliding delay value
            let autoSlidingBlocked = false;

            let $activeSlide;
            let $activeControlsBg;
            let $prevControl;

            function setIDs() {
                $slides.forEach(function($slide, index) {
                    $slide.classList.add("fnc-slide-" + (index + 1));
                });

                $controls.forEach(function($control, index) {
                    $control.setAttribute("data-slide", index + 1);
                    $control.classList.add("fnc-nav__control-" + (index + 1));
                });

                $controlsBgs.forEach(function($bg, index) {
                    $bg.classList.add("fnc-nav__bg-" + (index + 1));
                });
            };

            setIDs();

            function afterSlidingHandler() {
                currentSlider.querySelector(".m--previous-slide").classList.remove("m--active-slide", "m--previous-slide");
                currentSlider.querySelector(".m--previous-nav-bg").classList.remove("m--active-nav-bg", "m--previous-nav-bg");

                $activeSlide.classList.remove("m--before-sliding");
                $activeControlsBg.classList.remove("m--nav-bg-before");
                $prevControl.classList.remove("m--prev-control");
                $prevControl.classList.add("m--reset-progress");
                let triggerLayout = $prevControl.offsetTop;
                $prevControl.classList.remove("m--reset-progress");

                sliding = false;
                let layoutTrigger = currentSlider.offsetTop;

                if (autoSlidingActive && !autoSlidingBlocked) {
                    setAutoslidingTO();
                }
            };

            function performSliding(slideID) {
                if (sliding) return;
                sliding = true;
                window.clearTimeout(autoSlidingTO);
                curSlide = slideID;

                $prevControl = currentSlider.querySelector(".m--active-control");
                $prevControl.classList.remove("m--active-control");
                $prevControl.classList.add("m--prev-control");
                currentSlider.querySelector(prefix + "nav__control-" + slideID).classList.add("m--active-control");

                $activeSlide = currentSlider.querySelector(prefix + "slide-" + slideID);
                $activeControlsBg = currentSlider.querySelector(prefix + "nav__bg-" + slideID);

                currentSlider.querySelector(".m--active-slide").classList.add("m--previous-slide");
                currentSlider.querySelector(".m--active-nav-bg").classList.add("m--previous-nav-bg");

                $activeSlide.classList.add("m--before-sliding");
                $activeControlsBg.classList.add("m--nav-bg-before");

                let layoutTrigger = $activeSlide.offsetTop;

                $activeSlide.classList.add("m--active-slide");
                $activeControlsBg.classList.add("m--active-nav-bg");

                setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
            };



            function controlClickHandler() {
                if (sliding) return;
                if (this.classList.contains("m--active-control")) return;
                if (options.blockASafterClick) {
                    autoSlidingBlocked = true;
                    currentSlider.classList.add("m--autosliding-blocked");
                }

                let slideID = +this.getAttribute("data-slide");

                performSliding(slideID);
            };

            $controls.forEach(function($control) {
                $control.addEventListener("click", controlClickHandler);
            });

            function setAutoslidingTO() {
                window.clearTimeout(autoSlidingTO);
                let delay = +options.autoSlidingDelay || autoSlidingDelay;
                curSlide++;
                if (curSlide > numOfSlides) curSlide = 1;

                autoSlidingTO = setTimeout(function() {
                    performSliding(curSlide);
                }, delay);
            };

            if (options.autoSliding || +options.autoSlidingDelay > 0) {
                if (options.autoSliding === false) return;

                autoSlidingActive = true;
                setAutoslidingTO();

                currentSlider.classList.add("m--with-autosliding");
                let triggerLayout = currentSlider.offsetTop;

                let delay = +options.autoSlidingDelay || autoSlidingDelay;
                delay += slidingDelay + slidingAT;

                $progressAS.forEach(function($progress) {
                    $progress.style.transition = "transform " + (delay / 1000) + "s";
                });
            }

            currentSlider.querySelector(".fnc-nav__control:first-child").classList.add("m--active-control");

        };

        let fncSlider = function(sliderSelector, options) {
            let currentSliders = declareFunct(sliderSelector);

            currentSliders.forEach(function(currentSlider) {
                _fncSliderInit(currentSlider, options);
            });
        };

        window.fncSlider = fncSlider;

        fncSlider(".example-slider", {autoSlidingDelay: 4000});

        let $demoCont = document.querySelector(".demo-cont");

        [].slice.call(document.querySelectorAll(".fnc-slide__action-btn")).forEach(function($btn) {
            $btn.addEventListener("click", function() {
                $demoCont.classList.toggle("credits-active");
            });
        });

        document.querySelector(".demo-cont__credits-close").addEventListener("click", function() {
            $demoCont.classList.remove("credits-active");
        });

        document.querySelector(".js-activate-global-blending").addEventListener("click", function() {
            document.querySelector(".example-slider").classList.toggle("m--global-blending-active");
        });
    };




    useEffect(()=>{
        console.log(isElementVisible)
        isElementVisible && animationBlock.current.classList.add('start-animation')

    },[isElementVisible])

    return (

        <div className="welcome-page">

            {/*<header>*/}
            {/*    <h1><FontAwesomeIcon icon={faLaptopCode} /> CraftCode</h1>*/}
            {/*    <h1><FontAwesomeIcon icon={faArrowRightToBracket} /></h1>*/}
            {/*</header>*/}



            <div className="welcome-block">
                <div className="layers">
                    <div className="layer__header">
                        <h1><FontAwesomeIcon icon={faLaptopCode} /> CraftCode</h1>
                    </div>
                </div>
            </div>

            
                <div className="welcome-page__main-info">

                    <div className="main-info__layers">
                        <div className="main-info__layers__layer__base">

                        </div>
                    </div>




                    <div className="welcome-page__main-info__text" ref={myRef}>


                    <h1>Что нужно знать об IDE и редакторах кода?</h1>

                   <p>
                       IDE (Integrated Development Environment) и редактор кода – это виды программного обеспечения, предназначенные для работы над приложениями, их разработки и тестирования. Возможности этих инструментов отличаются.

                       Редактор кода является программой, работающей как текстовый редактор, только более подходящий для написания кода.

                       IDE  – это ПО, которое объединяет инструменты для разработки приложений и их тестирования в едином интерфейсе. Может делать все то, что и текстовый редактор, и даже больше. В принципе этим IDE и отличается от него, она предоставляет более расширенные функции. Среды разработки дают возможность создавать крупные проекты, а также подключать Git.
                   </p>

                        <div className="container" >
                            <span className="text1" ref={animationBlock}>Как правило, IDE состоит из:</span>
                            <span className="text2">
                                <ul>
                                    <li>самого текстового редактора для написания и редактирования кода</li>
                                    <li>компилятора – инструмента, позволяющего перевести текст, написанный на языке программирования, в набор машинных кодов</li>
                                    <li> отладчика, проверяющего код и устраняющего в нем ошибки</li>
                                    <li>инструментов для автоматизации сборки кода, ускоряющих процесс разработки</li>
                                </ul>
                            </span>
                        </div>
                    </div>


                    
                    
                </div>

            <div className="welcome-page__swiper">
                <h1>Аналоги</h1>

                <div className="demo-cont">

                    <div className="fnc-slider example-slider">
                        <div className="fnc-slider__slides">

                            <div className="fnc-slide m--blend-green m--active-slide">
                                <div className="fnc-slide__inner">
                                    <div className="fnc-slide__mask">
                                        <div className="fnc-slide__mask-inner"></div>
                                    </div>
                                    <div className="fnc-slide__content">

                                        <h2 className="fnc-slide__heading">
                                            <div className="fnc-slide__heading-line">
                                                <span>Visual Studio</span>
                                            </div>
                                            <div className="fnc-slide__heading-line">
                                                <span>Code</span>
                                            </div>
                                        </h2>
                                        <button type="button" className="fnc-slide__action-btn">
                                            Перейти
                                            <span data-text="Перейти">Перейти</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="fnc-slide m--blend-dark">
                                <div className="fnc-slide__inner">
                                    <div className="fnc-slide__mask">
                                        <div className="fnc-slide__mask-inner"></div>
                                    </div>
                                    <div className="fnc-slide__content">

                                        <h2 className="fnc-slide__heading">
                                            <div className="fnc-slide__heading-line">
                                                <span>Sublime</span>
                                            </div>
                                            <div className="fnc-slide__heading-line">
                                                <span>Text</span>
                                            </div>
                                        </h2>
                                        <button type="button" className="fnc-slide__action-btn">
                                            Перейти
                                            <span data-text="Перейти">Перейти</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="fnc-slide m--blend-red">
                                <div className="fnc-slide__inner">
                                    <div className="fnc-slide__mask">
                                        <div className="fnc-slide__mask-inner"></div>
                                    </div>
                                    <div className="fnc-slide__content">
                                        <h2 className="fnc-slide__heading">
                                            <div className="fnc-slide__heading-line">
                                                <span>Code</span>
                                            </div>
                                            <div className="fnc-slide__heading-line">
                                                <span>Pen</span>
                                            </div>
                                        </h2>
                                        <button type="button" className="fnc-slide__action-btn">
                                            Перейти
                                            <span data-text="Перейти">Перейти</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="fnc-slide m--blend-blue">
                                <div className="fnc-slide__inner">
                                    <div className="fnc-slide__mask">
                                        <div className="fnc-slide__mask-inner"></div>
                                    </div>
                                    <div className="fnc-slide__content">
                                        <h2 className="fnc-slide__heading">
                                            <div className="fnc-slide__heading-line">
                                                <span>Code</span>
                                            </div>
                                            <div className="fnc-slide__heading-line">
                                                <span>Sandbox</span>
                                            </div>
                                        </h2>
                                        <button type="button" className="fnc-slide__action-btn">
                                            Перейти
                                            <span data-text="Перейти">Перейти</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <nav className="fnc-nav">
                            <div className="fnc-nav__bgs">
                                <div className="fnc-nav__bg m--navbg-green m--active-nav-bg"></div>
                                <div className="fnc-nav__bg m--navbg-dark"></div>
                                <div className="fnc-nav__bg m--navbg-red"></div>
                                <div className="fnc-nav__bg m--navbg-blue"></div>
                            </div>
                            <div className="fnc-nav__controls">
                                <button className="fnc-nav__control">
                                    VS Code
                                    <span className="fnc-nav__control-progress"></span>
                                </button>
                                <button className="fnc-nav__control">
                                    Sublime
                                    <span className="fnc-nav__control-progress"></span>
                                </button>
                                <button className="fnc-nav__control">
                                    Codepen
                                    <span className="fnc-nav__control-progress"></span>
                                </button>
                                <button className="fnc-nav__control">
                                    Codesandbox
                                    <span className="fnc-nav__control-progress"></span>
                                </button>
                            </div>
                        </nav>
                    </div>

                    <div className="demo-cont__credits">
                        <div className="demo-cont__credits-close"></div>

                        <img src={vsCode} alt=""
                             className="demo-cont__credits-img"/>
                        <div className="colorful-switch">
                            <input type="checkbox" className="colorful-switch__checkbox js-activate-global-blending"
                                   id="colorful-switch-cb"/>
                            <label className="colorful-switch__label" htmlFor="colorful-switch-cb">
                                <span className="colorful-switch__bg"></span>
                                <span className="colorful-switch__dot"></span>
                                <span className="colorful-switch__on">
          <span className="colorful-switch__on__inner"></span>
        </span>
                                <span className="colorful-switch__off"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/*<Swiper*/}
                {/*    slidesPerView={3}*/}
                {/*    spaceBetween={50}*/}
                {/*    centeredSlides={true}*/}
                {/*    pagination={{*/}
                {/*        clickable: true,*/}
                {/*    }}*/}
                {/*    modules={[Pagination]}*/}
                {/*    className="mySwiper"*/}
                {/*>*/}
                {/*    <SwiperSlide className='myslide'><img src={s1} alt="1"/></SwiperSlide>*/}
                {/*    <SwiperSlide className='myslide'><img src={s2} alt="2"/></SwiperSlide>*/}
                {/*    <SwiperSlide className='myslide'><img src={s3} alt="3"/></SwiperSlide>*/}
                {/*    <SwiperSlide className='myslide'><img src={s4} alt="4"/></SwiperSlide>*/}
                {/*    <SwiperSlide className='myslide'><img src={s5} alt="5"/></SwiperSlide>*/}
                {/*    <SwiperSlide className='myslide'><img src={s6} alt="6"/></SwiperSlide>*/}

                {/*</Swiper>*/}


            </div>


            <div className="welcome-page__analogs">

                <div className="welcome-page__analogs__list">

                    <div className="welcome-page__analogs__item">
                        <h2>
                            Visual Studio
                        </h2>
                        <img src={p1} alt="1"/>
                    </div>




                    <div className="welcome-page__analogs__item">
                        <h2>
                            PyCharm
                        </h2>
                        <img src={p2} alt="1"/>
                    </div>




                    <div className="welcome-page__analogs__item">
                        <h2>
                            IntelliJ IDEA
                        </h2>
                        <img src={p3} alt="1"/>
                    </div>



                    <div className="welcome-page__analogs__item">
                        <h2>
                            Spyder
                        </h2>
                        <img src={p4} alt="1"/>
                    </div>




                    <div className="welcome-page__analogs__item">
                        <h2>
                            Eclipse
                        </h2>
                        <img src={p5} alt="1"/>
                    </div>




                    <div className="welcome-page__analogs__item">
                        <h2>
                            NetBeans
                        </h2>
                        <img src={p6} alt="1"/>
                    </div>





                    <div className="welcome-page__analogs__item">
                        <h2>
                            Komodo
                        </h2>
                        <img src={p7} alt="1"/>
                    </div>




                    <div className="welcome-page__analogs__item">
                        <h2>
                            Sublime Text
                        </h2>
                        <img src={p8} alt="1"/>
                    </div>




                    <div className="welcome-page__analogs__item">
                        <h2>
                            Atom
                        </h2>
                        <img src={p9} alt="1"/>
                    </div>



                </div>
            </div>


            <div className="welcome-page__footer">
                <h2>Чтобы приступить к работе необходимо зарегистрироваться</h2>
                <Link className="button" to="/login" >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Авторизация
                </Link>
            </div>
            




            
        </div>
    );
};

export default WelcomePage;
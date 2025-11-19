const { default: axios } = require("axios");

window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    let tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParenr = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = "none";
            item.classList.add("hide");
            item.classList.remove('show', "fade");    // удаляем так же класс анимации
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");

        });
    }

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = "block";
        tabsContent[i].classList.add("show", "fade");   // добавляем так же класс анимации
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParenr.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = "2026-05-11";


    function getTimeRemaining(endtime){
        let days, hours, minutes,seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        }
        
        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(".timer", deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener("click", openModal);
    });


    function closeModal() {
        // modal.style.display = "block";
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle("show"); // вариант с помощью toggle
        document.body.style.overflow = "";   // разблокировка странице при открытии модального окна
    }

    function openModal() {
        // modal.style.display = "block";
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle("show"); // вариант с помощью toggle
        document.body.style.overflow = "hidden";   //блокировка странице при открытии модального окна
        // clearInterval(modalTimerId); // если польхователь открывал модальное окно вручную, автоматически его уже не показываем
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    // закрываем модальное окно при помощи клавиши Escape
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape"&& modal.classList.contains("show")) {
            closeModal();
        }
    });

    // показываем модальное окно через определенный промежуток времени
    // Закомментировал, чтобы не отвлекало
    const modalTimerId = setTimeout(openModal, 50000);

    // если пользователь долистал до конца страницы - показываем модальное окно
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll); // модалькое окно показывается только один раз когда пользователь долистал до конца страницы
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    // Используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 42;
            this.changeToUAN();
        }

        changeToUAN() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement("div");
            if(this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // Функция получения данных из сервера

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, statue: ${res.status}`);
        }
        return await res.json();
    };

/*     getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        }); 
 */

    // получение данніх из сервера при помощи библиотеки axios

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

        // Вариант 2 для того что б только 1 раз посторить карточки, создание элементов на лету
    /*     
    getResource('http://localhost:3000/menu')
    .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');
            price = price * 27;
            element.classList.add('menu__item');
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
            document.querySelector('.menu .container').append(element);
        });
    };
 */
/* 
    getResource("http://localhost:3000/menu")
    .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');

            element.classList.add('menu__item');
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;

            document.querySelector('.menu .container').append(element);
        });
    } */



    // Forms при помощи XMLHttpRequest() (устаревший метод)
/* 
    const forms = document.querySelectorAll('form');
    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };
    
    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            
            form.insertAdjacentElement("afterend", statusMessage);

            const request = new XMLHttpRequest();
            request.open("POST", 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    } */

        // Forms при помощи Fetch 1)Form dana 2) Json
    
    const forms = document.querySelectorAll('form');

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };
    
    forms.forEach(item => {
        bindPostData(item);
    });

    // отправка данных с клиента на json-сервер / запрос на сервер
    const postData = async (url, data) => {     // эта функция настраивает наш запрос, она афетчит (посылает) этот запрос на сервер, получает какой-то товет от сервера и трансформирует этот ответ в json
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    // красивое увидомление пользователя

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }


    // получение доступа к базе-данных
    fetch("http://localhost:3000/menu")
        .then(data => data.json())     // полученную data превращаем в обычный js-обьект поскольку у нас json-база данных
        .then(res => console.log(res));


    //  Слайдер

    // моя версія
    /* 
    const slideContent = document.querySelectorAll(".offer__slider-wrapper .offer__slide");
    const arrowParent = document.querySelector(".offer__slider-counter");
    const prevArrow = document.querySelector('.offer__slider-prev');
    const nextArrow = document.querySelector('.offer__slider-next');
    let currentSlide = document.querySelector('.offer__slider #current');
    let totalSlide = document.querySelector('.offer__slider #total');


    let totalSlidesNumber = slideContent.length;

    let currentSlideIndex = 1;

    function mySlide(i) {
        if (totalSlidesNumber < 10) {
            totalSlide.innerHTML = `0${totalSlidesNumber}`;
        } else {
            totalSlide.innerHTML = totalSlidesNumber;
        }

        if (totalSlidesNumber < 10) {
            currentSlide.innerHTML = `0${currentSlideIndex}`;
        }
        slideContent.forEach(item => {
            item.style.display = "none";
        });

        slideContent[i - 1].style.display = "block";

    }

   mySlide(currentSlideIndex);

    arrowParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target === prevArrow) {
            currentSlideIndex = currentSlideIndex - 1;
            if (currentSlideIndex <= 0) {
                currentSlideIndex = 4;
            }
            mySlide(currentSlideIndex);
        }

        if (target && target === nextArrow) {
            currentSlideIndex = currentSlideIndex + 1;
            if (currentSlideIndex > totalSlidesNumber) {
                currentSlideIndex = 1;
            }
            mySlide(currentSlideIndex);
        }
    });
 */
    // Вариант слайда с урока 91. Простой вариант
    /* 
    const slides = document.querySelectorAll(".offer__slide"),
          prev = document.querySelector(".offer__slider-prev"),
          next = document.querySelector(".offer__slider-next"),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
    let slideIndex = 1;

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = "none");

        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });
    */


// Вариант слайда с урока 92. Вариант слайда по типу карусели
// для этого варианта слайда у верстке создано дополнительную обертку слайдов с классом offer__slider-inner

        const slides = document.querySelectorAll(".offer__slide"),
              slider = document.querySelector(".offer__slider"),
              prev = document.querySelector(".offer__slider-prev"),
              next = document.querySelector(".offer__slider-next"),
              total = document.querySelector('#total'),
              current = document.querySelector('#current'),
              slidesWrapper = document.querySelector('.offer__slider-wrapper'),
              slidesField = document.querySelector('.offer__slider-inner'),
              width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transfer = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    // создание точек, индикатора
    slider.style.position = "relative";

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if ( offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex - 1].style.opacity = 1;

        })
    });





});
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
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

        const slides = document.querySelectorAll(slide),
              slider = document.querySelector(container),
              prev = document.querySelector(prevArrow),
              next = document.querySelector(nextArrow),
              total = document.querySelector(totalCounter),
              current = document.querySelector(currentCounter),
              slidesWrapper = document.querySelector(wrapper),
              slidesField = document.querySelector(field),
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

    function changeDots(){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    function showCurrentSlide(){
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g, "");
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showCurrentSlide();
        changeDots();
    });

    prev.addEventListener('click', () => {
        if ( offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showCurrentSlide();
        changeDots();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transition = `translateX(-${offset}px)`;

            showCurrentSlide();
            changeDots();
        });
    });
}

export default slider;
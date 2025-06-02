window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParenr = document.querySelector('.tabheader__items');

    // Tabs

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
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener("click", () => {
        // modal.style.display = "block";
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle("show"); // вариант с помощью toggle
        document.body.style.overflow = "hidden";   //блокировка странице при открытии модального окна
        });
    });

    function closeModal() {
        // modal.style.display = "block";
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle("show"); // вариант с помощью toggle
        document.body.style.overflow = "";   // разблокировка странице при открытии модального окна
    }
    
    modalCloseBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // закрываем модальное окно при помощи клавиши Escape
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape"&& modal.classList.contains("show")) {
            closeModal();
        }
    });

});
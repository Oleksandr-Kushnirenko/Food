// Modal

    function closeModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        // modal.style.display = "block";
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle("show"); // вариант с помощью toggle
        document.body.style.overflow = "";   // разблокировка странице при открытии модального окна
    }

    function openModal(modalSelector, modalTimerId) {
        const modal = document.querySelector(modalSelector);
        // modal.style.display = "block";
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle("show"); // вариант с помощью toggle
        document.body.style.overflow = "hidden";   //блокировка странице при открытии модального окна

        console.log(modalTimerId);
        if (modalTimerId) {
            clearInterval(modalTimerId); // если польхователь открывал модальное окно вручную, автоматически его уже не показываем
        }

    }


function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
    });


    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    // закрываем модальное окно при помощи клавиши Escape
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape"&& modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });
    

    // если пользователь долистал до конца страницы - показываем модальное окно
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll); // модалькое окно показывается только один раз когда пользователь долистал до конца страницы
        }
    }

    window.addEventListener("scroll", showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};


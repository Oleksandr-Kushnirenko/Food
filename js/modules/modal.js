function modal() {
    
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

}

module.exports = modal;
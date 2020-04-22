/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    function openSide(event) {
      event.preventDefault();
      bodyTag.classList.toggle('sidebar-open');
      bodyTag.classList.toggle('sidebar-collapse');
    }
    let sideB = document.querySelector('.sidebar-toggle');
    let bodyTag = document.querySelector('.sidebar-mini')
    sideB.addEventListener('click',openSide);
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {

    function regF(event) {
      event.preventDefault();
      App.getModal('register').open();
    }

    function loginF(event) {
      event.preventDefault();
      App.getModal('login').open();
    }

    function logoutF(event) {
      event.preventDefault();
      User.logout(User.current(), (err,response) => 
        {
            if(!err)
            {
                App.setState('init');
            }
        });
    }

    let regBut = document.querySelector('.menu-item_register');
    let loginBut = document.querySelector('.menu-item_login');
    let logoutBut = document.querySelector('.menu-item_logout');
    regBut.addEventListener('click',regF);
    loginBut.addEventListener('click',loginF);
    logoutBut.addEventListener('click',logoutF);
  }

}

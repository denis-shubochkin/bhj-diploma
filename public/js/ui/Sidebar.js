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
      if(bodyTag[0].classList.contains('sidebar-open'))
      {
      bodyTag[0].classList.remove('sidebar-open', 'sidebar-collapse');
      }
      else {
        bodyTag[0].classList.add('sidebar-open', 'sidebar-collapse');
        }
    }
    let sideB = document.querySelector('.sidebar-toggle');
    let bodyTag = document.getElementsByTagName('body');
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
    function f(event) {
      event.preventDefault();
      if(event.currentTarget.classList.contains('menu-item_register'))
      {
        App.getModal('register').open();
      }
      if(event.currentTarget.classList.contains('menu-item_login'))
      {
        App.getModal('login').open();
      }
      if(event.currentTarget.classList.contains('menu-item_logout'))
      {
        if (User.logout())
        {
          App.setState('init');
        };
      }
    }
    let regBut = document.querySelector('.menu-item_register');
    let loginBut = document.querySelector('.menu-item_login');
    let logoutBut = document.querySelector('.menu-item_logout');
    regBut.addEventListener('click',f);
    loginBut.addEventListener('click',f);
    logoutBut.addEventListener('click',f);
  }

}

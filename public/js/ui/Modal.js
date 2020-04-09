"use strict;"
/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element)
    {
      alert('Элемент не найден');
    }
    else {
      this.element = element;
      this.registerEvents();
    }
    }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    let c = this.element.querySelectorAll('[data-dismiss="modal"]')
    for (let i =0;i<c.length;i++){
      c[i].addEventListener('click', this.onClose.call(this)); 
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    this.close();
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    let c = this.element.querySelectorAll('[data-dismiss="modal"]')
    for (let i =0;i<c.length;i++){
      c[i].removeEventListener('click',this.onClose(c[i]));
    }
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = 'none';
  }
}

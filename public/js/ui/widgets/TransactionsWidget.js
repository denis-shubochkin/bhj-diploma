/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    try
    {
      this.element = element;
      this.registerEvents();
    }
    catch(e)
    {
      alert('Элемент не найден');
      return e;
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    function incomeF(event) {
      event.preventDefault();
      if(App.getModal('createIncome')!=undefined)
      {App.getModal('createIncome').open();}
      else {alert('Необходимо выбрать счет');}
    }

    function expenseF(event) {
      event.preventDefault();
      if(App.getModal('createExpense')!=undefined)
      {App.getModal('createExpense').open();}
      else {alert('Необходимо выбрать счет');}
    }

    this.element.querySelector('.create-income-button').addEventListener('click', incomeF);
    this.element.querySelector('.create-expense-button').addEventListener('click', expenseF);
  }
}

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if(User.current())
     {
      let bills = [];  
       Account.list(User.current(),(err,response) => {
         if(!err && response.transactions) 
         {
             bills = [];
             bills = response.transactions;
             for (let i =0;i<bills.length;i++){
               this.element.querySelector('.accounts-select').insertAdjacentHTML('beforeEnd',
               `<option value="${bills[i].id}">${bills[i].name}</option>`
               );
             }
         }
       })
     }
     
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, () => {
      if(!err)
      {
        this.element.reset();
        if(this.element.id==='new-income-form') {App.getModal('newIncome').close();}
        if(this.element.id==='new-expense-form') {App.getModal('newExpense').close();}
        App.update();
      }
    })
  }
}

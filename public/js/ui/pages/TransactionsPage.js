/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
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
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(options);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    function removeAccF (event) {
      event.preventDefault();
      this.removeAccount();
    }
    function removeTransF (event) {
      event.preventDefault();
      this.removeTransaction(event.target.dataset.id);
    }
    let accDel = this.element.querySelector('.remove-account');
    let transDel = this.element.querySelector('.transaction__remove');
    accDel.addEventListener('click',removeAccF);
    if(transDel) {transDel.addEventListener('click',removeTransF);}

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if(!lastOptions) 
    {
      return;
    }
    else 
    {
      if(confirm('Вы действительно хотите удалить счёт?'))
      {
          Account.remove(lastOptions.account_id,User.current(),() => {
            if(!err){
              App.update();
            }
          }) 
          this.clear();
      }
      else {return;}
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if(confirm('Вы действительно хотите удалить эту транзакцию?'))
    {
        Transaction.remove(id,User.current(),() => {
          if(!err)
          {
            App.update();
          }
        })
    }
    else {return;}
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
if(!options)
{
  return;
}
else 
{
  let lastOptions = options;
  Account.get(lastOptions.account_id, () => {
    if(!err)
    {
      TransactionsPage.renderTitle(response.transaction.name);
    }
  })
  Transaction.list(User.current(),() => {
    if(!err) {
      TransactionsPage.renderTransactions(response.transactions);
    }
  })
}
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions();
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    document.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    let a = new Date(date);
let month = [
  'января',
  'февраля',
  'марта',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]
return `${a.getDate()} ${month[a.getMonth()]} ${a.getFullYear()} г. в ${a.getHours()}:${a.getMinutes()}`
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    return 
    `<!-- либо transaction_expense, либо transaction_income -->
<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${this.formatDate(item.date)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let content = document.querySelector('.content');
    content.insertAdjacentHTML('beforeend',this.getTransactionHTML(data));
  }
}

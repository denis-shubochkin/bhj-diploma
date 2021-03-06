/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element){
      throw new Error('элемент не найден');
    }
    else {
      this.element = element;
      this.registerEvents();
      this.update();
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    function createAccF (event) {
      event.preventDefault();
      if(event.target.classList.contains('create-account'))
      {
        App.getModal('createAccount').open();
      }
      if(event.target.parentElement.classList.contains('account'))
      {
      //event.prevenDefault();
      this.onSelectAccount(event.target.parentElement);
      }
    }
    //let createAccBut = document.querySelector('.create-account');
    //let currAccBut = document.querySelectorAll('.account');
    this.element.addEventListener('click',(event) => {
      event.preventDefault();
      if(event.target.classList.contains('create-account'))
      {
        App.getModal('createAccount').open();
      }
      if(event.target.parentElement.classList.contains('account'))
      {
      //event.prevenDefault();
      this.onSelectAccount(event.target.parentElement);
      }
    });
   // for (let i =0;i<currAccBut.length;i++)
   // {
   //     currAccBut[i].addEventListener('click',currAccF);
  //  }
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if(User.current())
     {
      let bills = [];  
      Account.list(User.current(),(err,response) => {
         if(response.success && response.data) 
         {
             bills = [];
             bills = response.data;
             this.clear();
             for (let i =0; i<bills.length; i++)
             {
                this.renderItem(bills[i]);
             }
         }
       })
     }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let elToDel = document.querySelectorAll('.account');
    for (let i =0; i<elToDel.length; i++)
    {
        elToDel[i].remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
   let actEl = document.querySelector('.active');
    if(actEl) 
    {
        actEl.classList.remove('active');
    }
    element.classList.add('active');
    App.showPage( 'transactions', { 'account_id': element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    let s = `<li class="account" data-id="${item.id}">
    <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
    </a>
</li>`;
    return s;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    this.element.insertAdjacentHTML('beforeEnd',this.getAccountHTML(item));
  }
}

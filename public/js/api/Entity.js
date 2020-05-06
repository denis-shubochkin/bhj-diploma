/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    const xhr = createRequest({
        data: data,
        method: 'GET',
        url: this.host + this.url,
        callback
      })
      //  console.log(xhr);
      
      //callback(err,response);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
   const modifiedData = Object.assign({ _method: 'PUT' }, data );
    const xhr = createRequest({
      data: modifiedData,
      method: 'POST',
      url: this.host + this.url,
      callback
    })
   
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    //const modifiedData = Object.assign({ id: id }, data );  
    const xhr = createRequest({
      data: data,
      method: 'GET',
      url: this.host + this.url + "/"+ id,
      callback 
    })
    //callback(err,response);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let modifiedData = Object.assign({ _method: 'DELETE'}, data );
    //console.log(this);
    modifiedData.id = id;
    const xhr = createRequest({
      data: modifiedData,
      method: 'POST',
      url: this.host + this.url, //+ `/${id}`,
      callback
    })
  }
}

Entity.url = '';
Entity.host= 'http://localhost:8000';



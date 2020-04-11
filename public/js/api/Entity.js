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
        url: this.HOST + this.URL,
        callback: ( err, response ) => {
          console.log( err ); // null
          console.log( response ); // ответ
          callback(err,response);
        }
      })
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
      url: this.HOST + this.URL,
      callback: ( err, response ) => {
        console.log( err ); // null
        console.log( response ); // ответ
        callback(err,response);
      }
    })
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    const modifiedData = Object.assign({ id: id }, data );  
    const xhr = createRequest({
      data: modifiedData,
      method: 'GET',
      url: this.HOST + this.URL,
      callback: ( err, response ) => {
        console.log( err ); // null
        console.log( response ); // ответ
        callback(err,response);
      }
    })
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let modifiedData = Object.assign({ _method: 'DELETE', id: id }, data );
    const xhr = createRequest({
      data: modifiedData,
      method: 'POST',
      url: this.HOST + this.URL,
      callback: ( err, response ) => {
        console.log( err ); // null
        console.log( response ); // ответ
        callback(err,response);
      }
    })
  }
}


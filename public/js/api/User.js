"use strict;"
/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
 
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (typeof(localStorage.user) === 'object') {return JSON.parse(localStorage.user);}
    else {return localStorage.user;}
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    const xhr = createRequest({
      data: data,
      method: 'GET',
      url: `${this.host}${this.url}/current`,
      callback ( err, response ) {
        if ( response && response.user ) {
          User.setCurrent( response.user );
        }
        else
        {
          User.unsetCurrent();
        }
        callback( err, response );
    }
  })
}

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    const xhr = createRequest({
      data: data,
      method: 'POST',
      url: `${this.host}${this.url}/login`,
      callback ( err, response )  {
        if(response.success === true)
        {
          User.setCurrent( response.user );
        }
        callback( err, response );
      }
  })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    const xhr = createRequest({
      data: data,
      method: 'POST',
      url: `${this.host}${this.url}/registerr`,
      callback ( err, response ) {
        if(response.success === true)
        {
          User.setCurrent( response.user );
        }
        callback( err, response );
      }
  })
}

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    const xhr = createRequest({
      data: data,
      method: 'POST',
      url: `${this.host}${this.url}/logout`,
      callback ( err, response ) {
        if(response.success === true)
        {
          User.unsetCurrent();
        }
        callback( err, response );
      }
  })
  }

}

  User.host = Entity.HOST;
  User.url = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  

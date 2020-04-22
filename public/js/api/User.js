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
    
    if(localStorage.user) {
      return JSON.parse(localStorage.user)
    }
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
        else 
        {
          err = response.error;
          alert(response.error);
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
      url: `${this.host}${this.url}/register`,
      callback ( err, response ) {
        if(response.success === true)
        {
          User.setCurrent( response.user );
        }
        else 
        {
          err = response.error;
          Object.prototype.toString.call(err) === '[object Object]';
          alert(JSON.stringify(err));
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

  User.host = Entity.host;
  User.url = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  

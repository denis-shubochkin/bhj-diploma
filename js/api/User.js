/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
 
  host = Entity.HOST;
  url = '/user';
  }
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', user);
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
    return localStorage.user;
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
      callback: ( err, response ) => {
        if(response.success === false && response.error = 'Необходима авторизация')
        {
          return response;
        }
        if ( response && response.user ) {
          User.setCurrent( response.user );
        }
        if (response.success === false && !response.user)
        {
          User.unsetCurrent();
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
      callback: ( err, response ) => {
        if(response.success === true)
        {
          User.setCurrent(response.user);
        }
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
      callback: ( err, response ) => {
        if(response.success === true)
        {
          User.setCurrent(response.user);
        }
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
      callback: ( err, response ) => {
        if(response.success === true)
        {
          User.unsetCurrent();
        }
      }
  })
  }
}

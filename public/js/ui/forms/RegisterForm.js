/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    console.log(options);
    User.register(options, () =>
    {
        console.log(options);
        console.log(err);
        console.log(response);
      if(!err)
        {
            this.element.reset();
            App.setState( 'user-logged' );
            App.getModal('register').close();
        }
    });
  }
}

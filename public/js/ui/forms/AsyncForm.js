/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
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
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    function f(event) {
      // for (let i =0;i<inputs.length;i++)
      // {
      //     if(inputs[i].value != '')
      //     {
      //       alert('Заполните формы');
      //       return;
      //     }
      // }
      event.preventDefault();
        this.submit();
    }
    let inputs = this.element.getElementsByTagName('input');
    this.element.addEventListener('submit',f);
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    let obj = {};
    let inputs = this.element.getElementsByTagName('input');
    for (let i =0;i<inputs.length;i++)
    {
       obj[`${inputs[i].name}`] = `${inputs[i.value]}`;
    }
    return obj;
  }

  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit({'url': this.element.action,
                   'method': this.element.method,
                   'data': this.getData()})
  }
}

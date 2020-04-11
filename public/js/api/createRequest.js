/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    if (options.method==='GET')
    {
        let string ='';
        let counter = 0;
        for (let key in options.data)
        {
            if(counter===0){
            string = '?'+key+'='+options.data[key];
            counter++;
            }
            else {
                string = string+'&'+key+'='+options.data[key];
            }
        }
        try
        {
            xhr.open(`GET`, options.url+string);
            xhr.responseType = 'json';
            xhr.send();
        }
        catch (err) {
            options.callback(err);
            return xhr;
        }
    }
    else
    {
        formData = new FormData;
        for (let key in options.data)
        {
        formData.append(key,options.data[key]);
        }
        try
        {
            xhr.open('POST', `${options.url}`);
            xhr.responseType = 'json';
            xhr.send(formData);
        }
        catch (err) 
        {
            options.callback(err);
        }
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState===4)
            {
                let response = xhr.responseText;
                xhr.onload = function () {
                    options.callback(null,response);
                }
                xhr.onerror = function () {
                    options.callback(err);
                }
            }
        }   
    }
    
};

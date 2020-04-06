/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    if (options.method==='GET')
    {
        try
        {
            xhr.open(`GET`, `${options.url}?mail=${options.data.mail}&password=${options.data.password}`);
            xhr.send();
        }
        catch (e) {
            options.callback(e);
            return xhr;
        }
    }
    else
    {
        formData = new FormData;
        formData.append('mail',`${options.data.mail}`);
        formData.append('password',`${options.data.password}`);
        try
        {
            xhr.open('POST', `${options.url}`);
            xhr.send(formData);
        }
        catch (e) 
        {
            options.callback(e);
            return xhr;
        }
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState===4)
            {
                let result = xhr.responseText;
                options.callback(null,result);
                return xhr;
            }
        }   
    }
    
};

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
        catch (err) {
            options.callback(err);
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
        catch (err) 
        {
            options.callback(err);
            return xhr;
        }
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState===4)
            {
                let response = xhr.responseText;
                options.callback(null,response);
            
                return xhr;
            }
        }   
    }
    
};

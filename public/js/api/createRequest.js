
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    let string ='';
    if (options.method==='GET')
    {
        
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
    }
    else
    {
        formData = new FormData;
        for (let key in options.data)
        {
        formData.append(key,options.data[key]);
        }
    }
        try
        {   
            xhr.open(options.method, options.url+string);
            xhr.responseType = 'json';
            xhr.withCredentials = true;
            if(options.method==='GET') {xhr.send();}
            else {xhr.send(formData);}
        }
        catch (err) {
            options.callback(err);
            return xhr;
        }

        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState===4)
            {
                
                xhr.onload = function () {
                    options.callback(null,xhr.response);
                }
            }
            else
            {
                xhr.onerror = function () {
                    const err = new Error( 'Request Error' );
                    options.callback(err);
                   // console.log(err);
                }
            }
        }   
   
    
};

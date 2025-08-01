const createRequest = (options = {}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const { method, url, params, headers } = options;

    // Формируем URL с параметрами (для VK API)
    let requestUrl = url;
    if (params && method === 'GET') {
      requestUrl += '?' + new URLSearchParams(params).toString();
    }

    xhr.open(method || 'GET', requestUrl);
    
    // Устанавливаем заголовки (для Yandex API)
    if (headers) {
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = () => reject(new Error('Network Error'));
    
    // Отправляем данные (для POST-запросов Yandex)
    if (method === 'POST') {
      xhr.send(JSON.stringify(params));
    } else {
      xhr.send();
    }
  });
};

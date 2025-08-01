class VK {
  static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';
  static lastCallback;

  static get(id = '', callback) {
    this.lastCallback = callback;
    
    // Формируем скрипт для JSONP-запроса (VK API требует это для работы в браузере)
    const script = document.createElement('script');
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=VK.processData`;
    document.body.appendChild(script);
  }

  static processData(result) {
    document.body.removeChild(document.querySelector('script[src*="api.vk.com"]'));
    
    if (result.error) {
      console.error('VK Error:', result.error);
      this.lastCallback([]);
    } else {
      this.lastCallback(result.response.items);
    }
  }
}

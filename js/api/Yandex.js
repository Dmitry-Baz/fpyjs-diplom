class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';
  static token = '';

  static getToken() {
    // В реальном проекте токен можно запрашивать у пользователя через prompt или форму
    this.token = prompt('Введите OAuth-токен Яндекс.Диска:');
    return this.token;
  }

  static uploadFile(path, url, callback) {
    if (!this.token) this.getToken();
    
    createRequest({
      method: 'POST',
      url: `${this.HOST}/resources/upload`,
      params: { path, url },
      headers: { Authorization: `OAuth ${this.token}` }
    }).then(callback).catch(console.error);
  }

  static removeFile(path, callback) {
    createRequest({
      method: 'DELETE',
      url: `${this.HOST}/resources`,
      params: { path, permanently: true },
      headers: { Authorization: `OAuth ${this.token}` }
    }).then(callback).catch(console.error);
  }

  static getUploadedFiles(callback) {
    createRequest({
      method: 'GET',
      url: `${this.HOST}/resources/files`,
      headers: { Authorization: `OAuth ${this.token}` }
    }).then(callback).catch(console.error);
  }

  static downloadFileByUrl(url) {
    const link = document.createElement('a');
    link.href = url;
    link.click();
  }
}

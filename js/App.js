class App {
  static init() {
    // Инициализация API
    this.vkToken = VK.ACCESS_TOKEN; // Токен VK уже задан в VK.js
    this.yandex = Yandex; // Используем статические методы Yandex

    // Инициализация UI
    this.searchBlock = new SearchBlock(document.querySelector('.search-block'));
    this.imageViewer = new ImageViewer(document.querySelector('.images-wrapper'));
    this.initModals();

    // Инициализация состояния
    this.selectedPhotos = [];
    this.currentUser = null;

    // Назначение глобальных обработчиков
    this.bindEvents();
  }

  static initModals() {
    this.modals = {
      fileUploader: new FileUploaderModal($('.ui.modal.file-uploader-modal')),
      filePreviewer: new PreviewModal($('.ui.modal.uploaded-previewer-modal')),
    };
  }

  static bindEvents() {
    // Кнопка "Просмотреть загруженные"
    document.querySelector('.show-uploaded-files').addEventListener('click', () => {
      this.loadYandexFiles();
    });

    // Кнопка "Отправить на диск"
    document.querySelector('.button.send').addEventListener('click', () => {
      this.openUploadModal();
    });
  }

  /**
   * Загружает фото из VK по ID пользователя
   */
  static loadVKPhotos(userId, mode = 'replace') {
    this.currentUser = userId;

    VK.get(userId, (photos) => {
      if (mode === 'replace') {
        this.selectedPhotos = []; // Сброс выбора при замене
      }
      this.imageViewer.render(photos, mode === 'replace');
      this.updateSendButton();
    });
  }

  /**
   * Загружает список файлов с Яндекс.Диска
   */
  static loadYandexFiles() {
    if (!Yandex.token) Yandex.getToken();

    Yandex.getUploadedFiles((files) => {
      this.modals.filePreviewer.show(files);
    });
  }

  /**
   * Открывает модальное окно загрузки
   */
  static openUploadModal() {
    if (this.selectedPhotos.length === 0) return;
    
    const modal = this.getModal('fileUploader');
    modal.prepare(this.selectedPhotos);
    modal.show();
  }

  /**
   * Обновляет состояние кнопки "Отправить на диск"
   */
  static updateSendButton() {
    const btn = document.querySelector('.button.send');
    btn.classList.toggle('disabled', this.selectedPhotos.length === 0);
  }

  // ... остальные методы из вашего исходного файла
}

// Загрузить фото пользователя VK с ID 1
App.loadVKPhotos('1');

// Вручную добавить фото в выбранные
App.selectedPhotos.push({ url: 'https://example.com/photo.jpg' });
App.updateSendButton();

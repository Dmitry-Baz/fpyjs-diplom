class SearchBlock {
  constructor(container) {
    this.replaceBtn = container.querySelector('.button.replace');
    this.addBtn = container.querySelector('.button.add');
    
    this.replaceBtn.addEventListener('click', () => App.loadVKPhotos(this.getUserId(), 'replace'));
    this.addBtn.addEventListener('click', () => App.loadVKPhotos(this.getUserId(), 'add'));
  }

  getUserId() {
    return document.querySelector('.search-block input').value.trim();
  }
}
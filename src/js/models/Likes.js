export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = {
      id,
      title,
      author,
      img
    };
  this.likes.push(like);

    this.persistData();
    return like;
  }

  deleteLike(ID) {
    const index = this.likes.findIndex(cur => cur.id === ID);
    this.likes.splice(index, 1);
    this.persistData();
  }

  isLiked(ID) {
    const index = this.likes.findIndex(cur => cur.id === ID);
    if(index === -1) {
      return false;
    }
    else {
      return true;
    }
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    if(storage) {
      this.likes = storage;
    }
  }
}

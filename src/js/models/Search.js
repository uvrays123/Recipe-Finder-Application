import axiosModule from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const result = await axiosModule(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
        //console.log(result);
      this.result = result.data.recipes;
      //console.log(this.result);
    }
    catch(error) {
      alert(error);
    }
  }

}

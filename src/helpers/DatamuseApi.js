import { Request } from "@/helpers/request.js";
class DatamuseApi extends Request {
    constructor(word, filters, isFavourite) {
        const host = `http://api.datamuse.com/words?sp=${word}*&md=pdr&ipa=1`;
        const method =  "GET";
        const data = {};
        super(host, method, data);
        this.word = word;
        this.filters = filters;
        this.isFavourite = isFavourite;
    }

    async getWords() {
        let result = await this.request().then(responce => {
          let data = [];
          let wordsArray = [];
          data = responce
            .filter(x => x.defs)
            .map(x => {
              x.defenitions = {};
              x.defs.forEach(z => {
                let defenitionsArray = z.split("\t");
                if (!x.defenitions[defenitionsArray[0]]) {
                  x.defenitions[defenitionsArray[0]] = [];
                }
                x.defenitions[defenitionsArray[0]].push(defenitionsArray[1]);
              });
              x.transcription = x.tags[x.tags.length - 1].substr(9);
              return x;
            })
            .sort((a, b) => (a.word > b.word ? 1 : b.word > a.word ? -1 : 0));
          data.forEach(x => {
            for (let key in x.defenitions) {
              let wordItem = {};
              wordItem.type = key;
              wordItem.word = x.word;
              wordItem.defenitions = x.defenitions[key];
              wordItem.transcription = x.transcription;
              wordItem.expand = false;
              wordItem.favourite = this.isFavourite(wordItem);
              wordsArray.push(wordItem);
            }
          });
          wordsArray = wordsArray.filter(x => {
            if (this.filters.length) {
              return this.filters.includes(x.type);
            }
            return true;
          });
          wordsArray = wordsArray.slice(0, 10);
          return wordsArray;
        });
        return result;
    }

}
export { DatamuseApi };
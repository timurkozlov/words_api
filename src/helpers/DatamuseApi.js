import { Request } from "@/helpers/request.js";
class DatamuseApi extends Request {
  constructor() {
    super("http://api.datamuse.com/");
  }

  async getWords(word, filters, isFavourite) {
    const path = `words?sp=${word}*&md=pdr&ipa=1`;
    const result = await this.request(path).then(responce => {
      let wordsArray = [];
      const data = responce
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
          let wordItem = {
            type: key,
            word: x.word,
            defenitions: x.defenitions[key],
            transcription: x.transcription,
            expand: false
          };
          wordItem.favourite = isFavourite(wordItem);
          wordsArray.push(wordItem);
        }
      });
      return wordsArray
        .filter(x => {
          if (filters.length) {
            return filters.includes(x.type);
          }
          return true;
        })
        .slice(0, 10);
    });
    return result;
  }
}
export { DatamuseApi };

import { request } from "@/helpers/request.js";
export function datamuseApi(word, filters, isFavourite) {
  return request(
    `http://api.datamuse.com/words?sp=${word}*&md=pdr&ipa=1`,
    "get"
  ).then(responce => {
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
        wordItem.favourite = isFavourite(wordItem);
        wordsArray.push(wordItem);
      }
    });
    wordsArray = wordsArray.filter(x => {
      if (filters.length) {
        return filters.includes(x.type);
      }
      return true;
    });
    wordsArray = wordsArray.slice(0, 10);
    return wordsArray;
  });
}

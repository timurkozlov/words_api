<template>
  <div class="row">
    <div class="search-column">
      <Search
        @resetWords="resetWords"
        @setFilters="setFilters"
        @setQuery="setQuery"
      />
    </div>
    <div class="items-column">
      <div class="results" v-if="words">
        <ListItem
          v-for="item in words"
          :key="item.word + item.type"
          @setFavourite="setFavourite"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "@/helpers/request.js";
import ListItem from "@/components/ListItem";
import Search from "@/components/Search";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    ListItem,
    Search
  },
  data() {
    return {
      filters: [],
      query: "",
      debouncedQuery: "",
      words: null
    };
  },
  computed: {
    ...mapGetters({
      isFavourite: "favourites/isFavourite"
    })
  },

  methods: {
    resetWords() {
      this.words = [];
    },
    setFilters(val) {
      this.filters = val;
      if (this.query) {
        this.getWords(this.query);
      } else {
        this.resetWords();
      }
    },
    setQuery(val) {
      this.query = val;
      this.getWords(val);
    },
    setFavourite(item) {
      if (item.favourite) {
        this.$store.dispatch("favourites/removeFavourite", item);
      } else {
        let fav = item;
        fav.favorite = true;
        this.$store.dispatch("favourites/addFavourite", fav);
      }
      this.words.forEach(x => {
        x.word == item.word && x.type == item.type
          ? (x.favourite = !x.favourite)
          : null;
      });
    },
    getWords(val) {
      request(
        `http://api.datamuse.com/words?sp=${val}*&md=pdr&ipa=1`,
        "get"
      ).then(responce => {
        let data = [];
        this.words = [];
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
            this.words.push(wordItem);
          }
        });
        this.words = this.words.filter(x => {
          if (this.filters.length) {
            return this.filters.includes(x.type);
          }
          return true;
        });
        this.words = this.words.slice(0, 10);
      });
    }
  }
};
</script>
<style lang="scss"></style>

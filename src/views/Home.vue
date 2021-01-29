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
import ListItem from "@/components/ListItem";
import Search from "@/components/Search";
import { mapGetters } from "vuex";
import { datamuseApi } from "@/helpers/DatamuseApi.js";
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
      datamuseApi(val, this.filters, this.isFavourite).then(responce => {
        this.words = responce;
      });
    }
  }
};
</script>
<style lang="scss"></style>

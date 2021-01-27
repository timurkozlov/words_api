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
        <draggable v-if="!filters.length && !query" v-model="words">
          <ListItem
            v-for="item in words"
            :key="item.word + item.type"
            @setFavourite="setFavourite"
            :item="item"
            :draggable="true"
          />
        </draggable>
        <template v-if="filters.length || query">
          <ListItem
            v-for="item in wordsFiltered"
            :key="item.word + item.type"
            @setFavourite="setFavourite"
            :item="item"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import ListItem from "@/components/ListItem";
import { mapGetters } from "vuex";
import Search from "@/components/Search";
import draggable from "vuedraggable";
export default {
  name: "Starred",
  components: {
    ListItem,
    draggable,
    Search
  },
  data() {
    return {
      filters: [],
      query: "",
      debouncedQuery: "",
      words: null,
      wordsFiltered: []
    };
  },
  computed: {
    ...mapGetters({
      isFavourite: "favourites/isFavourite"
    })
  },
  watch: {
    words: function(newVal) {
      this.$store.dispatch("favourites/replaceFavourites", newVal);
    }
  },
  created() {
    this.getWords();
  },
  methods: {
    resetWords() {
      this.query = "";
      this.getWords();
    },
    setFilters(val) {
      this.filters = val;
      if (this.query) {
        this.getWords();
      } else {
        this.resetWords();
      }
    },
    setQuery(val) {
      this.query = val;
      this.getWords();
    },
    setFavourite(item) {
      this.$store.dispatch("favourites/removeFavourite", item);
      this.words.forEach(x => {
        x.word == item.word && x.type == item.type
          ? (x.favourite = !x.favourite)
          : null;
      });
      this.getWords();
    },
    getWords() {
      this.words = this.$store.state.favourites.favourites;
      this.wordsFiltered = this.words;
      this.wordsFiltered = this.wordsFiltered
        .filter(x => {
          if (this.filters.length && this.filters) {
            return this.filters.includes(x.type);
          }
          return true;
        })
        .filter(x => {
          if (this.query) {
            return x.word.includes(this.query);
          }
          return true;
        });
    }
  }
};
</script>

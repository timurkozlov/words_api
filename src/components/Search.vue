<template>
  <div>
    <div class="search">
      <input class="search-input" v-model="query" type="text" />
    </div>
    <div class="filters">
      <div>
        <label>
          <input type="checkbox" value="n" v-model="filters" />
          noun
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" value="v" v-model="filters" />
          verb
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" value="adj" v-model="filters" />
          adjective
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" value="adv" v-model="filters" />
          adverb
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { delay } from "@/helpers/delay.js";
export default {
  props: {},
  data() {
    return {
      filters: [],
      query: "",
      debouncedQuery: ""
    };
  },
  watch: {
    query: delay(function(newVal) {
      this.debouncedQuery = newVal;
    }, 300),
    debouncedQuery(newVal) {
      if (newVal) {
        this.setQuery(newVal);
      } else {
        this.resetWords();
      }
    },
    filters(newVal) {
      this.setFilters(newVal);
    }
  },
  methods: {
    resetWords() {
      this.$emit("resetWords", null);
    },
    setFilters(val) {
      this.$emit("setFilters", val);
    },
    setQuery(val) {
      this.$emit("setQuery", val);
    }
  }
};
</script>
<style lang="scss">
label:hover {
  cursor: pointer;
}
.filters {
  padding: 12px;

  input {
    margin-right: 12px;
  }
}
.search-input {
  margin: 12px;
  padding: 12px;
  background-color: transparent;
  font-size: 24px;
  line-height: 18px;
  color: #575756;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 32px 32px;
  background-position: 95% center;
  border-radius: 16px;
  border: 1px solid #575756;
  backface-visibility: hidden;

  &::placeholder {
    color: color(#575756 a(0.8));
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    outline: none;
  }
}
</style>

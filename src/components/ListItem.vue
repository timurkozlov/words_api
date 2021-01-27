<template>
  <div class="results-item">
    <div class="item-main-information">
      <div v-if="draggable" class="item-draggable"></div>
      <div class="item item-name" v-on:click="item.expand = !item.expand">
        <strong>{{ item.word }}</strong>
      </div>
      <div class="item">
        <i>{{ item.type }}</i>
      </div>
      <div v-if="!item.expand" class="item item-defenition-short">
        {{ item.defenitions[0] }}
      </div>
      <div class="item" v-if="item.expand">[{{ item.transcription }}]</div>
      <div class="item-favourite" v-on:click="setFavourite">
        <span v-if="item.favourite">&#9733;</span><span v-else>&#9734;</span>
      </div>
    </div>
    <div v-if="item.expand" class="item-additional-information">
      <div
        class="item-defenition"
        v-for="(def, i) in item.defenitions"
        :key="i"
      >
        {{ def }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    draggable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setFavourite() {
      this.$emit("setFavourite", this.item);
    }
  }
};
</script>
<style lang="scss">
.results {
  max-width: 100%;
}
.results-item {
  margin: 12px 24px 12px;
  border-radius: 12px;
  background: lightgray;
  padding: 8px;
}
.item {
  display: block;
  margin-right: 8px;
  margin-top: 8px;
  white-space: nowrap;

  &-name {
    cursor: pointer;
  }
  &-favourite {
    cursor: pointer;
    font-size: 32px;
    margin-left: auto;
  }
  &-additional-information {
    margin-left: 18px;
    margin-bottom: 24px;
  }
  &-defenition-short {
    white-space: nowrap;
    display: inline;
    width: auto;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-defenition {
    font-size: 24px;
    padding-bottom: 18px;
  }
  &-main-information {
    display: flex;
    flex-wrap: nowrap;
    padding: 8px;
    max-width: 100%;
  }
}
.item-draggable {
  cursor: grab;
  padding-top: 20px;
  margin-right: 8px;
  display: inline-block;
  width: 16px;
  height: 8px;
}
.item-draggable,
.item-draggable::before {
  background-image: radial-gradient(black 40%, transparent 40%);
  background-size: 4px 4px;
  background-position: 0 100%;
  background-repeat: repeat-x;
}
.item-draggable::before {
  content: "";
  display: block;
  width: 100%;
  height: 33%;
}
</style>

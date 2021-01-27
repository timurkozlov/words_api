export const favourites = {
  namespaced: true,
  state: {
    favourites:
      localStorage.getItem("favourites") != null
        ? JSON.parse(localStorage.getItem("favourites"))
        : []
  },
  getters: {
    isFavourite: state => item => {
      return state.favourites
        ? state.favourites.filter(
            x => x.type == item.type && x.word == item.word
          ).length > 0
        : false;
    }
  },
  mutations: {
    addFavourite(state, item) {
      if (!state.favourites) {
        state.favourites = [];
      }
      state.favourites.push(item);
    },
    removeFavourite(state, item) {
      if (state.favourites) {
        state.favourites = state.favourites.filter(
          x => x.type != item.type || x.word != item.word
        );
      }
    },
    replaceFavourites(state, items) {
      state.favourites = items;
    }
  },
  actions: {
    addFavourite(store, item) {
      store.commit("addFavourite", item);
      localStorage.setItem(
        "favourites",
        JSON.stringify(store.state.favourites)
      );
    },
    removeFavourite(store, item) {
      store.commit("removeFavourite", item);
      localStorage.setItem(
        "favourites",
        JSON.stringify(store.state.favourites)
      );
    },
    replaceFavourites(store, items) {
      store.commit("replaceFavourites", items);
      localStorage.setItem(
        "favourites",
        JSON.stringify(store.state.favourites)
      );
    }
  }
};

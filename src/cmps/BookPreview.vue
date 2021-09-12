<template>
  <section class="book-preview">
    <div class="book-preview-img">
      <img :src="book.thumbnail" />
      <div v-if="book.listPrice.isOnSale">
        <label>SALE</label>
      </div>
    </div>
    <div class="book-preview-text">
      <!-- <p class="text-center"> {{ book.title}}</p> -->
      <p class="text-center">{{ longTxt }}</p>
      <p class="text-center">{{ book.listPrice.amount }} {{ priceSymbol }}</p>
    </div>
    <div class="flex align-center space-between">
      <router-link :to="`/book/${book.id}`"
        ><button class="btn-details">Details</button></router-link
      >
      <button class="btn-remove" @click="$emit('removeBook', book.id)">
        Remove
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      priceSymbol: "",
      // defaultSymbol:'$',
      // defaultPrice:10
    };
  },

  props: ["book"],

  methods: {
    priceCurency() {
      var symbolTxt = this.book.listPrice.currencyCode;
      var symbol;

      switch (symbolTxt) {
        case "ILS":
          symbol = "₪";
          break;
        case "USD":
          symbol = "$";
          break;
        case "EUR":
          symbol = "€";
          break;
      }
      this.priceSymbol = symbol;
    },
  },
  created() {
    this.priceCurency();
  },
  computed: {
    longTxt() {
      let title = "";
      if (this.book.title.length > 50) {
        title = this.book.title.substring(0, 20) + "...";
      } else {
        title = this.book.title;
      }
      return title;
    },
  },
};
</script>


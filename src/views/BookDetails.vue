<template>
  <section>
    <main v-if="book" class="book-details container">
      <div class="book-details-btn-back">
        <img src="@/assets/icons/left-arrow.svg" @click="onBack" />
      </div>
      <div class="book-details-img">
        <img :src="book.thumbnail" />
      </div>

      <p class="book-details-title">{{ book.title }}</p>
      <p class="book-details-price">
        <span :class="classPrice">
          {{ book.listPrice.amount }} {{ priceCurency }}</span
        >
      </p>
      <p class="book-details-desc">Description</p>
      <p class="text-center">{{ book.description }}</p>
      <p class="book-details-isnew text-center">{{ isBookNew }}</p>
      <p class="book-details-islong text-center">{{ isBookLongRead }}</p>
      <!-- <p v-if="isBookOnSale" class="book-details-sale text-center">
        ITS ON SALE !
      </p> -->
      <review-add :book="book" @removeReview="removeReview"></review-add>
    </main>
    <div class="book-details-loading flex align-center justify-center" v-else>
      <img src="@/assets/icons/loading.svg" />
    </div>
  </section>
</template>

<script>
import bookService from "../services/book.service.js";
import ReviewAdd from "@/cmps/ReviewAdd.vue";

export default {
  data() {
    return {
      book: null,
      bookId: null,
    };
  },

  created() {
    const { id } = this.$route.params;
    this.bookId = id;
    setTimeout(async () => {
      await this.loadBook();
    }, 1000);
  },
  methods: {
    async loadBook() {
      this.book = await bookService.getById(this.bookId);
    },
    onBack() {
      this.$router.push("/book");
    },
    removeReview(id) {
      // console.log("removing book", id);
      let filteredReviews = this.book.reviews.filter(
        (review) => review.id !== id
      );
      // let bookToSave = { ...this.book };
      let bookToSave = JSON.parse(JSON.stringify(this.book));
      bookToSave.reviews = filteredReviews;
      bookService.save(bookToSave);
      setTimeout(async () => {
        await this.loadBook();
      }, 0);
    },
  },

  computed: {
    isBookOnSale() {
      if (this.book.listPrice.isOnSale) {
        return true;
      } else {
        return false;
      }
    },

    isBookLongRead() {
      var pageNum = this.book.pageCount;
      var pageLength;
      switch (true) {
        case pageNum > 500:
          pageLength = "Long reading";
          break;
        case pageNum > 200:
          pageLength = "Decent Reading";
          break;
        case pageNum < 100 || pageNum > 100:
          pageLength = "Light Reading";
          break;
      }
      return pageLength;
    },

    isBookNew() {
      var bookYearPublish = this.book.publishedDate;
      var bookYears = 2021 - bookYearPublish;
      var bookAge;

      switch (true) {
        case bookYears > 10:
          bookAge = "Veteran Book";
          break;
        case bookYears < 10:
          bookAge = "New!";
          break;
      }
      return bookAge;
    },
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
      return symbol;
    },

    classPrice() {
      var price = this.book.listPrice.amount;
      if (price > 150) return "red";
      else if (price <= 150) return "green";
    },
  },
  components: {
    ReviewAdd,
  },
};
</script>

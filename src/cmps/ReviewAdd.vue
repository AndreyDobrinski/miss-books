<template>
  <section class="review-add">
    <h1 class="text-center">Add Review</h1>
    <form @submit.prevent="addReview">
      <div class="flex align-center justify-center">
        <textarea
          @keydown.enter.prevent="addReview" v-focus
          v-model="review.txt"
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <!-- <div class="review-add-rates"> -->
      <div class="flex align-center justify-center">
        <div class="review-add-rates">
          <!-- <button type="button" @click="changeRate(1)">+</button> -->
          <img class="review-add-rates-btn" src="@/assets/icons/add.svg" @click="changeRate(1)" />
          <span>{{ "⭐".repeat(rate) }}</span>
          <img class="review-add-rates-btn" src="@/assets/icons/remove.svg" @click="changeRate(-1)" />
          <!-- <button class="btn-reduce" type="button" @click="changeRate(-1)"> -->
            <!-- - -->
          <!-- </button> -->
        </div>
      </div>
      <div class="btn-save flex align-center justify-center">
        <button>Save</button>
      </div>
    </form>

    <h1>Reviews:</h1>
    <ul class="review-add-reviews" v-if="book.reviews.length">
    <!-- <ul class="review-add-reviews"> -->
      <li v-for="review in book.reviews" :key="review.id" class="flex">
        <!-- <button class="list-btn-delete" @click="removeReview(review.id)">X</button> -->
        <img class="list-btn-delete" src="@/assets/icons/cancel.svg" @click="removeReview(review.id)" />
        <p class="list-date">{{ formatDate(review.at) }}</p>
        <p class="list-text">{{ review.txt }}</p>
        <p class="list-stars">{{ "⭐".repeat(review.stars) }}</p>
      </li>
    </ul>
    <p v-else >Be the first to add review!</p>
  </section>
</template>

<script>
import BookService from "../services/book.service";
import { Utils } from "../services/utils.service";
import moment from "moment";
export default {
  props: ["book"],
  data() {
    return {
      rate: 1,
      review: {
        txt: "",
      },
    };
  },
  methods: {
    addReview() {
      let reviewToAdd = {
        id: Utils.getRandomId(),
        at: Date.now(),
        aboutBook: this.book.id,
        stars: this.rate,
        txt: this.review.txt,
      };
      // console.log(this.book);
      this.book.reviews.push(reviewToAdd);
      BookService.save(this.book);
      this.review.txt = "";
      this.rate = 1;
    },
    changeRate(diff) {
      this.rate += diff;
      if (this.rate > 5) this.rate = 5;
      if (this.rate < 1) this.rate = 1;
    },
    formatDate(date) {
      return moment(date).format("MM/DD/YYYY");
    },
    removeReview(reviewId){
      // console.log('removing book ',reviewId);
      this.$emit('removeReview',reviewId)
    }
  },
};
</script>


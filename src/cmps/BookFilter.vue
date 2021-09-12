<template>
  <div>
    <section class="book-filter container">
      <div class="book-filter-filters flex space-between align-center">
        <input
          class="book-filter-by-name"
          v-focus
          type="text"
          placeholder="Search by Name"
          v-model="filterBy.txt"
          @input="filtered"
        />

        <div class="book-filter-by-price flex align-center justify-center">
          <span>0$</span>
          <input
            class="book-filter-by-price-imput"
            type="range"
            min="0"
            max="200"
            v-model.number="filterBy.price"
            @input="filtered"
          />
          <span>{{ filterBy.price }}$</span>
        </div>
      </div>

      <div class="flex align-center justify-center">
        <input
          type="text"
          placeholder="Add Book"
          v-model="addBook.text"
          @input="addedBook"
        />
      </div>
    </section>

    <div>
      <ul class="book-filter-new-books container">
        <li v-for="title in booksAPI" :key="title.id">
          <img src="@/assets/icons/add.svg" @click="onAddBook(title)" />
          <!-- <button @click="onAddBook(title)">+</button> -->
          <p>{{ title.volumeInfo.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bookService from "../services/book.service.js";
export default {
  data() {
    return {
      filterBy: {
        text: "",
        price: 200,
      },
      addBook: {
        text: "",
      },
      booksAPI: [],
    };
  },

  methods: {
    filtered() {
      this.$emit("filtered", { ...this.filterBy });
    },
    async addedBook() {
      this.$emit("addedBook", { ...this.addBook.text });
      var booksTitle = await bookService.getDemoAPIBooks(this.addBook.text);
      this.booksAPI = booksTitle;
      // console.log(this.booksAPI);
    },
    async onAddBook(book) {
      // console.log(book);
      await this.$store.dispatch({ type: "addBook", book: book });
    },
  },
};
</script>
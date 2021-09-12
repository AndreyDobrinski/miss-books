<template>
  <div class="book-app">
    <book-filter @filtered="setFilter" />
    <book-list :books="booksToShow" @removeBook="onRemoveBook" />
  </div>
</template>

<script>
// import bookService from "../services/book.service.js";
import BookList from "@/cmps/BookList";
import BookFilter from "@/cmps/BookFilter";

export default {
  data() {
    return {
      books: null,
      filterBy: null,
    };
  },

  methods: {
    async loadBooks() {
      // this.books = await bookService.query();
      await this.$store.dispatch({type:'loadBooks'})
    },

    setFilter(filterBy) {
      // if (!filterBy.toPrice) filterBy.toPrice = Infinity;
      // this.filterBy = filterBy;
      this.$store.commit({type:'setFilter' , filterBy})
    },

    async onRemoveBook(bookId) {
      // await bookService.remove(bookId);
      // this.loadBooks();
      this.$store.dispatch({type:'removeBook',bookId })
    },
  },

  async created() {
    this.loadBooks();
  },

  computed: {
    // booksToShow() {
    //   if (!this.filterBy) return this.books;
    //   const regex = new RegExp(this.filterBy.txt, "i");
    //   const booksForDisplay = this.books.filter((book) => {
    //     return (
    //       regex.test(book.title) && book.listPrice.amount <= this.filterBy.price
    //     );
    //   });
    //   return booksForDisplay;
    // },
     booksToShow() {
      return this.$store.getters.booksToShow;
    },
  },

  components: {
    BookList,
    // BookDetails,
    BookFilter,
  },
};
</script>

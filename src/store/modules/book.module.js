import bookService from '../../services/book.service.js';
export default {
    state: {
        books: null,
        filterBy: null,
    },
    getters: {
        booksToShow(state) {
            const {books} = state
            if (!state.filterBy) return books;
            const regex = new RegExp(state.filterBy.txt, "i");
            const booksForDisplay = books.filter((book) => {
              return (
                regex.test(book.title) && book.listPrice.amount <= state.filterBy.price
              );
            });
            return booksForDisplay;
          },
        
    },
    mutations: {
        setBooks(state, payload) {
            state.books = payload.books
        },
        setFilter(state ,payload ){
            // if (!filterBy.toPrice) filterBy.toPrice = Infinity;
            // state.filterBy = filterBy;
            state.filterBy = payload.filterBy
        },
        removeBook(state,payload){
            const idx = state.books.findIndex(book => book.id === payload.bookId)
            state.books.splice(idx, 1)
        },
        addBook(state,payload){
            const idx = state.books.findIndex(currbook => currbook.id === payload.book.id)
            if (idx === -1) state.books.unshift(payload.book)
            else state.books.splice(idx, 1, payload.book)
            // console.log(state.books);
        }
       
    },
    actions: {
        async loadBooks(context) {
            try{
                const books = await bookService.query()
                context.commit({ type: 'setBooks', books })
            }catch(err){
                console.log('Could not load books',err);
            }
        },
        async removeBook(context,{bookId}){
            try{
                await bookService.remove(bookId);
                context.commit({ type: 'removeBook', bookId })
            }catch(err){
                console.log('Could not Delete book',err);
            }
        },
        async addBook(context,book){
            try{
                // var book = book.volumeInfo
                // console.log('Google book:',book);
                const bookToSave = await bookService.save(book.book.volumeInfo)
                // console.log('Our book',bookToSave);
                context.commit({ type: 'addBook', book:bookToSave })
            }catch(err){
                console.log('Could not add book',err);
            }
        }
       
    },
}
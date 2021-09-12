<template>
  <ul class="book-list">
      <book-preview v-for="book in books" :book="book" :key="book.id" @removeBook="$emit('removeBook',$event)"/>
  </ul>
</template>

<script>
import BookPreview from '@/cmps/BookPreview'

export default {
    props:['books'],
    methods:{

        // selected(book){
        //     this.$emit('selected',book)
        // }

    },
    components:{
        BookPreview
    }
};

</script>


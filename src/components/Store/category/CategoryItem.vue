<template>
  <li :class="classActive" :key="'ct' + category.id" @click="handleChangeIDShowChild()">
    {{ category.name }}
    <ol v-if="idShowChild == category.id">
      <template v-for="child in category.childs">
        <li :key="'child_ct' + child.id" @click="handleChangeList(child)">
          {{ child.name }}
        </li>
      </template>
    </ol>
  </li>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    },

    idShowChild: {
      type: [Number, String],
    }
  },

  methods: {
    handleChangeIDShowChild() {
      const {id} = this.category;
      this.$emit('changeIDShow', id);
    },

    handleChangeList(child) {
      this.$emit('changeList', child);
    }
  },

  computed: {
    classActive() {
      const {id} = this.category;
      return {
        active: id == this.idShowChild
      }
    }
  }
}
</script>

<style>

</style>
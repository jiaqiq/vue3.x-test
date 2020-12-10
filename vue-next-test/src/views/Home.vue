<template>
  <div class="home">
    <h3>Tooltips with Vue 3 Teleport</h3>
    <div>
      <modal-button></modal-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ModalButton from "@/components/ModalButton.vue";

export default {
  name: "Home",
  components: {
    ModalButton,
  },
};
</script>

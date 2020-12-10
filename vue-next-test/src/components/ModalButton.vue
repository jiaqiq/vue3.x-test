<template>
  <button @click="modalOpenFn">
    Open full screen modal! (With teleport!)
  </button>

  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a teleported modal! (My parent is "body")
        <button @click="modalClose">Close</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ModelButton",
  props: {
    msg: String,
  },
  setup() {
    //ref定义变量,是一个对象，相当于data
    const modalOpen = ref(false);

    //定义事件
    const modalOpenFn = () => {
      console.log(1111111111, modalOpen)
      modalOpen.value = true;
    };

    const modalClose = () => {
      modalOpen.value = false;
    }

    return {
      modalOpen,
      modalOpenFn,
      modalClose,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>

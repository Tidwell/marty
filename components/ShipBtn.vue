<template>
  <div v-if="savefile" class="shipbtn">
    <img :src="require(`~/assets/images/ships/${savefile.shipAsset}`)" />
    <span>{{ savefile.name }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      savefile: {
        type: Object,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
.shipbtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;

  img {
    height: 100%;
    object-fit: scale-down;
    padding: 0.25em 1em 0.25em 0;
    border-right: 1px dashed $green;
    width: 110px;
  }
  span {
    color: $green;
  }
}
</style>

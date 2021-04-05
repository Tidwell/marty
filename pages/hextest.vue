<template>
  <div class="hex-planet">
    <hex-grid>
      <layout :size="{ x: 10, y: 10 }" :spacing="1.02">
        <hexagon
          v-for="(hex, i) in hexagons"
          :key="i"
          :q="hex.q"
          :r="hex.r"
          :s="hex.s"
        >
          <text-component>{{ i }}</text-component>
        </hexagon>
      </layout>
    </hex-grid>
  </div>
</template>

<script>
  import {
    HexGrid, Layout, Hexagon, GridGenerator, Text
  } from 'vue-hexgrid';
  export default {
    name: 'App',
    components: {
      HexGrid, Layout, Hexagon, TextComponent: Text
    },
    data () {
      return { hexagons: GridGenerator.hexagon(2) };
    },
  };
</script>
<style lang="scss" scoped>
.hex-planet {
  display: inline-block;
  background-image: url('~/assets/images/planets/redplanet.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
svg g {
  fill: #b3b4b8;
  fill-opacity: 0.6;
}
svg g:hover {
  fill-opacity: 1;
}
svg g:hover text {
  fill-opacity: 1;
}
svg g polygon {
  stroke: #3f51b5;
  stroke-width: 0.2;
  transition: fill-opacity 0.2s;
}
svg g text {
  font-size: 0.3em;
  fill: #ffffff;
  fill-opacity: 0.4;
  transition: fill-opacity 0.2s;
}
svg path {
  fill: none;
  stroke: hsl(60, 20%, 70%);
  stroke-width: 0.4em;
  stroke-opacity: 0.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>

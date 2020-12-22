<template>
  <div class="container">
    <img class="ava" :src="svgOptions.imgPath" />
    <div style="width: 200px; height: 200px">
      <svg viewBox="0 0 100 100">
        <path
          d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
          fill="none"
          :stroke="svgOptions.stroke"
          :stroke-width="svgOptions.width"
        >
          >
        </path>
        <path
          d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
          fill="none"
          :stroke="svgOptions.pathOptions.stroke"
          stroke-linecap="round"
          class="my-svg-path"
          :transform="svgOptions.pathOptions.progress"
          :stroke-width="svgOptions.pathOptions.width"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      svgOptions: {
        imgPath:
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=251289958,1860898046&fm=26&gp=0.jpg",
        width: 5,
        stroke: "#e5e9f2",
        pathOptions: {
          width: 5,
          stroke: "#20a0ff",
          progress: "rotate(90,50,50)",
        },
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style>
.container {
  position: relative;
  width: 200px;
  height: 200px;
}
.my-svg-path {
  stroke-dasharray: 252.2px, 252.2px;
  stroke-dashoffset: 22px;
  transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;
  transform: rotateZ(90deg);
  transform-origin: 50% 50%;
  transition: all 0.3s ease;
}
.ava {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
}
</style>

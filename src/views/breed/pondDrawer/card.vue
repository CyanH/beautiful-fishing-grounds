<template>
  <div class="card">
    <img src="@/assets/image/breed/horn.png" class="top-horn" />
    <img src="@/assets/image/industrialPark/horn.png" class="bot-horn" />

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: linear-gradient(145deg, transparent 20px, rgba(17, 16, 45, 0.78) 0);
  height: 100%;
  position: relative;
  padding: 20px 20px 15px;
  box-sizing: border-box;
  z-index: 9;

  .top-horn {
    position: absolute;
    top: 0;
    left: 0;
    width: 27px;
  }

  .bot-horn {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: rotate(180deg);
  }
}
</style>

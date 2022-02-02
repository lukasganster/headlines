<template>
  <transition name="fade" mode="out-in">
    <keep-alive>
      <router-view />
    </keep-alive>
  </transition>
</template>

<style>
@import url("http://fonts.cdnfonts.com/css/sf-ui-display");
a {
  text-decoration: none;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

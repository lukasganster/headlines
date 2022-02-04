<template>
  <transition name="fade" mode="out-in">
    <keep-alive>
      <router-view />
    </keep-alive>
  </transition>
</template>

<style>
@import url("http://fonts.cdnfonts.com/css/sf-ui-display");
html,
body,
#app {
  height: 100%;
}
#app {
  background: linear-gradient(180deg, #1b2128 0%, #2e3439 100%);
}
html {
  background: #2e3439;
  background-repeat: no-repeat;
}
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
h2.subtitle {
  color: white;
  margin-bottom: 20px;
  text-align: left;
  padding: 0 20px;
}
</style>

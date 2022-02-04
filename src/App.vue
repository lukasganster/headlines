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
body {
  height: 100%;
}
.midnight {
  background: linear-gradient(to bottom, #1b2128, #2e3439);
}
.lawrencium {
  background: #0f0c29; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  ); /* Chrome 10-25,
Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
  text-align: center;
  padding: 0 20px;
}
</style>

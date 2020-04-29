<template>
	<div id="app">
		<Head class="header"/>
		<router-view class="main"/>
		<Foot class="footer"/>
	</div>
</template>

<script>
import Head from '@/components/header';
import Foot from '@/components/footer';

export default {
  components: {
    Head,
    Foot,
  },
};
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
}
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: grid;
  grid-template-columns: 13% auto 13%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header header'
    '.     main   .'
    'footer footer footer';
  .header {
    grid-area: header;
    padding: 0 12%;
  }
  .main {
    grid-area: main;
  }
  .footer {
    grid-area: footer;
    padding: 10px 12%;
  }
  .page {
    text-align: center;
    margin: 30px 0;
    clear: both;
  }
}

@media (max-width: 768px) {
  #app {
    grid-template-columns: 10px auto 10px;
  }
  .header {
    padding: 0 10px;
  }
  .footer {
    padding: 0 10px;
  }
}
</style>

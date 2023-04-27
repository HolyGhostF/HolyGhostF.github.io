Vue.config.devtools = true;
Vue.component("card", {
template: 
`<div class="card">
	<div class="wrapper">
		<div :style="[cardBgImage]" class="cover-image" />
	</div>
	<div :style="[titleImage]" class="titleCard" />
	<div :style="[characterImage]" class="character" />
</div>
`,
props: ["dataImage", "dataTitleImage", "dataCharacterImage"],
data: () => ({
	width: 0,
	height: 0,
}),

computed: {
	cardBgImage() {
	return {backgroundImage: `url(${this.dataImage})`};
	},
	titleImage() {
	return {backgroundImage: `url(${this.dataTitleImage})`};
	},
	characterImage() {
	return {backgroundImage: `url(${this.dataCharacterImage})`};
	}
},
});

var app = new Vue({
el: "#lib-cards"
});






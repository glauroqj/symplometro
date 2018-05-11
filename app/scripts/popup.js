(function() {

	new Vue({
		name: 'Symplometro',
		el: '#symplometro',
		data: {
			version: '0.0.1',
		},
		mounted() {

		},
		created() {
			/* call ACTION to load info from localstore */
			// window.store_popup.dispatch('popupLoadAction');
		},
		computed: {
			state() {
				return window.store_popup.getters.popupActualStateGetter;
			}
		},
		methods: {
			getInfo() {
				window.store_popup.dispatch('getInfoAction');
			}
		}
	});

})();

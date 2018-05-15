(function() {

	new Vue({
		name: 'Symplometro',
		el: '#symplometro',
		data: {
			version: '0.0.3',
		},
		mounted() {

		},
		created() {
			/* verify data info */
			window.store_popup.dispatch('popupGetInfoAction');
		},
		computed: {
			loading() {
				return window.store_popup.getters.popupActualLoading;
			},
			state() {
				return window.store_popup.getters.popupActualStateGetter;
			}
		},
		methods: {
			// getInfo() {
			// 	window.store_popup.dispatch('getInfoAction');
			// }
		}
	});

})();

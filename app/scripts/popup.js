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
			/* init loading... */
			// window.store_popup.dispatch('popupLoadingAction', true);
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

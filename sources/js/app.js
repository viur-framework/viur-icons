class main {
	constructor() {
		document.addEventListener('app-loaded', () => {
			this.loaded()
		})
	}

	init() { // init all needed preloads
		console.debug("App init");

		let loaded = new Event('app-loaded');
		document.dispatchEvent(loaded);
	}

	loaded() { // at this Point Page is ready
		console.debug('App loaded');

		this.initSearch();
		this.initFilters();
	}

	initSearch() {
		let $searchInput = $('.js-search-input');
		$(document).on('keyup', $searchInput, (e) => {
			if ($searchInput.val() == '') {
				$('.list-item').show();
			} else {
				$('.list-item').hide();
				$('.list-item[data-name*="' + $searchInput.val() + '"]').show();
			}
		});
	}

	initFilters() {
		$(document).on('click', '.js-bg-dark', () => {
			$('.list-item-icon').addClass('list-item-icon--dark');
			$('.list-item-icon').removeClass('list-item-icon--light');
		});
		$(document).on('click', '.js-bg-light', () => {
			$('.list-item-icon').addClass('list-item-icon--light');
			$('.list-item-icon').removeClass('list-item-icon--dark');
		});
	}
}

$(document).ready(() => {
	window.top['app'] = new main();
	app.init();
});

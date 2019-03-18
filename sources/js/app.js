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

		this.timeout = undefined;
		this.$wrap = $('.wrap');
		this.$popup = $('.popup');
		this.$popupOverlay = $('.popup-overlay');

		this.initSearch();
		this.initFilters();
		this.initPopup();
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
		$(document).on('click', '.js-bg-options', (e) => {
			$('.js-bg-options').removeClass('is-active');
			let val = $(e.currentTarget).blur().addClass('is-active').data('value');

			$('.js-icon-list').attr('data-bg', val);
		});
		$(document).on('click', '.js-fill-options', (e) => {
			$('.js-fill-options').removeClass('is-active');
			let val = $(e.currentTarget).blur().addClass('is-active').data('value');

			$('.js-icon-list').attr('data-fill', val);
		});
	}

	initPopup() {
		$(document).on('click', '.list-item', (e) => {
			let $item = $(e.currentTarget);

			let $svg = $item.find('svg').clone().removeAttr('class'); // cleaned svg
			let svgCode = $svg[0].outerHTML;
			this.$popup.find('.popup-title').text($item.data('name'));
			this.$popup.find('.popup-icon').replaceWith($svg.addClass('icon popup-icon'));
			this.$popup.find('.popup-icon-code').text(svgCode);

			this.$wrap.addClass('wrap--blur');
			this.$popup.addClass('is-active');
			this.$popupOverlay.addClass('is-active');
		});

		$(document).on('click', '.popup-overlay, .popup-close', (e) => {
			this.$wrap.removeClass('wrap--blur');
			this.$popup.removeClass('is-active');
			this.$popupOverlay.removeClass('is-active');
		});

		$(document).on('click', '.js-copy-svg', (e) => {
			let $code = $('.popup-icon-code');
			let $btn = $(e.currentTarget);
			let selection = window.getSelection();
			let range = document.createRange();
			range.setStartBefore($code.first()[0]);
			range.setEndAfter($code.last()[0]);
			selection.removeAllRanges();
			selection.addRange(range);

			document.execCommand('copy');
			$btn.addClass('tip');

			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				$btn.removeClass('tip');
			}, 2000);
		});
	}
}

$(document).ready(() => {
	window.top['app'] = new main();
	app.init();
});

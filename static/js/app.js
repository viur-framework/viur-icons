'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var main = function () {
	function main() {
		var _this = this;

		_classCallCheck(this, main);

		document.addEventListener('app-loaded', function () {
			_this.loaded();
		});
	}

	_createClass(main, [{
		key: 'init',
		value: function init() {
			// init all needed preloads
			console.debug("App init");

			var loaded = new Event('app-loaded');
			document.dispatchEvent(loaded);
		}
	}, {
		key: 'loaded',
		value: function loaded() {
			// at this Point Page is ready
			console.debug('App loaded');

			this.timeout = undefined;
			this.$wrap = $('.wrap');
			this.$popup = $('.popup');
			this.$popupOverlay = $('.popup-overlay');

			this.initSearch();
			this.initFilters();
			this.initPopup();
		}
	}, {
		key: 'initSearch',
		value: function initSearch() {
			var $searchInput = $('.js-search-input');
			$(document).on('keyup', $searchInput, function (e) {
				if ($searchInput.val() == '') {
					$('.list-item').addClass('is-active');
				} else {
					$('.list-item').removeClass('is-active');
					$('.list-item[data-name*="' + $searchInput.val() + '"]').addClass('is-active');
				}
			});
		}
	}, {
		key: 'initFilters',
		value: function initFilters() {
			$(document).on('click', '.js-bg-options', function (e) {
				$('.js-bg-options').removeClass('is-active');
				var val = $(e.currentTarget).blur().addClass('is-active').data('value');

				$('.js-icon-list').attr('data-bg', val);
			});
			$(document).on('click', '.js-fill-options', function (e) {
				$('.js-fill-options').removeClass('is-active');
				var val = $(e.currentTarget).blur().addClass('is-active').data('value');

				$('.js-icon-list').attr('data-fill', val);
			});
		}
	}, {
		key: 'initPopup',
		value: function initPopup() {
			var _this2 = this;

			$(document).on('click', '.list-item', function (e) {
				var $item = $(e.currentTarget);

				var $svg = $item.find('svg').clone().removeAttr('class'); // cleaned svg
				var svgCode = $svg[0].outerHTML;
				_this2.$popup.find('.popup-title').text($item.data('name'));
				_this2.$popup.find('.popup-icon').replaceWith($svg.addClass('icon popup-icon'));
				_this2.$popup.find('.popup-icon-code').text(svgCode);
				var $downloadBtn = $('.js-download-svg');
				$downloadBtn.attr('href', $downloadBtn.data('href-prefix') + $item.data('name') + '.svg');

				_this2.$wrap.addClass('wrap--blur');
				_this2.$popup.addClass('is-active');
				_this2.$popupOverlay.addClass('is-active');
			});

			$(document).on('click', '.popup-overlay, .popup-close', function (e) {
				_this2.$wrap.removeClass('wrap--blur');
				_this2.$popup.removeClass('is-active');
				_this2.$popupOverlay.removeClass('is-active');
			});

			$(document).on('click', '.js-copy-svg', function (e) {
				var $code = $('.popup-icon-code');
				var $btn = $(e.currentTarget);
				var selection = window.getSelection();
				var range = document.createRange();
				range.setStartBefore($code.first()[0]);
				range.setEndAfter($code.last()[0]);
				selection.removeAllRanges();
				selection.addRange(range);

				document.execCommand('copy');
				$btn.addClass('tip');

				clearTimeout(_this2.timeout);
				_this2.timeout = setTimeout(function () {
					$btn.removeClass('tip');
				}, 2000);
			});
		}
	}]);

	return main;
}();

$(document).ready(function () {
	window.top['app'] = new main();
	app.init();
});
//# sourceMappingURL=app.js.map

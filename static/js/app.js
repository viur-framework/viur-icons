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

			this.initSearch();
			this.initFilters();
		}
	}, {
		key: 'initSearch',
		value: function initSearch() {
			var $searchInput = $('.js-search-input');
			$(document).on('keyup', $searchInput, function (e) {
				if ($searchInput.val() == '') {
					$('.list-item').show();
				} else {
					$('.list-item').hide();
					$('.list-item[data-name*="' + $searchInput.val() + '"]').show();
				}
			});
		}
	}, {
		key: 'initFilters',
		value: function initFilters() {
			$(document).on('click', '.js-bg-dark', function () {
				$('.list-item-icon').addClass('list-item-icon--dark');
				$('.list-item-icon').removeClass('list-item-icon--light');
			});
			$(document).on('click', '.js-bg-light', function () {
				$('.list-item-icon').addClass('list-item-icon--light');
				$('.list-item-icon').removeClass('list-item-icon--dark');
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

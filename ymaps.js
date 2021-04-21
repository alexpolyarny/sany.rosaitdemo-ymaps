function init() {

	// Получаем данные по филиалам и формируем массив с координатами
	var i, db = [],
		items = document.querySelectorAll('.contacts-item');
	for (i = 0; i < items.length; i++) {
		db.push({
			coords: items[i].dataset.coords.split(','),
			name: items[i].querySelector('.contacts-item h4.caption').innerText,
			city: items[i].dataset.city,
			content: items[i].innerHTML
		});
	};

	// Формируем коллекцию объектов. Настраиваем кластеризатор
	var j, collection = new ymaps.Clusterer({
		preset: 'islands#redClusterIcons',
		groupByCoordinates: false,
		clusterDisableClickZoom: true,
		clusterHideIconOnBalloonOpen: false,
		clusterBalloonContentLayout: "cluster#balloonCarousel",
		geoObjectHideIconOnBalloonOpen: false,
		clusterBalloonContentLayoutWidth: 300,
		clusterBalloonContentLayoutHeight: 220,
	});
	customIconLayout = ymaps.templateLayoutFactory.createClass(
		'<div>$[properties.iconContent]</div>'
	);
	for (j = 0; j < db.length; j++) {
		collection.add(new ymaps.Placemark(db[j].coords, {
			hintContent: db[j].city,
			//clusterCaption: '<h2>' + db[j].city + '</h2>',
			//balloonContentHeader: db[j].city,
			balloonContent: db[j].content,
		}, {
			preset: 'islands#redDotIcon',
			// // Опции кастомной метки
			// iconLayout: 'default#imageWithContent',
			// // Путь к изображению
			// iconImageHref: 'icon.gif',
			// // Размеры метки
			// iconImageSize: [48, 48],
			// // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
			// iconImageOffset: [-24, -24],
			// // Смещение слоя с содержимым относительно слоя с картинкой.
			// iconContentOffset: [15, 15],
			// iconContentLayout: customIconLayout
		}));
	};
	
	// Меняем зум и центр карты на разных экранах
	var $zoom, $center;
	var viewport = window.innerWidth;

	if( viewport < 576 ) {
		$zoom = 2;
		$center = [58.416008, 80.263653];
	} else if( viewport < 992 ) {
		$zoom = 3;
		$center = [58.416008, 80.263653];
	} else if( viewport < 1200 ) {
		$zoom = 3.5;
		$center = [58.416008, 80.263653];
	} else {
		$zoom = 4
		$center = [54.913951, 80.241942];
	};

	// Инициализация карты
	var map = new ymaps.Map('map', {
		center: $center,
		zoom: $zoom,
		behaviors: ['drag'],
		controls: []
	});
	map.controls.add('zoomControl');

	// Отключаем drag по умолчанию на малых экранах и возвращаем его по клику
	if( viewport <= 1023 ) {
		map.behaviors.disable("drag"),
		document.getElementById('map').addEventListener('click', function () {
			return map.behaviors.enable('drag')
		});
	};

	// Добавляем объекты коллекции на карту
	map.geoObjects.add(collection);

	// Задаем коды регионов и цвет их заливки в следующем формате:
	// ['код_объекта_по_ISO3166', 'цвет']
	// Код объекта можно легко получить, например, здесь: https://www.openstreetmap.org/
	var cfo  = ['1029256', '#ffff6f'], // Центральный округ
		szfo = ['1216601', '#54cbba'], // Северо-Западный округ
		yfo  = ['1059500', '#f9768e'], // Южный округ
		pfo  = ['1075831', '#30cb05'], // Приволжский округ
		urfo = ['1113276', '#bac1cc'], // Уральский округ
		sfo  = ['1221148', '#16acdb'], // Сибирский округ
		dfo  = ['1221185', '#fbc520'], // Дальневосточный округ

		bel = ['59065', '#fbc520'], // Беларусь
		geo = ['28699', '#fbc520'], // Грузия
		ukr = ['60199', '#fbc520']; // Украина

	// Функция заливки цветом регионов на карте
	function setColors(collection, color) {
		collection.setStyles(function (object) {
			return ({
				fillColor: color,
				opacity: 0.5
			});
		})
	};

	// Формируем и добавляем регионы в коллекцию	
	/* Центральный округ */
	osme.geoJSON(cfo[0], {
		lang: 'ru', 
		quality: 0,
		postFilter: function(region) {
			return region.osmId == cfo[0];
		}
	}, function(data, pure) {
		collection = osme.toYandex(data, ymaps);
		setColors(collection, cfo[1]);
		collection.add(map);
	});

	/* Северо-Западный округ */
	osme.geoJSON(szfo[0], {
		lang: 'ru', 
		quality: 0,
		postFilter: function(region) {
			return region.osmId == szfo[0];
		}
	}, function(data, pure) {
		collection = osme.toYandex(data, ymaps);
		setColors(collection, szfo[1]);
		collection.add(map);
	});

	/* Южный округ */
	osme.geoJSON(yfo[0], {
		lang: 'ru', 
		quality: 0,
		postFilter: function(region) {
			return region.osmId == yfo[0];
		}
	}, function(data, pure) {
		collection = osme.toYandex(data, ymaps);
		setColors(collection, yfo[1]);
		collection.add(map);
	});

	/* Приволжский округ */
	osme.geoJSON(pfo[0], {
		lang: 'ru', 
		quality: 0,
		postFilter: function(region) {
			return region.osmId == pfo[0];
		}
	}, function(data, pure) {
		collection = osme.toYandex(data, ymaps);
		setColors(collection, pfo[1]);
		collection.add(map);
	});

	/* Уральский округ */
	osme.geoJSON(urfo[0], {
		lang: 'ru', 
		quality: 0,
		postFilter: function(region) {
			return region.osmId == urfo[0];
		}
	}, function(data, pure) {
		collection = osme.toYandex(data, ymaps);
		setColors(collection, urfo[1]);
		collection.add(map);
	});

	/* Сибирский округ */
	osme.geoJSON(sfo[0], {
		lang: 'ru', 
		quality: 0,
		postFilter: function(region) {
			return region.osmId == sfo[0];
		}
	}, function(data, pure) {
		collection = osme.toYandex(data, ymaps);
		setColors(collection, sfo[1]);
		collection.add(map);
	});

	/* Дальневосточный округ */
	osme.geoJSON(dfo[0], {
		lang: 'ru', 
		quality: 0,
		postFilter: function(region) {
			return region.osmId == dfo[0];
		}
	}, function(data, pure) {
		collection = osme.toYandex(data, ymaps);
		setColors(collection, dfo[1]);
		collection.add(map);
	});

	/* Грузия */
	osme.geoJSON(geo[0], {
		lang: 'ru', 
		quality: 0,
		postFilter: function(region) {
			return region.osmId == geo[0];
		}
	}, function(data, pure) {
		collection = osme.toYandex(data, ymaps);
		setColors(collection, geo[1]);
		collection.add(map);
	});

	/* Украина */
	osme.geoJSON(ukr[0], {
		lang: 'ru', 
		quality: 0,
		postFilter: function(region) {
			return region.osmId == ukr[0];
		}
	}, function(data, pure) {
		collection = osme.toYandex(data, ymaps);
		setColors(collection, ukr[1]);
		collection.add(map);
	});

	/* Беларусь */
	osme.geoJSON(bel[0], {
		lang: 'ru', 
		quality: 0,
		postFilter: function(region) {
			return region.osmId == bel[0];
		}
	}, function (data, pure) {
		collection = osme.toYandex(data, ymaps);
		setColors(collection, bel[1]);
		collection.add(map);
	});

}
ymaps.ready(init);
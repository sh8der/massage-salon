import modernizr from './libs/modernizr-custom.js'
import Masonry from 'masonry-layout'
import baguetteBox from 'baguettebox.js'
import anime from 'animejs/lib/anime.es.js'
import imagesLoaded from 'imagesloaded'

// инициализируем открытие фоток в модельном окне
baguetteBox.run('.photo-block__items')

// проверяем загрузились ли картинки для галлереии, если да то строим сетку масонри и инимируем
if (document.querySelector('.photo-block__items') !== null) {

	imagesLoaded('.photo-block__items', () => {

		let photoGalleryItemsWrapper = document.querySelector('.photo-block__items')

		const msnry = new Masonry(photoGalleryItemsWrapper, {
			// options
			itemSelector: '.photo-block__item',
			columnWidth: '.photo-block__item',
			gutter: 10,
			fitWidth: true
		});

		anime({
			targets: '.photo-block__item',
			duration: 500,
			opacity: 1,
			direction: 'normal',
			loop: false,
			easing: 'easeInOutQuad',
			delay: function (el, i, l) {
				return i * 50;
			}
		});


	})

}

const mobileMenuBtn = document.querySelector('.open-mobile-menu')
const menuList = document.querySelector('ul.navigation-section__items')

if (document.readyState !== 'loading') {
	init();
} else {
	document.addEventListener('DOMContentLoaded', () => init());
}



function init() {
	mobileMenuBtn.addEventListener("click", (e) => {
		let isClickMenuBtn = menuList.classList.contains("mobile-menu-taransform")

		if ( isClickMenuBtn === false )
			menuList.classList.add("mobile-menu-taransform", "mobile-menu-taransform--visible")

			const menuOpenAnimation = anime.timeline({
				direction: 'normal',
				loop: false,
				easing: 'easeInOutQuad',
				autoplay: false
			});
			
			menuOpenAnimation.add({
				targets: menuList,			
				opacity: 1			
			})
			.add({
				targets: 'ul .navigation-section__item',
				top: 0,
				opacity: 1,	
				easing: 'linear',
				duration: 200,
				delay: function (el, i, l) {
					return i * 50;
				}
			})

		if ( isClickMenuBtn === false ) {
			menuOpenAnimation.play()
		} else {
			menuOpenAnimation.reverse()			
		}

	})
}

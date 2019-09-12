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
const closeMobileMenu = document.createElement('img')
closeMobileMenu.classList.add('close-mobile-menu')
closeMobileMenu.src = "/assets/images/close.svg"

const menuOpenAnimation = anime.timeline({
	easing: 'easeInOutQuad',
	autoplay: false
})


closeMobileMenu.onclick = () => {
	menuList.classList.remove("mobile-menu-taransform", "mobile-menu-taransform--visible")

	anime({
		targets: menuList,
		opacity: 0,
		duration: 500
	})
}

function openMenu() {
	menuList.classList.add("mobile-menu-taransform", "mobile-menu-taransform--visible")
	menuList.appendChild(closeMobileMenu)

	menuOpenAnimation.add({
			targets: menuList,
			opacity: 1,
			duration: 200
		})
		.add({
			targets: 'ul .navigation-section__item',
			opacity: 1,
			top: 0,
			easing: 'easeInOutQuad',
			duration: 200,
			delay: function (el, i, l) {
				return i * 50;
			}
		})
		.add({
			targets: closeMobileMenu,
			opacity: 1,
			duration: 500,
			rotate: 90
		})

	menuOpenAnimation.play()
	menuOpenAnimation.finished.then(() => {
		anime.remove(menuList)
		anime.remove('.navigation-section__item')
		anime.remove(closeMobileMenu)
	});
}

mobileMenuBtn.addEventListener("click", openMenu)

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
const menuList = document.querySelector('.navigation-section__items')
const closeMobileMenu = document.createElement('img')
closeMobileMenu.classList.add('close-mobile-menu')
closeMobileMenu.src = "/assets/images/close.svg"

if (window.innerWidth <= 700) {
	menuList.appendChild(closeMobileMenu)
	let patternMobileLeft = document.createElement('div')
	let patternMobileRight = document.createElement('div')
	patternMobileLeft.classList.add("services__bg-pattern", "services__bg-pattern--left", "services__bg-pattern--simple")
	patternMobileRight.classList.add("services__bg-pattern", "services__bg-pattern--right", "services__bg-pattern--simple")
	menuList.appendChild(patternMobileLeft)
	menuList.appendChild(patternMobileRight)
}

closeMobileMenu.onclick = () => {
	anime({
		easing: 'easeInOutQuad',
		duration: 500,
		targets: menuList,
		opacity: 0,
		complete: () => {
			menuList.classList.remove("mobile-menu-taransform")
			menuList.classList.remove("mobile-menu-taransform--visible")
		}
	})
}

mobileMenuBtn.addEventListener("click", () => {
	console.log('click')
	menuList.classList.add("mobile-menu-taransform", "mobile-menu-taransform--visible")
	anime({
		easing: 'easeOutExpo',
		targets: menuList,
		opacity: 1,
		duration: 700
	})
	anime({
		easing: 'easeOutExpo',
		targets: '.navigation-section__item',
		opacity: [0, 1],
		top: [-30, 0],
		duration: 1100,
		delay: function (el, i, l) {
			return i * 100;
		}
	}, '-=600')
	anime({
		easing: 'easeOutExpo',
		targets: closeMobileMenu,
		opacity: [0, 1],
		duration: 1000,
		rotate: [0, 180]
	}, '500')
})

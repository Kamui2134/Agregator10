'use strict'

// FAQ
const questions = document.querySelectorAll('.faq__question')
const questionsBtns = document.querySelectorAll('.faq__question-btn')

// Устанавливаем первоначальные maxHeight для всех вопросов
function setInitialMaxHeight() {
	questions.forEach(question => {
		const headHeight = question.querySelector(
			'.faq__question-head'
		).clientHeight
		question.style.maxHeight = headHeight + 40 + 'px'
	})
}

setInitialMaxHeight()

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
	questions.forEach((question, index) => {
		const isOpen = questionsBtns[index].style.transform === 'rotate(90deg)'
		const headHeight = question.querySelector(
			'.faq__question-head'
		).clientHeight
		question.style.maxHeight = isOpen
			? question.scrollHeight + 'px'
			: headHeight + 40 + 'px'
	})
})

// Функция для переключения видимости вопроса
function questionToggle(index) {
	const question = questions[index]
	const btn = questionsBtns[index]
	const headHeight = question.querySelector('.faq__question-head').clientHeight

	const isOpen = btn.style.transform === 'rotate(90deg)'

	btn.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)'
	question.style.maxHeight = isOpen
		? headHeight + 40 + 'px'
		: question.scrollHeight + 'px'
}

// Добавляем обработчики событий на кнопки
questionsBtns.forEach((btn, i) => {
	btn.addEventListener('click', () => questionToggle(i))
})

// HEADER-BTN

const headerBtn = document.querySelector('.header__btn')
const navLinks = document.querySelectorAll('.header__nav-link')

navLinks.forEach((link, index) => {
	link.style.setProperty('--index', 80 * index + 'ms')
})

headerBtn.addEventListener('click', function () {
	this.classList.toggle('active')
	navLinks.forEach(link => {
		link.classList.toggle('active')
	})
})
navLinks.forEach(link => {
	link.addEventListener('click', function () {
		navLinks.forEach(link => {
			link.classList.remove('active')
		})
		headerBtn.classList.remove('active')
	})
})

// SHARE SITE
async function shareSite () {
	const url = new URL(window.location.href.split('#')[0])
	await navigator.share({
		title: 'Поделиться сайтом',
		text: 'Посмотрите этот интересный сайт!',
		url: url.href,
	})
}

// GAME-RATING
const gameRating = null 
if (document.querySelector('.game-rating')) {
	const gameRatings = document.querySelectorAll('.game-rating')
	gameRatings.forEach((gameRating) => {
		const rating = parseInt(gameRating.dataset.rating)
		if (rating > 6) {
			rating = 5
		}
		for (let i = 0; i < rating; i++) {
			gameRating.children[i].classList.add('rated')
		}
	})
} 

// BEST GAME IN GAMES
function toggleBestGames() {
	if (window.innerWidth <= 540 && wasAdded === false) {
		const bestGames = document.querySelector('.best-games')
		const games = document.querySelector('.games__games')
		const bestCasino = games.firstElementChild.cloneNode(true)
		const bestGameLogo = bestGames.querySelector('.best-games__logo')
		const bestGameTitle = bestGames.querySelector('.best-games__game-title')
		const bestGameBonus = bestGames.querySelector('.best-games__game-bonus')
		const bestGameAdvantages = bestGames.querySelectorAll(
			'.best-games__advantage-text'
		)

		const bestCasinoLogoClone = bestCasino.querySelector('.games__game-logo')
		bestCasinoLogoClone.src = bestGameLogo.src
		bestCasinoLogoClone.alt = bestGameLogo.alt
		bestCasino.querySelector('.games__game-name').textContent =
			bestGameTitle.textContent
		bestCasino.querySelector('.games__bonus-text').textContent =
			bestGameBonus.textContent
		games.insertBefore(bestCasino, games.firstChild)
		wasAdded = true
	} else if (window.innerWidth > 540 && wasAdded === true) {
		const games = document.querySelector('.games__games')
		games.firstChild.remove()
		wasAdded = false
		while (gamesContainer.children.length > allCasinosCount) {
			gamesContainer.removeChild(gamesContainer.lastChild)
		}
	}
}
let allCasinosCount = null
let wasAdded = false
if (document.querySelector('.games__games')) {
	allCasinosCount = document.querySelector('.games__games').children.length
	toggleBestGames()

	window.addEventListener('resize', () => {
		if (document.querySelector('.companies')) {
			scrollerInner.innerHTML = ''
			addCompanies()
			addAnimation()
		}
		toggleBestGames()
	})
}


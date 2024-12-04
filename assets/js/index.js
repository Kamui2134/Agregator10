"use strict";

// FAQ
const questions = document.querySelectorAll('.faq__question');
const questionsBtns = document.querySelectorAll('.faq__question-btn');

// Устанавливаем первоначальные maxHeight для всех вопросов
function setInitialMaxHeight() {
	questions.forEach((question) => {
		const headHeight = question.querySelector('.faq__question-head').clientHeight;
		question.style.maxHeight = headHeight + 40 + 'px';
	});
}

setInitialMaxHeight();

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
	questions.forEach((question, index) => {
		const isOpen = questionsBtns[index].style.transform === 'rotate(90deg)';
		const headHeight = question.querySelector('.faq__question-head').clientHeight;
		question.style.maxHeight = isOpen ? question.scrollHeight + 'px' : headHeight + 40 + 'px';
	});
});

// Функция для переключения видимости вопроса
function questionToggle(index) {
	const question = questions[index];
	const btn = questionsBtns[index];
	const headHeight = question.querySelector('.faq__question-head').clientHeight;

	const isOpen = btn.style.transform === 'rotate(90deg)';

	btn.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
	question.style.maxHeight = isOpen ? headHeight + 40 + 'px' : question.scrollHeight + 'px';
}

// Добавляем обработчики событий на кнопки
questionsBtns.forEach((btn, i) => {
	btn.addEventListener('click', () => questionToggle(i));
});

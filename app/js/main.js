$(function () {
	$(".accordeon dd").hide().prev().click(function () {
		$(this).parents(".accordeon").find("dd").not(this).slideUp().prev().removeClass("active");
		$(this).next().not(":visible").slideDown().prev().addClass("active");
		$("dl").removeClass("open");
		$(this).parent().toggleClass("open");
	});

	$(".accordeon dd:first").show().prev().addClass("active").parent().addClass("open");


	$("#example_id").ionRangeSlider({
		min: 500,
		max: 10000,
		from: 4100,
		postfix: "$"
	});
});

window.addEventListener("scroll", function () {
	const header = document.querySelector("header");

	if (window.scrollY > 0) {
		header.classList.add("sticky");
	} else {
		header.classList.remove("sticky");
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const menuBtn = document.querySelector(".header__menu-btn");
	const box = document.querySelector(".header__box");
	const body = document.body;
	const links = box.querySelectorAll("a");

	menuBtn.addEventListener("click", () => {
		box.classList.toggle("open");
		body.classList.toggle("dark-bg");
		menuBtn.classList.toggle("active");
	});

	links.forEach(link => {
		link.addEventListener("click", () => {
			box.classList.remove("open");
			body.classList.remove("dark-bg");
			menuBtn.classList.remove("active");
		});
	});
});


const btnMenu = document.querySelector('.menu h2');
console.log(btnMenu)

function saludo(){
	let menu = document.querySelector('.menu .nav-menu');
	menu.classList.toggle('hidden')


}
btnMenu.addEventListener('click', saludo);


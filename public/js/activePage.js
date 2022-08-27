const currentLocation = location.href;
const menuItem = document.querySelectorAll('a');
const menuLength = menuItem.length
for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].classList = "active"
    }
}
const menuBtn = document.querySelector('.menu-btn');
const navlinks = document.querySelector('.nav_links');
            
menuBtn.addEventListener('click', () => {
    navlinks.classList.toggle('mobile_menu');
});
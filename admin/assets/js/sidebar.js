document.addEventListener('DOMContentLoaded', function() {
   const menuitem = document.querySelectorAll('.nav-link');
   const link = new URLSearchParams(window.location.search).get('page');
   console.log(link);
    if (link !== null) {
        menuitem.forEach(item => {
            let href = item.getAttribute('href');
            if (href && href.includes(`page=${link}`)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    } else {
        const firstItem = menuitem[0];
        if (firstItem) {
            firstItem.classList.add('active');
        }
    }
});
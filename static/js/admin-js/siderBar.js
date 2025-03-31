const navitem = [
    {id: 1, name: "Dashboard", icon: "fa-solid fa-gauge"},
    {id: 2, name: "Products", icon: "fa-solid fa-box"},
    {id: 3, name: "Orders", icon: "fa-solid fa-cart-shopping"},
    {id: 4, name: "Account", icon: "fa-solid fa-users"},
];
document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.add("d-flex", "flex-column", "p-3", "bg-dark", "text-white");

    const ul = document.createElement("ul");
    ul.classList.add("nav", "flex-column"); // Fix lỗi không hiện
    sidebar.appendChild(ul);

    navitem.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("nav-item");
        const a = document.createElement("span");
        a.classList.add("nav-link", "text-white", "hover-pointer");
        a.innerHTML = `<i class="${item.icon} me-2"></i> ${item.name}`;
        a.addEventListener("click", function() {
            const activeLinks = document.querySelectorAll(".nav-link");
            activeLinks.forEach(link => {
                if (link !== a) {
                    link.classList.remove("active");
                } else {
                    link.classList.add("active");
                }
            });
            insertContent(item.id);
        });
        li.appendChild(a);
        ul.appendChild(li);
    });
});





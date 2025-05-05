function loadProducts(page) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "index.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector(".sport-maincontent__show-product").innerHTML = xhr.responseText;
        }
    };

    xhr.send("page=" + page);
}
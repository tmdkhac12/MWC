function searchProducts() {
    var searchTerm = document.getElementById("search-input").value.toLowerCase();
    var products = document.querySelectorAll('.products li');

    products.forEach(function(product) {
        var productName = product.getAttribute('data-name').toLowerCase();
        var productPrice = product.getAttribute('data-price');

        if (productName.includes(searchTerm)) {
            product.style.display = 'block'; // Hiển thị sản phẩm nếu tìm thấy
        } else {
            product.style.display = 'none'; // Ẩn sản phẩm nếu không tìm thấy
        }
    });
}

document.getElementById("search-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchProducts();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Lấy thông tin từ query string
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');

    // Hiển thị thông tin tìm kiếm
    const searchResultsDiv = document.getElementById('search-results');
    searchResultsDiv.innerHTML = `<p>Kết quả tìm kiếm cho: <strong>${searchTerm}</strong></p>`;
    // Thêm code để hiển thị sản phẩm dựa trên kết quả tìm kiếm
});

let thisPage = 1;
let limit = 6;
let list = document.querySelectorAll('.list .item');

function loadItem() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((item, key) => {
        if (key >= beginGet && key <= endGet) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    listPage();
}

loadItem();

function listPage() {
    let count = Math.ceil(list.length / limit);
    document.querySelector('.listPage').innerHTML = '';

    if (thisPage > 1) {
        let prev = document.createElement('li');
        prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    for (let i = 1; i <= count; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if (i == thisPage) {
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }

    if (thisPage < count) {
        let next = document.createElement('li');
        next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}

function changePage(i) {
    if (i >= 1 && i <= Math.ceil(list.length / limit)) {
        thisPage = i;
        loadItem();
    }
}

function searchProducts() {
    var searchTerm = document.getElementById("search-input").value.toLowerCase();
    var products = document.querySelectorAll('.products li');
    var slsp = 0;

    products.forEach(function (product) {
        var productName = product.getAttribute('data-name').toLowerCase();

        if (productName.includes(searchTerm)) {
            product.style.display = 'block'; // Hiển thị sản phẩm nếu tìm thấy
            slsp++;

            // Xác định thẻ ul
            if (window.location.pathname === "/index.html") {
                var ulParent = product.closest('ul');
                if (ulParent) {
                    var ulId = ulParent.getAttribute('id');
                    displayCategoryName(ulId);
                }
            }
        } else {
            product.style.display = 'none'; // Ẩn sản phẩm nếu không tìm thấy
        }
    });

    if (slsp === 0) {
        if (window.location.pathname === "/index.html") {
            document.querySelector("#slider img").style.display = "none";
            document.querySelector("#slider").style.paddingTop = "60px";

            var headlines = document.querySelectorAll("#wrapper .headline");
            headlines[0].style.display = "none";
            headlines[1].style.display = "none";
        }

        var div_wrapper = document.querySelector("#wrapper");
        div_wrapper.innerHTML = "Không có Sản Phẩm bạn vừa tìm!!";
        div_wrapper.style.float = "left";
        div_wrapper.style.fontSize = "28px";

        var main = document.querySelector("#main");
        main.style.display = "flex";
        main.style.flexDirection = "column";
        main.style.minHeight = "100vh";

        var footer = document.querySelector("#footer");
        footer.style.width = "100%";
        footer.style.marginTop = "auto";
    }
}

function displayCategoryName(ulId) {
    // Hiển thị chữ tương ứng với giày nam hoặc giày nữ
    var categoryText = (ulId === 'giaynamul') ? '<h1>Giày Nam</h1>' : '<h1>Giày Nữ</h1>';
    // Thực hiện xử lý để hiển thị chữ, ví dụ, có thể thay đổi nội dung của một phần tử trên trang
    var categoryHeader = document.getElementById('category-header');

    if (window.location.pathname === "/index.html") {
        document.querySelector("#slider img").style.display = "none";

        var headlines = document.querySelectorAll("#wrapper .headline");
        headlines[0].style.display = "none";
        headlines[1].style.display = "none";
    }

    categoryHeader.innerHTML = categoryText;
    categoryHeader.style.paddingTop = "60px";
}

document.querySelector("#search-input").addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        searchProducts();
    }
});

document.querySelector("#search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    searchProducts();
})

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

// document.addEventListener('DOMContentLoaded', function () {
//     // Kiểm tra xem người dùng đã đăng nhập chưa
//     const isLoggedIn = /* Thực hiện kiểm tra đăng nhập ở đây */;

//     if (isLoggedIn) {
//         // Lấy thông tin người dùng (thay thế bằng phương thức của bạn)
//         const userInfo = /* Lấy thông tin người dùng ở đây */;

//         // Hiển thị thông tin người dùng
//         displayUserInfo(userInfo);
//     }
// });

window.onload = function () {
    var username = localStorage.getItem('username');
    if (username) {
        document.getElementById('user-name').textContent = username;
    } else {
        document.getElementById('user-name').textContent = "Welcome!";
    }
}
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
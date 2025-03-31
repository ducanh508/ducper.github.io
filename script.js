document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const cartCount = document.querySelector('.cart-count');
        let count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;
        
        // Thêm logic giỏ hàng phức tạp hơn ở đây
    });
});

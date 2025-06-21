document.addEventListener("DOMContentLoaded", function () {
  const buyNowBtn = document.querySelector('.collection .btn');

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default link behavior

      // Vanish the content
      const collectionSection = document.querySelector('.collection-item');
      collectionSection.classList.add('vanish-all');

      // Show the quote after short delay
      setTimeout(() => {
        const quote = document.getElementById('quote-reveal');
        quote.classList.remove('d-none');
        quote.classList.add('show');
      }, 600);
    });
  }
});

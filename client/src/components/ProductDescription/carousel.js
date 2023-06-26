(() => {
  const photoCol = document.querySelector('.carousel');
  const photos = document.querySelectorAll('.gallery-photo');
  let items = document.querySelectorAll('.block');

  photoCol.addEventListener('click', (e) => {
    let currentClick = e.target;
    let itemDataAtt = currentClick.getAttribute('data-about');
    let currentText = document.querySelector(itemDataAtt);

    // --------------по нажатию на картинку--------------
    if (currentClick.classList.contains('gallery-photo')) {
      photos.forEach((item) => {
        item.classList.remove('active');
      });

      items.forEach((text) => {
        text.classList.remove('active');
      });

      document.querySelector('.main-photo').src = e.target.getAttribute('src');
    }

    if (currentClick.classList.contains('carousel-photo')) {
      currentClick.classList.add('active');
      currentText.classList.add('active');
    }
  });
})();

const createImage = image => {
  return `
        <li class="image-card">
            <a href="${image.largeImageURL}" target="_blank">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                <div class="image-info">
                    <p><b>Likes</b> ${image.likes}</p>
                    <p><b>Views</b> ${image.views}</p>
                    <p><b>Comments</b> ${image.comments}</p>
                    <p><b>Downloads</b> ${image.downloads}</p>
                </div>
            </a>
        </li>
    `;
};

const clearGallery = () => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
};

const createGallery = images => {
  clearGallery();

  if (images) {
    const gallery = document.querySelector('.gallery');
    const html = images.map(createImage).join('');
    gallery.insertAdjacentHTML('beforeend', html);
  }
};

const renderMoreImages = images => {
  const gallery = document.querySelector('.gallery');
  const html = images.map(createImage).join('');
  gallery.insertAdjacentHTML('beforeend', html);
};

export { createGallery, renderMoreImages, clearGallery };

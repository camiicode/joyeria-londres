document.addEventListener('DOMContentLoaded', function () {
  // Selecciona todos los megamenús una sola vez
  const megaMenus = document.querySelectorAll('.jl-mm-content');

  megaMenus.forEach(megaMenu => {
    const hoverLinks = megaMenu.querySelectorAll('[data-target-image]');
    const previewImage = megaMenu.querySelector('.jl-mm-content__list--item-preview img');
    const previewParagraph = megaMenu.querySelector('.jl-mm-content__list--item-preview p');
    const previewContainer = megaMenu.querySelector('.jl-mm-content__list--item-preview');

    // Valores originales para restaurar
    const originalSrc = previewImage?.src || '';
    const originalText = previewParagraph?.textContent || '';

    // Precarga de imágenes para mejorar la experiencia
    hoverLinks.forEach(link => {
      const src = link.getAttribute('data-target-image');
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });

    // Detecta la altura máxima cuando el menú se abre
    megaMenu.addEventListener('mouseenter', () => {
      const lists = megaMenu.querySelectorAll('ul');
      let maxHeight = 0;
      lists.forEach(list => {
        maxHeight = Math.max(maxHeight, list.scrollHeight);
      });
      megaMenu.style.setProperty('--max-ul-height', `${maxHeight}px`);
    });

    hoverLinks.forEach(link => {
      link.addEventListener('mouseover', () => {
        const newSrc = link.getAttribute('data-target-image');
        const newText = link.querySelector('span')?.textContent || '';

        // Solo actualiza si cambia
        if (previewImage && newSrc && previewImage.src !== newSrc) {
          requestAnimationFrame(() => {
            previewImage.src = newSrc;
          });
        }

        if (previewParagraph && newText && previewParagraph.textContent !== newText) {
          requestAnimationFrame(() => {
            previewParagraph.textContent = newText;
          });
        }

        if (previewContainer) {
          previewContainer.classList.add('jl-mm-content__list--item-preview_hover');
        }
      });

      link.addEventListener('mouseout', () => {
        requestAnimationFrame(() => {
          if (previewImage) previewImage.src = originalSrc;
          if (previewParagraph) previewParagraph.textContent = originalText;
          if (previewContainer) {
            previewContainer.classList.remove('jl-mm-content__list--item-preview_hover');
          }
        });
      });
    });
  });
});

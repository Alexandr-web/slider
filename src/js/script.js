const slider = () => {
  let indexActiveSlide = 0;
  let autoSwitching = true;
  let widthLine = 0;

  const slides = document.querySelectorAll('.wrapper__slider-slides-item');
  const totalSlides = slides.length;
  const showActiveSlide = index => slides[index].classList.remove('hide');
  const hideSlides = () => slides.forEach(slide => slide.classList.add('hide'));

  hideSlides();
  showActiveSlide(indexActiveSlide);
  writeInfoAboutSlides();
  autoSwitchingSlides();

  const switchingSlides = () => {
    const btns = document.querySelectorAll('.wrapper__slider-controls-btn');
    const bg = document.querySelector('.wrapper__slider-bg');
    const line = document.querySelector('.wrapper__slider-controls-info-progress-line');

    btns.forEach(btn => {
      const data = btn.dataset.btnControls;

      // Switching slides
      btn.addEventListener('click', () => {
        if (data === 'prev') {
          indexActiveSlide--;
        } else if (data === 'next') {
          indexActiveSlide++;
        }

        widthLine = 0;
        line.style.width = `${widthLine}%`;

        checkIndexActiveSlide();
        writeInfoAboutSlides();
        hideSlides();
        showActiveSlide(indexActiveSlide);
      });

      // Show/hide background of slider
      btn.addEventListener('mouseenter', () => bg.classList.add('hidden'));
      btn.addEventListener('mouseleave', () => bg.classList.remove('hidden'));
    });
  }

  switchingSlides();

  const stopAutoSwitchingSlides = () => {
    const sliderBlock = document.querySelector('.wrapper__slider');

    sliderBlock.addEventListener('mouseenter', () => autoSwitching = false);
    sliderBlock.addEventListener('mouseleave', () => autoSwitching = true);
  }

  stopAutoSwitchingSlides();

  function autoSwitchingSlides() {
    const result = 100;
    const line = document.querySelector('.wrapper__slider-controls-info-progress-line');
    const interval = setInterval(() => {
      if (autoSwitching) {
        widthLine++;

        line.style.width = `${widthLine}%`;

        if (widthLine >= result) {
          indexActiveSlide++;
          widthLine = 0;
          
          clearInterval(interval);
          checkIndexActiveSlide();
          writeInfoAboutSlides();
          hideSlides();
          showActiveSlide(indexActiveSlide);
          autoSwitchingSlides();
        }
      }
    }, 90);
  }

  function checkIndexActiveSlide() {
    if (indexActiveSlide < 0) {
      indexActiveSlide = totalSlides - 1;
    }

    if (indexActiveSlide > totalSlides - 1) {
      indexActiveSlide = 0;
    }
  }

  function writeInfoAboutSlides() {
    const title = document.querySelector('.wrapper__slider-controls-info-slides');

    title.innerText = `${indexActiveSlide + 1} / ${totalSlides}`;
  }
}

slider();
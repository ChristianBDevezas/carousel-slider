const slider = document.getElementById("slider");
const topContainer = document.querySelector(".carousel__top");
const largeImage = document.querySelector(".carousel__current-image");
const textImage = document.querySelector(".carousel__top__text");
const currentNumber = document.querySelector(".carousel__top__current-number");
const buttons = document.querySelectorAll(".carousel__top__buttons button");
const thumbnails = document.querySelectorAll(".container__thumbnail");
const nextBtn = document.getElementById("slide-right");
const prevBtn = document.getElementById("slide-left");
let index = 0;

// Carousel Buttons
nextBtn.addEventListener("click", () => {
  let scrollAmount = 0;
  let slideTimer = setInterval(() => {
    slider.scrollLeft += 10;
    scrollAmount += 10;

    if(scrollAmount >= 100) {
      window.clearInterval(slideTimer);
    }
  }, 25);
});

prevBtn.addEventListener("click", () => {
  let scrollAmount = 0;
  let slideTimer = setInterval(() => {
    slider.scrollLeft -= 20;
    scrollAmount += 10;
    
    if (scrollAmount >= 100) {
      window.clearInterval(slideTimer);
    }
  }, 25);
});

// Auto Play
function autoPlay() {
  if(slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1) {
    slider.scrollLeft = 0;
  }
  else {
    slider.scrollLeft += 1;
  }
}

let play = setInterval(autoPlay, 20);

// Remove selected Thumbnails
function removeThumb() {
  thumbnails.forEach((itemThumb) => {
    itemThumb.classList.remove("current-thumb");
  });
}

// Check Current Index of Thumbnails
function checkIndex() {
  if(index < 0) index = thumbnails.length - 1;
  if(index > thumbnails.length - 1) index = 0;
}

// Update Image and Text
function changeImage(index) {
  largeImage.src = thumbnails[index].firstElementChild.src;

  const text = thumbnails[index].firstElementChild.getAttribute("alt");
  textImage.innerHTML = text;

  currentNumber.innerHTML = index + 1;

  removeThumb();
  thumbnails[index].classList.add("current-thumb");
}

// Display the effect for Image and Text
function effectImageText() {
  topContainer.classList.add("change");
  setTimeout(() => topContainer.classList.remove("change"), 750);

  textImage.classList.add("change");
  setTimeout(() => textImage.classList.remove("change"), 750);
}

thumbnails.forEach((thumb, idx) => {
  // Pause the slide
  thumb.addEventListener("mouseover", () => {
    clearInterval(play);
  });

  thumb.addEventListener("mouseout", () => {
    play = setInterval(autoPlay, 20);
  });

  // Click on thumbnails
  thumb.addEventListener("click", () => {
    const image = thumb.firstElementChild;
    largeImage.src = image.src;

    const text = thumb.firstElementChild.getAttribute("alt");
    textImage.innerHTML = text;

    currentNumber.innerHTML = idx + 1;
    index = idx;

    effectImageText();
    removeThumb();
    thumb.classList.add("current-thumb");
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if(button.classList.contains("left-btn")) {
      index--;
    }
    if(button.classList.contains("right-btn")) {
      index++;
    }

    checkIndex();
    changeImage(index);
    effectImageText();
  });
});
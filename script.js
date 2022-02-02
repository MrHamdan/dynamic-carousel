const container = document.getElementById("container");
const slider = document.querySelector(".slider");
const slide = document.querySelectorAll(".slide");
const div = document.createElement("div");

// hamdanSlider Functions
const hamdanSlider = (sliderOptions) => {
    interval = sliderOptions.interval || 3000;
    autoplay = sliderOptions.autoplay || false;
    navigationArrows = sliderOptions.navigationArrows || false;
    item = sliderOptions.item || 1;


    let counter = 0;



    let items = slider.offsetWidth / item;
    let itemsPerSlide = slide.length / item;


    // Set the width of the slider
    slide.forEach((singleSlide) => {
        singleSlide.style.minWidth = items + "px";
    });



    if (navigationArrows) {

        // Create nav arrows and append to container as div
        div.innerHTML = `
            <div class="arrows">
                <span class="arrow-left">
                    <i class="far fa-arrow-alt-circle-left"></i>
                </span>
                <span class="arrow-right">
                <i class="far fa-arrow-alt-circle-right"></i>
                </span>
            </div>
          `;
        container.appendChild(div);

        const nextArrow = document.querySelector(".arrow-right");
        const prevArrow = document.querySelector(".arrow-left");



        // nextArrow event listener
        nextArrow.addEventListener("click", () => {
            counter = counter < itemsPerSlide ? counter + 1 : 0;
            slider.style.transition = "transform 0.4s ease-in-out";
            slider.style.transform = `translateX(-${counter * 100}%)`;
        });



        // prevArrow event listener
        prevArrow.addEventListener("click", () => {
            counter = counter > 0 ? counter - 1 : itemsPerSlide - 1;
            slider.style.transition = "transform 0.4s ease-in-out";
            slider.style.transform = `translateX(-${counter * 100}%)`;
        });
    }



    // Autoplay
    if (autoplay === true) {
        setInterval(() => {
            counter = counter < itemsPerSlide ? counter + 1 : 0;
            slider.style.transition = "transform 0.4s ease-in-out";
            slider.style.transform = `translateX(-${counter * 100}%)`;
        }, interval);
    }
}

const container = document.getElementById("container");
const slider = document.querySelector(".slider");
const slide = document.querySelectorAll(".slide");
const div = document.createElement("div");
const span = document.createElement("span");

// hamdanSlider Functions
const hamdanSlider = (sliderOptions) => {

    // sliderOptions
    interval = sliderOptions.interval || 3000;
    autoplay = sliderOptions.autoplay || false;
    navigations = sliderOptions.navigations || false;
    item = sliderOptions.item || 1;
    dots = sliderOptions.dots || false;
    animation = sliderOptions.animation || false;
    animationDuration = sliderOptions.animationDuration || false;


    let counter = 0;



    let items = slider.offsetWidth / item;
    let itemsPerSlide = slide.length / item;


    // Adding Animation


    // Set the width of the slider
    slide.forEach((singleSlide) => {
        singleSlide.style.animation = animation;
        singleSlide.style.animationDuration = interval + "ms";
        singleSlide.style.animationIterationCount = "infinite";
        singleSlide.style.minWidth = items + "px";
    });


    // navigationDots Function
    const navigationDots = () => {

        const ul = document.createElement("ul");
        ul.classList.add("dots");
        let dotCount = Math.ceil(slide.length / item);
        while (dotCount >= 1) {
            const li = document.createElement("li");

            ul.appendChild(li);

            dotCount--;
        }
        container.appendChild(ul);

        const indicatorParents = document.querySelectorAll(".dots li");
        const indicators = document.querySelector(".dots li");
        indicators.classList.add("active");



        //   Adding EventListener on Dots-----------
        indicatorParents.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                counter = index;
                document.querySelector(".dots .active").classList.remove("active");
                dot.classList.add("active");
                slider.style.left = -slider.offsetWidth * counter + "px";
            });
        });


    }



    // navigationArrows Function
    const navigationArrows = () => {

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
            counter = counter < itemsPerSlide - 1 ? counter + 1 : 0;
            document.querySelector(".dots .active").classList.remove("active");
            document.querySelector(".dots li:nth-child(" + (counter + 1) + ")").classList.add("active");
            slider.style.left = -slider.offsetWidth * counter + "px";
            resetInterval();
        });



        // prevArrow event listener
        prevArrow.addEventListener("click", () => {
            counter = counter > 0 ? counter - 1 : itemsPerSlide - 1;
            document.querySelector(".dots .active").classList.remove("active");
            document.querySelector(".dots li:nth-child(" + (counter + 1) + ")").classList.add("active");
            slider.style.left = -slider.offsetWidth * counter + "px";
            resetInterval();
        });
    }




    const autoPlay = () => {
        counter = counter < itemsPerSlide - 1 ? counter + 1 : 0;
        document.querySelector(".dots .active").classList.remove("active");
        document.querySelector(".dots li:nth-child(" + (counter + 1) + ")").classList.add("active");
        slider.style.left = -slider.offsetWidth * counter + "px";
    }



    if (dots) {
        navigationDots();
    }


    if (navigations) {
        navigationArrows();
    }

    // resetInterval

    const resetInterval = () => {
        clearInterval(Interval);
        Interval = autoplay ? setInterval(autoPlay, interval) : null;
    }


    let Interval = autoplay ? setInterval(autoPlay, interval) : null;

}

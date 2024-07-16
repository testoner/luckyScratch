let text = document.querySelector('.text');

text.addEventListener('click',() => {
  let img1 = document.querySelector('.img-left');
  let img2 = document.querySelector('.img-right');
  let coin = document.querySelector('.coin');

  img1.classList.toggle('hide');
  img2.classList.toggle('hide');
  coin.classList.toggle('hide');
  text.remove();

})

let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");

const init = () => {
   //linear-gradient(180deg, #B8E2FB 0%, #F2EFE8 33.56%, #F9DCDD 54.53%, #E1C1E5 73.17%, #BDAFE3 100%);
    // let gradientColor = context.createConicGradient(180,0.48,0.5);
    //  gradientColor.addColorStop(0, "#FBFBFD");
    //  gradientColor.addColorStop(0.1, "#C8D4DA");
    //  gradientColor.addColorStop(0.3, "#FFF");
    //  gradientColor.addColorStop(0.5, "#AEC0CE");
    //  gradientColor.addColorStop(0.7, "#E3E9EE");
    //  gradientColor.addColorStop(0.8, "#FAFBFC");
    //  gradientColor.addColorStop(0.9, "#D6DFE6");
    //  gradientColor.addColorStop(1, "#B8C9D3");

    //  let gradientColor = context.createConicGradient(0 , 100 ,100);
    //  gradient.addColorStop(0, "red");
    //  gradient.addColorStop(0.25, "orange");
    //  gradient.addColorStop(0.5, "yellow");
    //  gradient.addColorStop(0.75, "green");
    //  gradient.addColorStop(1, "blue");
    
    // let gradientColor = context.createLinearGradient(0, 0, 135, 135);
    // gradientColor.addColorStop(0, "#c3a3f1");
    // gradientColor.addColorStop(1, "#6414e9");

    let gradientColor = context.createLinearGradient(0 ,0,0 ,180);
    gradientColor.addColorStop(0, "#b8e2fb");
    gradientColor.addColorStop(0.33, "#f2efe8");
    gradientColor.addColorStop(0.54, "#f9dcdd");
    gradientColor.addColorStop(0.73, "#e1c1e5");
    gradientColor.addColorStop(1, "#bdafe3");

  context.fillStyle = gradientColor;
  context.fillRect(0, 0, 580, 346);
};

let mouseX = 0;
let mouseY = 0;
let isDragged = false;

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

const getXY = (e) => {
  mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
  mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};

isTouchDevice();
canvas.addEventListener(events[deviceType].down, (event) => {
  isDragged = true;
  getXY(event);
  scratch(mouseX, mouseY);
});

canvas.addEventListener(events[deviceType].move, (event) => {
  if (!isTouchDevice()) {
    event.preventDefault();
  }
  if (isDragged) {
    getXY(event);
    scratch(mouseX, mouseY);
  }
});

canvas.addEventListener(events[deviceType].up, () => {
  isDragged = false;
});

canvas.addEventListener("mouseleave", () => {
  isDragged = false;
});

const scratch = (x, y) => {
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  context.arc(x, y, 25, 0, 2 * Math.PI);
  context.fill();
};

window.onload = init();
document.addEventListener("init",function(event){

    if(event.target.id=="tab4"){ 

const cssFiltersButton = document.querySelector("#cssfilters-apply");
const video = document.querySelector("#cssfilters video");

let filterIndex = 0;
const filters = [
  "grayscale",
  "sepia",
  "blur",
  "brightness",
  "contrast",
  "hue-rotate",
  "hue-rotate2",
  "hue-rotate3",
  "saturate",
  "invert",
  "",
];

cssFiltersButton.onclick = video.onclick = function () {
  video.className = filters[filterIndex++ % filters.length];
};

const constraints = {
    video: true,
  };

navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess);

function handleSuccess(stream) {
  video.srcObject = stream;
}

}
});
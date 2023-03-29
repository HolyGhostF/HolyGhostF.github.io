(function () {
  let startingPoint = 0;
  const winterHeader = document.querySelector(".bldbanner");

  winterHeader.addEventListener("mouseenter", e => {
    startingPoint = e.clientX;
    winterHeader.classList.add("moving");
  });

  winterHeader.addEventListener("mouseout", e => {
    winterHeader.classList.remove("moving");
    winterHeader.style.setProperty("--percentage", 0.5);
  });

  winterHeader.addEventListener("mousemove", e => {
    let percentage = ((startingPoint - e.clientX) / window.outerWidth) * 2 + 0.5;

    winterHeader.style.setProperty("--percentage", percentage);
  });
})();

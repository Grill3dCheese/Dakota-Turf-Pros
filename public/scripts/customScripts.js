const navbarToggler = document.querySelector(".navbar-toggler");
const wrapperMenu = document.querySelector(".wrapper-menu");
const mobileLogo = document.querySelector(".mobile-logo");
const desktopLogo = document.querySelector(".desktop-logo");
const navItems = document.querySelectorAll(".nav-item");
const menuToggle = document.getElementById("navbarSupportedContent");
const alertMsg = document.querySelector(".alert");
const submitBtn = document.querySelector(".btn");

if (alertMsg) {
  window.setTimeout(function () {
    alertMsg.classList.remove("show");
  }, 3000);
}

navbarToggler.addEventListener("click", function () {
  wrapperMenu.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((item) => {
  item.addEventListener("click", (event) => {
    wrapperMenu.classList.toggle("open");
  });
});

submitBtn.addEventListener("click", function () {
  const validityArray = [
    firstName.checkValidity(),
    lastName.checkValidity(),
    email.checkValidity(),
    inputPhone.checkValidity(),
    inputAddress.checkValidity(),
    inputCity.checkValidity(),
    inputState.checkValidity(),
    inputZip.checkValidity(),
    gate.checkValidity(),
    sprinklerSelect.checkValidity(),
  ];
  if (!validityArray.includes(false)) {
    this.classList.toggle("button--loading");
  }
});

// Closes responsive menu when a scroll trigger link is clicked

navItems.forEach((l) => {
  l.addEventListener("click", () => {
    const bsCollapse = new bootstrap.Collapse(menuToggle);
    bsCollapse.toggle();
  });
});

window.onscroll = function () {
  mobileScroll();
  desktopScroll();
};

function mobileScroll() {
  if (
    (window.screen.width < 992 && document.body.scrollTop > 80) ||
    document.documentElement.scrollTop > 80
  ) {
    mobileLogo.style.height = "80px";
    wrapperMenu.style.width = "34px";
    wrapperMenu.style.height = "32px";
  } else {
    mobileLogo.style.height = "100px";
    wrapperMenu.style.width = "44px";
    wrapperMenu.style.height = "42px";
  }
}

function desktopScroll() {
  if (
    window.screen.width >= 992 &&
    (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80)
  ) {
    [...navItems].forEach((navItem) => {
      navItem.classList.add("nav-item-scrolled");
    });
    desktopLogo.style.height = "100px";
  } else {
    desktopLogo.style.height = "140px";
    [...navItems].forEach((navItem) => {
      navItem.classList.remove("nav-item-scrolled");
    });
  }
}

// Customer Reviews Read More Function

function readMore() {
  let i;
  let dots = document.querySelectorAll(".dots");
  let moreText = document.querySelectorAll(".more");
  let btnText = document.querySelectorAll(".readMoreBtn");

  for (i = 0; i < dots.length; i++) {
    if (dots[i].style.display === "none") {
      dots[i].style.display = "inline";
      btnText[i].innerHTML = "Read More &or;";
      moreText[i].style.display = "none";
    } else {
      dots[i].style.display = "none";
      btnText[i].innerHTML = "Read Less &and;";
      moreText[i].style.display = "inline";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var lazyloadImages;

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
});

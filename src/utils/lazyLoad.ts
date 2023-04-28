export default {
  mounted(el, binding) {
    const defaultImg = require("@/assets/logo.png");
    if (!el.src) {
      el.src = defaultImg;
      el.classList.add("loading");
    }
    const observer = new IntersectionObserver(
      async ([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el);
          el.onerror = () => {
            el.src = defaultImg;
            el.classList.replace("loading", "error");
          };
          el.onload = () => el.classList.replace("loading", "loaded");
          if (!binding.value) return;
          el.src = binding.value;
        }
      },
      {
        threshold: 0.01,
      }
    );
    observer.observe(el);
  },
};

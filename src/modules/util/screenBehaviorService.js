function scrollToById(id) {
  setTimeout(() => {
    document
      .getElementById(id)
      .scrollIntoView({ block: "start", behavior: "smooth" });
  }, 25);
}

export {
  scrollToById
}
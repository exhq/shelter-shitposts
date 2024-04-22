(() => {
  // plugins/data collection/index.jsx
  fetch("https://shelter.exhq.dev", {
    method: "POST",
    body: shelter.plugins.installedPlugins
  });
})();

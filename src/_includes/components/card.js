module.exports = (content, title, img_src, img_alt) =>
  ` <div class="flex mx-4 mt-4 flex-col md:flex-row md:w-[45%] h-fit rounded-lg bg-white dark:bg-black shadow-lg dark:shadow-stone-800">` +
  (img_src
    ? ` <img
    class="m-0 h-96 object-cover rounded-t-lg md:w-2/5 md:h-auto md:rounded-none md:rounded-l-lg"
    src="${img_src}"
    alt="${img_alt}"
  /> `
    : "") +
  `
  <div class="p-4 grow flex flex-col justify-start">
    <h3 class="m-0">${title}</h3>
    ${content}
  </div>
</div>
`;

module.exports = (content, title, img_src, img_alt) =>
  ` <div class="flex flex-col lg:flex-row w-full rounded-lg bg-white dark:bg-black shadow-lg hover:shadow-xl dark:shadow-stone-800">` +
  (img_src
    ? `<div class="lg:w-2/3">
    <img
      class="rounded-t-lg lg:rounded-r-none lg:rounded-l-lg h-fit"
      src="${img_src}"
      alt="${img_alt}"
    />
  </div> `
    : "") +
  `
  <div class="prose prose-slate dark:prose-invert p-4 md:p-8 max-w-none flex flex-col justify-center align-middle" >
    <h3 class="m-0">${title}</h3>
    ${content}
  </div>
</div>
`

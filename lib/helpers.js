exports.slugify = (label) => {
  return label
    .trim()
    .toLowerCase()
    .replace(/\s+/, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

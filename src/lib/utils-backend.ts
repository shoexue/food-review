const transformNameToSlug = (name: string) => {
  const transformed = name;
  transformed.replace("'", '');
  transformed.replace(' ', '-');
  return transformed;
};

export { transformNameToSlug };

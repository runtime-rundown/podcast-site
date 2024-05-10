import slugify from 'slugify';

export const processTitle = title => {
  return slugify(title, { lower: true, remove: /[*+~,.()'"!?:@#^]/g });
};

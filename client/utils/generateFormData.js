export const generateFormData = (data) => {
  const formData = new FormData();
  formData.append('image', data.url_image);
  delete data.url_poster;
  formData.append('info', JSON.stringify(data));

  return formData;
};

import { uploadToS3 } from './s3';

export const parseFormData = async ({ req, directory }) => {
  try {
    const { file, body } = req;
    const infoParsed = JSON.parse(body.info);

    return {
      ...infoParsed,
      url_image: file ? await uploadToS3({ file, directory }) : infoParsed.url_image,
    };
  } catch (error) {
    console.error(error);
  }
};

const { put } = require('@vercel/blob');

async function uploadFile(
  file,
  folder = 'general',
) {

  const filename =
      `${folder}/${Date.now()}-${file.originalname}`;

  const blob = await put(

    filename,

    file.buffer,

    {
      access: 'public',
    },
  );

  return blob.url;
}

async function uploadMultiple(
  files,
  folder = 'general',
) {

  const urls = [];

  for (const file of files) {

    const url =
        await uploadFile(file, folder);

    urls.push(url);
  }

  return urls;
}

module.exports = {
  uploadFile,
  uploadMultiple,
};

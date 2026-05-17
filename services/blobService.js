const { put } = require('@vercel/blob');

const BLOB_READ_WRITE_TOKEN="vercel_blob_rw_WYzxZut2LfRdVhNt_nkYynk20mn1dZhbyA0rcE8c1xjrvmY";

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
      token: BLOB_READ_WRITE_TOKEN
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

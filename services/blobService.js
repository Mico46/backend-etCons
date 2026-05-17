const { put } = require('@vercel/blob');

const BLOB_READ_WRITE_TOKEN="vercel_blob_rw_ztwqODiTGGAPlTsK_fAp6f1pMUblAWnIFDkp3HK4mRqIR6S";

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

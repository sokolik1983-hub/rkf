import fileType from "file-type/browser";

const mimeWhitelist = [
    "image/jpeg",
    "image/jpg"
];

export const acceptType = file =>
    fileType
        .fromBlob(file)
        .then(x => x.mime)
        .then(mime => mimeWhitelist.includes(mime))
        .catch(err => false);

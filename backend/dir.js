// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
import { dirname } from "path";
import { fileURLToPath } from "url";

const getStaticPath = function (file = null) {
  const __dirname = dirname(fileURLToPath(import.meta.url)).concat("\\public\\");
  let isNull = file === null;
  return isNull ? __dirname : __dirname.concat(file);
};

export default getStaticPath;
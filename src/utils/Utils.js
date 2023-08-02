import ReactNativeBlobUtil from 'react-native-blob-util'

readFileBase64 = async(filePath) => {
    if(!filePath){
      return null
    }
    const data = await ReactNativeBlobUtil.fs.readFile(filePath, 'base64');
    const file = `${data}`;
    return file;
  }

const Utils = {
    readFileBase64
  };
  
  export default Utils;
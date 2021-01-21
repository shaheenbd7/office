function onFileSelected(
  fileInput: HTMLInputElement,
  outField: HTMLInputElement,
  fileNameField: HTMLInputElement | null = null
) {
  const { files } = fileInput;
  if (files && files.length > 0) {
    if (fileNameField) {
      let fileName = files[0].name;
      if (fileName.indexOf('.') > -1) {
        fileName = fileName.substring(0, fileName.lastIndexOf('.'));
      }
      fileNameField.value = fileName;
    }

    const fileReader = new FileReader();
    fileReader.readAsText(files[0], 'UTF-8');
    fileReader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        let contents = e.target?.result;
        {
          // remove header, footer
          // -----BEGIN CERTIFICATE-----, -----END CERTIFICATE-----
          const regex = /-----([A-Z ])+-----/g;
          contents = contents.replaceAll(regex, '');
        }

        {
          // remove whitespace
          const regex = /([ \t\r\n])+/g;
          contents = contents.replaceAll(regex, '');
        }
        outField.value = contents;
      }
    };
  } else {
    outField.value = '';
  }
}

export default { onFileSelected };

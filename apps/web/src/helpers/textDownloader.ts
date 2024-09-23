const downloadTxtFile = (text: string) => {
  const element = document.createElement('a');
  const file = new Blob([text], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = 'myFile.txt';
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

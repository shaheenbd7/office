import fs from 'fs';

import styles from './Creation.css';
import DB from '../../../repository/DB';
import {
  Profile,
  ProfileState,
  ProfileType,
} from '../../../repository/pct_model';

function isVisible(element: HTMLElement) {
  return !element.parentElement?.classList.contains(styles.hide);
}

export const storeFormIntoJson = (
  form: HTMLFormElement | null,
  rootJson: { [key: string]: any }
) => {
  if (form) {
    const data = new FormData(form);
    data.forEach((value: FormDataEntryValue, key: string) => {
      const element = form.elements.namedItem(key) as HTMLElement;
      if (isVisible(element)) {
        rootJson[key] = value;
      }
    });
  }
};

const saveJsonFile = (
  isDraft: boolean,
  id: number,
  json: { [key: string]: any }
) => {
  const p = isDraft ? './data/draft' : './data/complete';
  fs.mkdirSync(p, {
    recursive: true,
  });

  const jsonStr = JSON.stringify(json);
  fs.writeFileSync(`${p}/${id}.json`, jsonStr);
};

export const saveAsDraft = (qrInfo: { [key: string]: any }) => {
  // TODO change UI
  // eslint-disable-next-line no-restricted-globals
  const dialog = confirm('Save as draft.\n OK: Save\n Cancel: Discard');
  if (dialog === true) {
    const profile = new Profile({
      // eslint-disable-next-line no-underscore-dangle
      name: qrInfo._profileName,
      state: ProfileState.INCOMPLETE,
      type: ProfileType.DEVICE_OWNER,
      version: '1.00',
    });

    const db = DB.getInstance();
    db.insertProfile(profile)
      .then((id) => {
        profile.id = id;
        qrInfo.profileID = `${id}`;
        saveJsonFile(true, id, qrInfo);
        return true;
      })
      .catch(() => {});
  }
};

export const saveAsComplete = (
  beforeFormat: { [key: string]: any },
  afterFormat: { [key: string]: any }
) => {
  const profile = new Profile({
    // eslint-disable-next-line no-underscore-dangle
    name: beforeFormat._profileName,
    state: ProfileState.COMPLETE,
    type: ProfileType.DEVICE_OWNER,
    version: '1.00',
  });

  const db = DB.getInstance();
  db.insertProfile(profile)
    .then((id) => {
      profile.id = id;
      beforeFormat.profileID = `${id}`;
      saveJsonFile(true, id, beforeFormat);
      saveJsonFile(false, id, afterFormat);
      return true;
    })
    .catch(() => {});
};

function pickContent(input: string) {
  let output = '';

  const regex = /(?:[\s\S]*)-----BEGIN CERTIFICATE-----([\s\S]+)-----END CERTIFICATE-----(?:[\s\S]*)/g;
  output = input.replace(regex, '$1');

  // remove whitespace
  output = output.replace(/([ \t\r\n])+/g, '');

  return output;
}

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
    fileReader.readAsArrayBuffer(files[0]);
    fileReader.onload = (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        const result = new Uint8Array(e.target.result);
        let contents = String.fromCharCode.apply(null, Array.from(result));

        const header = contents.match(/-----BEGIN CERTIFICATE-----/g) || [];
        const footer = contents.match(/-----END CERTIFICATE-----/g) || [];

        console.log(`
          header length=${header.length}, footer length=${footer.length}`);

        if (header.length === 1 && footer.length === 1) {
          // if this file contains only one header and one footer, pick contents.
          contents = pickContent(contents);
        } else {
          // if the file does not have header and footer or the file has many header and footer, encode base64 whole file.
          contents = btoa(contents);
        }
        console.log(contents);

        outField.value = contents;
      }
    };
  } else {
    outField.value = '';
  }
}

export default { onFileSelected };

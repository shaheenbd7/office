import React, { useEffect, createRef, useState, useRef, FormEvent } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

import QRCode from 'qrcode';

import routes from '../../../constants/routes.json';
import QRCodeSchema from './refs/QRCodeSchema.json';
import CreationParams from './CreationParams';

import CreationRoutes from './CreationRoutes.json';

import styles from './Creation.css';
import stylesQR from './CreationQR.css';
import CustomButton from '../../../components/CustomButton';
import cancel from '../../../../resources/icons/cancel/cancel.png';
import PaginationIndicator from '../../../components/PaginationIndicator';
import {
  BASIC_FORM_STRINGS,
  CONTINUE,
  EMM_CREATE_PAGE_TITLE,
  PROFILE_NAME,
  ASTERIX,
  ORGANIZATION,
  DESCRIPTION,
} from '../../../constants/uiStrings';

interface QRDatas {
  qrDatas: string[];
}

function QRCanvases({ qrDatas }: QRDatas) {

  const refCanvases = qrDatas.map(() => createRef<HTMLCanvasElement>());

  function drawQR(canvas: HTMLCanvasElement, data: string) {
    QRCode.toCanvas(canvas, data, { errorCorrectionLevel: 'Q' }, (error) => {
      if (error) console.error(error);
      console.log('success!');
    });
  }

  useEffect(() => {
    qrDatas.forEach((item, index) => {
      const canvas = refCanvases[index].current;
      const data = item;
      drawQR(canvas!, data);
    });
  });

  return (    
      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {qrDatas.map((_, index) => {
          const k = `k_${index}`;
          return (
            <canvas
              ref={refCanvases[index]}
              key={k}              
            />
          );
        })}
      </div>    
  );
}

export default function CreationQRCodePage({ rootJson }: CreationParams) {

  const history = useHistory();
  const { url, path } = useRouteMatch();

  const [qrDatas, setQrDatas] = useState<string[]>([]);

  var mydata;

  function isNum(val: string) {
    const regexpNum = /[0-9]/;
    return regexpNum.test(val);
  }

  function setValue(
    fullPath: string,
    value: string,
    obj: { [key: string]: any }
  ) {
    const fields = fullPath.split('_');
    let result = obj;

    for (let i = 0; fields.length > i; i += 1) {
      const field = fields[i];

      if (i === fields.length - 1) {
        result[field] = value;
      } else {
        if (typeof result[field] === 'undefined') {
          if (isNum(fields[i + 1])) {
            result[field] = [];
          } else {
            result[field] = {};
          }
        }
        result = result[field];
      }
    }
  }

  const MAX_LENGTH = 1200;

  function calcQRCount(jsonData: { [key: string]: any }) {
    const jsonString = JSON.stringify(jsonData);

    console.log('calcQRCount:');

    console.log(
      `json len=${jsonString.length} qr_count=${Math.ceil(
        jsonString.length / MAX_LENGTH
      )} \n *${jsonString}*`
    );

    return Math.max(1, Math.ceil(jsonString.length / MAX_LENGTH));
  }

  function getSchemaInfo(keys: string[]) {
    const schema = QRCodeSchema;

    let node: { [key: string]: any } = schema;
    keys.forEach((key) => {
      if (node.properties) {
        node = node.properties[key];
      } else if (node.items && node.type === 'array') {
        node = node.items.anyOf.lastItem;
      }
    });
    return node;
  }

  function isEmptyObject(item: { [key: string]: any }) {
    const found = Object.keys(item).some((element: any) => {
      let exist = item[element];

      if (exist && Array.isArray(item[element])) {
        exist = exist && item[element].join('').length > 0;
      }
      return exist;
    });
    return !found;
  }

  function isEmptyArray(arr: { [key: string]: any }) {
    const isEmpty = arr.every((item: any) => {
      return isEmptyObject(item);
    });
    return isEmpty;
  }

  function convertToPrimitiveType(
    json: { [key: string]: any },
    fullPath: string[]
  ) {
    const currentNode = fullPath.reduce((acc, cur) => acc[cur], json);
    // console.log(
    //   `fullPath=${fullPath} \t currentNode=${JSON.stringify(currentNode)}`
    // );

    Object.keys(currentNode).forEach(function (key) {
      const childPath = fullPath.concat(key);
      const childNode = childPath.reduce((acc, cur) => acc[cur], json);
      const schemaInfo = getSchemaInfo(childPath);
      const typeSchema = schemaInfo.type;
      const canDrop =
        schemaInfo.required === false || schemaInfo.required === 'false';

      // console.log(`key=${key} \t value=${JSON.stringify(childNode)} \t keys=${childPath} \t isArrayValue=${Array.isArray(childNode)} \
      //     \t typeSchema=${typeSchema} \t canDrop=${canDrop} `);

      let skip = false;

      if (canDrop) {
        let isEmpty;
        if (typeSchema === 'array') {
          const newChild = childNode.filter((item: { [key: string]: any }) => {
            return !isEmptyObject(item);
          });
          currentNode[key] = newChild;
          isEmpty = isEmptyArray(newChild);
        }

        if (typeSchema === 'string') {
          isEmpty = !childNode;
        }

        if (isEmpty) {
          delete currentNode[key];
          skip = true;
        }
      }

      if (typeof childNode === 'string') {
        if (typeSchema === 'boolean') {
          // convert "true", "false" strings to boolean.
          currentNode[key] = childNode === 'on';
        }
      } else if (!skip) {
        convertToPrimitiveType(json, childPath);
      }
    });
  }

  function addNeccesaryInfo(json: { [key: string]: any }) {
    if (json.management?.agent) {
      json.management.agent.version = '0';
    }

    if (json.management?.secondaryAgents) {
      const { secondaryAgents } = json.management;
      Object.keys(secondaryAgents).forEach((item) => {
        secondaryAgents[item].version = '0';
        // console.log(`addNeccesaryInfo = ${JSON.stringify(secondaryAgents)}`);
      });
    }
  }

  const formatJson = () => {

    //const beforeFormat = JSON.parse(refBeforFormat.current?.value || '');

    const beforeFormat = JSON.parse(JSON.stringify(rootJson, undefined, 2));

    const newJson: { [key: string]: any } = {};

    Object.keys(beforeFormat).forEach(function (longAttr) {
      // skip attributes only for UI
      if (longAttr[0] !== '_') {
        // console.log(`longAttr=${longAttr}  \t value=${json[longAttr]} `);
        setValue(longAttr, beforeFormat[longAttr], newJson);
      }
    });

    convertToPrimitiveType(newJson, []);

    addNeccesaryInfo(newJson);

    const qrCount = calcQRCount(newJson);
    newJson.additionalScanCount = qrCount - 1;

    const formatedContents = JSON.stringify(newJson, undefined, 2);
    const newJson2 = JSON.parse(formatedContents);
    const newJsonString = JSON.stringify(newJson2);

    const size = calcQRCount(newJson);
    const r = Array(size);
    let offset = 0;

    for (let i = 0; i < size; i += 1) {
      r[i] = newJsonString.substr(offset, MAX_LENGTH);
      offset += MAX_LENGTH;
    }

    setQrDatas(r);

  };

  useEffect(() => {
    console.log(`CreationQRCodeGeneratorPage url=${url} path=${path}`);
    formatJson();
  },[]);

  function getprofilename() {
    return "Pofile Name: " + rootJson["_profileName"];
  }

  function getCreationTime() {

    var months = new Array(12);
    months[0] = "Jan";
    months[1] = "Feb";
    months[2] = "Marh";
    months[3] = "Apr";
    months[4] = "May";
    months[5] = "Jun";
    months[6] = "Jul";
    months[7] = "Aug";
    months[8] = "Sep";
    months[9] = "Oct";
    months[10] = "Nov";
    months[11] = "Dec";

    var today = new Date();
    var ctime = today.getDay() + ' ' +months[today.getMonth()] + ' ' + today.getFullYear() + ' ' +today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return ctime;
  }

  return (

    <div data-tid="container" className={stylesQR.qrContainer}>
      <div className={stylesQR.qrFormContainer}>
        <div className={styles.headerContainer}>
          <div>
            <Link to={`.${CreationRoutes.SUMMARY}`}>
              <button type="button">Go Back</button>
            </Link>
          </div>
          <div>
            <h3 className={styles.pageTitle}>{EMM_CREATE_PAGE_TITLE}</h3>
            <PaginationIndicator noOfItems={7} selectedIndex={7} />
          </div>
          <div>
            <img src={cancel} alt="Cancel" className={styles.cancel} />
          </div>        
        </div>        
          <h1 className={styles.title}>QR code generated</h1>
          <h2 className={styles.subText}>The profile has been created and a QR code has been generated.</h2>         
          <h3 className={stylesQR.profileName}>{getprofilename()}</h3>      
          <h3 className={stylesQR.creationTime}>{getCreationTime()}</h3>
          <div className={stylesQR.qrcode_with_wifiConfig}>
             <QRCanvases qrDatas={qrDatas} />
          </div>
          <div className={stylesQR.h_links}>
             <a className={stylesQR.printText}>Print</a>
             <a className={stylesQR.downloadText}>Download</a>     
          </div>
          <br />
          <br />
          <br />
      </div>
      <div className={styles.buttonContainer}>
         <Link to={routes.LIST}>
             <CustomButton type="button" text="DONE" />
         </Link>
      </div>      
    </div>    
   );
}

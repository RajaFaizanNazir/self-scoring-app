var pdf = require("html-pdf");
const emailUtills = require("../util/email-utill");
const S3 = require("aws-sdk/clients/s3");
const awsConfig = {
  accessKeyId: "AKIAVF6VHQZQF2NIOTQH",
  secretAccessKey: "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",
  region: "ap-southeast-2",
};
const s3Client = new S3(awsConfig);
const uploadPDFtoS3 = async (file, name) => {
  try {
    console.log("Trying uploadPDFtoS3: ", name);
    if (!file || !name) {
      return;
    }
    const params = {
      Bucket: "pdf-records",
      Key: name,
      Body: file,
      ContentType: "application/pdf",
    };
    await s3Client
      .upload(params)
      .promise()
      .then((err) => {
        console.log("done uploadPDFtoS3: ", name);
      });
    return {
      fileId: name,
    };
  } catch (err) {
    console.log("Something went wrong with uploadPDFtoS3 ");
    return false;
  }
};
const generatePDF = async (htmlData, fileId, _to, _subject, _fileName) => {
  try {
    const options = {
      height: "2700px",
      width: "1838px",
      format: "A4",
      orientation: "portrait",
      timeout: "100000",
      zoomFactor: "0",
      childProcessOptions: {
        env: {
          OPENSSL_CONF: "/dev/null",
        },
      },
    }; // allowed units: A3, A4, A5, Legal, Letter, Tabloid // allowed units: mm, cm, in, px // allowed formats: portrait or landscape
    // width="918"
    // height="1188"
    const up2s3Promise = new Promise((resolve, reject) => {
      console.log("Trying generatePDF", fileId);
      pdf.create(htmlData, options).toBuffer(async function (err, buffer) {
        if (err) {
          console.log(err);
        } else {
          // await dropBoxUtill.uploadPDFtodropBox(buffer, fileId, timeout);
          if (buffer) {
            // await uploadPDFtoS3(buffer, fileId);
            await emailUtills.sendMailSMTP(
              _to,
              _subject,
              "",
              "",
              _fileName,
              buffer
            );
            resolve();
          }
        }
      });
    });
    console.log("done generatePDF", fileId);
    return up2s3Promise;
  } catch (err) {
    console.log("Something went wrong with generatePDF");
  }
};
const pdf_template_html = async (grades) => {
  const {
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    b1,
    b2,
    b3,
    b4,
    c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
    e1,
    e2,
    e3,
    e4,
    e5,
    e6,
    e7,
    e8,
    f1,
    f2,
    f3,
    f4,
    f5,
    g1,
    g2,
    g3,
    g4,
    g5,
    g6,
    g7,
  } = grades;
  return `<!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
  <head>
  <title></title>
  
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
   <br/>
  <style type="text/css">
  <!--
      p {margin: 0; 
    padding: 0;
    font-weight: bold;
    white-space: nowrap;}	.ft10{font-size:37px;font-family:sans-serif;color:#017100;}
      .ft11{font-size:20px;font-family:sans-serif;color:#017100;}
      .ft12{font-size:20px;font-family:sans-serif;color:#000000;}
      .ft13{font-size:14px;font-family:sans-serif;color:#000000;}
      .ft14{font-size:14px;font-family:sans-serif;color:#000000; font-weight:300;}
      .ft15{font-size:16px;font-family:sans-serif;color:#000000;}
      .ft16{font-size:20px;font-family:sans-serif;color:#000000;}
      .ft17{font-size:17px;font-family:sans-serif;color:#000000;}
      .ft18{font-size:17px;font-family:sans-serif;color:#000000;}
      .ft19{font-size:16px;font-family:sans-serif;color:#000000;}
  -->
  </style>
  </head>
  <body bgcolor="#A0A0A0" vlink="blue" link="blue">
  <div id="page1-div" style="position:relative;width:1838px;height:2601px;">
  <img width="1838" height="2601" src="https://gateway.pinata.cloud/ipfs/QmVV6bjv9MqK73wCayE5MwnUcydRanirzjKidaYLWSpkb5?_gl=1*1wp3al6*_ga*MTI2NTQzNjk2Ni4xNjc0NDU2NjY3*_ga_5RMPXG14TE*MTY3NjY0ODIyNy41LjEuMTY3NjY0ODQ1OS42MC4wLjA." alt="background image"/>
  <p style="position:absolute;top:227px;left:424px;white-space:nowrap" class="ft10">Self-Score Your Pitch&#160;</p>
  <p style="position:absolute;top:287px;left:229px;white-space:nowrap" class="ft11">SCORE&#160;EACH&#160;QUESTION</p>
  <p style="position:absolute;top:287px;left:446px;white-space:nowrap" class="ft12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&#160;1&#160;=&#160;Very&#160;poor&#160;2&#160;=&#160;Poor&#160;3&#160;=&#160;Good&#160;4&#160;=&#160;Very&#160;good&#160;5&#160;=&#160;Excellent&#160;</p>
  <p style="position:absolute;top:336px;left:160px;white-space:nowrap" class="ft13"><b>NAME&#160;OF&#160;YOUR&#160;PROJECT:&#160;</b></p>
  <p style="position:absolute;top:327px;left:1100px;white-space:nowrap" class="ft13"><b>Score each</b></p>
  <p style="position:absolute;top:346px;left:1090px;white-space:nowrap" class="ft13"><b>question (1&#160;to&#160;5)</b></p>
  <p style="position:absolute;top:336px;left:1267px;white-space:nowrap" class="ft13"><b>Weighting</b></p>
  <p style="position:absolute;top:392px;left:160px;white-space:nowrap" class="ft13"><b>A.&#160;PRESENTER</b></p>
  <p style="position:absolute;top:417px;left:168px;white-space:nowrap" class="ft14">1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Is&#160;the&#160;presenter&#160;convincing</p>
  <p style="position:absolute;top:417px;left:1149px;white-space:nowrap" class="ft15">${a1}</p>
  <p style="position:absolute;top:442px;left:168px;white-space:nowrap" class="ft14">2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Does&#160;the&#160;presenter&#160;make&#160;the&#160;problem&#160;clear?</p>
  <p style="position:absolute;top:443px;left:1149px;white-space:nowrap" class="ft15">${a2}</p>
  <p style="position:absolute;top:467px;left:168px;white-space:nowrap" class="ft14">3&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presenter&#160;make&#160;the&#160;solution&#160;clear?</p>
  <p style="position:absolute;top:468px;left:1149px;white-space:nowrap" class="ft15">${a3}</p>
  <p style="position:absolute;top:492px;left:168px;white-space:nowrap" class="ft14">4&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presenter&#160;make&#160;the&#160;user&#160;and&#160;market&#160;clear?</p>
  <p style="position:absolute;top:493px;left:1149px;white-space:nowrap" class="ft15">${a4}</p>
  <p style="position:absolute;top:517px;left:168px;white-space:nowrap" class="ft14">5&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presenter&#160;make&#160;the&#160;growth&#160;path&#160;clear?</p>
  <p style="position:absolute;top:518px;left:1149px;white-space:nowrap" class="ft15">${a5}</p>
  <p style="position:absolute;top:542px;left:169px;white-space:nowrap" class="ft14">6&nbsp;&nbsp;&nbsp;&nbsp;&nbspIs&#160;the&#160;presenter&#160;well&#160;practiced&#160;?</p>
  <p style="position:absolute;top:542px;left:1149px;white-space:nowrap" class="ft15">${a6}</p>
  <p style="position:absolute;top:568px;left:645px;white-space:nowrap" class="ft13"><b>SUB&#160;TOTAL&#160;</b>(based&#160;on&#160;an&#160;average&#160;of&#160;your&#160;six&#160;scores)</p>
  <p style="position:absolute;top:568px;left:1149px;white-space:nowrap" class="ft15">${(
    (+a1 + +a2 + +a3 + +a4 + +a5 + +a6) /
    6
  ).toFixed(2)}</p>
  <p style="position:absolute;top:569px;left:1285px;white-space:nowrap" class="ft13"><b>10%</b></p>
  <p style="position:absolute;top:618px;left:160px;white-space:nowrap" class="ft13"><b>B.&#160;PROJECT&#160;DESCRIPTION</b></p>
  <p style="position:absolute;top:643px;left:168px;white-space:nowrap" class="ft14">1&nbsp;&nbsp;&nbsp;&nbsp;&nbspIs&#160;the&#160;project&#160;expressed&#160;simply&#160;and&#160;clearly&#160;for&#160;others&#160;to&#160;understand?</p>
  <p style="position:absolute;top:643px;left:1149px;white-space:nowrap" class="ft15">${b1}</p>
  <p style="position:absolute;top:668px;left:168px;white-space:nowrap" class="ft14">2&nbsp;&nbsp;&nbsp;&nbsp;&nbspWhat&#160;stage&#160;of&#160;development&#160;the&#160;project&#160;is&#160;at&#160;(ie&#160;is&#160;it&#160;an&#160;idea&#160;or&#160;at&#160;prototype&#160;stage)?</p>
  <p style="position:absolute;top:668px;left:1149px;white-space:nowrap" class="ft15">${b2}</p>
  <p style="position:absolute;top:693px;left:168px;white-space:nowrap" class="ft14">3&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;identify&#160;the&#160;next&#160;steps&#160;and&#160;timeframes&#160;required&#160;to&#160;develop&#160;the&#160;project&#160;further?</p>
  <p style="position:absolute;top:693px;left:1149px;white-space:nowrap" class="ft15">${b3}</p>
  <p style="position:absolute;top:718px;left:168px;white-space:nowrap" class="ft14">4&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;suggest&#160;the&#160;market&#160;opportunity&#160;is&#160;attractive?</p>
  <p style="position:absolute;top:718px;left:1149px;white-space:nowrap" class="ft15">${b4}</p>
  <p style="position:absolute;top:744px;left:645px;white-space:nowrap" class="ft13"><b>SUB&#160;TOTAL&#160;</b>(based&#160;on&#160;an&#160;average&#160;of&#160;your&#160;four&#160;scores)</p>
  <p style="position:absolute;top:744px;left:1136px;white-space:nowrap" class="ft15">${(
    (+b1 + +b2 + +b3 + +b4) /
    4
  ).toFixed(2)}</p>
  <p style="position:absolute;top:744px;left:1285px;white-space:nowrap" class="ft13"><b>10%</b></p>
  <p style="position:absolute;top:794px;left:160px;white-space:nowrap" class="ft13"><b>C.&#160;THE&#160;MARKET&#160;OPPORTUNITY</b></p>
  <p style="position:absolute;top:819px;left:168px;white-space:nowrap" class="ft14">1&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;explain&#160;why&#160;the&#160;project&#160;is&#160;such&#160;a&#160;great&#160;idea?</p>
  <p style="position:absolute;top:819px;left:1149px;white-space:nowrap" class="ft15">${c1}</p>
  <p style="position:absolute;top:844px;left:168px;white-space:nowrap" class="ft14">2&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;identify&#160;competitors,&#160;and&#160;explain&#160;the&#160;competitive&#160;advantage&#160;of&#160;their&#160;project?</p>
  <p style="position:absolute;top:845px;left:1149px;white-space:nowrap" class="ft15">${c2}</p>
  <p style="position:absolute;top:869px;left:168px;white-space:nowrap" class="ft14">3&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;project&#160;incorporate&#160;a&#160;high&#160;level&#160;of&#160;innovation?</p>
  <p style="position:absolute;top:870px;left:1149px;white-space:nowrap" class="ft15">${c3}</p>
  <p style="position:absolute;top:894px;left:168px;white-space:nowrap" class="ft14">4&nbsp;&nbsp;&nbsp;&nbsp;&nbspIs&#160;the&#160;project&#160;likely&#160;to&#160;'disrupt'&#160;the&#160;marketplace?</p>
  <p style="position:absolute;top:895px;left:1149px;white-space:nowrap" class="ft15">${c4}</p>
  <p style="position:absolute;top:919px;left:168px;white-space:nowrap" class="ft14">5&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;project&#160;have&#160;the&#160;potential&#160;to&#160;impact&#160;the&#160;global&#160;market?</p>
  <p style="position:absolute;top:920px;left:1149px;white-space:nowrap" class="ft15">${c5}</p>
  <p style="position:absolute;top:944px;left:169px;white-space:nowrap" class="ft14">6&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;quantify&#160;the&#160;potential&#160;size&#160;of&#160;the&#160;market&#160;opportunity?</p>
  <p style="position:absolute;top:945px;left:1149px;white-space:nowrap" class="ft15">${c6}</p>
  <p style="position:absolute;top:969px;left:168px;white-space:nowrap" class="ft14">7&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;discuss&#160;the&#160;potential&#160;barriers&#160;to&#160;success?</p>
  <p style="position:absolute;top:971px;left:1149px;white-space:nowrap" class="ft15">${c7}</p>
  <p style="position:absolute;top:995px;left:640px;white-space:nowrap" class="ft13"><b>SUB&#160;TOTAL&#160;</b>(based&#160;on&#160;an&#160;average&#160;of&#160;your&#160;seven&#160;scores)</p>
  <p style="position:absolute;top:994px;left:1141px;white-space:nowrap" class="ft15">${(
    (+c1 + +c2 + +c3 + +c4 + +c5 + +c6 + +c7) /
    7
  ).toFixed(2)}</p>
  <p style="position:absolute;top:995px;left:1285px;white-space:nowrap" class="ft13"><b>20%</b></p>
  <p style="position:absolute;top:1045px;left:160px;white-space:nowrap" class="ft13"><b>D.&#160;THE&#160;TARGET&#160;MARKET</b></p>
  <p style="position:absolute;top:1070px;left:168px;white-space:nowrap" class="ft14">1&nbsp;&nbsp;&nbsp;&nbsp;&nbspHas&#160;the&#160;presentation&#160;clearly&#160;identified&#160;a&#160;target&#160;market&#160;/&#160;customer&#160;for&#160;their&#160;project?</p>
  <p style="position:absolute;top:1070px;left:1149px;white-space:nowrap" class="ft15">${d1}</p>
  <p style="position:absolute;top:1095px;left:168px;white-space:nowrap" class="ft14">2&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;project&#160;have&#160;a&#160;saleable&#160;valuable&#160;proposition&#160;to&#160;a&#160;well&#160;define&#160;target&#160;market&#160;/&#160;customer?</p>
  <p style="position:absolute;top:1096px;left:1149px;white-space:nowrap" class="ft15">${d2}</p>
  <p style="position:absolute;top:1120px;left:168px;white-space:nowrap" class="ft14">3&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;project&#160;have&#160;evidence&#160;of&#160;'need'&#160;from&#160;the&#160;target&#160;market?&#160;e.g.&#160;letters&#160;of&#160;intent,&#160;e.g.&#160;early&#160;adopters?</p>
  <p style="position:absolute;top:1121px;left:1149px;white-space:nowrap" class="ft15">${d3}</p>
  <p style="position:absolute;top:1145px;left:168px;white-space:nowrap" class="ft14">4&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;adequately&#160;quantify&#160;the&#160;size&#160;of&#160;the&#160;target&#160;market?</p>
  <p style="position:absolute;top:1146px;left:1149px;white-space:nowrap" class="ft15">${d4}</p>
  <p style="position:absolute;top:1170px;left:168px;white-space:nowrap" class="ft14">5&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;address&#160;customer&#160;acquisition?</p>
  <p style="position:absolute;top:1172px;left:1149px;white-space:nowrap" class="ft15">${d5}</p>
  <p style="position:absolute;top:1195px;left:169px;white-space:nowrap" class="ft14">6&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;product&#160;/&#160;service&#160;have&#160;a&#160;clear&#160;route&#160;to&#160;market?</p>
  <p style="position:absolute;top:1195px;left:1149px;white-space:nowrap" class="ft15">${d6}</p>
  <p style="position:absolute;top:1221px;left:645px;white-space:nowrap" class="ft13"><b>SUB&#160;TOTAL&#160;</b>(based&#160;on&#160;an&#160;average&#160;of&#160;your&#160;six&#160;scores)</p>
  <p style="position:absolute;top:1220px;left:1141px;white-space:nowrap" class="ft15">${(
    (+d1 + +d2 + +d3 + +d4 + +d5 + +d6) /
    6
  ).toFixed(2)}</p>
  <p style="position:absolute;top:1221px;left:1279px;white-space:nowrap" class="ft13"><b>17.5%</b></p>
  <p style="position:absolute;top:1271px;left:160px;white-space:nowrap" class="ft13"><b>E.&#160;THE&#160;BUSINESS&#160;MODEL</b></p>
  <p style="position:absolute;top:1297px;left:168px;white-space:nowrap" class="ft14">1&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;proposed&#160;business&#160;model&#160;appear&#160;to&#160;be&#160;commercially&#160;viable?</p>
  <p style="position:absolute;top:1296px;left:1149px;white-space:nowrap" class="ft15">${e1}</p>
  <p style="position:absolute;top:1321px;left:168px;white-space:nowrap" class="ft14">2&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;show&#160;how&#160;the&#160;proposed&#160;business&#160;would&#160;function&#160;on&#160;a&#160;day-to-day&#160;basis?</p>
  <p style="position:absolute;top:1322px;left:1149px;white-space:nowrap" class="ft15">${e2}</p>
  <p style="position:absolute;top:1346px;left:168px;white-space:nowrap" class="ft14">3&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;address&#160;how&#160;the&#160;product&#160;will&#160;be&#160;delivered&#160;(or&#160;distributed)&#160;and&#160;is&#160;it&#160;scalable?</p>
  <p style="position:absolute;top:1347px;left:1149px;white-space:nowrap" class="ft15">${e3}</p>
  <p style="position:absolute;top:1371px;left:168px;white-space:nowrap" class="ft14">4&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;clearly&#160;identified&#160;a&#160;target&#160;market&#160;/&#160;customer&#160;for&#160;their&#160;project?</p>
  <p style="position:absolute;top:1373px;left:1149px;white-space:nowrap" class="ft15">${e4}</p>
  <p style="position:absolute;top:1396px;left:168px;white-space:nowrap" class="ft14">5&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;address&#160;how&#160;they&#160;might&#160;scale&#160;the&#160;project&#160;/&#160;business?</p>
  <p style="position:absolute;top:1398px;left:1149px;white-space:nowrap" class="ft15">${e5}</p>
  <p style="position:absolute;top:1421px;left:169px;white-space:nowrap" class="ft14">6&nbsp;&nbsp;&nbsp;&nbsp;&nbspHow&#160;well&#160;does&#160;the&#160;business&#160;model&#160;meet&#160;the&#160;needs&#160;of&#160;the&#160;target&#160;market&#160;/&#160;customer?</p>
  <p style="position:absolute;top:1423px;left:1149px;white-space:nowrap" class="ft15">${e6}</p>
  <p style="position:absolute;top:1446px;left:168px;white-space:nowrap" class="ft14">7&nbsp;&nbsp;&nbsp;&nbsp;&nbspHave&#160;roles&#160;and&#160;responsibilities&#160;across&#160;key&#160;functions&#160;of&#160;the&#160;business&#160;been&#160;considered&#160;(and&#160;who&#160;would&#160;perform&#160;them)?</p>
  <p style="position:absolute;top:1448px;left:1149px;white-space:nowrap" class="ft15">${e7}</p>
  <p style="position:absolute;top:1470px;left:168px;white-space:nowrap" class="ft14">8&nbsp;&nbsp;&nbsp;&nbsp;&nbspHas&#160;the&#160;presentation&#160;identified&#160;third&#160;parties&#160;(e.g.&#160;contractors)&#160;if&#160;they&#160;are&#160;needed&#160;to&#160;successfully&#160;deliver&#160;the&#160;project?</p>
  <p style="position:absolute;top:1470px;left:1149px;white-space:nowrap" class="ft15">${e8}</p>
  <p style="position:absolute;top:1495px;left:640px;white-space:nowrap" class="ft13"><b>SUB&#160;TOTAL</b>&#160;(based&#160;on&#160;an&#160;average&#160;of&#160;your&#160;eight&#160;scores)</p>
  <p style="position:absolute;top:1495px;left:1136px;white-space:nowrap" class="ft15">${(
    (+e1 + +e2 + +e3 + +e4 + +e5 + +e6 + +e7 + +e8) /
    8
  ).toFixed(2)}</p>
  <p style="position:absolute;top:1495px;left:1285px;white-space:nowrap" class="ft13"><b>15%</b></p>
  <p style="position:absolute;top:1545px;left:160px;white-space:nowrap" class="ft13"><b>F.&#160;FINANCIALS&#160;</b></p>
  <p style="position:absolute;top:1571px;left:168px;white-space:nowrap" class="ft14">1&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;proposed&#160;project&#160;appear&#160;to&#160;be&#160;financially&#160;viable?</p>
  <p style="position:absolute;top:1570px;left:1149px;white-space:nowrap" class="ft15">${f1}</p>
  <p style="position:absolute;top:1595px;left:168px;white-space:nowrap" class="ft14">2&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;provide&#160;details&#160;of&#160;the&#160;estimated&#160;funding&#160;required&#160;to&#160;'get&#160;the&#160;project&#160;to&#160;market'?</p>
  <p style="position:absolute;top:1596px;left:1149px;white-space:nowrap" class="ft15">${f2}</p>
  <p style="position:absolute;top:1620px;left:168px;white-space:nowrap" class="ft14">3&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;have&#160;an&#160;expected&#160;price&#160;point&#160;for&#160;their&#160;product/service?</p>
  <p style="position:absolute;top:1621px;left:1149px;white-space:nowrap" class="ft15">${f3}</p>
  <p style="position:absolute;top:1645px;left:168px;white-space:nowrap" class="ft14">4&nbsp;&nbsp;&nbsp;&nbsp;&nbspHas&#160;the&#160;presentation&#160;demonstrate&#160;realistic&#160;financial&#160;projections&#160;for&#160;the&#160;project?</p>
  <p style="position:absolute;top:1646px;left:1149px;white-space:nowrap" class="ft15">${f4}</p>
  <p style="position:absolute;top:1670px;left:168px;white-space:nowrap" class="ft14">5&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;address&#160;how&#160;the&#160;continued&#160;development&#160;and&#160;launch&#160;of&#160;the&#160;project&#160;will&#160;be&#160;financed?</p>
  <p style="position:absolute;top:1670px;left:1149px;white-space:nowrap" class="ft15">${f5}</p>
  <p style="position:absolute;top:1696px;left:645px;white-space:nowrap" class="ft13"><b>SUB&#160;TOTAL&#160;</b>(based&#160;on&#160;an&#160;average&#160;of&#160;your&#160;five&#160;scores)</p>
  <p style="position:absolute;top:1696px;left:1141px;white-space:nowrap" class="ft15">${(
    (+f1 + +f2 + +f3 + +f4 + +f5) /
    5
  ).toFixed(2)}</p>
  <p style="position:absolute;top:1696px;left:1285px;white-space:nowrap" class="ft13"><b>15%</b></p>
  <p style="position:absolute;top:1746px;left:160px;white-space:nowrap" class="ft13"><b>G.&#160;MANAGEMENT&#160;AND&#160;INTELLECTUAL&#160;PROPERTY&#160;</b></p>
  <p style="position:absolute;top:1772px;left:168px;white-space:nowrap" class="ft14">1&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;presentation&#160;adequately&#160;explain&#160;the&#160;current&#160;status&#160;of&#160;the&#160;development&#160;of&#160;proprietary&#160;knowledge?</p>
  <p style="position:absolute;top:1771px;left:1149px;white-space:nowrap" class="ft15">${g1}</p>
  <p style="position:absolute;top:1796px;left:168px;white-space:nowrap" class="ft14">2&nbsp;&nbsp;&nbsp;&nbsp;&nbspHow&#160;valuable&#160;does&#160;the&#160;proprietary&#160;knowledge&#160;appear&#160;to&#160;be?</p>
  <p style="position:absolute;top:1797px;left:1149px;white-space:nowrap" class="ft15">${g2}</p>
  <p style="position:absolute;top:1821px;left:168px;white-space:nowrap" class="ft14">3&nbsp;&nbsp;&nbsp;&nbsp;&nbspDoes&#160;the&#160;project&#160;appear&#160;to&#160;have&#160;a&#160;competitive&#160;advantage&#160;on&#160;entering&#160;the&#160;market?</p>
  <p style="position:absolute;top:1822px;left:1149px;white-space:nowrap" class="ft15">${g3}</p>
  <p style="position:absolute;top:1846px;left:168px;white-space:nowrap" class="ft14">4&nbsp;&nbsp;&nbsp;&nbsp;&nbspDo&#160;the&#160;current&#160;founders&#160;and&#160;team&#160;appear&#160;to&#160;be&#160;able&#160;to&#160;maintain&#160;that&#160;advantage?</p>
  <p style="position:absolute;top:1847px;left:1149px;white-space:nowrap" class="ft15">${g4}</p>
  <p style="position:absolute;top:1871px;left:168px;white-space:nowrap" class="ft14">5&nbsp;&nbsp;&nbsp;&nbsp;&nbspCan&#160;the&#160;proprietary&#160;knowledge&#160;/&#160;intellectual&#160;property&#160;be&#160;adequately&#160;protected?</p>
  <p style="position:absolute;top:1873px;left:1149px;white-space:nowrap" class="ft15">${g5}</p>
  <p style="position:absolute;top:1896px;left:169px;white-space:nowrap" class="ft14">6&nbsp;&nbsp;&nbsp;&nbsp;&nbspCan&#160;the&#160;project&#160;be&#160;launched&#160;by&#160;the&#160;current&#160;founders&#160;and&#160;team?</p>
  <p style="position:absolute;top:1898px;left:1149px;white-space:nowrap" class="ft15">${g6}</p>
  <p style="position:absolute;top:1921px;left:168px;white-space:nowrap" class="ft14">7&nbsp;&nbsp;&nbsp;&nbsp;&nbspIs&#160;other&#160;external&#160;expertise&#160;outlined&#160;if&#160;needed&#160;to&#160;continue&#160;to&#160;develop&#160;and&#160;then&#160;launch&#160;the&#160;project?</p>
  <p style="position:absolute;top:1921px;left:1149px;white-space:nowrap" class="ft15">${g7}</p>
  <p style="position:absolute;top:1947px;left:625px;white-space:nowrap" class="ft13"><b>SUB&#160;TOTAL&#160;</b>(based&#160;on&#160;an&#160;average&#160;of&#160;your&#160;seven&#160;scores)</p>
  <p style="position:absolute;top:1947px;left:1141px;white-space:nowrap" class="ft15">${(
    (+g1 + +g2 + +g3 + +g4 + +g5 + +g6 + +g7) /
    7
  ).toFixed(2)}</p>
  <p style="position:absolute;top:1947px;left:1279px;white-space:nowrap" class="ft13"><b>12.5%</b></p>
  <p style="position:absolute;top:2007px;left:380px;white-space:nowrap" class="ft16"><b>YOUR&#160;TOTAL&#160;SCORE&#160;</b>(based&#160;on&#160;weighting&#160;of&#160;your&#160;sub&#160;totals)&nbsp;&nbsp;&nbsp;&nbsp;</p>
  <p style="position:absolute;top:2007px;left:1148px;white-space:nowrap" class="ft12">${(
    ((+a1 + +a2 + +a3 + +a4 + +a5 + +a6) / 6) * 0.1 +
    ((+b1 + +b2 + +b3 + +b4) / 4) * 0.1 +
    ((+c1 + +c2 + +c3 + +c4 + +c5 + +c6 + +c7) / 7) * 0.2 +
    ((+d1 + +d2 + +d3 + +d4 + +d5 + +d6) / 6) * 1.75 +
    ((+e1 + +e2 + +e3 + +e4 + +e5 + +e6 + +e7 + +e8) / 8) * 0.15 +
    ((+f1 + +f2 + +f3 + +f4 + +f5) / 5) * 0.15 +
    ((+g1 + +g2 + +g3 + +g4 + +g5 + +g6 + +g7) / 7) * 0.125
  ).toFixed(2)}</p>
  <p style="position:absolute;top:2071px;left:159px;white-space:nowrap" class="ft17"><b>THREE</b>&#160;<b>WARNINGS</b>: 1. Your score results may be a helpful sign but do not cover all the information you need for success 2. It is essential&#160;</p>
  <p style="position:absolute;top:2094px;left:159px;white-space:nowrap" class="ft18">that you ask for help from those who’ve gone before, and who speak from their valuable experience 3. For your safety and certainty get&#160;</p>
  <p style="position:absolute;top:2117px;left:159px;white-space:nowrap" class="ft18">professional legal and accounting advice.</p>
  <p style="position:absolute;top:2168px;left:671px;white-space:nowrap" class="ft19"><b>For&#160;use&#160;of&#160;the&#160;addressee&#160;only</b></p>
  <p style="position:absolute;top:2194px;left:214px;white-space:nowrap" class="ft15">The&#160;design&#160;and&#160;informaJon&#160;contained&#160;in&#160;the&#160;Self-Score&#160;Your&#160;Pitch,&#160;and&#160;the&#160;name&#160;Being&#160;Investable&#160;remain&#160;the&#160;property&#160;of&#160;John&#160;C&#160;H&#160;Perry&#160;©2023&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</p>
  <p style="position:absolute;top:2231px;left:214px;white-space:nowrap" class="ft15">Mail:&#160;Increasing&#160;Returns&#160;Suite&#160;760,&#160;585&#160;LiZle&#160;Collins&#160;Street,&#160;Melbourne,&#160;VIC&#160;3000&#160;Australia.&#160;Email:&#160;hello@increasingreturns.com</p>
  </div>
  </body>
  </html>
  `;
};
/********************************************************************************* */
module.exports = {
  pdf_template_html,
  uploadPDFtoS3,
  generatePDF,
};

// -------------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License (MIT). See LICENSE in the repo root for license information.
// -------------------------------------------------------------------------------------------------

let dataHandler = require('../dataHandler/dataHandler');
const csvparse=require('csvtojson')

module.exports = class csv extends dataHandler {
    constructor() {
        super("csv");
    }

    parseSrcData(msg) {
        return new Promise((fulfill, reject) => {
            /*parseString(data, { trim: true, explicitCharkey :true, mergeAttrs: true, explicitArray:false }, function (err, result) {
                if (err) {
                    reject(err);
                }
                console.log(JSON.stringify(result));
                result._originalData=data;
                fulfill(result);
            });*/
            csvparse({
                trim:false,
            })
            .fromString(msg)
            .then((csvRow)=>{ 
                console.log(JSON.stringify(csvRow));
                let result = {};
                // var newarray = csvRow.map(function (res) { return JSON.parse(JSON.stringify(res).replace(/\s(?=\w+":)/g, ""));});
                // console.log(JSON.parse(JSON.stringify(csvRow).replace(/\s(?=\w+":)/g, "")));
                // var arr = [{
                //     "Id": "ALFKI",
                //     "Contact Name": "Maria Anders",
                //     "Contact Title my": "Sales Representative",
                //     "City": "Berlin",
                //     "Slider": 10
                // },
                // {
                //     "resource Type": 'Claim',
                //     "Active": 'TRUE',
                //     "Claim serviceenddate": '2/21/1989',
                //     "Claim paiddate": '2/21/1989',
                //     "Claim receiveddate": '2/21/1989'}
                // ];
                // arr.map(function (res) {console.log(JSON.parse(JSON.stringify(res).prototype.replace(/\s(?=\w+":)/g, "")));});
                // arr.map(function (res) {});
                // var rrr = trimWhiteSpaces(arr);
                // console.log(rrr);
                result['res'] = csvRow;
                // result['hc1'] = [{"resourceType":"Claim"},{"resourceType":"patient"},{"resourceType":"Provider"}];
                // result['hc2'] = {"start": "2011-05-23", "end": "2012-05-23"};
                // result['ID'] = 'SOME_RANDOM_GUID';
                // result['res'] = ["aaaa","bbbb","ccccc"];
                // result['originalData']=msg;
                console.log(result);
                fulfill(result);
            })
            // try{
            //     var data = parseCSV(msg);
            //     fulfill(data);
            // }
            // catch (err) {
            //     reject(err);
            // }
        });
    }
    parseSrcData1(data) {
        return new Promise((fulfill, reject) => {
            parseString(data, { trim: true, explicitCharkey :true, mergeAttrs: true, explicitArray:false }, function (err, result) {
                if (err) {
                    reject(err);
                }
                result._originalData=data;
                fulfill(result);
            });
        });
    }

    preProcessTemplate(templateStr) {
        return super.preProcessTemplate(templateStr);
    }

    postProcessResult(inResult) {
        return super.postProcessResult(inResult);
    }

    getConversionResultMetadata(context) {
        return super.getConversionResultMetadata(context);
    }
};

function trimWhiteSpaces(obj) {
    if (!Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce(function(acc, key) {
        if(typeof obj[key] == 'string'){
            console.log(obj[key].trim());
        }
        acc[key.trim()] = typeof obj[key] == 'string'? obj[key].trim() : trimWhiteSpaces(obj[key]);
        return acc;
    }, Array.isArray(obj)? []:{});
};
function parseCSV(msg) {
    csv({
        noheader:true,
        output: "csv"
    })
    .fromString(msg)
    .then((csvRow)=>{ 
        console.log(JSON.stringify(csvRow)); // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
        return csvRow;
    })
    // var out = {};
    // return out;
}

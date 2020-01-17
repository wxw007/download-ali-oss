var axios = require("axios");
var jszip = require("jszip");
var FileSaver = require("file-saver");


var getFile = url => {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url,
            responseType: "arraybuffer"
        })
            .then(data => {
                resolve(data.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};
var downloadFromAliOss = function (fileArr, zipName) {
    const zip = new jszip();
    let promises = [];
    fileArr.forEach(item => {
        let promise = getFile(item.url).then(data => {
            // 获取文件类型
            let typeArr = item.url.split(".");
            let type = typeArr[typeArr.length - 1];
            // 默认文件名·
            let nameArr = item.url.split("/");
            let name = item.name ? (item.name + '.' + type) : nameArr[nameArr.length - 1];
            let foldPath = item.foldPath || "";
            zip.file(foldPath + name, data, {
                binary: true
            });
        });
        promises.push(promise);
    });

    Promise.all(promises).then(() => {
        zip.generateAsync({ type: "blob" }).then(content => {
            FileSaver.saveAs(content, zipName || `文件.zip`);
        });
    });
};

module.exports = downloadFromAliOss
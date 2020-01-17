# 从 ali-oss 对象存储下载文件，可批量下载，zip压缩包形式打包

## 安装
```
npm install downloadFromAliOss
```

## 引入
```
import downloadFromAliOss from "downloadFromAliOss"
```
## 使用
```
// 文件数据结构
let fileArr = [
    {
        url: '' //文件的oss存储路径 (必填)
        name: '头像1', // 文件名 (可选, 不需要填扩展名)
        foldPath: '目录1/目录2/' (可选, 文件在压缩包中的存储路径)
    }
];

let packageName = '附件.zip'; // (可选) 下载的压缩包名字, 需要带上 .zip 扩展名, 不填写默认为 '文件.zip'

//下载
downloadFromAliOss(fileArr, packageName)
```

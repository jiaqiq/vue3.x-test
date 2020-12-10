#!/usr/bin/env node

'use strict';

/*
    // 生成静态资源zip包 和serve zip包
*/


const path = require('path');
const program = require('commander');
const formatDate = require('date-fns/format');
const Archive = require('archive-tool');
const os = require('os');

const fs = require('fs');
const fse = require('fs-extra');

const buildConfig = require("./package.json");
// const zipConfig = require('./app/build/zip.config.js');

const baseDir = process.cwd();
let time = formatDate(new Date(), 'yyyyMMddHHmmss');
const rootPath = path.resolve();
const target = path.join(__dirname, './');


// static打包
const fileNameStatic = buildConfig.name  + '-' + buildConfig.version + '-' + time;
//  source: ['src', 'app', 'config', 'public', 'lib', 'app.js', 'index.js', 'agent.js', 'package.json'],
const optionStatic = {
            filename: fileNameStatic,
            source: ['css', 'fonts', 'icons', 'img', 'js', 'static', 'favicon.ico', 'heartbeat.html', 'index.html'],
            // source: buildConfig.name,
            target: target,
             // target: path.join(os.tmpdir()),
             installDeps: false,
            cwd: buildConfig.name
};


let sPublicTarget = path.join(rootPath, buildConfig.name);
const archiveStatic = new Archive(optionStatic);
archiveStatic.zip(() => {
    const src = path.join(rootPath, fileNameStatic);
    const dist = rootPath;
            // console.log('archiveStatic zip done 11111111111.');
    copyZipToRoot(src, dist, () => {
                        // console.log('copyZipToRoot static done 3333333333.');
              deletArchiveFile(src);
                        deletArchiveFile(sPublicTarget);
    });
});


// // server 打包
// const fileNameServer = buildConfig.assetsSubDirectory  + '-' + buildConfig.version + '-server-' + time;
// const optionServer = {
//             filename: fileNameServer,
//     source: zipConfig.severSource,
//     target: target,
//              installDeps: false,
//     archive: {}
// };
// const archiveServer = new Archive(optionServer);
// archiveServer.zip(()=>{
//             // console.log('archiveServer zip done 555555555.');
//     const src = path.join(rootPath, fileNameServer);
//     const dist = rootPath;
//     copyZipToRoot(src, dist, () => {
//                     // console.log('copyZipToRoot Server done 666666666.');
//         deletArchiveFile(src);
//     });
// });


// copy zip文件到根目录 下
function copyZipToRoot (src, dist, cb) {
    fs.readdir(src, function(err, files){
        if (err) {
            console.log(err);
            return;
        }
        let iLen = files.length;
        files.forEach(function (filename, index) {
            //url+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
            var url = path.join(src,filename),
                dest = path.join(dist,filename);
                                        if (!fs.existsSync(dist)) {
                                            fs.mkdir(dist);
                                        }
            fs.stat(path.join(src, filename), function (err, stats) {
                if (err) throw err;
                if (stats.isFile()) {
                    //创建读取流
                    var readable = fs.createReadStream(url);
                    //创建写入流
                    var writable = fs.createWriteStream(dest,{ encoding: "utf8" });
                    // 通过管道来传输流
                    readable.pipe(writable);
                    writable.on('close', function () {
                        if (index === iLen -1) {
                            cb && typeof(cb === 'function') && cb();
                        }
                    });
                }
            });
        });
    });
}

// deletearchive生成的文件夹
function deletArchiveFile (src) {
    let files = [];
            if (fs.existsSync(src)) {
                files = fs.readdirSync(src);
                files.forEach(function(file,index){
                        var curPath = path.join(src,file);
                        if(fs.statSync(curPath).isDirectory()) { // recurse
                                deletArchiveFile(curPath);
                        } else { // delete file
                                fs.unlinkSync(curPath);
                        }
                });
                fs.rmdirSync(src);
            }
}

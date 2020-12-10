#!/usr/bin/env node

'use strict';

/*
    // copy public包到 应用名为名字的文件+下
*/


const path = require('path');
var fs=require('fs');
var stat=fs.stat;

const buildConfig = require("./package.json");

const rootPath = path.resolve();
let sPublicPath = path.join(rootPath, 'dist');
let sPublicTarget = path.join(rootPath);
if (!fs.existsSync(sPublicTarget)) {
        fs.mkdir(sPublicTarget, (err) => {
            if (err ){
                console.log(err);
            }
        });
}
sPublicTarget = path.join(sPublicTarget, buildConfig.name);
if (!fs.existsSync(sPublicTarget)) {
        fs.mkdir(sPublicTarget, (err) => {
            if (err ){
                console.log(err);
            }
        });
}
var copy=function(src,dst){
    //读取目录
    fs.readdir(src,function(err,paths){
        // console.log(paths)
        if(err){
            throw err;
        }
        paths.forEach(function(sPath){
            const _src = path.join(src, sPath);
            const _dst = path.join(dst, sPath);
            /*var _src=src+'/'+path;
            var _dst=dst+'/'+path;*/
            var readable;
            var writable;
            stat(_src,function(err,st){
                if(err){
                    throw err;
                }

                if(st.isFile()){
                    readable=fs.createReadStream(_src);//创建读取流
                    writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(st.isDirectory()){
                    exists(_src,_dst,copy);
                }
            });
        });
    });
}

var exists=function(src,dst,callback){
    //测试某个路径下文件是否存在
    fs.exists(dst,function(exists){
        if(exists){//不存在
            callback(src,dst);
        }else{//存在
            fs.mkdir(dst,function(){//创建目录
                callback(src,dst)
            })
        }
    })
}

exists(sPublicPath, sPublicTarget, copy);

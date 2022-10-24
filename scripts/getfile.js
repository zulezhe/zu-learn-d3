/*
 * @Author: zulezhe
 * @Date: 2022-10-24 17:47:00
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-24 18:59:44
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)
const dirPath = path.resolve("public/doc")

function getFile(dirPath) {
  return new Promise((resolive, reject) => {
    let result = []
    let files = fs.readdirSync(dirPath)
    files.map(finename => {
      const file = path.join(dirPath, finename)
      let stats = fs.statSync(file)
      const isFile = stats.isFile();
      const isDir = stats.isDirectory();
      if (isFile) {
        result.push(file)
      }
      if (isDir) getFile(file)
    })
  })
}
function format(result) {
  let res = []
  result.map(filePath => {
    let item = filePath.replace(dirPath + '\\', '')
    if (item.includes('.html')) {
      res.push({
        fname: item.split("\\")[0],
        html: item.split("\\")[1],
      })
    }
  })
}
getFile(dirPath).then(result => {
  format(result)
})

/*
 * @Author: zulezhe
 * @Date: 2022-10-24 17:47:00
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-24 19:05:18
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)
const dirPath = path.resolve("public/doc")
let result = []
function getFile(dirPath) {
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
}
function format(result) {
  let res = []
  result.map(filePath => {
    let item = filePath.replace(dirPath + '\\', '')
    if (item.includes('.html')) {
      let file = item.split("\\")
      res.push({
        fname: item.split("\\")[0],
        html: item.split("\\")[1],
      })
    }
  })
  console.log(res);
  fs.writeFileSync("public/menu.json", JSON.stringify(res), {
    encoding: 'utf8',
  })
}
getFile(dirPath)
format(result)

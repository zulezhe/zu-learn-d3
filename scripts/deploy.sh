#!/usr/bin/env bash
###
 # @Author: zulezhe
 # @Date: 2022-10-24 17:12:42
 # @LastEditors: zulezhe
 # @LastEditTime: 2022-10-25 13:37:57
 # @Path: https://gitee.com/zulezhe/
 # @Description: 
### 
set -e

# 获取远程仓库地址
originUrl=$(git config --get remote.origin.url)

echo '远程分支地址为'$originUrl

# 判断是https还是ssh
nowStatus=${originUrl:0:5}
echo $nowStatus
if [ $nowStatus = 'https' ]; then
  echo 'HTTPs 模式'
  echo '远程 URL：'$originUrl
else
  echo ' SSH 模式'
  echo '远程 URL：'$originUrl
fi

# 打包編譯
npm run build

echo '进入dist目录'
cd dist
# 执行git命令
git init
git add .
git commit -m "update $(date +'%Y-%m-%d %H:%M:%S')"

# 上传到 gh-pages
git push -f $originUrl master:gh-pages

cd -

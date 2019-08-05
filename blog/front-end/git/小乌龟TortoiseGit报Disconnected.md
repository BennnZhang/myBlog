---
title: 小乌龟TortoiseGit报Disconnected
data: 2019/08/05
slidebar: true
---
导言： 用小乌龟TortoiseGit从远端拉取代码或者push代码的时候报错：Disconnected: No supported authentication methods available (server sent: publickey), 但是通过命令行的方式没有问题，原来是TortoiseGit的配置问题。  

右键进入小乌龟的setting中 => 左侧点击network => 在下边SSH client中写入git的ssh.exe路径（我的是在git安装目录Git\usr\bin\ssh.exe）。  

确定后再推代码就没有问题了。
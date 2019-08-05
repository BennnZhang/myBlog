---
title: 同个电脑配置公司gitlab与个人github的ssh
date: 2019/08/03
slidebar: true
---
导言： 在公司用的自己的电脑， 除了要每天往公司的gitlab上传代码，有时候还要向自己的github上传代码，此时就需要配置两个ssh  

准备： 两个邮箱  
因为我个人公司的gitlab用的多，所以会全局配置公司邮箱，局部配置个人邮箱  
全局配置公司信息：
```
   git config --global user.name 'Zhangbb(公司用的用户名)'
   git config --global user.email '公司邮箱'
```   
在个人要上传自己的github项目的根目录配置个人信息:  
```
   git config user.name 'Ben(个人用的用户名)'
   git config user.email '个人邮箱'
``` 
### 1. 配置公司gitlab的ssh
   `ssh-keygen -t rsa -C "公司邮箱"`  
   接下来通常我们会敲三个回车表示确认，在这里我们需要知道三个回车的意义：  
   第一个提示：  
   `
   Enter file in which to save the key (/c/Users/用户名/.ssh/id_rsa):
   `   
   此时第一个回车代表要在C盘 => User（用户）=>你的个人用户名 => .ssh下创建名为id_rsa的密钥  
   如果此时提示：  
   ```shell
   /c/Users/用户名/.ssh/id_rsa already exists.
   Overwrite (y/n)?
   ```  
   说明.ssh文件夹下已经存在名为id_rsa的密钥了，问是否覆盖，通常这说明我们的ssh是ok的，一般不需要覆盖，可以直接去配置个人的ssh了； 不出现此提示的话就会出现：  
   `
   Enter passphrase (empty for no passphrase):
   `  
   此时回车就是让我们输入密码，一般我们直接回车不设置密码  
   接下来会提示：  
   `
   Enter same passphrase again:
   `  
   即确认密码，也回车就ok了  
   此时就会在.shh文件夹下生成私钥id_rsa文件和id_rsa.pub公钥，我们将id_rsa.pub文件用编辑器打开把内容复制下添加到gitlab的ssh中就配置完成了。
### 2. 配置个人github的ssh
   基本与配置公司的一样的操作，但前几步略有不同  
   `ssh-keygen -t rsa -C "个人邮箱"`  
   刚才说了三个回车的含义，所以此时第一个回车我们就不能直接回车了，这样就会和第一个命名重复，此时我们可以输入myowngithub，然后一路回车，此时就会在.ssh文件生成一个名为myowngithub的密钥和一个名为myowngithub.pub的公钥，然后将myowngithub.pub用编辑器打开复制内容到github => 点击右上角头像 => 点击setting => 点击左侧 SSH and GPG keys => 点击右上角new SSH key添加进去即可

### 3. config文件将两个配置起来
   在.ssh文件夹下建一个名为config的文件，注意不需要后缀，在里边配置：  
   ```sh
   # 注释
    Host 主机
    HostName 主机域名
    User 自己的user.name，注意公司的与个人的
    IdentityFile 私钥位置
   ```
   所以们这个配置出来的结果就是:  
   ```sh
    # 自己的github
    Host github.com
    HostName github.com
    User Ben
    IdentityFile ~/.ssh/myowngithub
    # default公司的gitlab
    Host gitlab.com
    HostName gitlab.com
    User zhangbb
    IdentityFile ~/.ssh/id_rsa
   ```
   此时我们配置就完成了，最后一步可以测试一下
### 4. 测试 
   我们在命令中输入：  
   `ssh -T git@github.com`  
   服务器回应:   
   Hi Ben! You've successfully authenticated, but GitHub does not provide shell access.  
   说明github我们已经连接成功了； 

   `ssh -T git@gitlab.公司域名`    
   公司域名你进公司gitlab看地址栏就好了，我的就是bp.com.cn  
   服务器回应：  
   Authorized only! welcome to gitlab, Zhangbb  
   此时就可以了。  



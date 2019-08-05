---
title: 配置了ssh key推代码的时候依然需要用户名和密码
date: 2019/08/05
slidebar: true
---
导言： 有个项目发现每次推代码的时候都需要输入账户名和密码，看了看明明已经配置ssh key，看了看.git中的config发现url是https而不是ssh，所以需要更新https为shh。  
```sh
git remote remove origin
git remote add origin git@github.com:用户名/仓库名.git
```
这样再push的时候就是采用的ssh了。
---
title: css兼容性问题
date: 2019/07/24
slidebar: true
---

## 1.区域滚动在低版本安卓机出现滚动条

在当前盒子（假设为.wrap）添加属性
```
.box::-webkit-scrollbar {
    display: none;
}
```
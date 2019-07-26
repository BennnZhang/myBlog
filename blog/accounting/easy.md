---
title: 在线顺口溜生成
date: 2019/07/24
slidebar: true
---

<div>
    <p>请输入拼音，以空格分隔</p>
    <input type="text" placeholder="输入拼音" v-model="inputContent" @keyup.enter="goSearch">
    <div @click="goSearch">确定</div>
    <div v-for="(item, index) in resultList">{{ item }}</div>
</div>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            PROXY: 'https://bird.ioliu.cn/v1/?url=',
            inputContent: '',
            searchList: [],
            resultList: [],
            length: 11
        }
    },
    methods: {
        goSearch() {
            this.resultList = [];
           for (let i = 0; i < this.searchList.length; i++) {
            axios.get(`${this.PROXY}https://olime.baidu.com/py?input=${this.searchList[i]}&inputtype=py&bg=0&ed=20&result=hanzi&resultcoding=utf-8&ch_en=0&clientinfo=web&version=1`).then(res => {
                const data = res.data;
                if (data && data.status && data.status === 'T') {
                    if (data.result[0][0][1] === this.length) {
                        console.log('data.result[0][0][0]: ', data.result[0][0][0]);
                        this.resultList.push(data.result[0][0][0])
                    }
                }
            })
           }
        }
    },
    watch: {
        inputContent(val) {
            if (!val) return;
            this.length = val.replace(/ /g, '').length;
            let newArr = [];
            let arr = val.split(' ').map((item) => {
                if (item) newArr.push(item)
            });
            let per = new Permutation(newArr);
            per.start();
            const res = per.result.map(item => {
                if (item.length && item.length > 0) {
                    return item.join('');
                }
            })
            this.searchList = res;
        } 
    }
}
</script>

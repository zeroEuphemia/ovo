<template>
    <a-menu id="dddddd" style="width: 256px" v-model:openKeys="openKeys" 
    v-model:selectedKeys="selectedKeys"
    mode="inline" @click="handleClick">

        <a-sub-menu key="sub1" @titleClick="titleClick">
            <template #icon>
                <BarsOutlined />
            </template>
            <template #title>
                <router-link to="/" @click="set_step(1)">Step 1 选项设置</router-link>
            </template>
            <a-menu-item key="1" @click="set_step(1)">
                <router-link to="/">选项类型</router-link></a-menu-item>
            <a-menu-item key="2" @click="set_step(1)">
                <router-link to="/">选项列表</router-link>
            </a-menu-item>
            <a-menu-item key="3" @click="set_step(1)">
                <router-link to="/">文件格式</router-link>
            </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub2" @titleClick="titleClick">
            <template #icon>
                <BarsOutlined />
            </template>
            <template #title>
                <router-link to="/" @click="set_step(2)">
                    Step 2 约束设置
                </router-link>
            </template>
            <a-menu-item key="4" @click="set_step(2)">
                <router-link to="/">约束类型</router-link>
            </a-menu-item>
            <a-menu-item key="5" @click="set_step(2)">
                <router-link to="/">约束的添加与编辑</router-link>
            </a-menu-item>
            <a-menu-item key="6" @click="set_step(2)">
                <router-link to="/">约束列表</router-link>
            </a-menu-item>
            <a-menu-item key="7" @click="set_step(2)">
                <router-link to="/">文件格式</router-link>
            </a-menu-item>
            <a-menu-item key="8" @click="set_step(2)">
                <router-link to="/">模型下载</router-link>
            </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
            <template #icon>
                <BarsOutlined />
            </template>
            <template #title>
                <router-link to="/" @click="set_step(3)">
                    Step 3 开始生成
                </router-link>
            </template>
            <a-menu-item key="9" @click="set_step(3)">
                <router-link to="/">开始生成</router-link>
            </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
            <template #icon>
                <BarsOutlined />
            </template>
            <template #title>
                <router-link to="/" @click="set_step(3)">
                    Step 4 查看结果
                </router-link>
            </template>
            <a-menu-item key="10" @click="set_step(3)">
                <router-link to="/">查看结果</router-link>
            </a-menu-item>
            <a-menu-item key="11" @click="set_step(3)">
                <router-link to="/">下载结果</router-link>
            </a-menu-item>
        </a-sub-menu>
        <!-- <a-sub-menu key="sub6">
            <template #icon>
                <BarsOutlined />
            </template>
            <template #title>Step 5 快速开始</template>
        </a-sub-menu> -->
        <!-- <a-menu-item key="12">
            Step 5 快速开始
        </a-menu-item> -->
    </a-menu>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
import { BarsOutlined, MailOutlined, QqOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    name: "Menu",
    setup() {
        const selectedKeys = ref([]);
        const openKeys = ref([]);
        const handleClick = e => {
            console.log('click', e);
        };
        const titleClick = e => {
            console.log('titleClick', e);
        };
        watch(
            () => openKeys,
            val => {
                console.log('openKeys', val);
            },
        );
        return {
            selectedKeys,
            openKeys,
            handleClick,
            titleClick,
        };
    },
    components: {
        MailOutlined,
        QqOutlined,
        AppstoreOutlined,
        SettingOutlined,
        BarsOutlined,
    },

    methods: {
        set_step(step_num) {
            let refresh = false

            const storedData = sessionStorage.getItem("tutorial-step")
            if (storedData) {
                let last = JSON.parse(storedData)
                if(last != step_num)
                    refresh = true
            }
            sessionStorage.setItem("tutorial-step", step_num)
            if(refresh)
                this.$router.go(0)
        },
        opensub1() {
            openKeys.append('sub1')
        },
    },

    mounted() {
        // const storedData = sessionStorage.getItem("tutorial-step")
        // if (storedData) {
        //     let step = JSON.parse(storedData)
        //     this.openKeys = []
        //     this.openKeys.push('sub' + step.toString())
        // }
    },
});
</script>

<style scoped>
.router-link-active {
    text-decoration: none;
    color: black;
}
a{
    text-decoration: none;
    color: black;
}
</style>
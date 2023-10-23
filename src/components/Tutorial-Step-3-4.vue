<template>
    <div class="content">
        <Menu></Menu>
        <div class="right-content">
            <h2> Step 3 开始生成 </h2>
            <a-divider />
            <!-- <h3> 喵喵 </h3> -->
            <div class="text">
                点击开始按钮，开始生成测试样例，可能需要一定的等待时间。
            </div>
            <a-button type="primary" size="large">Start</a-button>

            <a-divider />
            <h2> Step 4 查看结果 </h2>
            <a-divider />
            <h3> 喵喵 </h3>
        </div>
    </div>
</template>

<script>
import Menu from "@/components/menu.vue"
import { defineComponent, ref, watch } from 'vue'
export default {
    name: 'tutorial_3_4',
    components: {
        Menu,
    }
}
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.right-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding-left: 100px;

    /* background-color: antiquewhite; */
}

.text {
    padding-top: 10px;
    padding-bottom: 20px;
    font-size: 18px;
    font-weight: 300;
}
</style>
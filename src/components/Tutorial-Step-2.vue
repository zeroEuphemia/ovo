<template>
    <div class="content">
        <Menu></Menu>
        <div class="right-content">
            <h2> Step 2 设置约束 </h2>

            <a-divider />
            <h3> 约束类型 </h3>
        </div>
    </div>
</template>

<script>
import Menu from "@/components/menu.vue"
import { defineComponent, ref, watch } from 'vue'
export default {
    name: 'tutorial_2',
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
</style>
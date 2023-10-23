<template>
    <div class="home">
        <div class="home-menu">
            <a-menu v-model:selectedKeys="current" mode="horizontal">
                <a-menu-item key="step1" @click="set_current(1)">
                    Stpe 1 设置选项
                </a-menu-item>
                <a-menu-item key="step2" @click="set_current(2)">
                    Step 2 设置约束
                </a-menu-item>
                <a-menu-item key="step34" @click="set_current(3)">
                    Step 3 & Step 4 获取结果 
                </a-menu-item>
            </a-menu>
        </div>
        
        <tutorial_1 v-if="step === 1"></tutorial_1>
        <tutorial_2 v-else-if="step === 2"></tutorial_2>
        <tutorial_3_4 v-else></tutorial_3_4>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import tutorial_1 from '@/components/Tutorial-Step-1.vue'
import tutorial_2 from '@/components/Tutorial-Step-2.vue'
import tutorial_3_4 from '@/components/Tutorial-Step-3-4.vue'
export default {
    name: 'HomeView',
    components: {
        tutorial_1, tutorial_2, tutorial_3_4,
    },
    data() {
        return {
            step: 1,
            current: ref(["step1"])
        }
    },
    methods: {
        set_current(value) {
            this.step = value
        },
    }
}
</script>

<style scoped>
/* .home {
    display: flex;
    flex-direction: column;
} */

.home-menu {
    padding-left: 300px;
    padding-bottom: 30px;
}
</style>
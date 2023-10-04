<template>
    <!-- <h1>Meow</h1> -->
    <a-list item-layout="horizontal" :data-source="testcases">
        <template #renderItem="{ item, index }">
            <a-list-item v-if="index === chosen_id" class="chosen">
                <div class="list-item">
                    <div v-for="(it, index) in item" class="items">
                        <div class="in_items">
                            <!-- <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> -->
                            <a-avatar v-if="it.type === 'Boolean'" class="boolean-avatar">01</a-avatar>
                            <a-avatar v-if="it.type === 'Integer'" class="integer-avatar">Z</a-avatar>
                            <a-avatar v-if="it.type === 'Float'" class="float-avatar">R</a-avatar>
                            <a-avatar v-if="it.type === 'Category'" class="category-avatar">C</a-avatar>
                        </div>
                        <div  class="in_items" style="padding-left: 10px; font-weight: 500; font-size: 18px;">
                            {{ it.name }}
                        </div>
                        <div  class="in_items" style="padding-left: 10px;">
                            <a-tag>
                                {{ it.value }}
                            </a-tag>
                        </div>
                    </div>

                    <div class="items">
                        <div  class="in_items" style="padding-left: 10px; font-weight: 500; font-size: 18px;">
                            ...
                        </div>
                    </div>
                </div>
            </a-list-item>

            <a-list-item v-else @click="set_chosen_id(index)">
                <div class="list-item">
                    <div v-for="(it, index) in item" class="items">
                        <div class="in_items">
                            <!-- <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> -->
                            <a-avatar v-if="it.type === 'Boolean'" class="boolean-avatar">01</a-avatar>
                            <a-avatar v-if="it.type === 'Integer'" class="integer-avatar">Z</a-avatar>
                            <a-avatar v-if="it.type === 'Float'" class="float-avatar">R</a-avatar>
                            <a-avatar v-if="it.type === 'Category'" class="category-avatar">C</a-avatar>
                        </div>
                        <div  class="in_items" style="padding-left: 10px; font-weight: 500; font-size: 18px;">
                            {{ it.name }}
                        </div>
                        <div  class="in_items" style="padding-left: 10px;">
                            <a-tag>
                                {{ it.value }}
                            </a-tag>
                        </div>
                    </div>

                    <div class="items">
                        <div  class="in_items" style="padding-left: 10px; font-weight: 500; font-size: 18px;">
                            ...
                        </div>
                    </div>
                </div>
            </a-list-item>
        </template>
    </a-list>
</template>

<script>
export default {
    name: "TestcaseList",
    components: { },
    data() {
		return {
            chosen_id: 0,
            testcases: [
                [
                    {
                        id: 1,
                        name: "Meow",
                        type: "Boolean",
                        description: "Meow Meow Meow",
                        value: "True",
                    },

                    {
                        id: 2,
                        name: "QAQ",
                        type: "Boolean",
                        description: "Meow Meow Meow",
                        value: "True",
                    },

                    {
                        id: 3,
                        name: "TAT",
                        type: "Boolean",
                        description: "Meow Meow Meow",
                        value: "True",
                    },
                ],

                [
                    {
                        id: 1,
                        name: "qwq",
                        type: "Boolean",
                        description: "Meow Meow Meow",
                        value: "True",
                    },

                    {
                        id: 2,
                        name: "YUKI",
                        type: "Boolean",
                        description: "Meow Meow Meow",
                        value: "True",
                    },
                    
                ],
            ],
        }
    },

    mounted() {
        const new_item = this.testcases[this.chosen_id]
        this.$emit('notifyTcCard', new_item)
    },
    methods: {
        set_chosen_id(index) {
            this.chosen_id = index
            const new_item = this.testcases[this.chosen_id]
            this.$emit('notifyTcCard', new_item)
        },
    },
}
</script>

<style scoped>
.boolean-avatar {
    background-color: #ACB1D6;
    color: white;
    font-weight: 400;
}

.integer-avatar {
    background-color: #8294C4;
    color: white;
    font-weight: 600;
}

.float-avatar {
    background-color: #8294C4;
    color: white;
    font-weight: 600;
}

.category-avatar {
    background-color: #ACB1D6;
    color: white;
    font-weight: 600;
}

.chosen {
    background-color: rgba(0, 0, 1, 0.05);
}

.list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.items {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.in_items {
    width: 60px;
    /* background-color: red; */
}

</style>
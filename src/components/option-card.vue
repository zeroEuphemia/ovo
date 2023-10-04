<template>
    <a-card v-if="item !== undefined" style="width: 300px">
        
        <!-- <template #cover>
            <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
        </template> -->
        
        <template class="ant-card-actions" #actions>
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <ellipsis-outlined key="ellipsis" />
        </template>

        <a-card-meta :title="item.name + ' ( ' + item.type + ' ) '" 
            :description=item.description>
            <template #avatar>
                <!-- <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> -->
                <a-avatar v-if="item.type === 'Boolean'" class="boolean-avatar">01</a-avatar>
                <a-avatar v-if="item.type === 'Integer'" class="integer-avatar">Z</a-avatar>
                <a-avatar v-if="item.type === 'Float'" class="float-avatar">R</a-avatar>
                <a-avatar v-if="item.type === 'Category'" class="category-avatar">C</a-avatar>
            </template>
        </a-card-meta>

        <div class="details">
            <a-tag v-for="it in item.possible_org">
                {{ it }}
            </a-tag>
        </div>

    </a-card>

    <div v-else>
        <a-empty></a-empty>
    </div>
</template>

<script>
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
export default {
    name: "OptionCard",
    components: {
        defineComponent,
        SettingOutlined,
        EditOutlined,
        EllipsisOutlined,
    },
    data() {
		return {
            item: {
                id: 1,
                name: "Meow",
                type: "Boolean",
                description: "Meow Meow Meow",
                possible: ["True", "False"],
                possible_org: ["True", "False"],
                min_value: -10,
                max_value: 10,
            },
        }
    },
    methods: {
        executeFunctionInChild2(new_item) {
            console.log(new_item)
            this.item = new_item
        },
    }
};
</script>

<style>
.details {
    width: 100%;
    padding-top: 20px;
}

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
</style>
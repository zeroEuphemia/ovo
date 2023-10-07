<template>
    <div class="constraint-list">
        <a-list item-layout="horizontal" :data-source="constraints_display">
            <template #renderItem="{ item, index }">
                <a-list-item :class="index === chosen_id ? 'chosen' : 'normal'"
                    @click="set_chosen_id(index)">
                    <a-list-item-meta
                    :description = "item.expression">
                        <template #title>
                            {{ item.description }}
                        </template>

                        
                    </a-list-item-meta>
                    <div class="list-right">
                        <a-avatar-group :max-count="3" :max-style="{ color: '#f56a00', backgroundColor: '#fde3cf' }">
                            <optAvatar v-for="it in item.component" :msg="it.type"></optAvatar>
                        </a-avatar-group>

                        <div style="padding-top: 5px; display: flex; flex-direction: row;">
                            <div v-for="(it, index) in item.component">
                                <a-tag v-if="index  < 2"> {{ it.name }} </a-tag>
                            </div>
                            <a-popover v-if="item.component.length > 2">
                                <template #content>
                                    <div v-for="(it, index) in item.component">
                                        <a-tag v-if="index  >= 2"> {{ it.name }} </a-tag>
                                    </div>
                                </template>
                                <a-tag>...</a-tag>
                            </a-popover>
                        </div>
                    </div>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<script>
import optAvatar from "@/components/opt-avatar.vue"
export default {
    name: "ConstraintList2",
    components: {
        optAvatar,
    },
    data() {
		return {
            chosen_id: 0,
            screen_list: [],
            isScreened: false,
            constraints_display: [],
            constraints: [
                {
                    description: "This is a description",
                    // expression: "((((not (Par7 = true)) OR Par7 = false) AND (Par8 = true OR Par7 = true)) OR (Par2 = true))",
                    expression: "(((not((Par7=true)))OR(Par7=false))AND((Par8=true)OR(Par7=true)))OR(((not((Par11!=true)))OR(Par0=false))AND((not((Par8!=false)))=>(Par10!=true)))",
                    type: "OR",
                    component : [
                        // ['Par2', 'Par7', 'Par8']
                        { name : 'Par2', type : "Boolean" }, 
                        { name : 'Par7', type : "Boolean" }, 
                        { name : 'Par8', type : "Boolean" },
                    ],
                    children: [
                        {
                            // ((not (Par7 = true)) OR Par7 = false) 
                            // AND 
                            // (Par8 = true OR Par7 = true)
                            expression: "((not (Par7 = true)) OR Par7 = false) AND (Par8 = true OR Par7 = true)",
                            type: "AND",
                            children: [
                                {
                                    // (not (Par7 = true)) OR Par7 = false
                                    expression: "(not (Par7 = true)) OR Par7 = false",
                                    type: "OR",
                                    children: [
                                        {
                                            expression: "not (Par7 = true)",
                                            type: "not",
                                            children: [
                                                {
                                                    expression: "Par7 = true",
                                                    type: "=",
                                                    children: [],
                                                }
                                            ],
                                        },
                                        {
                                            expression: "Par7 = false",
                                            type: "=",
                                            children: [],
                                        }
                                    ]
                                },
                                {
                                    // (Par8 = true OR Par7 = true)
                                    expression: "Par8 = true OR Par7 = true",
                                    type: "OR",
                                    children: [
                                        {
                                            expression: "Par8 = true",
                                            type: "=",
                                            children: [],
                                        },
                                        {
                                            expression: "Par7 = true",
                                            type: "=",
                                            children: [],
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            // Par2 = true
                            expression: "Par2 = true",
                            type: "=",
                            children: []
                        }
                    ]
                },

                {
                    description: "This is a description",
                    expression: "((Par2!=false)AND(not((Par10=true))))<=>((Par8!=false)AND(Par5!=false))", 
                    type: "<=>", 
                    component: [
                        // "Par10", "Par2", "Par5", "Par8"
                        { name : 'Par2', type : "Boolean" }, 
                        { name : 'Par5', type : "Boolean" }, 
                        { name : 'Par8', type : "Boolean" },
                        { name : 'Par10', type : "Boolean" },
                    ],
                    children: [
                        {
                            "expression": "(Par2!=false)AND(not((Par10=true)))", 
                            "type": "AND", 
                            "children": [
                                {
                                    "expression": "Par2!=false", 
                                    "type": "!=", 
                                    "children": []
                                }, 
                                {
                                    "expression": "not((Par10=true))", 
                                    "type": "not", 
                                    "children": [
                                        {
                                            "expression": "Par10=true", 
                                            "type": "=", 
                                            "children": []
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            "expression": "(Par8!=false)AND(Par5!=false)", 
                            "type": "AND", 
                            "children": [
                                {
                                    "expression": "Par8!=false", 
                                    "type": "!=", 
                                    "children": []
                                }, 
                                {
                                    "expression": "Par5!=false", 
                                    "type": "!=", 
                                    "children": []
                                }
                            ]
                        }
                    ]
                },

                { 
                    description: "This is a description",
                    expression: "((not((Par13!=true)))=>(Par16=false))AND((Par15=false)OR(Par1=false))", 
                    type: "AND",
                    component: [
                        // "Par1", "Par13", "Par15", "Par16"
                        { name : 'Par1', type : "Boolean" }, 
                        { name : 'Par13', type : "Boolean" }, 
                        { name : 'Par15', type : "Boolean" },
                        { name : 'Par16', type : "Boolean" },
                    ],
                    children: [
                        {"expression": "(not((Par13!=true)))=>(Par16=false)", "type": "=>", "children": [{"expression": "not((Par13!=true))", "type": "not", "children": [{"expression": "Par13!=true", "type": "!=", "children": []}]}, {"expression": "Par16=false", "type": "=", "children": []}]}, {"expression": "(Par15=false)OR(Par1=false)", "type": "OR", "children": [{"expression": "Par15=false", "type": "=", "children": []}, {"expression": "Par1=false", "type": "=", "children": []}]}
                    ], 
                },

                {
                    description: "This is a description",
                    expression: "(((not((Par16!=true)))=>(Par4=false))OR((Par9!=false)=>(not((Par12!=false)))))=>(((not((Par16!=false)))=>(Par16!=false))<=>((not((Par4=true)))AND(not((Par0!=true)))))", 
                    type: "=>", 
                    component: [
                        // "Par0", "Par12", "Par16", "Par4", "Par9"
                        { name : 'Par0', type : "Boolean" }, 
                        { name : 'Par4', type : "Boolean" }, 
                        { name : 'Par9', type : "Boolean" },
                        { name : 'Par12', type : "Boolean" },
                        { name : 'Par16', type : "Boolean" },
                    ],
                    children: [
                        {"expression": "((not((Par16!=true)))=>(Par4=false))OR((Par9!=false)=>(not((Par12!=false))))", "type": "OR", "children": [{"expression": "(not((Par16!=true)))=>(Par4=false)", "type": "=>", "children": [{"expression": "not((Par16!=true))", "type": "not", "children": [{"expression": "Par16!=true", "type": "!=", "children": []}]}, {"expression": "Par4=false", "type": "=", "children": []}]}, {"expression": "(Par9!=false)=>(not((Par12!=false)))", "type": "=>", "children": [{"expression": "Par9!=false", "type": "!=", "children": []}, {"expression": "not((Par12!=false))", "type": "not", "children": [{"expression": "Par12!=false", "type": "!=", "children": []}]}]}]}, {"expression": "((not((Par16!=false)))=>(Par16!=false))<=>((not((Par4=true)))AND(not((Par0!=true))))", "type": "<=>", "children": [{"expression": "(not((Par16!=false)))=>(Par16!=false)", "type": "=>", "children": [{"expression": "not((Par16!=false))", "type": "not", "children": [{"expression": "Par16!=false", "type": "!=", "children": []}]}, {"expression": "Par16!=false", "type": "!=", "children": []}]}, {"expression": "(not((Par4=true)))AND(not((Par0!=true)))", "type": "AND", "children": [{"expression": "not((Par4=true))", "type": "not", "children": [{"expression": "Par4=true", "type": "=", "children": []}]}, {"expression": "not((Par0!=true))", "type": "not", "children": [{"expression": "Par0!=true", "type": "!=", "children": []}]}]}]}
                    ],
                }
            ]
        }
    },
    mounted() {
        if(this.chosen_id >= this.constraints.length) {
            this.$emit('notifyConCard', undefined)
            return 
        }
        const new_item = this.constraints[this.chosen_id]
        this.$emit('notifyConCard', new_item)
    },
    created() {
        this.loadDataFromSessionStorage()
    },
    methods: {
        loadDataFromSessionStorage() {
            const storedData = sessionStorage.getItem("constraint_list_data")
            if (storedData)
                this.constraints = JSON.parse(storedData)
            
            this.isScreened = false
            this.screen_list = []
            this.constraints_display = []
            for(let i = 0; i < this.constraints.length; i ++)
                this.constraints_display.push(this.constraints[i])
            
            this.chosen_id = 0
        },

        delete_constraint(removedItem) {
            const constraints = this.constraints.filter(item => item !== removedItem)
            this.constraints = constraints
            sessionStorage.setItem("constraint_list_data", JSON.stringify(this.constraints))

            this.set_chosen_id(0)
            this.constraints_display = []
            if(this.isScreened)
                this.set_screen(this.screen_list)
            
            else {
                for(let i = 0; i < this.constraints.length; i ++)
                    this.constraints_display.push(this.constraints[i])
            }
        },

        cleanUp() {
            this.chosen_id = 0
            this.screen_list = []
            this.constraints_display = []
            this.constraints = []
            this.$emit('notifyConCard', undefined)

            sessionStorage.setItem("constraint_list_data", JSON.stringify(this.constraints))
        },

        add_constraint(new_constraint) {
        
        },

        set_screen(screen_list) {
            this.isScreened = true
            this.screen_list = screen_list
            this.constraints_display = []
            for(let i = 0; i < this.constraints.length; i ++) {
                let flag = false
                for(let j = 0; j < this.constraints[i].component.length; j ++) 
                    if(screen_list.includes(this.constraints[i].component[j].name)){
                        flag = true
                        break
                    }
                if(flag)
                    this.constraints_display.push(this.constraints[i])
            }
            this.set_chosen_id(0)
        },

        cancel_screen() {
            this.isScreened = false
            this.screen_list = []
            this.constraints_display = []
            for(let i = 0; i < this.constraints.length; i ++)
                this.constraints_display.push(this.constraints[i])
            this.set_chosen_id(0)
        },

        set_chosen_id(index) {
            this.chosen_id = index
            if(this.constraints.length > index) {
                const new_item = this.constraints[this.chosen_id]
                this.$emit('notifyConCard', new_item)
            }
            else
                this.$emit('notifyConCard', undefined)
        },
    },
}
</script>

<style>

.chosen {
    background-color: rgba(0, 0, 1, 0.05);
}

.normal {
    background-color: white;
}

.constraint-list {
    width: 780px;
}

.list-right {
    display: flex;
    flex-direction: column;
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
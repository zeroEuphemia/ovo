<template>
    <div class="lssampling">
        <div class = "up" style="padding-top: 20px;">
            <div class = "left">
                <div class = "left-up">
                    <spin style="padding-top: 7px;">加载示例: </spin>
                    <div style="padding-left: 10px;">
                        <a-select ref="select" v-model:value="example" style="width: 150px"
                            @focus="focus" @change="handleChange">
                            <a-select-option value="None">None</a-select-option>
                            <a-select-option value="axtls">axtls</a-select-option>
                            <a-select-option value="Example2">Example2</a-select-option>
                            <a-select-option value="Example3">Example3</a-select-option>
                            <a-select-option value="Example4">Example3</a-select-option>
                        </a-select>
                    </div>

                    <div style="padding-left: 10px;">
                        <a-upload
                            v-model:file="file"
                            name="file"
                            :multiple="false"
                            action="http://127.0.0.1:5001/api/uploadcnf"
                            :on-success="upload_back" @change="handleChangeFile" >
                            <a-button>
                                <upload-outlined></upload-outlined>
                                    上传 cnf
                            </a-button>
                        </a-upload>
                    </div>
                    <div style="padding-left: 10px;">
                        <a-button @click="download_cnf"><DownloadOutlined />下载</a-button>
                    </div>

                    <div style="padding-left: 10px;">
                        <a-button @click="clean_cnf"><DeleteOutlined /></a-button>
                    </div>
                </div>

                <div class = "left-down" style = "padding-top: 20px; width: 550px;">
                    <!-- <a-textarea v-model:value="value" placeholder="Basic usage" :rows="20" /> -->
                    <!-- <cnfEditor></cnfEditor> -->
                    <codemirror v-model="code" placeholder="cnf goes here..." :style="{ height: '400px' }"
                        :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions"
                        @ready="handleReady" @change="log('change', $event)" @focus="log('focus', $event)"
                        @blur="log('blur', $event)" />
                </div>
            </div>
            <div class = "right">
                <div class = "">
                    <h2>好空啊 (小黑猫融化 ing)</h2>
                    <div class="logo" style = "padding-bottom: 20px;">
                        <a-image :width="400" src="/1.png"/>
                    </div>

                    <div class="hyper-parameters-tcnum">
                        <text style="width: 150px; text-align: left;">测试用例数量:</text>
                        <a-row style = "padding-left: 20px;">
                            <a-col :span="12" style="width: 150px;"><a-slider v-model:value="testcase_num" :min="1" :max="500" /></a-col>
                            <a-col :span="4">
                                <a-input-number v-model:value="testcase_num" :min="1" :max="500" style="margin-left: 16px" />
                            </a-col>
                        </a-row>
                    </div>

                    <div class="hyper-parameters-tcnum" style = "padding-top: 10px;">
                        <text style="width: 150px; text-align: left;">或许是别的超参数:</text>
                        <a-row style = "padding-left: 20px;">
                            <a-col :span="12" style="width: 150px;"><a-slider v-model:value="hyper_parameter_1" :min="1" :max="500" /></a-col>
                            <a-col :span="4">
                                <a-input-number v-model:value="hyper_parameter_1" :min="1" :max="500" style="margin-left: 16px" />
                            </a-col>
                        </a-row>
                    </div>
                    
                    <div style="padding-top:30px;">
                        <a-button type="primary" shape="round"
                            style="height: 50px; width: 200px; font-size: 20px;" @click="Generation">开始生成</a-button>
                    </div>
                    
                </div>

            </div>
        </div>
        <div class = "down">
            <h2>测试用例</h2>
            <div class="buttons">
                <a-button @click="clean_tc"><DeleteOutlined />重置</a-button>
                <div style="padding-left: 20px;"><a-button @click="download_tc"><DownloadOutlined />下载</a-button></div>
                <div style="padding-left: 20px;"><a-radio-group :options="download_type_options" v-model:value="download_type"></a-radio-group></div>
            </div>
            <div style="width: 1200px; height: 200px;">
                <a-table :columns="columns" :data-source="data" 
                    :scroll="{ x: 1500 }" size="middle">
                    <template #action>
                        <a>删除</a>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
import { UploadOutlined, DownloadOutlined, SyncOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { message } from 'ant-design-vue'

import { test_api, generate_api, loadexample_api, downloadcnf_api, download_tc_xls, download_tc_csv } from "@/utils/api"

export default {
    name: "lssampling",
	components: {
        UploadOutlined, DownloadOutlined, SyncOutlined, DeleteOutlined, Codemirror,
        message,
    },
    data() {
		return {
            example: "None",
            code: ``,
            extensions: [javascript(), oneDark],
            view: null,
            testcase_num: 10,
            hyper_parameter_1: 100,

            download_type_options: [".xls", ".csv"],
            download_type: ".csv",

            data : [
                { index: 0, value: "Empty"}
            ],
            columns : [
                { title: '编号', width: 130, dataIndex: 'index', key: 'index', fixed: 'left'},
                { title: 'x0', dataIndex: 'value', key: '1', width: 100},
                { title: 'x1', dataIndex: 'value', key: '2', width: 100},
                { title: 'x2', dataIndex: 'value', key: '3', width: 100},
                { title: 'x3', dataIndex: 'value', key: '4', width: 100},
                { title: 'x4', dataIndex: 'value', key: '5', width: 100},
                { title: 'x5', dataIndex: 'value', key: '6', width: 100},
                { title: 'x6', dataIndex: 'value', key: '7', width: 100},
                { title: 'x7', dataIndex: 'value', key: '8', width: 100},
                { title: 'x8', dataIndex: 'value', key: '9', width: 100}
            ]
        }
    },
    methods: {
        handleReady(payload) {
            this.view = payload.view
        },
        getCodemirrorStates() {
            const state = this.view.state
            const ranges = state.selection.ranges
            const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
            const cursor = ranges[0].anchor
            const length = state.doc.length
            const lines = state.doc.lines
        },
        log(message) {
            console.log(message)
        },

        Generation() {
            console.log(this.code)
            // test_api({
            //     code: this.code
            // }).then((response) => {
            //     let ret = response.data
            //     console.log(ret)
            // }).catch(error => {
            //     console.error(error);
            // });

            generate_api({
                code: this.code,
                k: this.testcase_num,
            }).then((response) => {
                let ret = response.data
                this.columns = ret["columns"]
                this.data = ret["data"]
            }).catch(error => {
                console.error(error);
            });
        },

        clean_tc() {
            this.data = [
                { index: 0, value: "Empty"}
            ]
            this.columns = [
                { title: '编号', width: 130, dataIndex: 'index', key: 'index', fixed: 'left'},
                { title: 'x0', dataIndex: 'value', key: '1', width: 100},
                { title: 'x1', dataIndex: 'value', key: '2', width: 100},
                { title: 'x2', dataIndex: 'value', key: '3', width: 100},
                { title: 'x3', dataIndex: 'value', key: '4', width: 100},
                { title: 'x4', dataIndex: 'value', key: '5', width: 100},
                { title: 'x5', dataIndex: 'value', key: '6', width: 100},
                { title: 'x6', dataIndex: 'value', key: '7', width: 100},
                { title: 'x7', dataIndex: 'value', key: '8', width: 100},
                { title: 'x8', dataIndex: 'value', key: '9', width: 100}
            ]
        },

        clean_cnf () {
            this.code = ``
            this.example = "None"
        },

        handleChange () {
            console.log(this.example)
            if (this.example === "None")
                return

            loadexample_api({
                example_name: this.example
            }).then((response) => {
                this.code = response.data
            }).catch(error => {
                console.error(error);
            });
        },

        handleChangeFile(info) {
            if (info.file.status !== 'uploading')
                console.log(info.file, info.fileList)
            
            if (info.file.status === 'done')
                message.success(`${info.file.name} file uploaded successfully`)
            
            else if (info.file.status === 'error')
                message.error(`${info.file.name} file upload failed.`)
        },

        upload_back(feedback) {
            // console.log(feedback)
            this.code = feedback
        },

        download_cnf() { 
            const cnf_content = this.code
            downloadcnf_api({
                code : cnf_content
            }).then((response) => {
                const blob = new Blob([response.data], { type: "text/plain" })
                const downloadLink = document.createElement('a')
                downloadLink.href = window.URL.createObjectURL(blob)
                downloadLink.download = "cnffile.txt"
                downloadLink.click()

            }).catch(error => {
                message.error("下载失败")
            });
        },

        download_tc() {
            if (this.download_type === ".xls") {
                download_tc_xls({
                    data: this.data
                }).then((response) => {
                    const blob = new Blob([response.data], { type: "application/vnd.ms-excel" })
                    // 创建一个下载链接
                    const downloadLink = document.createElement('a')
                    downloadLink.href = window.URL.createObjectURL(blob)
                    downloadLink.download = "downloaded-file.xls" // 使用 .xls 扩展名
                    // 模拟用户点击链接以触发下载
                    downloadLink.click()
                }).catch(error => {
                    console.error(error);
                });
            }
            else if (this.download_type === ".csv") {
                download_tc_csv({
                    data: this.data
                }).then((response) => {
                    const blob = new Blob([response.data], { type: "text/plain" })
                    const downloadLink = document.createElement('a')
                    downloadLink.href = window.URL.createObjectURL(blob)
                    downloadLink.download = "testcases.csv"
                    downloadLink.click()
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }
}
</script>

<style scoped>
.lssampling {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 200px;
}

.up {
    display: flex;
    flex-direction: row;
    justify-content: start;
    /* width: 800px; */
    align-items: start;
}

.right {
    padding-left: 50px;
}

.left-up {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
}

.down {
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: start;
}

.left-down {
    /* display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start; */
    text-align: left !important;
    font-size: large !important;
}

.hyper-parameters-tcnum {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
}

.logo {

}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: start;
    padding-top: 5px;
    padding-bottom: 20px;
}

</style>
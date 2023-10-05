import request, {post} from '@/utils/http'

export function test_api(data){
    return request({
        url: 'api/test',
        method: 'post',
        data,
    })
}

export function get_testcases(data) {
    return request({
        url: 'api/get_testcases',
        method: 'post',
        data,
    })
}

export function download_testcases(data) {
    return request({
        url: 'api/download_testcases',
        method: 'post',
        data,
    })
}
import request, {post} from '@/utils/http'

export function test_api(data){
    return request({
        url: 'api/test',
        method: 'post',
        data,
    })
}
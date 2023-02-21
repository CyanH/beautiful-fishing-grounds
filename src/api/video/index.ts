import request from '@/utils/request';
// 视频
export function getSp() {
    return request({
      url: '/industrial/cyyVideo',
      method: 'get',
    });
}

// 监控 /industrial/cyyVideo
export function getJk() {
    return request({
      url: '/industrial/plantVideo',
      method: 'get'
    });
}

export function getJk_id(params: {plantWlwId: string}) {
    return request({
      url: '/industrial/plantVideo',
      method: 'get',
      params
    });
}

//萤石云开始控制
export function controlCamera(params:any) {
  return request({
    url: '/industrial/controlCamera',
    method: 'get',
    params
  })
}

//萤石云结束控制
export function stopCamera(params:any) {
  return request({
    url: '/industrial/stopCamera',
    method: 'get',
    params
  })
}
import request from '@/utils/request';

//萤石云开始控制
export function controlCamera(params: any) {
  return request({
    url: '/industrial/controlCamera',
    method: 'get',
    params,
  });
}

//萤石云结束控制
export function stopCamera(params: any) {
  return request({
    url: '/industrial/stopCamera',
    method: 'get',
    params,
  });
}

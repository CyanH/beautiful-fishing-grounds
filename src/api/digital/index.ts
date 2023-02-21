import request from '@/utils/request';

// 顶部指标
export function pondPageHome(params: { plantBaseId: string }) {
  return request({
    url: '/plant/pondPageHome',
    method: 'get',
    params,
  });
}

//养殖品种
export function plantBreed(params: { plantBaseId: string }) {
  return request({
    url: '/plant/plantBreed',
    method: 'get',
    params,
  });
}

//宣传视频
export function pondCyyVideo() {
  return request({
    url: '/plant/pondCyyVideo',
    method: 'get',
  });
}

//根据基地获取设备数据
export function wlwInfo(params: { plantBaseId: string }) {
  return request({
    url: '/plant/wlwInfo',
    method: 'get',
    params,
  });
}

import request from '@/utils/request';

export function getRealTime() {
  return request({
    url: 'plant/realTime',
    method: 'get',
  });
}

export function configRecords(params?: any) {
  return request({
    url: 'plant/configRecords',
    method: 'get',
    params,
  });
}

//qxz start
//气象站实时数据
export function weatherNewData(params: { plantWlwId: string }) {
  return request({
    url: 'plant/weatherNewData',
    method: 'get',
    params,
  });
}

//气象站历史数据
export function weatherHistory(plantWlwId: string, startDate: string, endDate: string) {
  return request({
    url: 'plant/weatherHistory?plantWlwId=' + plantWlwId + '&date=' + startDate + '&date=' + endDate,
    method: 'get',
  });
}

//水质实时数据
export function waterNewData(params: { plantWlwId: string }) {
  return request({
    url: 'plant/waterNewData',
    method: 'get',
    params,
  });
}

//水质历史数据
export function waterHistory(plantWlwId: string, startDate: string, endDate: string) {
  return request({
    url: 'plant/waterHistory?plantWlwId=' + plantWlwId + '&date=' + startDate + '&date=' + endDate,
    method: 'get',
  });
}

//摄像头信息
export function getVideoData(params: { plantWlwId: string }) {
  return request({
    url: 'plant/videoData',
    method: 'get',
    params,
  });
}

//一塘一码
//基本信息
export function pondMassifInfo(params: { id: string }) {
  return request({
    url: 'plant/pondMassifInfo',
    method: 'get',
    params,
  });
}

//养殖档案
export function pondGetYzda(params: { plantMassifId: string }) {
  return request({
    url: 'plant/pondGetYzda',
    method: 'get',
    params,
  });
}

//塘口预警
export function pondConfigRecords(params: { plantMassifId: string; size: number }) {
  return request({
    url: 'plant/pondConfigRecords',
    method: 'get',
    params,
  });
}

//塘口实况
export function pondVideo(params: { plantMassifId: string }) {
  return request({
    url: 'plant/pondVideo',
    method: 'get',
    params,
  });
}

//溯源批次
export function pondSyBatch(params: { plantMassifId: string }) {
  return request({
    url: 'plant/pondSyBatch',
    method: 'get',
    params,
  });
}

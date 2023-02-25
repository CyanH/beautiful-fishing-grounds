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

//获取基地所有设备
export function plantBaseAllWlw(params?: { plantBaseId: string }) {
  return request({
    url: 'plant/plantBaseAllWlw',
    method: 'get',
    params,
  });
}

//基地详情
export function getPlantBase(params?: any) {
  return request({
    url: 'plant/plantBase',
    method: 'get',
    params,
  });
}

//根据基地查生产情况
export function plantAnalyze(params: { id: number; info: string }) {
  return request({
    url: 'plant/plantAnalyze',
    method: 'get',
    params,
  });
}

//根据基地查气象数据
export function plantWeatherInfo(params: { info: string }) {
  return request({
    url: 'plant/plantWeatherInfo',
    method: 'get',
    params,
  });
}

//根据基地查水质数据
export function plantWaterInfo(params: { info: string }) {
  return request({
    url: 'plant/plantWaterInfo',
    method: 'get',
    params,
  });
}

//根据基地查摄像头
export function plantVideoInfo(params: { info: string }) {
  return request({
    url: 'plant/plantVideoInfo',
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

//养殖环境
export function pondWeatherData(params: { plantMassifId: string }) {
  return request({
    url: 'plant/pondWeatherData',
    method: 'get',
    params,
  });
}

//水质环境
export function pondWaterData(params: { plantMassifId: string }) {
  return request({
    url: 'plant/pondWaterData',
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

//近期疫病防护
export function pondEpidemicKnowledge(params: { plantMassifId: string }) {
  return request({
    url: 'plant/pondEpidemicKnowledge',
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

//投料机实时数据
export function baitNewData(params: { plantWlwId: string }) {
  return request({
    url: 'plant/baitNewData',
    method: 'get',
    params,
  });
}
//投料机实时数据
export function baitHistory(plantWlwId: string, startDate: string, endDate: string) {
  return request({
    url: 'plant/baitHistory?plantWlwId=' + plantWlwId + '&date=' + startDate + '&date=' + endDate,
    method: 'get',
  });
}

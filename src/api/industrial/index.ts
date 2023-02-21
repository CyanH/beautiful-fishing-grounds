import request from '@/utils/request';
import { dateType } from './types';

export function getCyyImplementationsInfo(params: { id: string }) {
  return request({
    url: 'industrial/cyyImplementationsInfo',
    method: 'get',
    params,
  });
}

// 种植基地详情
export function getPlantBaseInfo(params: { id: string }) {
  return request({
    url: 'industrial/plantBaseInfo',
    method: 'get',
    params,
  });
}

// 建设项目详情 industrial/cyyprojectManagementInfo
export function getCyyprojectManagementInfo(params: { id: string }) {
  return request({
    url: 'industrial/cyyprojectManagementInfo',
    method: 'get',
    params,
  });
}

//园区大事件
export function getCyyRecord(params?: { date: string }) {
  return request({
    url: 'industrial/cyyRecord',
    method: 'get',
    params,
  });
}

//left start
export function getCompanyNum(params: dateType) {
  return request({
    url: 'industrial/queryCyyCompanyNumManagement',
    method: 'get',
    params,
  });
}
export function getCzValue(params: dateType) {
  return request({
    url: 'industrial/queryCyyPvValueManagement',
    method: 'get',
    params,
  });
}
export function getLndnManagement(params: dateType) {
  return request({
    url: 'industrial/queryCyyLndnManagement',
    method: 'get',
    params,
  });
}
export function getCyyGrowthRecord(params: dateType) {
  return request({
    url: 'industrial/queryCyyGrowthRecord',
    method: 'get',
    params,
  });
}
export function getCyyXsManagement(params: dateType) {
  return request({
    url: 'industrial/queryCyyXsManagement',
    method: 'get',
    params,
  });
}
//left end

//right start
export function getBrandProduct() {
  return request({
    url: 'industrial/BrandProduct',
    method: 'get',
  });
}
export function getProjectType() {
  return request({
    url: 'industrial/getProjectType',
    method: 'get',
  });
}
export function getCompletionRate() {
  return request({
    url: 'industrial/CompletionRate',
    method: 'get',
  });
}
//right end

//实施主体
export function cyyImplementations() {
  return request({
    url: 'industrial/cyyImplementations',
    method: 'get',
  });
}
//种植基地
export function getPlantBase() {
  return request({
    url: 'industrial/plantBase',
    method: 'get',
  });
}
//建设项目
export function cyyprojectManagement(params?: { size: number }) {
  return request({
    url: 'industrial/cyyprojectManagement',
    method: 'get',
    params,
  });
}
//总体规划
export function cyyPlanMaster(params: { name: string }) {
  return request({
    url: 'industrial/cyyPlanMaster',
    method: 'get',
    params,
  });
}

//园内企业组成
export function getCyyClassIfy() {
  return request({
    url: 'industrial/cyyClassIfy',
    method: 'get',
  });
}

//养殖基地指标
export function plantBaseAll() {
  return request({
    url: 'industrial/plantBaseAll',
    method: 'get',
  });
}

//养殖规模
export function plantBaseBreeding(params: { id: number }) {
  return request({
    url: 'industrial/plantBaseBreeding',
    method: 'get',
    params,
  });
}

//养殖基地所有气象站实时数据
export function weatherNewDataAll() {
  return request({
    url: 'industrial/weatherNewDataAll',
    method: 'get',
  });
}

//养殖基地所有水质实时数据
export function waterNewDataAll() {
  return request({
    url: 'industrial/waterNewDataAll',
    method: 'get',
  });
}

//人均可支配收入
export function cyyLndnEcharts() {
  return request({
    url: 'industrial/cyyLndnEcharts',
    method: 'get',
  });
}

//企业联农带农效益分析
export function cyyImplLndn() {
  return request({
    url: 'industrial/cyyImplLndn',
    method: 'get',
  });
}

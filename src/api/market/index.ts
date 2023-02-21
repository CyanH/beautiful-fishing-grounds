import request from '@/utils/request';

// 在销产品
export function getonSaleProduct() {
  return request({
    url: 'bazaar/onSaleProduct',
    method: 'get',
  });
}

// 贸易订单
export function gettradeOrder() {
  return request({
    url: '/bazaar/tradeOrder',
    method: 'get',
  });
}

// 营销平台占比
export function getplatform() {
  return request({
    url: '/bazaar/platform',
    method: 'get',
  });
}

// 地区排行
export function getregion() {
  return request({
    url: '/bazaar/region',
    method: 'get',
  });
}

// 物流信息
export function getlogistics() {
  return request({
    url: '/bazaar/logistics',
    method: 'get',
  });
}

// 物流信息详情
export function getlogistics_Data(params: { id: string }) {
  return request({
    url: '/bazaar/logistics',
    method: 'get',
    params,
  });
}

// 物流信息详情
export function getWlInfo(params: { wlNum: string; code: string }) {
  return request({
    url: '/bazaar/getWlInfo',
    method: 'get',
    params,
  });
}

// 数据详情 /api/plantWlw/getMassifData
export function getMassif_Data(params: { productId: string }) {
  return request({
    // url: '/api/plantWlw/getMassifData',
    url: '/bazaar/marketingHomePage',
    method: 'get',
    params,
  });
}

// 物流公司详情 /api/cyyPlanMaster/getDictDetailByDict
export function getDictDetailByDict() {
  return request({
    url: '/bazaar/getDictDetailByDict?dictName=szyx_kd_type',
    method: 'get',
  });
}

export function getBrandProduct() {
  return request({
    url: 'industrial/BrandProduct',
    method: 'get',
  });
}

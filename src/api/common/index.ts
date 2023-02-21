import request from '@/utils/request';

export function getWeather(province: string, city: string, county: string) {
  return request({
    url: 'apiprocessing/weather?source=pc&province=' + province + '&city=' + city + '&county=' + county,
    method: 'post',
  });
}

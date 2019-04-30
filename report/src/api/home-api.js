/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import request from 'request'
// import {fetch, baseUrl} from 'config/index'
// 登录接口
export function getHealthData(userId) {
  return request({
    url: 'http://192.168.10.203:8100/basic/healthWeekly/selectByUserId?userId='+userId,
    method: 'post',
  })
}

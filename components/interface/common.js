import request from './request';
import qs from "qs";


/* common 接口 */
/* 获取  获取行政区域详情  commone */
export function getRegiondetail(data) {
    return request({
        url: '/common/api/v1/region/get_region_detail',
        method: 'post',
        data: data
    })
}

/* 获取 下级行政区域 */
export function getRegionsbyPid(data) {
    return request({
        url: '/common/api/v1/region/get_regions_by_pid',
        method: 'post',
        data: data
    })
}

/* 获取 获取行政区域路径 */
export function getregion_paths(data) {
    return request({
        url: '/common/api/v1/region/get_region_paths',
        method: 'post',
        data: data
    })
}
//获取验证码
export function PostlLogincode(data) {
  return request({
    url: '/common/api/v1/auth/get_login_captcha',
    method: 'post',
    data: data
  })
}


//列出用户登录选项
export function PostlLoginoptions(data) {
  return request({
    url: '/common/api/v1/auth/list_login_options',
    method: 'post',
    data: data
  })
}



//用户开始一级登录登
export function Postuserlogin(data) {
  return request({
    url: '/super/admin/api/v1/user/login',
    method: 'post',
    data: data
  })
}
// 2 /admin/api/v1/user/login
export function Postuserlogin2(data) {
  return request({
    url: '/admin/api/v1/user/login',
    method: 'post',
    data: data
  })
}
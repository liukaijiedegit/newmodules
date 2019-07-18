import request from './request';
import qs from "qs";


/* 资源管理  辅助服务器 接口 */
/* 获取  列出全部的辅助服务器   */
export function getassist_serverlist(data) {
    return request({
        url: '/super/admin/api/v1/resources_management/assist_server/list',
        method: 'post',
        data: data
    })
}


/* 资源管理  辅助服务器 接口 */
/* 
删除辅助服务器  */
export function getassist_serverdelete(data) {
    return request({
        url: '/super/admin/api/v1/resources_management/assist_server/delete',
        method: 'post',
        data: data
    })
}


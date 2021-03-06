import request from './request';
import qs from "qs";


/* Management 接口 */
/* 获取  新增应用升级信息   */
export function Managementadd_app_upgrade(data) {
    return request({
        url: '/super/admin/api/v1/app_upgrade_management/add_app_upgrade_info',
        method: 'post',
        data: data
    })
}


/* Management 接口 */
/* 
删除应用升级信息  */
export function Managementdelete_app_upgrade(data) {
    return request({
        url: '/super/admin/api/v1/app_upgrade_management/delete_app_upgrade_info',
        method: 'post',
        data: data
    })
}
/* Management 接口 */
/* 获取应用升级信息  */
export function Managementget_app_upgrade(data) {
    return request({
        url: '/super/admin/api/v1/app_upgrade_management/get_app_upgrade_info',
        method: 'post',
        data: data
    })
}

/* Management 接口 */
/* 列出应用升级信息  */
export function Managementlist_app_upgrade_infos(data) {
    return request({
        url: '/super/admin/api/v1/app_upgrade_management/list_app_upgrade_infos',
        method: 'post',
        data: data
    })
}

/* Management 接口 */
/* 修改应用升级信息  */
export function Managementmodify_app_upgrade_info(data) {
    return request({
        url: '/super/admin/api/v1/app_upgrade_management/modify_app_upgrade_info',
        method: 'post',
        data: data
    })
}

/* Management 接口 */
/* v  */
export function Managementset_app_upgrade_info_enabled(data) {
    return request({
        url: '/super/admin/api/v1/app_upgrade_management/set_app_upgrade_info_enabled',
        method: 'post',
        data: data
    })
}

/* Management 接口 */
/* 上传应用安装包  */
export function Managementupload_installation_package(data) {
    return request({
        url: '/super/admin/api/v1/app_upgrade_management/upload_installation_package',
        method: 'post',
        data: data
    })
}



/* H5升级页面 Upgrade 接口 */
/* 
新增H5升级信息  */
export function Upgradeadd_h5_upgrade_info(data) {
    return request({
        url: '/super/admin/api/v1/h5_upgrade_management/add_h5_upgrade_info',
        method: 'post',
        data: data
    })
}
/* H5升级页面 Upgrade 接口 */
/* 
删除H5升级信息  */
export function Upgradedelete_h5_upgrade_info(data) {
    return request({
        url: '/super/admin/api/v1/h5_upgrade_management/delete_h5_upgrade_info',
        method: 'post',
        data: data
    })
}
/* H5升级页面 Upgrade 接口 */
/* 
获取H5升级信息  */
export function Upgradeget_h5_upgrade_info(data) {
    return request({
        url: '/super/admin/api/v1/h5_upgrade_management/get_h5_upgrade_info',
        method: 'post',
        data: data
    })
}
/* H5升级页面 Upgrade 接口 */
/* 

列出H5升级信息  */
export function Upgradelist_h5_upgrade_infos(data) {
    return request({
        url: '/super/admin/api/v1/h5_upgrade_management/list_h5_upgrade_infos',
        method: 'post',
        data: data
    })
}
/* H5升级页面 Upgrade 接口 */
/* 

发布H5升级信息  */
export function Upgraderelease_h5_upgrade_info(data) {
    return request({
        url: '/super/admin/api/v1/h5_upgrade_management/release_h5_upgrade_info',
        method: 'post',
        data: data
    })
}
/* H5升级页面 Upgrade 接口 */
/* 

上传H5文件包  */
export function Upgradeupload_h5_package(data) {
    return request({
        url: '/super/admin/api/v1/h5_upgrade_management/upload_h5_package',
        method: 'post',
        data: data
    })
}

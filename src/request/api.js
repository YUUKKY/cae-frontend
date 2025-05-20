/**
 * api接口统一管理
 */
import {get} from "./axios";

// 数据详情
export const getUserData = data => get("v1/query?user_name=root", data);

// 获取总的浏览量
export const getTotalScanNum = data => get("v1/total_scan_num", data);
// 

//消耗CPU
export const consumeCpu = data => get("v1/consume_cpu", data);

// 新增订单队列API
import {get} from "./axios"

// 获取买卖订单队列
export const getOrderQueue = (params) => get("v1/order_queue", params)

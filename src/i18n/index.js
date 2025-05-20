import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    order: { id: 'Order ID', time: 'Time', quantity: 'Quantity', price: 'Price', status: 'Status' },
    mock: { start: 'Mock Data', cancel: 'Cancel Mock' },
    orderList: 'Order List',
    healthCheck: 'Health Check',
  },
  zh: {
    order: { id: '订单号', time: '时间', quantity: '数量', price: '价格', status: '状态' },
    mock: { start: '生成Mock数据', cancel: '取消Mock' },
    orderList: '订单队列',
    healthCheck: '服务健康检测',
  },
}

export default createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
})
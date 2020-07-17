import instance from '@/libs/api.request'
let axios = instance.axios8090

let axios1 = instance.axios8091


// 灌水模板列表
export const getWaterList = () => {
  return axios.request({
    url: 'water/get_water_template',
    method: 'post'
  })
}

// 获取模板内容
export const getWaterContent = (waterTemplateKey) => {
  const data = {
    waterTemplateKey
  }
  return axios.request({
    url: 'water/get_water_content',
    method: 'post',
    data: new URLSearchParams(data),
  })
}

// 灌水
export const save_water = (obj) => {
  // let obj
  // const data = {
  //   articleUrl,
  //   waterType,
  //   waterRate,
  //   waterFrequency,
  //   programId,
  //   List
  // }
  // let aa = 'http://10.0.117.182:8090/water/save_water?programId=395071&waterType=0&token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJvcmduYW1lIjoi54ix5piM5LmQIiwicm9sZWlkIjoiMSIsIm5pY2tuYW1lIjoi5byg5Lqa55S3IiwiaWQiOiIyNDkiLCJwcml2Ijoic3VwZXIiLCJhdmF0YXIiOiJodHRwOi8vY2h1YW5ncWkudGVzdC5xaWx1ZGV2LmNvbS9wdWJsaWMvdXBsb2FkL2ltYWdlLzEvMjAxOS8xMi8yNC8wMmJiNjcyNzNhOGU0ZTJiY2ZkZmUwYmEwNDZiNWU4NS5wbmciLCJ0aW1lIjoxNTk0Njk1MjQxLCJleHAiOjE1OTQ3MDI0NDMsImlhdCI6MTU5NDY5NDk0MSwib3JnaWQiOiIxIiwicGxhdGZvcm0iOiJjaHVhbmdxaSJ9.5PJQkEjxfGVAP_Mp0raQhFkNTchbYm8DpdNfHN1qDRI&waterRate=14400&waterFrequency=4&list=[{waterContent:"灌水内容2","waterTemplateKey":"a0874d4e38bf410f82fedea7e2ef3db3","orderNum":4},{"waterContent":"灌水内容1","waterTemplateKey":"a0874d4e38bf410f82fedea7e2ef3db3","orderNum":4},{"waterContent":"灌水内容4","waterTemplateKey":"a0874d4e38bf410f82fedea7e2ef3db3","orderNum":4},{"waterContent":"灌水内容3","waterTemplateKey":"a0874d4e38bf410f82fedea7e2ef3db3","orderNum":4}]'
  // let url = encodeURI(aa)
  return axios.request({
    url: "water/save_water",
    method: 'post',
    data: new URLSearchParams(obj),
  })
}

// 清除灌水评论
export const save_water_record = (obj) => {
  return axios.request({
    url: 'water/delete_water_template',
    method: 'post',
    data: new URLSearchParams(obj),
  })
}

// 删除灌水模板接口
export const deleteWaterTemplate = (obj) => {
  return axios.request({
    url: "water/delete_water_template",
    method: 'post',
    data: new URLSearchParams(obj),
  })
}

// 新增灌输模板
export const saveWaterTemplate = (obj) => {
  return axios.request({
    url: "water/save_water_template",
    method: 'post',
    data: new URLSearchParams(obj),
  })
}

// 新增灌水内容
export const saveWaterContent = (obj) => {
  return axios.request({
    url: "water/save_water_content",
    method: 'post',
    data: new URLSearchParams(obj),
  })
}

// 删除灌水内容
export const deleteWaterContent = (obj) => {
  return axios.request({
    url: "water/delete_water_content",
    method: 'post',
    data: new URLSearchParams(obj),
  })
}

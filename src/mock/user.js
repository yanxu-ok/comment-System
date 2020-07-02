import Mock from 'mockjs'
import {
  doCustomTimes
} from '@/libs/util'
const Random = Mock.Random

export const getMessageInit = () => {
  let unreadList = []
  doCustomTimes(3, () => {
    unreadList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  let readedList = []
  doCustomTimes(4, () => {
    readedList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  let trashList = []
  doCustomTimes(2, () => {
    trashList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  return {
    unread: unreadList,
    readed: readedList,
    trash: trashList
  }
}

export const hasRead = () => {
  return true
}

export const removeReaded = () => {
  return true
}

export const restoreTrash = () => {
  return true
}

export const messageCount = () => {
  return 3
}

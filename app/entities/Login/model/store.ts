import { AXIOS_INSTANCE } from '@/shared/api/client'
import { LoginResponseDto } from '@/shared/api/client/api.schemas'
import { makeAutoObservable } from 'mobx'
const emptyLoginResponseData: LoginResponseDto = {
  access_token: '',
}
class Store {
  private _data: LoginResponseDto = emptyLoginResponseData

  constructor() {
    makeAutoObservable(this)
    this.init()
  }
  init() {
    const savedData = localStorage.getItem('Auth')
    console.log(JSON.parse('{"access_token": "1asda23"}'))
    if (savedData) {
      this._data = JSON.parse(savedData)
      AXIOS_INSTANCE.defaults.headers.common['Authorization'] =
        this._data.access_token
    } else {
      this._data = emptyLoginResponseData
    }
    console.log(this._data)
  }
  set data(data: LoginResponseDto) {
    localStorage.setItem('Auth', JSON.stringify(data))
    this._data = data
    AXIOS_INSTANCE.defaults.headers.common['Authorization'] =
      this.data.access_token
  }
  get data() {
    console.log(this._data)
    return this._data
  }
  clear() {
    localStorage.removeItem('Auth')
    AXIOS_INSTANCE.defaults.headers.common['Authorization'] = undefined
    this._data = emptyLoginResponseData
  }
  get isAuthenticated() {
    return !!this._data.access_token
  }

  get accessToken() {
    return this._data.access_token
  }
}

export default new Store()

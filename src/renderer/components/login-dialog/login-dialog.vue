<template>
  <div class="login-dialog-wrapper">
    <div class="header">
      <div>
        <div class="title">登录<small></small></div>
      </div>
      <div class="close-icon" @click="hideLoginDialog">
        <i class="iconfont icon-guanbi"></i>
      </div>
    </div>
    <div class="main">
      <div class="login-tip">请使用网易云音乐账号进行登录</div>
      <div class="input-row-first">
        <el-input v-model="username" placeholder="手机号/邮箱" @keyup.enter.native="login">
          <i slot="prefix" class="el-input__icon iconfont icon-yonghu"></i>
        </el-input>
      </div>
      <div>
        <el-input v-model="password" type="password" placeholder="密码" @keyup.enter.native="login">
          <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
        </el-input>
      </div>
      <div class="error">{{errorMsg}}</div>
      <div class="button">
        <button :class="{disabled: logging}" @click="login">立即登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ERR_OK, DEFAULT_ERR_MSG, loginPhoneUrl, loginEmailUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { loginDialogVisibleMixin } from '@/common/js/mixin'
import * as types from '@/store/mutation-types'
import { mapMutations } from 'vuex'
let regEmail = new RegExp(
  '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
)
let regPhone = /^[1][3,4,5,7,8][0-9]{9}$/
export default {
  mixins: [loginDialogVisibleMixin],
  data() {
    return {
      username: '',
      password: '',
      errorMsg: '',
      logging: false
    }
  },
  methods: {
    login() {
      if (this.logging) {
        return
      }
      if (!this.username) {
        this.errorMsg = '请输入手机号或邮箱'
        return
      }
      if (!this.password) {
        this.errorMsg = '请输入密码'
        return
      }
      let url = ''
      let params = {}
      if (regEmail.test(this.username)) {
        url = loginEmailUrl
        params.email = this.username
      } else if (regPhone.test(this.username)) {
        url = loginPhoneUrl
        params.phone = this.username
      } else {
        this.errorMsg = '请输入正确的手机号或邮箱'
      }
      params.password = this.password
      this.logging = true
      httpGet(url, params)
        .then(res => {
          this.logging = false
          if (res.code === ERR_OK) {
            this.setUserInfo(res.profile)
            this.hideLoginDialog()
          }
        })
        .catch(err => {
          this.logging = false
          if (err && err.response.data.msg) {
            this.errorMsg = err.response.data.msg
          } else {
            this.errorMsg = DEFAULT_ERR_MSG
          }
        })
    },
    ...mapMutations({
      setUserInfo: types.SET_USER_INFO
    })
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$login-dialog-width: 320px;
$login-dialog-height: 380px;
$login-color: #31c27c;
$login-hover-color: #2fb876;
$login-disable-color: #3fed98;
.login-dialog-wrapper {
  position: fixed;
  left: 50%;
  top: 50%;
  width: $login-dialog-width;
  height: $login-dialog-height;
  border-top: 6px solid $color-text-highlight;
  background: $white-bg;
  color: $color-black;
  z-index: 9;
  transform: translate(-50%, -50%);
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    margin-bottom: -2px;
    border-bottom: 1px solid $color-text-eee;
    .title {
      padding: 10px 0;
      border-bottom: 2px solid $login-color;
      font-size: $font-size-large;
      color: $login-color;
    }
    .close-icon {
      padding: 10px 0;
      color: $color-text-hint;
      cursor: pointer;
      .iconfont {
        font-size: $font-size-small;
      }
    }
  }
  .main {
    padding: 50px 20px 20px 20px;
    .login-tip {
      margin-bottom: 10px;
      color: $color-text-hint;
    }
    .input-row-first {
      margin-bottom: 30px;
    }
    .error {
      min-height: 14px;
      margin: 10px 0 20px 0;
      text-align: right;
      color: $color-error;
    }
    .button {
      text-align: center;
      button {
        padding: 10px 40px;
        border: none;
        border-radius: 2px;
        font-size: $font-size-medium;
        color: $white-bg;
        background: $login-color;
        letter-spacing: 4px;
        cursor: pointer;
        &.disabled {
          background: $login-disable-color;
          pointer-events: none;
        }
        &:focus {
          outline: none;
        }
        &:hover {
          background: $login-hover-color;
        }
      }
    }
  }
}
</style>

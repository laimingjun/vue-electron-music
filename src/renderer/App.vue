<template>
  <div id="app">
    <m-menu></m-menu>
    <m-body @refresh="refresh">
      <router-view v-if="isRefresh"></router-view>
    </m-body>
    <player></player>
    <login-dialog v-if="loginDialogVisible"></login-dialog>
  </div>
</template>

<script>
import MMenu from '@/components/m-menu/m-menu'
import Player from '@/components/player/player'
import MBody from '@/components/m-body/m-body'
import LoginDialog from '@/components/login-dialog/login-dialog'
import { ERR_OK, loginStatusUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import * as types from '@/store/mutation-types'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'vue-electron-music',
  data() {
    return {
      isRefresh: true
    }
  },
  computed: {
    ...mapGetters(['loginDialogVisible'])
  },
  methods: {
    refresh() {
      this.isRefresh = false
      this.$nextTick(() => {
        this.isRefresh = true
      })
    },
    ...mapMutations({
      setUserInfo: types.SET_USER_INFO
    })
  },
  created() {
    httpGet(loginStatusUrl, {
      timestamp: new Date().getTime()
    }).then(res => {
      if (res.code === ERR_OK) {
        this.setUserInfo(res.profile)
      }
    })
  },
  components: {
    MMenu,
    Player,
    MBody,
    LoginDialog
  }
}
</script>

<style lang='scss'>
@import "scss/variable.scss";
@import "scss/common.scss";
#app {
  display: flex;
  width: 100%;
  height: 100%;
  font-size: $font-size-small;
}
</style>

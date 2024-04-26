<template>
  <div id="app">
    <div class="wrapper">
      <div class="facebook">
        <button class="facebook-login-btn" @click.prevent="loginFacebook">
          facebook
        </button>
        <ul>
          <li v-if="isLoggedIn">{{ user }}</li>
          <li v-if="isLoggedIn">
            <div v-for="post in postsFacebook" :key="post.id" class="post">
              <img v-if="post.full_picture" :src="post.full_picture" />
              <p v-if="post.description">{{ post.description }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="instagram">
        <button class="instagram-login-btn" @click.prevent="loginInstagram">
          instagram
        </button>
        <ul>
          <li v-if="isLoggedInInstagram">
            <div v-for="post in postsInstagram" :key="post.id" class="post">
              <img v-if="post.images" :src="post.images.thumbnail.url" />
              <p v-if="post.caption">{{ post.caption.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      isLoggedInInstagram: false,
      user: null,
      postsFacebook: [],
      postsInstagram: [],
    }
  },
  mounted() {
    window.fbAsyncInit = () => {
      if (typeof window.FB === 'undefined') return

      window.FB.init({
        appId: '1664478101039678',
        cookie: true,
        xfbml: true,
        version: 'v10.0', // <- fix the version to a valid one
      })
      window.FB.AppEvents.logPageView()
    }
    ;((d, s, id) => {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  },
  methods: {
    loginFacebook() {
      if (typeof window.FB === 'undefined') return
      window.FB.login(this.checkLoginState, {
        scope: 'public_profile,email,user_posts',
      })
    },
    checkLoginState(response) {
      this.statusChangeCallback(response)
    },
    statusChangeCallback(response) {
      console.log(response)
      if (response.status === 'connected') {
        this.isLoggedIn = true
        window.FB.api(
          '/me',
          {
            fields: 'id,name,email',
            access_token: response.authResponse.accessToken,
          },
          (data) => {
            this.user = data
          }
        )
        window.FB.api(
          '/me?fields=posts{description,full_picture}',
          { limit: 10, access_token: response.authResponse.accessToken },
          (data) => {
            console.log(data)
            this.postsFacebook = data.posts.data.filter(
              (item) => item.description || item.full_picture
            )
          }
        )
      } else {
        this.isLoggedIn = false
        this.user = null
      }
    },
    loginInstagram() {
      window.location.href =
        'https://api.instagram.com/oauth/authorize/?client_id=773337728107206&appsecret=d73fb062456e9ff67b314f315c95b1fd&redirect_uri=https://localhost:8080/inst-login-v2/callback&scope=user_profile,user_media&response_type=code'
    },
    statusChangeCallbackInstagram(response) {
      if (response.accessToken) {
        this.isLoggedInInstagram = true
        window.location.href = 'http://localhost:8080/#' + response.accessToken
      } else {
        this.isLoggedInInstagram = false
        this.user = null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.post {
  margin-bottom: 20px;
  img {
    width: 100%;
  }
}
</style>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style-type: none;
}
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  .facebook,
  .instagram {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
  }
  .facebook {
    background-color: #4267b2;
    .facebook-login-btn {
      background-color: #4267b2;
      color: white;
      border: 1px solid white;
      border-radius: 5px;
      padding: 10px;
    }
  }
  .instagram {
    background-color: #e1306c;
    .instagram-login-btn {
      background-color: #e1306c;
      color: white;
      border: 1px solid white;
      border-radius: 5px;
      padding: 10px;
    }
  }
}
</style>

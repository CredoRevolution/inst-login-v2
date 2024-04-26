<template>
  <div id="app" class="app">
    <button v-if="!authorised" class="login-button" @click.prevent="login">
      login
    </button>
    <div v-else class="authorized">
      <button class="get-posts-button" @click.prevent="getPosts">
        getPosts
      </button>
      <div class="inst-acc">
        <p>{{ instAcc.accUsername }}</p>
        <img
          :src="instAcc.accProfilePic"
          width="200"
          height="200"
          style="border-radius: 50%"
        />
      </div>
      <div v-if="posts.length" class="posts">
        <div v-for="post in posts" :key="post.id" class="post">
          <img :src="post.media_url" width="200" height="200" />
          <p>{{ post.caption }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let FB_INITIALIZED = false

const axios = require('axios')

export default {
  name: 'App',
  data() {
    return {
      authorised: false,
      posts: [],
      accessToken: '',
      instAcc: {
        accId: '',
        accUsername: '',
        accProfilePic: '',
      },
    }
  },
  methods: {
    login() {
      if (!FB_INITIALIZED) {
        console.warn('FB.init() must be called before FB.login()')
        return
      }
      FB.login(
        (facebookResponse) => {
          console.log('FB.login', facebookResponse)
          this.statusChangeCallback(facebookResponse)
        },
        {
          scope: 'public_profile,instagram_basic',
        }
      )
    },
    statusChangeCallback(facebookResponse) {
      if (facebookResponse.status === 'connected') {
        console.log('connected')
        // Logged into your app and Facebook.
        this.authorised = true
        this.accessToken = facebookResponse.authResponse.accessToken
      } else if (facebookResponse.status === 'not_authorized') {
        console.log('not_authorized')
        // The person is logged into Facebook, but not your app.
        this.authorised = false
      }
    },
    getPosts() {
      if (!this.authorised) {
        console.warn('login() must be called before getPosts()')
        return
      }
      axios
        .get(
          `https://graph.facebook.com/v19.0/me/accounts?fields=instagram_business_account{id,name,username,profile_picture_url}&access_token=${this.accessToken}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        .then((response) => {
          const instAcc = response.data.data[0].instagram_business_account
          this.instAcc.accId = instAcc.id
          this.instAcc.accUsername = instAcc.username
          this.instAcc.accProfilePic = instAcc.profile_picture_url
        })
        .catch((error) => {
          console.error(error)
        })

        .then(() => {
          axios
            .get(
              `https://graph.facebook.com/v19.0/${this.instAcc.accId}/media?fields=media_url,caption&access_token=${this.accessToken}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            .then((response) => {
              this.posts = response.data.data
            })
            .catch((error) => {
              console.error(error)
            })
        })
    },
  },
  mounted() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '1530852871068475',
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      })
      FB_INITIALIZED = true
      FB.AppEvents.logPageView()
    }
    ;(function (d, s, id) {
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
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.login-button {
  background: #3b5998;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
}

.authorized {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.get-posts-button {
  background: #3b5998;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
}

.posts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background: #fafafa;
  justify-content: center;
}

.post {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post img {
  border-radius: 3px;
}

.no-posts {
  text-align: center;
  padding: 10px;
  background: #fafafa;
  border: 1px solid #3b5998;
  border-radius: 3px;
}

.inst-acc {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  justify-content: center p {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }
}
</style>

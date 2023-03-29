<template>
    <section v-if="loadSimulator">
        <Navbar />
        <ContextMenu />
        <Extra />
    </section>
</template>

<script lang="ts">
import Navbar from '../components/Navbar/Navbar.vue'
import Extra from '../components/Extra.vue'
import ContextMenu from '../components/ContextMenu/ContextMenu.vue'

import { setup } from '../simulator/src/setup'
import { useAuthStore } from '#/store/SimulatorStore/state'

export default {
    name: 'Simulator',
    components: {
        Navbar,
        Extra,
        ContextMenu,
    },
    data() {
        return {
            loadSimulator: false,
        }
    },
    beforeCreate() {
        window.projectName = this.$route.params.projectId
        console.log(window.projectName)
        const authStore = useAuthStore()

        const mePromise = fetch('http://localhost:3001/api/v1/me', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data)
                authStore.setLoggedIn(true)
                window.loggedIn = true
                window.loggedInUserId = data.data.id
                authStore.setUser(data.data)
                if (data.data?.attributes?.locale)
                    this.$i18n.locale = data.data?.attributes?.locale
            })
            .catch((error) => console.error(error))

        const projectPromise = window.projectName
            ? fetch(
                  `http://localhost:3001/api/v1/projects/${window.projectName}`,
                  {
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  }
              )
                  .then((response) => response.json())
                  .then((data) => {
                      console.log(data.data)
                      authStore.setProject = data.data
                      window.projectAuthor =
                          data.data.relationships.author.data.id
                  })
                  .catch((error) => console.error(error))
            : Promise.resolve()

        Promise.all([mePromise, projectPromise]).then(() => {
            if (
                window.projectName &&
                window.loggedInUserId !== window.projectAuthor
            )
                document.body.innerHTML =
                    '<h3>you are not a author of the circuit. edit access denied</h3>'
            else {
                this.loadSimulator = true

                setTimeout(() => {
                    setup()
                }, 500)
            }
        })
    },
    // },
    // mounted() {
    //     console.log('setting up')
    //     setup()
    // },
}
</script>

<template>
    <ul class="nav navbar-nav noSelect pointerCursor pull-right account-btn">
        <li v-if="!isUserSignedIn" class="dropdown pull-right">
            <a class="navbar-nav signIn-btn user-field" href="/users/sign_in">
                {{ $t('simulator.nav.sign_in') }}
            </a>
        </li>
        <li v-else class="dropdown pull-right">
            <!-- When integrating with Project remove v-if from above li and also v-else as it is handled by backend -->
            <a
                href="#"
                class="cur-user acc-drop user-field"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                >{{ userName }}<span class="caret acc-caret"></span
            ></a>
            <DropDown
                :list-items="userData"
                drop-down-header="user_dropdown"
                drop-down-type="user"
            />
        </li>
    </ul>
</template>

<script lang="ts" setup>
import DropDown from '@/Dropdown/DropDown.vue'
import { useAuthStore } from '#/store/SimulatorStore/state'
import { computed } from '@vue/reactivity'

const authData = useAuthStore()

const userName = computed(() => {
    if (!props.isUserSignedIn) return
    else return authData.user.attributes.name
})

const props = defineProps({
    isUserSignedIn: { type: Boolean, default: false },
    userData: { type: Array, default: () => [] },
})
</script>

<style scoped>
/* @import url('./User.css'); */
</style>

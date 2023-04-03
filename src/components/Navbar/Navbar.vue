<template>
    <nav class="navbar navbar-expand-lg navbar-dark header">
        <Logo :cvlogo="navbarLogo" />
        <Hamburger v-if="showSidebar" />

        <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse">
            <NavbarLinks :navbar-data="navbarData" />

            <span
                id="projectName"
                class="projectName noSelect defaultCursor font-weight-bold"
            >
                Untitled
            </span>
            <a
                :href="oldSimLink"
                style="margin-right: 8rem"
                class="changeSimulator"
                >stable simulator</a
            >
            <User
                :is-user-signed-in="isUserSignedIn"
                :user-data="userDropdownItems"
            />
        </div>
    </nav>
    <QuickButton />
</template>

<script lang="ts" setup>
import QuickButton from '@/Navbar/QuickButton/QuickButton.vue'
import User from '@/Navbar/User/User.vue'
import NavbarLinks from '@/Navbar/NavbarLinks/NavbarLinks.vue'

import navbarData from '#/assets/constants/Navbar/NAVBAR_DATA'
import userDropdownItems from '#/assets/constants/Navbar/USER_DATA'

import Logo from '@/Logo/Logo.vue'
import Hamburger from '@/Navbar/Hamburger/Hamburger.vue'
import { ref, onMounted } from 'vue'
import { computed } from '@vue/reactivity'

const navbarLogo = ref('logo')
const minWidthToShowSidebar = ref(992)
// const isUserSignedIn = ref(false)
// const isUserSignedIn = authData.loggedIn
const showSidebar = ref(false)
const oldSimLink = ref('')

showSidebar.value =
    window.innerWidth < minWidthToShowSidebar.value ? true : false
onMounted(() => {
    window.addEventListener('resize', checkShowSidebar)
    setTimeout(() => {
        if (window.projectName)
            oldSimLink.value = `/simulator/edit/${window.projectName}`
        else oldSimLink.value = `/simulator`
    }, 1000)
})
const isUserSignedIn = computed(() => {
    return window.loggedIn
})
function checkShowSidebar() {
    showSidebar.value =
        window.innerWidth < minWidthToShowSidebar.value ? true : false
}
</script>

<style scoped>
@import './Navbar.css';
.changeSimulator {
    background-color: #71cc97;
    color: #000;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 10px;
    cursor: pointer;
}
</style>

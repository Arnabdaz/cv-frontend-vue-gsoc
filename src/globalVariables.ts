/*global ...*/
/*eslint no-undef: "error"*/

declare const window: any

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery

import Array from './simulator/src/arrayHelpers.js'
window.Array = Array

window.restrictedElements = []
window.globalScope = undefined
window.lightMode = false // To be deprecated
window.projectId = undefined
window.projectName = undefined
window.loggedIn = false
window.projectAuthor = null
window.loggedInUserId = undefined
window.id = undefined
window.loading = false // Flag - all assets are loaded

window.embed = false

window.width = undefined
window.height = undefined
window.DPR = window.devicePixelRatio || 1 // devicePixelRatio, 2 for retina displays, 1 for low resolution displays

window.elementHierarchy = []

window.circuitScopeID
window.CREATORMODE = {
    NORMAL: 0,
    SIMULATOR_POPUP: 1,
}
window.creatorMode = window.CREATORMODE.NORMAL

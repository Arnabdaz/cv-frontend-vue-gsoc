<template>
    <body style="font-family: sans-serif">
        <br /><br />
        <div class="container" style="position: relative">
            <h1 id="tb-creator-head" style="text-align: center">
                <b>Create Test</b>
            </h1>
            <div class="test-title">
                <div style="width: 20%; font-weight: bolder">Title:</div>
                <div id="test-title-label" contenteditable="true">Untitled</div>
            </div>
            <button
                id="seqSelect"
                class="tablink tablink-no-override"
                onclick="changeTestMode('seq') && addGroup();"
            >
                Sequential Test
            </button>
            <button
                id="combSelect"
                class="tablink tab-selected tablink-no-override"
                onclick="changeTestMode('comb') && addGroup();"
            >
                Combinational Test
            </button>
            <!-- Default table -->
            <table id="testBenchTable" class="tb-table label-table ui-sortable">
                <tr>
                    <th colspan="1"></th>
                    <th id="tb-inputs-head" colspan="0">
                        INPUTS<button
                            id="plus-1"
                            class="table-button"
                            onclick="addInput()"
                        >
                            +
                        </button>
                    </th>
                    <th id="tb-outputs-head" colspan="0">
                        OUTPUTS<button
                            id="plus-1"
                            class="table-button"
                            onclick="addOutput()"
                        >
                            +
                        </button>
                    </th>
                </tr>

                <tr>
                    <th>Label</th>
                </tr>
                <tr>
                    <td>Bitwidth</td>
                </tr>
            </table>
            <div id="dataGroup">
                <div id="data-group-1" class="data-group">
                    <h3 id="data-group-title-1" contenteditable="true">
                        Group 1
                    </h3>
                    <h5 class="data-group-info">
                        Click + to add tests to the group
                    </h5>
                    <table id="data-table-1" class="tb-table">
                        <tbody></tbody>
                    </table>
                    <button
                        id="plus-1"
                        class="lower-button plus-button latest-button"
                        onclick="addCase(0)"
                    >
                        +
                    </button>
                </div>
            </div>
            <div class="buttons-alignment" style="display: inline-flex">
                <button class="lower-button" onclick="addGroup()">
                    New Group
                </button>
            </div>
            <div
                style="float: right; display: inline-block"
                class="right-button-group"
            >
                <button class="lower-button" onclick="clickUpload();">
                    Import from CSV
                </button>
                <button class="lower-button" onclick="exportAsCSV();">
                    Export as CSV
                </button>
                <button
                    v-if="attachTest"
                    class="lower-button save-buton"
                    @click="attachingTest"
                >
                    Attach
                </button>
                <input
                    id="csvFileInput"
                    type="file"
                    accept=".csv"
                    onchange="importFromCSV()"
                    hidden
                />
            </div>
        </div>
    </body>
</template>

<script lang="ts">
// import { loadResult } from '#/src/simulator/testCreator.js'
import {
    loadResult,
    readOnlyUI,
    loadData,
    addInput,
    addOutput,
    makeSortable,
    saveData,
} from '../simulator/src/testCreator'
export default {
    data() {
        return {
            attachTest: false,
        }
    },
    mounted() {
        const scopeID = this.$route.query.scopeID
        const popUp = this.$route.query.popUp
        const data = this.$route.query.data
        const result = this.$route.query.result
        console.log('Mounted')
        console.log(scopeID, popUp, data, result)
        // const query = new URLSearchParams(window.location.search)
        if (popUp) {
            if (popUp) {
                window.creatorMode = window.CREATORMODE.SIMULATOR_POPUP
                // $('.right-button-group').append()
                this.attachTest = true
                console.log('lets see')
            }
        }
        if (data) {
            $('#tb-creator-head').html('<b>Edit Test</b>')
            window.circuitScopeID = scopeID
            loadData(data)
            return
        }

        if (result) {
            $('#tb-creator-head').html('<b>Test Result</b>')
            loadResult(result)
            readOnlyUI()
            return
        }

        window.circuitScopeID = scopeID
        addInput()
        addOutput()
        makeSortable()
    },
    methods: {
        attachingTest() {
            saveData()
        },
    },
}
</script>

<style scoped>
.tb-test-title {
    text-align: center;
    margin-top: 50px;
}

.lower-button {
    height: 40px;
    width: auto;
    min-width: 40px;
    background-color: #ffffff;
    border: 2px solid black;
    color: black;
    /*padding: 20px;*/
    text-align: center;
    text-decoration: none;
    display: inline-block;
    /*font-size: 16px;*/
    margin: 4px 2px;
    border-radius: 4px;
}

.table-button {
    height: 20px;
    width: 20px;
    background-color: #ffffff;
    border: 2px solid black;
    color: black;
    text-decoration: none;
    display: inline-block;
    margin: 4px 4px;
    padding: 0px;
    border-radius: 5px;
}

.plus-button {
    font-size: 25px;
}

.tb-minus {
    color: red;
}

.save-buton {
    background-color: #42b983;
    color: white;
    border: 1px solid gray;
    min-width: 70px;
}

.latest-button {
    float: left;
}

.buttons-alignment {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

.tablink {
    background-color: #555;
    color: white;
    float: left;
    border: 1px solid white;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
    width: 50%;
}

/* Change background color of buttons on hover */
.tablink:hover.tablink-no-override {
    background-color: #a5dfc5;
}

.tablink-hover-override {
}

.tablink.tab-selected {
    background-color: #42b983;
    color: #fff;
    outline: none;
}

.data-group {
    margin-top: 2%;
}

.tb-table {
    table-layout: fixed;
    width: 100%;
    height: 20px;
    border-spacing: 5px;
}

.tb-table th,
.tb-table td {
    border: 2px solid black;
    border-collapse: collapse;
    padding: 15px;
    text-align: center;
    transition: transform 0.2s;
}

.tb-table th {
    text-align: center;
}

.tb-table tr th:first-child,
tr td:first-child {
    width: 250px;
}

.label-table {
    margin-top: 100px;
}

.test-title {
    display: flex;
    width: 100%;
    font-size: 25px;
    margin-top: 20px;
    margin-bottom: 10px;
}

.test-title #test-title-label {
    width: 80%;
    border: 1px solid;
    border-radius: 5px;
}

.tb-handle {
    padding: 0px !important;
    border: 0px !important;
}

body {
    overflow: scroll;
}
</style>

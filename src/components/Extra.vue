<template>
    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- TabsBar -->
    <TabsBar />
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Verilog Code Editor -->
    <ExportVerilog />
    <div id="code-window" class="code-window">
        <textarea id="codeTextArea"></textarea>
    </div>
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Circuit Elements Panel -->
    <ElementsPanel />
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Layout Element Panel -->
    <div
        class="noSelect defaultCursor layoutElementPanel draggable-panel draggable-panel-css"
    >
        <div class="panel-header">
            Layout Elements
            <span class="fas fa-minus-square minimize"></span>
            <span class="fas fa-external-link-square-alt maximize"></span>
        </div>
        <div class="panel-body">
            <div class="search-results"></div>
            <div id="subcircuitMenu" class="accordion"></div>
        </div>
    </div>
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Timing Diagram Panel -->
    <div class="timing-diagram-panel draggable-panel">
        <!-- Timing Diagram Panel -->
        <div class="panel-header">
            Timing Diagram
            <span class="fas fa-minus-square minimize panel-button"></span>
            <span
                class="fas fa-external-link-square-alt maximize panel-button-icon"
            ></span>
        </div>
        <div class="panel-body">
            <div class="timing-diagram-toolbar noSelect">
                <button
                    class="custom-btn--primary panel-button"
                    title="Decrease Size"
                >
                    <span
                        class="fas fa-chevron-left timing-diagram-smaller panel-button-icon"
                    ></span>
                </button>
                <button
                    class="custom-btn--primary panel-button"
                    title="Increase Size"
                >
                    <span
                        class="fas fa-chevron-right timing-diagram-larger panel-button-icon"
                    ></span>
                </button>
                <button
                    class="custom-btn--primary panel-button"
                    title="Decrease Height"
                >
                    <span
                        class="fas fa-chevron-up timing-diagram-small-height panel-button-icon"
                    ></span>
                </button>
                <button
                    class="custom-btn--primary panel-button"
                    title="Increase Height"
                >
                    <span
                        class="fas fa-chevron-down timing-diagram-large-height panel-button-icon"
                    ></span>
                </button>
                <button
                    class="custom-btn--primary panel-button"
                    title="Download As Image"
                >
                    <span
                        class="fas fa-download timing-diagram-download"
                    ></span>
                </button>
                <button
                    class="custom-btn--tertiary panel-button"
                    title="Reset Timing Diagram"
                >
                    <span class="fas fa-undo timing-diagram-reset"></span>
                </button>
                <button
                    class="custom-btn--tertiary panel-button"
                    title="Autocalibrate Cycle Units"
                >
                    <span class="fas fa-magic timing-diagram-calibrate"></span>
                </button>
                <button
                    class="custom-btn--primary panel-button"
                    title="Zoom In"
                >
                    <span
                        class="fas fa-search-plus timing-diagram-zoom-in"
                    ></span>
                </button>
                <button
                    class="custom-btn--primary panel-button"
                    title="Zoom Out"
                >
                    <span
                        class="fas fa-search-minus timing-diagram-zoom-out"
                    ></span>
                </button>
                <button
                    class="custom-btn--primary panel-button"
                    title="Resume auto-scroll"
                >
                    <span class="fas fa-play timing-diagram-resume"></span>
                </button>
                <button
                    class="custom-btn--primary panel-button"
                    title="Pause auto-scroll"
                >
                    <span class="fas fa-pause timing-diagram-pause"></span>
                </button>
                1 cycle =
                <input
                    id="timing-diagram-units"
                    type="number"
                    min="1"
                    autocomplete="off"
                    value="1000"
                />
                Units
                <span id="timing-diagram-log"></span>
            </div>
            <div id="plot">
                <canvas id="plotArea"></canvas>
            </div>
        </div>
    </div>
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Testbench Panel -->
    <div class="testbench-manual-panel draggable-panel noSelect defaultCursor">
        <div class="panel-header">
            Testbench
            <span class="fas fa-minus-square minimize panel-button"></span>
            <span
                class="fas fa-external-link-square-alt maximize panel-button-icon"
            ></span>
        </div>
        <div class="panel-body tb-test-not-null tb-panel-hidden">
            <div class="tb-manual-test-data">
                <div style="margin-bottom: 10px; overflow: auto">
                    <span id="data-title" class="tb-data"
                        ><b>Test:</b> <span></span
                    ></span>
                    <span id="data-type" class="tb-data"
                        ><b>Type:</b> <span></span
                    ></span>
                </div>
                <button
                    id="edit-test-btn"
                    class="custom-btn--basic panel-button tb-dialog-button"
                >
                    Edit
                </button>
                <button
                    id="remove-test-btn"
                    class="custom-btn--tertiary panel-button tb-dialog-button"
                >
                    Remove
                </button>
            </div>
            <div style="overflow: auto; margin-bottom: 10px">
                <div class="tb-manual-test-buttons tb-group-buttons">
                    <span style="line-height: 24px; margin-right: 5px"
                        ><b>Group: </b></span
                    >
                    <button
                        id="prev-group-btn"
                        class="custom-btn--basic panel-button tb-case-button-left tb-case-button"
                    >
                        <i class="tb-case-arrow tb-case-arrow-left"></i>
                    </button>
                    <span class="tb-test-label group-label"></span>
                    <button
                        id="next-group-btn"
                        class="custom-btn--basic panel-button tb-case-button-right tb-case-button"
                    >
                        <i class="tb-case-arrow tb-case-arrow-right"></i>
                    </button>
                </div>
                <div class="tb-manual-test-buttons tb-case-buttons">
                    <span style="line-height: 24px; margin-right: 5px"
                        ><b>Case: </b></span
                    >
                    <button
                        id="prev-case-btn"
                        class="custom-btn--basic panel-button tb-case-button-left tb-case-button"
                    >
                        <i class="tb-case-arrow tb-case-arrow-left"></i>
                    </button>
                    <span class="tb-test-label case-label"></span>
                    <button
                        id="next-case-btn"
                        class="custom-btn--basic panel-button tb-case-button-right tb-case-button"
                    >
                        <i class="tb-case-arrow tb-case-arrow-right"></i>
                    </button>
                </div>
            </div>
            <div style="text-align: center">
                <table class="tb-manual-table">
                    <tr id="tb-manual-table-labels">
                        <th>LABELS</th>
                    </tr>
                    <tr id="tb-manual-table-bitwidths">
                        <td>Bitwidth</td>
                    </tr>
                    <tr id="tb-manual-table-current-case">
                        <td>Current Case</td>
                    </tr>
                    <tr id="tb-manual-table-test-result">
                        <td>Result</td>
                    </tr>
                </table>
            </div>
            <div style="display: table; margin-top: 20px; margin-left: 8px">
                <div class="testbench-manual-panel-buttons">
                    <button
                        id="validate-btn"
                        class="custom-btn--basic panel-button tb-dialog-button"
                    >
                        Validate
                    </button>
                    <button
                        id="runall-btn"
                        class="custom-btn--primary panel-button tb-dialog-button"
                    >
                        Run All
                    </button>
                </div>
                <span class="testbench-runall-label">
                    <span id="runall-summary">placeholder</span> Tests Passed
                    <span id="runall-detailed-link" style="color: #18a2cd"
                        >View Detailed</span
                    >
                </span>
            </div>
        </div>
        <div class="panel-body tb-test-null">
            <div class="tb-manual-test-data">
                <div style="margin-bottom: 10px; overflow: auto">
                    <p><i>No Test is attached to the current circuit</i></p>
                </div>
                <button
                    id="attach-test-btn"
                    class="custom-btn--primary panel-button tb-dialog-button"
                >
                    Attach Test
                </button>
            </div>
        </div>
    </div>
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Message Display -->
    <div id="MessageDiv"></div>
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Verilog Editor Panel -->
    <div
        id="verilogEditorPanel"
        class="noSelect defaultCursor draggable-panel draggable-panel-css"
    >
        <div class="panel-header">
            Verilog Module
            <span class="fas fa-minus-square minimize"></span>
            <span class="fas fa-external-link-square-alt maximize"></span>
        </div>

        <div class="panel-body">
            <div class="layout-body">
                <button
                    id="resetVerilogCode"
                    class="largeButton btn logixButton btn-xs custom-btn--tertiary"
                >
                    Reset Code
                </button>
                <button
                    id="saveVerilogCode"
                    class="largeButton btn logixButton btn-xs custom-btn--primary"
                >
                    Save Code
                </button>
                <div id="verilogOutput">
                    This is an experimental module. The code is not saved unless
                    the "Save Code" button is clicked.
                </div>
            </div>
        </div>

        <div class="panel-header text-center">Apply Themes</div>
        <div class="panel-body">
            <div class="layout-body">
                <div>
                    <p class="text-center mb-2">Select a theme:</p>
                    <select
                        id="selectVerilogTheme"
                        class="applyTheme"
                        style="width: 90%"
                    >
                        <optgroup label="Light Themes">
                            <option>default</option>
                            <option>solarized</option>
                            <option>elegant</option>
                            <option>neat</option>
                            <option>idea</option>
                            <option>neo</option>
                        </optgroup>
                        <optgroup label="Dark Themes">
                            <option>blackboard</option>
                            <option>cobalt</option>
                            <option>night</option>
                            <option>the-matrix</option>
                            <option>midnight</option>
                            <option>monokai</option>
                        </optgroup>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Element Properties Panel -->
    <PropertiesPanel />
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <CustomShortcut />
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Dialog Box - Save -->
    <SaveImage />
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Dialog Box - Custom Themes -->
    <!-- <div
        id="colorThemesDialog"
        class="customScroll colorThemesDialog"
        tabindex="0"
        style="display: none"
        title="Select Theme"
    ></div> -->
    <ApplyThemes />
    <div
        id="CustomColorThemesDialog"
        class="customScroll"
        tabindex="0"
        style="display: none"
        title="Custom Theme"
    ></div>
    <input
        id="importThemeFile"
        type="file"
        name="themeFile"
        style="display: none"
        multiple
    />
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Simulation Area - Canvas (3) + Help Section-->
    <div id="simulation" class="simulation">
        <!-- <div id="restrictedDiv" class="alert alert-danger display--none"></div> -->
        <div id="canvasArea" class="canvasArea">
            <canvas
                id="backgroundArea"
                style="
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 0;
                    width: 100%;
                    height: 100%;
                "
            ></canvas>
            <canvas
                id="simulationArea"
                style="
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                "
            ></canvas>
            <div id="miniMap">
                <canvas
                    id="miniMapArea"
                    style="position: absolute; left: 0; top: 0; z-index: 3"
                ></canvas>
            </div>

            <div id="Help"></div>
            <div
                class="sk-folding-cube loadingIcon"
                style="
                    display: none;
                    position: absolute;
                    right: 50%;
                    bottom: 50%;
                    z-index: 100;
                "
            >
                <div class="sk-cube1 sk-cube"></div>
                <div class="sk-cube2 sk-cube"></div>
                <div class="sk-cube4 sk-cube"></div>
                <div class="sk-cube3 sk-cube"></div>
            </div>
        </div>
    </div>
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Dialog Box - Combinational Analysis -->
    <CombinationalAnalysis />
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Dialog Box 1 - Testbench -->
    <div id="setTestbenchData" style="display: none" title="Create Test"></div>
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Dialog Box 2 - Testbench -->
    <div
        id="testbenchValidate"
        style="display: none"
        title="Testbench Validation"
    ></div>
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Dialog Box - Insert Subcircuit -->
    <InsertSubcircuit />
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!-- Dialog Box - Open Project -->
    <OpenOffline />
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- Dialog Box - Hex Bin Dec --------------------------------------------------------------------------------------------- -->
    <HexBinDec />
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!---issue reporting-system----->
    <div class="report-sidebar">
        <a
            type="button"
            class="btn btn-primary text-light"
            data-toggle="modal"
            data-target=".issue"
        >
            <span class="fa fa-bug"></span>&nbsp;&nbsp;Report an issue</a
        >
    </div>
    <!-- --------------------------------------------------------------------------------------------- -->

    <!-- --------------------------------------------------------------------------------------------- -->
    <!---MODAL - issue reporting system---->
    <div
        class="modal fade issue"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="container my-2">
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="container text-center">
                        <h4>Report an issue</h4>
                    </div>
                    <hr />
                    <div id="result" class="container my-2 text-center"></div>
                    <label id="report-label" style="font-weight: lighter"
                        ><b>Describe your issue:</b></label
                    >
                    <div class="form-group">
                        <textarea
                            id="issuetext"
                            class="form-control border-primary"
                            rows="3"
                        ></textarea>
                    </div>
                    <label
                        id="email-label"
                        for="emailtext"
                        style="font-weight: lighter"
                        ><b>Email</b><span> [Optional]</span>:</label
                    >
                    <div class="form-group">
                        <input
                            id="emailtext"
                            class="form-control border-primary"
                            type="email"
                            rows="3"
                        />
                    </div>
                    <div class="container">
                        <center>
                            <button
                                id="report"
                                type="submit"
                                class="btn btn-primary"
                            >
                                Report
                            </button>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- --------------------------------------------------------------------------------------------- -->
</template>

<script lang="ts" setup>
import ElementsPanel from './Panels/ElementsPanel/ElementsPanel.vue'
import PropertiesPanel from './Panels/PropertiesPanel/PropertiesPanel.vue'
import TabsBar from './TabsBar/TabsBar.vue'
import CombinationalAnalysis from './DialogBox/CombinationalAnalysis.vue'
import HexBinDec from './DialogBox/HexBinDec.vue'
import SaveImage from './DialogBox/SaveImage.vue'
import ApplyThemes from './DialogBox/Themes/ApplyThemes.vue'
import ExportVerilog from './DialogBox/ExportVerilog.vue'
import CustomShortcut from './DialogBox/CustomShortcut.vue'
import InsertSubcircuit from './DialogBox/InsertSubcircuit.vue'
import OpenOffline from './DialogBox/OpenOffline.vue'
</script>

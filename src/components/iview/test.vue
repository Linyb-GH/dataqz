
<template>
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                Left Pane
            </div>
            <div slot="right" class="demo-split-pane">
                Right Pane

            <!-- <Row>
                <Col span="12">
                    <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                </Col>
                <Col span="12">
                    <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                </Col>
            </Row> -->


            </div>
        </Split>
    </div>
</template>

<style>
    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>


<script>
  import '../../iview/index';

    export default {
        data () {
            return {
                split1: 0.5
            }
        }
    }
</script>



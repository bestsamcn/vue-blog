<style src="../assets/css/common/base.css"></style>
<template>
    <div class="hello">
        <h1 class="font-80"><span class="color-green">B</span>-log</h1>
    </div>
</template>

<script>
import * as R from '../api/index.js';
import Axios from 'axios';
export default {
    name: 'hello',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            gameParams:{
                channelId:'58be28f731e3f72717b58da1',
                pageIndex:1,
                pageSize:10,
                mode:2
            }
        }
    },
    methods:{
        doClick(){
            var that = this;
            R.getGameList(that.gameParams).then(res=>console.log(res))
        }
    }
}

</script>

<template>
    <div class="panel">
        <button @click="selectData">switch data</button>
    </div>
</template>
  
<script>
import * as THREE from 'three';

export default {
    name: 'DataPanel',
    mounted() {

    },
    methods: {
        selectData() {
            // this is supposed to switch to perspective view
        }   
    }
} 
</script>  

<style scoped>
.panel {
    position: absolute;
    top: 16px;
    background: #ccc;
    padding: 8px 16px;
    width: auto;
    border-radius: 4px;
    left: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    gap: 8px;
}
</style>

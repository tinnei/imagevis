<template>
    <div class="panel">
        <button @click="switchCamera">perspective</button>
        <button @click="switchDataBack">nav back</button>
        <button @click="switchDataForward">nav forward</button>
    </div>
</template>
  
<script>
import * as THREE from 'three';

export default {
    name: 'ControlPanel',
    mounted() {

    },
    methods: {
        switchCamera(camera) {
            // this is supposed to switch to perspective view
        },
        switchDataBack() {
            // this is supposed to move back to previous process
        },
        switchDataForward() {
            // this is supposed to move forward to next process
        }
    }
} 
</script>  

<style scoped>
.panel {
    position: absolute;
    bottom: 16px;
    background: #ccc;
    padding: 8px 16px;
    width: auto;
    border-radius: 4px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    gap: 8px;
}
</style>

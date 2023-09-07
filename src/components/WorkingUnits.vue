<script setup>
import { ref } from 'vue';
import { employeeId } from '../assets/appState';
import workingUnits from '../assets/getWorkUnits.json';

const activeItem = ref(-1);

function setActive(item) {
    employeeId.value = item;
    activeItem.value = item;
}
</script>

<template>
    <div>
        <div class="accordion" id="accordionExample">
            <div v-for="(unit, index) in workingUnits" :key="index" @click="setActive(index)" class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" :class="activeItem === index ? 'fw-bold' : ''" type="button"
                        data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="true"
                        aria-controls="collapseOne">
                        {{ unit.name }}
                    </button>
                </h2>
                <div :id="'collapse' + index" class="accordion-collapse collapse" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="d-flex justify-content-between col-2 w-100">
                            <div>Department:</div>
                            <div class="fst-italic">{{ unit.department }}</div>
                        </div>
                        <div class="d-flex justify-content-between col-2 w-100">
                            <div>Employee since:</div>
                            <div class="fst-italic">{{ unit.employeeSince }}</div>
                        </div>
                        <div class="d-flex justify-content-between col-2 w-100">
                            <div>Confidentiallity level:</div>
                            <div class="fst-italic">{{ unit.confidentiallityLevel }}</div>
                        </div>
                        <div class="d-flex justify-content-between col-2 w-100">
                            <div>Issued equipment:</div>
                            <div class="fst-italic">{{ unit.issuedEquipment }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
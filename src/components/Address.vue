<script setup>
import { ref, watch, onMounted } from 'vue';
import { employeeId, getPersonInfo, newAddress } from '../assets/appState';
import AddressModal from './AddressModal.vue';

let personInfo = [];
let employee = ref({});

onMounted(() => {
    getPersonInfo().then((data) => {
        personInfo = data;
        localStorage.setItem('personInfo', JSON.stringify(data));
        fetchData();
    });
});

watch(employeeId, (newValue) => setEmployee(newValue));

function fetchData() {
    personInfo = JSON.parse(localStorage.getItem('personInfo'));
    setEmployee(employeeId.value);
}

function setEmployee(id) {
    employee.value = personInfo[id];
}
</script>

<template>
    <h4 v-if="employee">{{ employee.name }}</h4>
    <div v-if="employee" class="d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-primary" @click="newAddress = true" data-bs-toggle="modal"
            data-bs-target="#addressModal">
            Add Address
        </button>
        <button type="button" class="btn btn-secondary" @click="newAddress = false" data-bs-toggle="modal"
            data-bs-target="#addressModal">
            Edit Address
        </button>
    </div>
    <table v-if="employee" class="table table-hover">
        <thead>
            <tr>
                <th scope="col">City</th>
                <th scope="col">Address</th>
                <th scope="col">Zip</th>
                <th scope="col">State</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ employee.city }}</td>
                <td>{{ employee.address }}</td>
                <td>{{ employee.zip }}</td>
                <td>{{ employee.state }}</td>
            </tr>
        </tbody>
    </table>
    <div v-if="!employee" class="fst-italic text-center">
        Select an employee from the panel on the left.
    </div>
    <AddressModal @reload-data="fetchData()" /></template>
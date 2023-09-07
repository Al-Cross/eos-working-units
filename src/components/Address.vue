<script setup>
import { computed, ref, watch } from 'vue';
import { employeeId } from '../assets/appState';
import getPersonInfo from '../assets/getPersonInfo.json';
let employee = ref({});

watch(employeeId, (newValue) => employee.value = getPersonInfo[newValue]);

const isEmployeeSelected = computed(() => {
    return Object.keys(employee.value).length > 0;
});
</script>

<template>
    <h4 v-if="isEmployeeSelected">{{ employee.name }}</h4>
    <table v-if="isEmployeeSelected" class="table table-hover">
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
    <div v-if="!isEmployeeSelected" class="fst-italic text-center">
        Select an employee from the panel on the left.
    </div>
</template>
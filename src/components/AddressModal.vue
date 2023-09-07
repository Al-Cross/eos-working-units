<script setup>
import { onMounted, ref, watch } from 'vue';
import { employeeId, newAddress } from '../assets/appState';

const emits = defineEmits(['reloadData']);

let personInfo = [];
const formData = ref({
    address: '',
    city: '',
    zip: '',
    state: ''
});
let employee = ref({});
const formErrors = ref(false);

onMounted(() => personInfo = JSON.parse(localStorage.getItem('personInfo')));

watch(employeeId, (newValue) => {
    employee.value = personInfo[newValue];
    if (!newAddress.value) {
        formData.value = employee.value;
    }
});

watch(newAddress, (newValue) => {
    formData.value = !newValue ? employee.value : {};
})

function persistAddress() {
    formErrors.value = Object.values(formData.value).some(field => field === '');
    let closeModal = document.getElementById('closeButton');
    if (!formErrors.value && !isFormEmpty()) {
        personInfo[employeeId.value] = { name: employee.value.name, ...formData.value };
        localStorage.setItem('personInfo', JSON.stringify(personInfo));
        emits('reloadData');
        closeModal.click();
    } else if (isFormEmpty()) {
        formErrors.value = true;
    }
}

function isFormEmpty() {
    return Object.keys(formData.value).length < 4;
}
</script>

<template>
    <div class="modal fade" id="addressModal" tabindex="-1" aria-labelledby="addressModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addressModalLabel">Employee Address</h5>
                    <button type="button" id="closeButton" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" :class="formErrors && !formData.address ? 'form-error' : ''" id="address" v-model="formData.address">
                        </div>
                        <div class="mb-3">
                            <label for="city" class="form-label">City</label>
                            <input type="text" class="form-control" :class="formErrors && !formData.city ? 'form-error' : ''" id="city" v-model="formData.city">
                        </div>
                        <div class="mb-3">
                            <label for="zip" class="form-label">ZIP</label>
                            <input type="text" class="form-control" :class="formErrors && !formData.zip ? 'form-error' : ''" id="zip" v-model="formData.zip">
                        </div>
                        <div class="mb-3">
                            <label for="state" class="form-label">State</label>
                            <input type="text" class="form-control" :class="formErrors && !formData.state ? 'form-error' : ''" id="state" v-model="formData.state">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="persistAddress()">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
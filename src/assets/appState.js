import { ref } from "vue";

export const employeeId = ref(-1);
export const newAddress = ref('');

export function getPersonInfo() {
    return fetch('/getPersonInfo.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
}
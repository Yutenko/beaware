import { writable } from 'svelte/store';
import certificate from "$lib/configs/certificate.config.json";


function createSystemCertificateStore(store) {
    const { subscribe, update, set } = writable(store);

    return {
        subscribe,
    }
}

const store = createSystemCertificateStore(certificate);
export default store;

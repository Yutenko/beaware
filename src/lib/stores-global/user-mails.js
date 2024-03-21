import { writable } from 'svelte/store';
import { categories } from '$components/apps/mail/constants';

function createUserMailsStore(store) {
    const { subscribe, update, set } = writable(store);

    return {
        subscribe,
    }
}

const mails = [
    {
        id: "a",
        from: "Christian Dietz",
        to: "masterofdesaster@beaware.be",
        subject: "Erinnerung",
        content:
            "Dies ist eine E-Mail, welche einen Eintrag von Christian Dietz erinnert wurde. anskjdnjkasnd kjsakjnd nsajknd kaskdnj sandknksa djknsaj dksan kdjnsan dkjasnjk nasknd jkasnd kjasndj naskjndj sandjknsa kdjnask ndsa",
        created: new Date().getTime(),
        read: false,
        category: categories.INBOX,
    },
    {
        id: "b",
        from: "Kurt Reber",
        to: "masterofdesaster@beaware.be",
        subject: "Degustation",
        content:
            "Wein Käse anskjdnjkasnd kjsakjnd nsajknd kaskdnj sandknksa djknsaj dksan kdjnsan dkjasnjk nasknd jkasnd kjasndj naskjndj sandjknsa kdjnask ndsa",
        created: new Date().getTime(),
        read: false,
        category: categories.INBOX,
    },
    {
        id: "c",
        from: "Oliver Ott",
        to: "masterofdesaster@beaware.be",
        subject: "Übernahme",
        content:
            "In Thailand und Asien überhaupt wurde anskjdnjkasnd kjsakjnd nsajknd kaskdnj sandknksa djknsaj dksan kdjnsan dkjasnjk nasknd jkasnd kjasndj naskjndj sandjknsa kdjnask ndsa",
        created: new Date().getTime(),
        read: false,
        category: categories.SPAM,
    }
]

const store = createUserMailsStore(mails);
export default store;

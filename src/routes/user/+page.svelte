<script>
    import { Browser, MailClient } from "$components";
    import { t } from "$lib/translations";

    const config = {
        startscreen: "http://localhost:5173/p/google",
        bookmarks:[],
        specialURLs: [
            {
                url: "http://localhost:5173/p/google",
                favicon: "/media/simulation/p/google/favicon.ico",
                title: $t("phishing.google.tabtitle"),
                displayname: "https://accounts.google.com/v3/signin/",
            },
            {
                url: "http://localhost:5173/p/microsoft",
                favicon: "/media/simulation/p/ms/favicon.ico",
                title: $t("phishing.ms.tabtitle"),
                displayname:
                    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            },
        ],
    };
</script>

<!-- HERE WOULD BE THE USER DESKTOP, ITS NOW ONLY FOR TESTING ISOLATED COMPONENTS -->
<Browser {config} />

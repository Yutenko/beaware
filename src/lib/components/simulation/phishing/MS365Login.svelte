<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { t } from "$lib/translations";

    let config = {
        logo: "/media/simulation/p/phlogo.png",
        banner: "/media/simulation/p/phbanner.png",
        redirect: "https://learningapps.org",
    };

    onMount(async () => {
        document.title = $t("phishing.ms.tabtitle");
        var link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }
        link.href = "/media/simulation/p/ms/favicon.ico";
    });

    let delay = 1000;
    let maxDelay = 2400;
    let minDelay = 800;
    let loading = false;
    let hasError = false;
    let step = {
        EMAIL: 0,
        PASSWORD: 1,
    };
    let currentStep = step.EMAIL;

    let email = "";
    let password = "";

    function changeToEmail() {
        hasError = false;
        currentStep = step.EMAIL;
    }

    function changeToPassword() {
        if (validateEmail(email)) {
            hasError = false;
            delay = Math.floor(
                Math.random() * (maxDelay - minDelay + 1) + minDelay,
            );
            toggleLoading();
            setTimeout(() => {
                currentStep = step.PASSWORD;
                toggleLoading();
            }, delay);
        } else {
            hasError = true;
        }
    }
    function toggleLoading() {
        loading = !loading;
    }
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    function login() {
        if (password.trim().length > 0) {
            alert("Andrè wurde gephished!");
        } else {
            hasError = true;
        }
    }
</script>

<div
    class="bg"
    style="background-image:url({currentStep === step.EMAIL
        ? '/media/simulation/p/ms/365background.svg'
        : config.banner})"
>
    {#if currentStep === step.PASSWORD}
        <div class="background-overlay"></div>
    {/if}
    <div class="center">
        <div class="sign-in-box relative">
            {#if loading}
                <progress class="absolute progress w-full top-0 left-0">
                </progress>
            {/if}
            <img
                class="logo"
                src={currentStep === step.EMAIL
                    ? "/media/simulation/p/ms/logo.svg"
                    : config.logo}
                alt="logo"
            />

            <!-- E-MAIL -->
            {#if currentStep === step.EMAIL}
                <div in:fade>
                    <div class="title mb-4">{$t("phishing.ms.signin")}</div>
                    {#if hasError}
                        <div class="error small-text">
                            {$t("phishing.ms.email_error_1")}
                            <a
                                class="link"
                                href="https://login.live.com/oauth20_authorize.srf?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&amp;scope=openid+profile+https%3a%2f%2fwww.office.com%2fv2%2fOfficeHome.All&amp;redirect_uri=https%3a%2f%2fwww.office.com%2flandingv2&amp;response_type=code+id_token&amp;state=usGTGt51ovmwqXOE40N9wTbq_nKCV6NDbnr46Z-NM6OObp3MBfaF3uscI-oeKe2_IPHil7jmm2FdsErJlH7-ScEQByKP_6OF9eSN1AkGzKVhJNL8V09Qj0UzVie5RaOTOC4_ZiTLb2dlOUQBxon9rMQ8EbI0fpwdzjXjavC3zcqAujgW_H2Pj6K7B4O2cZX4LYwYWx1P8CaMeJ9DJRTYQAEh8BD5-22wfEcFjfie7KMCSXcIa_EPf48YNQShlX_FmvvjWwPK_zc8iaPzCVGD0A&amp;response_mode=form_post&amp;nonce=638409012009214009.NjRkYjdkOGUtZTZlOS00ZjkzLTgxOTYtMTA0MmNlZjZmZDM4MTk4OGVhYmItNjdiMi00OTFhLWI0YTctZmUyNjhlMTk0ODgw&amp;x-client-SKU=ID_NET6_0&amp;x-client-Ver=6.34.0.0&amp;uaid=22b312be3c3b4452b9674f864afd3d92&amp;msproxy=1&amp;issuer=mso&amp;tenant=common&amp;ui_locales=de-DE&amp;signup=1&amp;lw=1&amp;fl=easi2&amp;epct=PAQABAAEAAAAmoFfGtYxvRrNriQdPKIZ--FNn-VSe6lhI5kUopn1ZSeWV04ywLuvvuJtTQ9bce2UT9JB9jBOk6M5HcGDU5np4fnxEDbnoNcNPRGLWeeoUZhWOlCEwMj0jc8Ws9KWRtxL-hbK3EiZInlBxJ7yP4zjY9sbnWdNqQBI3Tg2YylS1_JMKXWVDWXtf-xhI84NB8Fl9fCCHq-lICpBE54Y7_HAzNAcj3b9LZfHFRcawCm2gyyAA&amp;jshs=0"
                                >{$t("phishing.ms.email_error_2")}</a
                            >.
                        </div>
                    {/if}
                    <div class="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder={$t("phishing.ms.email_placeholder")}
                            class="input-text-box text-small"
                            bind:value={email}
                        />
                    </div>
                    <div class="mb-4 small-text">
                        {$t("phishing.ms.noaccount")}
                        <a
                            class="link"
                            href="https://login.live.com/oauth20_authorize.srf?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&amp;scope=openid+profile+https%3a%2f%2fwww.office.com%2fv2%2fOfficeHome.All&amp;redirect_uri=https%3a%2f%2fwww.office.com%2flandingv2&amp;response_type=code+id_token&amp;state=usGTGt51ovmwqXOE40N9wTbq_nKCV6NDbnr46Z-NM6OObp3MBfaF3uscI-oeKe2_IPHil7jmm2FdsErJlH7-ScEQByKP_6OF9eSN1AkGzKVhJNL8V09Qj0UzVie5RaOTOC4_ZiTLb2dlOUQBxon9rMQ8EbI0fpwdzjXjavC3zcqAujgW_H2Pj6K7B4O2cZX4LYwYWx1P8CaMeJ9DJRTYQAEh8BD5-22wfEcFjfie7KMCSXcIa_EPf48YNQShlX_FmvvjWwPK_zc8iaPzCVGD0A&amp;response_mode=form_post&amp;nonce=638409012009214009.NjRkYjdkOGUtZTZlOS00ZjkzLTgxOTYtMTA0MmNlZjZmZDM4MTk4OGVhYmItNjdiMi00OTFhLWI0YTctZmUyNjhlMTk0ODgw&amp;x-client-SKU=ID_NET6_0&amp;x-client-Ver=6.34.0.0&amp;uaid=22b312be3c3b4452b9674f864afd3d92&amp;msproxy=1&amp;issuer=mso&amp;tenant=common&amp;ui_locales=de-DE&amp;signup=1&amp;lw=1&amp;fl=easi2&amp;epct=PAQABAAEAAAAmoFfGtYxvRrNriQdPKIZ-XDhR9inqR4COOeaDZlf06Xv_TwhI2NOxGe_d84py1pjj2PMH4EaACUH0g_yCn8LOW5OxIZ02iM7izQ5Ex9maOmVa3pMxV4bf2UpAdxveBCSe_yi5mJ65DPaSt_jJNJH-lbhkgeVppYpGF-8gNThtp_siudPChJNhWFFNvnY8ZO6S_Vdx2lM1u6jbYqn9_ncoENOBtkTtsWq02vXRrFZa3SAA&amp;jshs=0"
                        >
                            {$t("phishing.ms.createone")}
                        </a>
                    </div>
                    <div class="mb-4 small-text">
                        <a
                            class="link"
                            href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=https%3A%2F%2Fwww.office.com%2Flandingv2&response_type=code%20id_token&scope=openid%20profile%20https%3A%2F%2Fwww.office.com%2Fv2%2FOfficeHome.All&response_mode=form_post&nonce=638409012009214009.NjRkYjdkOGUtZTZlOS00ZjkzLTgxOTYtMTA0MmNlZjZmZDM4MTk4OGVhYmItNjdiMi00OTFhLWI0YTctZmUyNjhlMTk0ODgw&ui_locales=de-DE&mkt=de-DE&client-request-id=22b312be-3c3b-4452-b967-4f864afd3d92&state=usGTGt51ovmwqXOE40N9wTbq_nKCV6NDbnr46Z-NM6OObp3MBfaF3uscI-oeKe2_IPHil7jmm2FdsErJlH7-ScEQByKP_6OF9eSN1AkGzKVhJNL8V09Qj0UzVie5RaOTOC4_ZiTLb2dlOUQBxon9rMQ8EbI0fpwdzjXjavC3zcqAujgW_H2Pj6K7B4O2cZX4LYwYWx1P8CaMeJ9DJRTYQAEh8BD5-22wfEcFjfie7KMCSXcIa_EPf48YNQShlX_FmvvjWwPK_zc8iaPzCVGD0A&x-client-SKU=ID_NET6_0&x-client-ver=6.34.0.0#"
                        >
                            {$t("phishing.ms.noaccess")}
                        </a>
                    </div>
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="mb-4 flex justify-end">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="win-button" on:click={changeToPassword}>
                            {$t("phishing.ms.next")}
                        </div>
                    </div>
                </div>
            {/if}

            {#if currentStep === step.PASSWORD}
                <!-- PASSWORD -->
                <div in:fade>
                    <div class="identity-banner">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <img
                            on:click={changeToEmail}
                            src="/media/simulation/p/ms/arrow-left.svg"
                            alt="arrow-left"
                            class="btn btn-ghost btn-circle btn-xs inline-block"
                        />
                        <span class="identity">{email}</span>
                    </div>
                    <div class="title mb-4">
                        {$t("phishing.ms.enterpassword")}
                    </div>
                    {#if hasError}
                        <div class="error small-text">
                            {$t("phishing.ms.password_error_1")}
                            <a
                                class="link"
                                href="https://passwordreset.microsoftonline.com/?ru=https%3a%2f%2flogin.microsoftonline.com%2fcommon%2freprocess%3fctx%3drQQIARAAhZHNa9NwAIabpk1rwbVMkB5Eehgoznw2adNCYV03Z2qSrS1LlnpK0l-atM2HSdq1wavgwcPAi3jw4EUYDGQykLGDN6F42EnEo8eBQ3ba0foXyAvv4bm9z5tJklgRox_AFEZUVxhQ1EFJJ1BKIw2UplgGZXu0hpYZAMrsIkW65C9nct_v4eTRcYI_PfJPqMLTr4fQXTMMvaCK4yFQ7QCzLd13A9cIMd218b77GYLOIegwvkJXNMBW9CJaYlSA0ozRQzVDAyhLkixZKZUrqq7_jGe36-PQpP6V61sRuIqnDV_t28AJ38LPwazpdRtciRsI-0ok2cKGOeTlFiFEQihumJbSIWjRbtq83LTEqB6JkUAqMkcKDS7gnHbEDdzpgpNCtLkvDhSSbzTD7l7b1aiWtW01Z1257em2NOhtjsa9LWmmyCKhypUx5xC1YxhZLLJdZw4vuR5wrF7B813DGoEfMPQLzjuW7mJBCCxHU3VzzTM14DuYbp4noIvE7TSUg_OJQuz-MpGsptOZXDafKsSuE9D75MLq2rffV6_OMmsfIgXR7nyKzZO4atOmubW-MwSd1iRqPSmak34jaIu70f6I4rhxV5accDUYdaTdGlslDxDkALk1R1JCp85jzc4fJP4yFTu98Z933mSgLzdj10unx6_fnZ28uHx8kX3ISBJurI5KyvSZ6Q7Vvck0oBk51CqPduqD4UTi5UAUdzfXebFe-5iL_QU1&amp;mkt=de-DE&amp;hosted=0&amp;device_platform=macOS"
                                >{$t("phishing.ms.password_error_2")}
                            </a>
                        </div>
                    {/if}
                    <div class="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder={$t("phishing.ms.password_placeholder")}
                            class="input-text-box text-small"
                            bind:value={password}
                        />
                    </div>
                    <div class="mb-4 small-text">
                        <a
                            class="link"
                            href="https://passwordreset.microsoftonline.com/?ru=https%3a%2f%2flogin.microsoftonline.com%2fcommon%2freprocess%3fctx%3drQQIARAAhZK_j9t0AMXj5C69i4A7HQi126liAEqSr792nPjKSSRxfjiO7fxwnNiL5fhHbMc_crFjpx6RQAwdTgwMlSokNm5CwABIIMR46tC5fwBDB9R26lKJAHPF8vSe3tvep3BAlDC8BErgwxwsgbP38CpRwfHKvIhBjSji5BwUa5hBFFGdxHYVrBKauj4pHP928sPtux-PqJ8X_Oe9V-dfXiGnVhStwrNyOUmSUmCatmaUtMAru6qv2_4ihj8hyGMEeZDd140i1brKhgRWwwEJUAgACVF8pyXOGS0lR1_ynUkkC7LLjwGQnWXaFxZbXpAiVqgD1uNc2ZE9mWJxVljifEe0JI-OOEe3WRsAXmhb_SkNJEGLZG9yj3Msd7cDPLVInmSP-PomsuA_Eqzt1HiRPTSDtaesgjB6kPsquwk7QieqoEHsJRczvoUDjkyE-YXiM02R4Ki5v8YJucixBM_PVxjbMNU2tgk1uhgYjAEVetC13arjebCth611z-1Wi2OtNWzcYwYKwbdJY8yh9WUnZUSrx_VrIiCHDpikom1URiov8E1ckW2hP4e6y0-GjW3gk2t2WGvNaWCuEj11Zo4aN7FUu6hvnMVU6cKBQzDVBs5DTZ7hfSmRplt0UGuqrNEjqd5IkIb1llVrUJUihInZ0tqOaRtVhm2OZxqtKq2Bidckbji23JnS9uLYmSYDRkm1mq0O0qbYoUD9KnfrNffG8Ptcfme8wL_OVYOV4dv66WodmLZrvA6JGJb5f1M38IxS3XUf7yFP9949yB_fvpk5zbz_Dtg_OzgoHB_dvHGaebmHfLO_I-7rD_789NtO-snD-w8vH90XMtf7ZdXDLavTGCyN8TBOhwxmxYtmOOImaeJCmt7IU9GP7oTuWJycV87Qyzxymc9f5w9pSuFaAqGAZ3nkixuZXw7_l90nb7xdKGxsxQ001TXCk_8Y_v3NzMu3fv3j-fXVj5_91X169JEGmN4YvWOL2zqzpTfdiSfBFfTnU6ncgz67QqVe2pXFGcVI598dZ_4G0&mkt=de-DE&hosted=0&device_platform=macOS"
                            >{$t("phishing.ms.forgotpassword")}
                        </a>
                    </div>
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="mb-4 flex justify-end">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="win-button" on:click={login}>
                            {$t("phishing.ms.login")}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
    <div
        class="ms-footer"
        style="color:{currentStep === step.EMAIL ? '#000' : '#fff'}"
    >
        <a href="https://www.microsoft.com/de-DE/servicesagreement/" class=""
            >{$t("phishing.ms.agreement")}
        </a>
        <a href="https://privacy.microsoft.com/de-DE/privacystatement" class=""
            >{$t("phishing.ms.privacystatement")}
        </a>
        <a
            href="https://www.microsoft.com/de-de/corporate/rechtliche-hinweise/impressum.aspx"
            class=""
            >{$t("phishing.ms.impress")}
        </a>
        <a
            href="/"
            on:click|preventDefault={() => {
                return false;
            }}
            aria-label={$t("phishing.ms.more")}
            aria-expanded="false"
            class=""
            >...
        </a>
    </div>
</div>

<style>
    @media only screen and (max-width: 600px) {
        .sign-in-box {
            margin-left: auto !important;
            margin-right: auto !important;
            position: relative;
            padding: 44px;
            margin-bottom: 28px;
            background-color: #fff;
            overflow: hidden;
            width: 100% !important;
            -webkit-box-shadow: inherit !important;
            -moz-box-shadow: inherit !important;
            box-shadow: inherit !important;
            min-width: inherit !important;
            min-height: inherit !important;
            max-width: 100% !important;
            height: 100% !important;
        }
        .center {
            display: block !important;
        }
    }
    .bg {
        background: #fff;
        position: fixed;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat, no-repeat;
        background-position:
            center center,
            center center;
        background-size: cover, cover;
    }
    .sign-in-box {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        max-width: 440px;
        width: calc(100% - 40px);
        padding: 44px;
        margin-bottom: 28px;
        background-color: #fff;
        -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        min-width: 320px;
        min-height: 338px;
        overflow: hidden;
    }
    .progress {
        --progress-color: #0067b8 !important;
        height: 1px !important;
    }
    .center {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .logo {
        max-height: 36px;
        vertical-align: middle;
        overflow-clip-margin: content-box;
        overflow: clip;
    }
    .title {
        line-height: 28px;
        font-weight: 300;
        line-height: 1.75rem;
        color: #1b1b1b;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 0;
        margin-top: 16px;
        margin-bottom: 12px;
        font-family: "Segoe UI", "Helvetica Neue", "Lucida Grande", "Roboto",
            "Ebrima", "Nirmala UI", "Gadugi", "Segoe Xbox Symbol",
            "Segoe UI Symbol", "Meiryo UI", "Khmer UI", "Tunga", "Lao UI",
            "Raavi", "Iskoola Pota", "Latha", "Leelawadee", "Microsoft YaHei UI",
            "Microsoft JhengHei UI", "Malgun Gothic", "Estrangelo Edessa",
            "Microsoft Himalaya", "Microsoft New Tai Lue", "Microsoft PhagsPa",
            "Microsoft Tai Le", "Microsoft Yi Baiti", "Mongolian Baiti",
            "MV Boli", "Myanmar Text", "Cambria Math";
    }
    .link {
        color: #0167b8;
        text-decoration: none;
    }
    .small-text {
        font-size: 0.8125rem;
    }
    input[type="email"],
    input[type="password"] {
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
        padding-left: 0;
    }
    .input-text-box {
        padding: 4px 8px;
        border-style: solid;
        border-width: 2px;
        border-color: rgba(0, 0, 0, 0.4);
        background-color: rgba(255, 255, 255, 0.4);
        height: 2rem;
        width: 100%;
        padding: 6px 10px;
        border-width: 1px;
        border-color: #666;
        border-color: rgba(0, 0, 0, 0.6);
        outline: none;
        border-radius: 0;
        -webkit-border-radius: 0;
        background-color: transparent;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
        padding-left: 0;
    }

    .input-text-box:focus {
        background-color: #fff;
        border-color: #0067b8;
        background-color: transparent;
    }

    .input-text-box:hover {
        border-color: #323232;
        border-color: rgba(0, 0, 0, 0.8);
    }
    .win-button {
        color: #fff;
        border-color: #0067b8;
        background-color: #0067b8;
        display: block;
        margin-top: 0;
        margin-bottom: 0;
        min-height: 32px;
        border: none;
        min-width: 108px;
        line-height: normal;
        padding: 6px 12px 4px 12px;
        position: relative;
        max-width: 100%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        touch-action: manipulation;
        cursor: pointer;
    }
    .error {
        color: #e81123;
    }
    .identity-banner {
        height: 24px;
        background: #fff;
        margin-top: 16px;
        margin-bottom: -4px;
    }
    .identity-banner .identity {
        line-height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ms-footer {
        position: absolute;
        right: 0;
        bottom: 0;
        color: rgba(0, 0, 0, 0.7);
        font-size: 13px;
    }
    .ms-footer a {
        color: inherit;
        font-size: 12px;
        line-height: 28px;
        white-space: nowrap;
        display: inline-block;
        margin-left: 8px;
        margin-right: 8px;
    }
    .background-overlay {
        background: rgba(0, 0, 0, 0.55);
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>

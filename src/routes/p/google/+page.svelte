<script>
    import { GoogleLogin } from "$components";

    const config = {
        isGoogle: true,
        logo: "/media/simulation/p/phlogo.png",
        banner: "/media/simulation/p/phbanner.png",
        redirect: "https://learningapps.org",
    };
</script>

<GoogleLogin {config} />

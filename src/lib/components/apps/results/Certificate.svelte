<script>
    import { globalStore } from "$components/global-store";
    import dayjs from "dayjs";
    import html2canvas from "html2canvas-pro";
    import { jsPDF } from "jspdf";
    import { t } from "$lib/translations";

    const { logo, coursename, note, signature } =
        $globalStore.config.certificate;

    const results = $globalStore.config.results;

    const username = "Christian Dietz";
    const today = dayjs().format("DD.MM.YYYY");

    function printIt() {
        html2canvas(document.getElementById("certificate")).then(
            function (canvas) {
                var doc = new jsPDF("p", "mm", "a4");
                doc.addImage(canvas, "JPEG", 0, 0, 210, 297);
                const pdfName = `${coursename}_${username}_${today}.pdf`;
                doc.save(pdfName);
            },
        );
    }
</script>

<button on:click={printIt} class="button absolute top-0">PDF</button>
<div class="page" id="certificate">
    <div class="wrapper">
        <div class="header">
            <img
                src={logo.path}
                alt="logo"
                style="width:{logo.width};float:{logo.position}"
            />
            <div style="float:{logo.position === 'right' ? 'left' : 'right'}">
                {today}
            </div>

            <div class="clear-both"></div>
        </div>

        <article>
            <div class="mt-[10mm] text-center">
                <div class="text-3xl font-bold">
                    {$t("results.certificate.title")}
                </div>
                <div class="mt-[10mm]">
                    <div class="text-lg italic">{username}</div>
                    <div class="text-md">
                        {$t("results.certificate.hasTheCourse")}
                    </div>
                    <div class="text-md">{coursename}</div>
                    <div class="text-md">
                        %PREDICATE% {$t("results.certificate.completed")}
                    </div>
                </div>
            </div>

            <div class="mt-[10mm]">{note}</div>
        </article>

        <div class="footer">
            <div class="text-md">{@html signature.organisation}</div>
            <div class="text-md">{@html signature.name}</div>
            <div class="text-md">{@html signature.role}</div>
            <img src={signature.path} alt="signature" />
        </div>
    </div>
</div>

<style>
    .wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .header {
        min-height: 50px;
    }
    article {
        flex: 1;
    }
    .footer {
        min-height: 50px;
    }
    @page {
        size: A4 portrait;
        margin: 0;
    }

    .page {
        display: inline-block;
        position: relative;
        height: 297mm;
        width: 210mm;
        font-size: 12pt;
        margin: 2em auto;
        padding: calc(0.5cm + 1cm);
        box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
        background: white;
    }

    @media screen {
        .page::after {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            width: calc(100% - 0.5cm * 2);
            height: calc(100% - 0.5cm * 2);
            margin: 0.5cm;
            outline: thin dashed black;
            pointer-events: none;
            z-index: 9999;
        }
    }

    @media print {
        .page {
            margin: 0;
            overflow: hidden;
        }
    }
</style>

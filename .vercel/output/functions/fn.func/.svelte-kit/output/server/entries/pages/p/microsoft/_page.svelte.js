import { c as create_ssr_component, e as escape, a as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/MS365Login.svelte_svelte_type_style_lang.js";
import { e as t } from "../../../../chunks/index2.js";
import "devalue";
import "../../../../chunks/client.js";
import "@editorjs/header";
import "@editorjs/quote";
import "@editorjs/warning";
import "@editorjs/paragraph";
import "@editorjs/delimiter";
import "@editorjs/list";
import "@editorjs/table";
import "@editorjs/marker";
import "dayjs";
import { s as subscribe } from "../../../../chunks/hooks.server.js";
const css = {
  code: '@media only screen and (max-width: 600px){.sign-in-box.svelte-itq7to.svelte-itq7to{margin-left:auto !important;margin-right:auto !important;position:relative;padding:44px;margin-bottom:28px;background-color:#fff;overflow:hidden;width:100% !important;box-shadow:inherit !important;min-width:inherit !important;min-height:inherit !important;max-width:100% !important;height:100% !important}.center.svelte-itq7to.svelte-itq7to{display:block !important}}.bg.svelte-itq7to.svelte-itq7to{background:#fff;position:fixed;width:100%;height:100%;background-repeat:no-repeat, no-repeat;background-position:center center,\n            center center;background-size:cover, cover}.sign-in-box.svelte-itq7to.svelte-itq7to{margin-left:auto;margin-right:auto;position:relative;max-width:440px;width:calc(100% - 40px);padding:44px;margin-bottom:28px;background-color:#fff;box-shadow:0 2px 6px rgba(0, 0, 0, 0.2);min-width:320px;min-height:338px;overflow:hidden}.progress.svelte-itq7to.svelte-itq7to{--progress-color:#0067b8 !important;height:1px !important}.center.svelte-itq7to.svelte-itq7to{display:flex;align-items:center;justify-content:center;height:100%}.logo.svelte-itq7to.svelte-itq7to{max-height:36px;vertical-align:middle;overflow-clip-margin:content-box;overflow:clip}.title.svelte-itq7to.svelte-itq7to{line-height:28px;line-height:1.75rem;color:#1b1b1b;font-size:1.5rem;font-weight:600;padding:0;margin-top:16px;margin-bottom:12px;font-family:"Segoe UI", "Helvetica Neue", "Lucida Grande", "Roboto",\n            "Ebrima", "Nirmala UI", "Gadugi", "Segoe Xbox Symbol",\n            "Segoe UI Symbol", "Meiryo UI", "Khmer UI", "Tunga", "Lao UI",\n            "Raavi", "Iskoola Pota", "Latha", "Leelawadee", "Microsoft YaHei UI",\n            "Microsoft JhengHei UI", "Malgun Gothic", "Estrangelo Edessa",\n            "Microsoft Himalaya", "Microsoft New Tai Lue", "Microsoft PhagsPa",\n            "Microsoft Tai Le", "Microsoft Yi Baiti", "Mongolian Baiti",\n            "MV Boli", "Myanmar Text", "Cambria Math"}.link.svelte-itq7to.svelte-itq7to{color:#0167b8;text-decoration:none}.small-text.svelte-itq7to.svelte-itq7to{font-size:0.8125rem}input[type="email"].svelte-itq7to.svelte-itq7to,input[type="password"].svelte-itq7to.svelte-itq7to{border-top-width:0;border-left-width:0;border-right-width:0;padding-left:0}.input-text-box.svelte-itq7to.svelte-itq7to{padding:4px 8px;border-style:solid;border-color:rgba(0, 0, 0, 0.4);background-color:rgba(255, 255, 255, 0.4);height:2rem;width:100%;padding:6px 10px;border-width:1px;border-color:#666;border-color:rgba(0, 0, 0, 0.6);outline:none;border-radius:0;-webkit-border-radius:0;background-color:transparent;border-top-width:0;border-left-width:0;border-right-width:0;padding-left:0}.input-text-box.svelte-itq7to.svelte-itq7to:focus{background-color:#fff;border-color:#0067b8;background-color:transparent}.input-text-box.svelte-itq7to.svelte-itq7to:hover{border-color:#323232;border-color:rgba(0, 0, 0, 0.8)}.win-button.svelte-itq7to.svelte-itq7to{color:#fff;border-color:#0067b8;background-color:#0067b8;display:block;margin-top:0;margin-bottom:0;min-height:32px;border:none;min-width:108px;line-height:normal;padding:6px 12px 4px 12px;position:relative;max-width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;touch-action:manipulation;cursor:pointer}.error.svelte-itq7to.svelte-itq7to{color:#e81123}.identity-banner.svelte-itq7to.svelte-itq7to{height:24px;background:#fff;margin-top:16px;margin-bottom:-4px}.identity-banner.svelte-itq7to .identity.svelte-itq7to{line-height:24px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ms-footer.svelte-itq7to.svelte-itq7to{position:absolute;right:0;bottom:0;color:rgba(0, 0, 0, 0.7);font-size:13px}.ms-footer.svelte-itq7to a.svelte-itq7to{color:inherit;font-size:12px;line-height:28px;white-space:nowrap;display:inline-block;margin-left:8px;margin-right:8px}.background-overlay.svelte-itq7to.svelte-itq7to{background:rgba(0, 0, 0, 0.55);position:absolute;top:0;width:100%;height:100%}',
  map: null
};
const MS365Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { config = {} } = $$props;
  let email = "";
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  $$result.css.add(css);
  $$unsubscribe_t();
  return `<div class="bg svelte-itq7to" style="${"background-image:url(" + escape(
    "/media/simulation/p/ms/365background.svg",
    true
  ) + ")"}">${``} <div class="center svelte-itq7to"><div class="sign-in-box relative svelte-itq7to">${``} <img class="logo svelte-itq7to"${add_attribute(
    "src",
    "/media/simulation/p/ms/logo.svg",
    0
  )} alt="logo">  ${`<div><div class="title mb-4 svelte-itq7to">${escape($t("phishing.ms.signin"))}</div> ${``} <div class="mb-4"><input type="email" name="email"${add_attribute("placeholder", $t("phishing.ms.email_placeholder"), 0)} class="input-text-box text-small svelte-itq7to"${add_attribute("value", email, 0)}></div> <div class="mb-4 small-text svelte-itq7to">${escape($t("phishing.ms.noaccount"))} <a class="link svelte-itq7to" href="https://login.live.com/oauth20_authorize.srf?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&scope=openid+profile+https%3a%2f%2fwww.office.com%2fv2%2fOfficeHome.All&redirect_uri=https%3a%2f%2fwww.office.com%2flandingv2&response_type=code+id_token&state=usGTGt51ovmwqXOE40N9wTbq_nKCV6NDbnr46Z-NM6OObp3MBfaF3uscI-oeKe2_IPHil7jmm2FdsErJlH7-ScEQByKP_6OF9eSN1AkGzKVhJNL8V09Qj0UzVie5RaOTOC4_ZiTLb2dlOUQBxon9rMQ8EbI0fpwdzjXjavC3zcqAujgW_H2Pj6K7B4O2cZX4LYwYWx1P8CaMeJ9DJRTYQAEh8BD5-22wfEcFjfie7KMCSXcIa_EPf48YNQShlX_FmvvjWwPK_zc8iaPzCVGD0A&response_mode=form_post&nonce=638409012009214009.NjRkYjdkOGUtZTZlOS00ZjkzLTgxOTYtMTA0MmNlZjZmZDM4MTk4OGVhYmItNjdiMi00OTFhLWI0YTctZmUyNjhlMTk0ODgw&x-client-SKU=ID_NET6_0&x-client-Ver=6.34.0.0&uaid=22b312be3c3b4452b9674f864afd3d92&msproxy=1&issuer=mso&tenant=common&ui_locales=de-DE&signup=1&lw=1&fl=easi2&epct=PAQABAAEAAAAmoFfGtYxvRrNriQdPKIZ-XDhR9inqR4COOeaDZlf06Xv_TwhI2NOxGe_d84py1pjj2PMH4EaACUH0g_yCn8LOW5OxIZ02iM7izQ5Ex9maOmVa3pMxV4bf2UpAdxveBCSe_yi5mJ65DPaSt_jJNJH-lbhkgeVppYpGF-8gNThtp_siudPChJNhWFFNvnY8ZO6S_Vdx2lM1u6jbYqn9_ncoENOBtkTtsWq02vXRrFZa3SAA&jshs=0">${escape($t("phishing.ms.createone"))}</a></div> <div class="mb-4 small-text svelte-itq7to"><a class="link svelte-itq7to" href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=https%3A%2F%2Fwww.office.com%2Flandingv2&response_type=code%20id_token&scope=openid%20profile%20https%3A%2F%2Fwww.office.com%2Fv2%2FOfficeHome.All&response_mode=form_post&nonce=638409012009214009.NjRkYjdkOGUtZTZlOS00ZjkzLTgxOTYtMTA0MmNlZjZmZDM4MTk4OGVhYmItNjdiMi00OTFhLWI0YTctZmUyNjhlMTk0ODgw&ui_locales=de-DE&mkt=de-DE&client-request-id=22b312be-3c3b-4452-b967-4f864afd3d92&state=usGTGt51ovmwqXOE40N9wTbq_nKCV6NDbnr46Z-NM6OObp3MBfaF3uscI-oeKe2_IPHil7jmm2FdsErJlH7-ScEQByKP_6OF9eSN1AkGzKVhJNL8V09Qj0UzVie5RaOTOC4_ZiTLb2dlOUQBxon9rMQ8EbI0fpwdzjXjavC3zcqAujgW_H2Pj6K7B4O2cZX4LYwYWx1P8CaMeJ9DJRTYQAEh8BD5-22wfEcFjfie7KMCSXcIa_EPf48YNQShlX_FmvvjWwPK_zc8iaPzCVGD0A&x-client-SKU=ID_NET6_0&x-client-ver=6.34.0.0#">${escape($t("phishing.ms.noaccess"))}</a></div>  <div class="mb-4 flex justify-end"> <div class="win-button svelte-itq7to">${escape($t("phishing.ms.next"))}</div></div></div>`} ${``}</div></div> <div class="ms-footer svelte-itq7to" style="${"color:" + escape("#000", true)}"><a href="https://www.microsoft.com/de-DE/servicesagreement/" class=" svelte-itq7to">${escape($t("phishing.ms.agreement"))}</a> <a href="https://privacy.microsoft.com/de-DE/privacystatement" class=" svelte-itq7to">${escape($t("phishing.ms.privacystatement"))}</a> <a href="https://www.microsoft.com/de-de/corporate/rechtliche-hinweise/impressum.aspx" class=" svelte-itq7to">${escape($t("phishing.ms.impress"))}</a> <a href="/"${add_attribute("aria-label", $t("phishing.ms.more"), 0)} aria-expanded="false" class=" svelte-itq7to">...</a></div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const config = {
    isMicrosoft: true,
    logo: "/media/simulation/p/phlogo.png",
    banner: "/media/simulation/p/phbanner.png",
    redirect: "https://learningapps.org"
  };
  return `${validate_component(MS365Login, "MS365Login").$$render($$result, { config }, {}, {})}`;
});
export {
  Page as default
};

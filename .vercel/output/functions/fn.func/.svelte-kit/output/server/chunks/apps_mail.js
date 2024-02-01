const categories = {
  "0": "Posteingang",
  "1": "Spam",
  "2": "Entwürfe",
  "3": "Papierkorb"
};
const badges = {
  "new": "neu"
};
const search = "Suche";
const to = "An";
const empty = {
  "0": "Du hast keine Emails im Posteingang.",
  "1": "Hurra, kein Spam",
  "2": "Noch keine Entwürfe vorhanden.",
  "3": "Dein Papierkorb ist leer"
};
const noSearchResults = "Keine Einträge gefunden.";
const apps_mail = {
  categories,
  badges,
  search,
  to,
  empty,
  noSearchResults
};
export {
  badges,
  categories,
  apps_mail as default,
  empty,
  noSearchResults,
  search,
  to
};

const quiz = "Quiz";
const deletePermanent = "Endgültig löschen";
const deleteDescription = "Möchtest Du das Quiz endgültig löschen?";
const importLA = "LearningApps.org importieren";
const convert = "konvertieren";
const types = {
  "0": "Alle Varianten",
  "1": "Gruppenzuordnung"
};
const hint = "Hinweis";
const addHintDescription = "Du kannst hier zusätzliche Informationen hinzufügen, die nachher als Tooltip hinzugefügt werden.";
const groupassignment = {
  addGroup: "Gruppe hinzufügen",
  chooseFileType: "Kennzeichne die Gruppe mit einem Hintergrundtext oder einem Hintergrundbild",
  changeBackgroundImage: "Hintergrundbild ändern",
  changeBackgroundText: "Hintergrundtext ändern",
  changeBackgroundColor: "Hintergrundfarbe ändern",
  resetBackground: "Hintergrund zurücksetzen",
  deleteGroup: "Gruppe löschen",
  deleteCard: "Karte löschen",
  backgroundText: "Hintergrundtext",
  backgroundImage: "Hintergrundbild"
};
const title = "Titel";
const task = "Aufgabenstellung";
const taskDescription = "Wird am Anfang des Quiz' angezeigt, wenn vorhanden";
const tts = "Vorlesen";
const play = "Spielen";
const edit = "Bearbeiten";
const color = "Farbe";
const feedback = {
  title: "Feedback",
  add: "Feedback hinzufügen",
  description: "Du kannst hier ein Feedback hinzufügen, das am Ende des Quiz' angezeigt wird.",
  basedOnSolution: "Feedback nach Lösungsgrad",
  basedOnSolutionDescription: "Wird am Ende des Quiz' angezeigt, wenn vorhanden.",
  solved100: "Feedback, wenn alles richtig gelöst wurde",
  startFrom: "Feedback ab",
  more: "Individuelle Feedbacks ansehen",
  moreDescription: "Es gibt zu einigen Elementen noch weitere Feedbacks, die Du Dir ansehen kannst."
};
const save = "Quiz speichern";
const checkSolution = "Lösung überprüfen";
const settings = {
  title: "Einstellungen",
  mode: {
    title: "Überprüfen",
    free: "Frei-modus",
    freeDescription: "Elemente können beliebig oft zugeordnet und überprüft werden.",
    exam: "Prüf-modus",
    examDescription: "Elemente können beliebig oft zugeordnet und einmal überprüft werden.",
    instant: "Auto-Sofort-modus",
    instantDescription: "Elemente können beliebig oft zugeordnet und werden sofort automatisch überprüft.",
    end: "Auto-Ende-modus",
    endDescription: "Elemente können beliebig oft zugeordnet und werden am Ende automatisch überprüft"
  },
  hints: {
    title: "Hinweise",
    always: "werden immer angezeigt",
    available: "werden bei Aufruf angezeigt",
    smart: "werden unterstützend angezeigt"
  },
  threshold: "Gilt als bestanden ab"
};
const toSucceed = "zum Bestehen";
const quiz$1 = {
  quiz,
  "delete": "Quiz löschen",
  deletePermanent,
  deleteDescription,
  importLA,
  convert,
  types,
  hint,
  addHintDescription,
  groupassignment,
  title,
  task,
  taskDescription,
  tts,
  play,
  edit,
  color,
  feedback,
  save,
  checkSolution,
  settings,
  toSucceed
};
export {
  addHintDescription,
  checkSolution,
  color,
  convert,
  quiz$1 as default,
  deleteDescription,
  deletePermanent,
  edit,
  feedback,
  groupassignment,
  hint,
  importLA,
  play,
  quiz,
  save,
  settings,
  task,
  taskDescription,
  title,
  toSucceed,
  tts,
  types
};

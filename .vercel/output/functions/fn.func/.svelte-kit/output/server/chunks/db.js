import path from "path";
import { mkdirp } from "mkdirp";
import fs from "fs";
import { G as GROUP_COLORS, O as OPTIONS, M as MIN_GROUPS } from "./constants.js";
import { t as types } from "./types.js";
import { readFile } from "fs/promises";
const LA_QUIZ_TYPES = {
  groupassignment: 86
};
async function convertLearningAppsDataToQuizData(id, learningappsurl, data) {
  let quiz = {
    title: data.title,
    task: data.task,
    convertedFrom: learningappsurl
  };
  if (data.tool == LA_QUIZ_TYPES.groupassignment) {
    let blobToFile = function(blob) {
      return new File([blob], "", { lastModified: (/* @__PURE__ */ new Date()).getTime(), type: blob.type });
    };
    quiz.groups = [];
    quiz.elements = [];
    data.initparameters = decodeURIComponent(data.initparameters);
    var regexCluster = /cluster\d=/gm;
    var regexFeedback = /feedback=/gm;
    const feedback = data.initparameters.split(regexFeedback)[1];
    quiz.feedbacks = {
      "100": feedback
    };
    let cluster = data.initparameters.split(regexCluster);
    cluster.shift();
    for (let i = 0; i < cluster.length; i++) {
      const all = cluster[i].split("||");
      const group = all[0].split("|");
      quiz.groups.push({
        src: group[1],
        type: group[0],
        id: i,
        backgroundColor: GROUP_COLORS[i]
      });
      all.shift();
      for (let j = 0; j < all.length; j++) {
        const element = all[j].split("|");
        let type = element[0];
        if (type.includes("text") || type.includes("image")) {
          var el = {};
          el.type = type.split("=")[1];
          el.src = element[1];
          if (element[2])
            el.hint = element[2];
          el.group = i;
          quiz.elements.push(el);
        }
      }
    }
    async function uploadImage(arr, index) {
      const res = await fetch(arr[index].src);
      if (res.ok) {
        let blob = await res.blob();
        const data2 = blobToFile(blob);
        const up = await uploadFile(data2);
        return up;
      }
      return arr[index].src;
    }
    await Promise.all(quiz.groups.map(async (group, index) => {
      if (group.type == "image") {
        const img = await uploadImage(quiz.groups, index);
        group.src = img.url;
      }
    }));
    await Promise.all(quiz.elements.map(async (element, index) => {
      if (element.type == "image") {
        const img = await uploadImage(quiz.elements, index);
        element.src = img.url;
      }
    }));
    quiz.options = OPTIONS;
    if (!id) {
      id = await createQuizFile();
    }
    const updatedQuiz = await updateQuizFile(id, types.groupassignment, JSON.stringify(quiz));
    return updatedQuiz;
  }
  return null;
}
function getWordCount(str) {
  return str?.split(" ").filter(function(n) {
    return n != "";
  }).length || 0;
}
function calcReadindAndViewingTime(data) {
  const wordsPerMinute = 238;
  const secondsPerImage = 5;
  let wordCount = 0;
  let imageViewingTime = 0;
  data.blocks.map((el) => {
    if (el.type == "paragraph" || el.type == "header") {
      wordCount += getWordCount(el.data.text);
    } else if (el.type == "checklist") {
      el.data.items.map((item) => wordCount += getWordCount(item.text));
    } else if (el.type == "table") {
      el.data.content.map((item) => {
        item.map((text) => wordCount += getWordCount(text));
      });
    } else if (el.type == "quote") {
      wordCount += getWordCount(el.data.text);
      wordCount += getWordCount(el.data.caption);
    } else if (el.type == "list") {
      el.data.items.map((text) => wordCount += getWordCount(text));
    } else if (el.type == "warning") {
      wordCount += getWordCount(el.data.title);
      wordCount += getWordCount(el.data.message);
    } else if (el.type == "image") {
      imageViewingTime += secondsPerImage;
    }
  });
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime + imageViewingTime;
}
async function uploadFile(data) {
  const filepath = path.join(
    process.cwd(),
    "static",
    "uploads",
    `${crypto.randomUUID()}.${data.type.split("/")[1]}`
  );
  mkdirp.sync(path.dirname(filepath));
  fs.writeFileSync(filepath, Buffer.from(await data.arrayBuffer()));
  return { url: "/uploads/" + path.basename(filepath), type: data.type.split("/")[0] };
}
async function createQuizFile(type) {
  let data = {};
  if (type == types.groupassignment) {
    data = {
      groups: [],
      elements: [],
      title: "",
      task: "",
      feedbacks: {},
      options: OPTIONS,
      created: (/* @__PURE__ */ new Date()).getTime(),
      modified: (/* @__PURE__ */ new Date()).getTime()
    };
    for (let i = 0; i < MIN_GROUPS; i++) {
      data.groups.push({
        id: i,
        color: GROUP_COLORS[i % GROUP_COLORS.length]
      });
    }
  }
  data = JSON.stringify(data);
  const newId = crypto.randomUUID();
  const filepath = path.join(
    process.cwd(),
    "static",
    "quizzes",
    `${type}`,
    `${newId}.json`
  );
  mkdirp.sync(path.dirname(filepath));
  fs.writeFileSync(filepath, data);
  return { id: newId, url: `/quiz/${type}/` + path.basename(filepath) };
}
async function updateQuizFile(id, type, data) {
  const isValidId = await isValidQuizId(id, type);
  if (isValidId) {
    data = JSON.parse(data);
    if (!data.created)
      data.created = (/* @__PURE__ */ new Date()).getTime();
    data.modified = (/* @__PURE__ */ new Date()).getTime();
    data = JSON.stringify(data);
    const filepath = path.join(
      process.cwd(),
      "static",
      "quizzes",
      `${type}`,
      `${id}.json`
    );
    mkdirp.sync(path.dirname(filepath));
    fs.writeFileSync(filepath, data);
    return { url: `/quiz/${type}/` + path.basename(filepath) };
  }
  return null;
}
async function deleteQuizFile(id, type) {
  const filepath = path.join(
    process.cwd(),
    "static",
    "quizzes",
    `${type}`,
    `${id}.json`
  );
  return await fs.promises.access(filepath, fs.constants.F_OK).then(async () => {
    return await fs.promises.unlink(filepath);
  });
}
async function getQuizFile(id, type) {
  const filepath = path.join(
    process.cwd(),
    "static",
    "quizzes",
    `${type}`,
    `${id}.json`
  );
  const quiz = await readFile(filepath, { encoding: "utf8" });
  return JSON.parse(quiz);
}
async function getAllQuizFiles() {
  const existingTypes = await getAllQuizTypes();
  if (existingTypes) {
    const quizzes = await Promise.all(existingTypes.map(getAllQuizFilesByType));
    return quizzes[0] ? quizzes[0] : [];
  }
  return [];
}
async function getAllQuizTypes() {
  const dirpath = path.join(
    process.cwd(),
    "static",
    "quizzes"
  );
  return await fs.promises.access(dirpath, fs.constants.F_OK).then(async () => {
    let directories = await fs.promises.readdir(dirpath, { withFileTypes: true });
    return directories.filter((dir) => dir.isDirectory()).map((dir) => dir.name);
  }).catch(() => {
    return [];
  });
}
async function getAllQuizFilesByType(type) {
  const filepath = path.join(
    process.cwd(),
    "static",
    "quizzes",
    `${type}`
  );
  return await fs.promises.access(filepath, fs.constants.F_OK).then(async () => {
    let files = await fs.promises.readdir(filepath);
    files = await Promise.all(files.map(async (file) => {
      const quizId = path.parse(file).name;
      const quiz = await getQuizFile(quizId, type);
      return {
        id: quizId,
        title: quiz.title,
        type,
        play: `/quiz/${type}/embed?id=${quizId}`,
        edit: `/quiz/${type}/setup?mode=edit&id=${quizId}`
      };
    }));
    return files;
  }).catch(() => {
    return [];
  });
}
async function isValidQuizId(id, type) {
  const filepath = path.join(
    process.cwd(),
    "static",
    "quizzes",
    `${type}`,
    `${id}.json`
  );
  return await fs.promises.access(filepath, fs.constants.F_OK).then(() => true).catch(() => false);
}
async function isValidCasestudyId(id) {
  const filepath = path.join(
    process.cwd(),
    "static",
    "casestudies",
    `${id}.json`
  );
  return await fs.promises.access(filepath, fs.constants.F_OK).then(() => true).catch(() => false);
}
async function createCasestudyFile() {
  let data = {
    title: "",
    editor: {},
    modified: (/* @__PURE__ */ new Date()).getTime()
  };
  data = JSON.stringify(data);
  const newId = crypto.randomUUID();
  const filepath = path.join(
    process.cwd(),
    "static",
    "casestudies",
    `${newId}.json`
  );
  mkdirp.sync(path.dirname(filepath));
  fs.writeFileSync(filepath, data);
  return { newId, url: "/casestudy/" + path.basename(filepath) };
}
async function updateCasestudyFile(id, data) {
  const isValidId = await isValidCasestudyId(id);
  if (isValidId) {
    data.modified = (/* @__PURE__ */ new Date()).getTime();
    data.title = data.title.trim();
    data.editor = JSON.parse(data.editor);
    data.rvt = calcReadindAndViewingTime(data.editor);
    data = JSON.stringify(data);
    const filepath = path.join(
      process.cwd(),
      "static",
      "casestudies",
      `${id}.json`
    );
    mkdirp.sync(path.dirname(filepath));
    fs.writeFileSync(filepath, data);
    return { url: "/casestudy/" + path.basename(filepath) };
  }
  return null;
}
async function deleteCasestudyFile(id) {
  const filepath = path.join(
    process.cwd(),
    "static",
    "casestudies",
    `${id}.json`
  );
  return await fs.promises.access(filepath, fs.constants.F_OK).then(async () => {
    return await fs.promises.unlink(filepath);
  });
}
async function getCasestudyFile(id) {
  const filepath = path.join(
    process.cwd(),
    "static",
    "casestudies",
    `${id}.json`
  );
  const casestudy = await readFile(filepath, { encoding: "utf8" });
  return JSON.parse(casestudy);
}
async function getAllCasestudyFiles(type) {
  const filepath = path.join(
    process.cwd(),
    "static",
    "casestudies"
  );
  return await fs.promises.access(filepath, fs.constants.F_OK).then(async () => {
    let files = await fs.promises.readdir(filepath);
    files = await Promise.all(files.map(async (file) => {
      const casestudyId = path.parse(file).name;
      const casestudy = await getCasestudyFile(casestudyId);
      return {
        id: casestudyId,
        title: casestudy.title,
        read: `/casestudy/${casestudyId}`,
        edit: `/casestudy/${casestudyId}/edit`
      };
    }));
    return files;
  }).catch(() => {
    return [];
  });
}
export {
  getAllCasestudyFiles as a,
  updateCasestudyFile as b,
  createCasestudyFile as c,
  deleteCasestudyFile as d,
  isValidQuizId as e,
  createQuizFile as f,
  getAllQuizFiles as g,
  updateQuizFile as h,
  isValidCasestudyId as i,
  deleteQuizFile as j,
  convertLearningAppsDataToQuizData as k,
  uploadFile as u
};

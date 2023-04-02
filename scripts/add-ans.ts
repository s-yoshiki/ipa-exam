import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

const answers = [
  // sample: get-answers.js で作成したデータを記載する
  {
    label: 1,
    ans: "イ",
    category: "T",
  },
];

const main = () => {
  // 変換したいファイルが存在するディレクトリを指定する
  const baseDir = path.join(__dirname, "../src/AP/2022/02/01/");
  const files = fs.readdirSync(baseDir);
  for (const file of files) {
    const fileName = path.join(baseDir, file);
    const fileBody = fs.readFileSync(fileName).toString();
    const data = yaml.load(fileBody) as any;
    const qNo = Number(data?.questions[0].label) - 1;
    data.questions[0].answer = answers[qNo].ans;
    data.questions[0].figureText = data.questions[0].inferredFigure
    data.questions[0].category =  answers[qNo].category
    const dump = yaml.dump(data);
    console.log(dump)
    // fs.writeFileSync(fileName, dump);
  }
};

main();

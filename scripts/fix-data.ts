import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

const answers = [
  // sample
  {
    label: 1,
    ans: "イ",
    category: "T",
  },
];

const main = () => {
  const baseDir = path.join(__dirname, "../src/AP/2022/02/01/");
  const files = fs.readdirSync(baseDir);
  for (const file of files) {
    const fileName = path.join(baseDir, file);
    const fileBody = fs.readFileSync(fileName).toString();
    const data = yaml.load(fileBody) as any;
    // do something
    const dump = yaml.dump({
      label: data.label,
      question: data.question,
      choice: data.choice,
      calculation: data.calculation ? true : false,
      figure: data.figure,
      answer: data.answer,
      category: data.category,
      figureText: data.figureText,
    });
    fs.writeFileSync(fileName, dump);
  }
};

main();

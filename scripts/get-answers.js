"use strict";

const getCategory = (s) => {
  if (s === "Ｓ") return "S";
  if (s === "Ｍ") return "M";
  if (s === "Ｔ") return "T";
  return s;
};

/**
 *
 * @param {String} arg OCRのテキストデータ
 *
 * @description 利用方法について
 * 1. 解答のPDFを google docs で開く
 * 2. 解答のテキストをコピペする
 * 3. 以下のコードに流し込みJSONを取得する
 */
function main(arg) {
  let data = arg.trim().split("\n");
  const result = [];
  let count = 1;
  for (let i = 0; i < data.length; i += 3) {
    const [label, ans, category] = [
      count++,
      data[i + 1].trim(),
      getCategory(data[i + 2].trim()),
    ];
    result.push({
      label,
      ans,
      category,
    });
  }
  console.log(JSON.stringify(result, null, "  "));
}
main(require("fs").readFileSync("/dev/stdin", "utf8"));

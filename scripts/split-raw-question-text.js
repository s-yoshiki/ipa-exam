/**
 * Google Docs から読み取ったテキストを問題ごとにパースする
 * @param {*} arg 
 */
function main(arg) {
  let data = arg
    .trim()
    .split('\n問')
    .map((e, i) => {
      let text = e;
      if (!e.startsWith(`問${i + 1}`)) {
        text = `問` + text;
      }
      text = text.replace(`問${i + 1}`, ``).trim();
      return {
        label: i + 1,
        text,
      };
    });
  console.log(JSON.stringify(data, null, '  '));
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));

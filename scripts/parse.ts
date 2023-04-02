import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';


const apiKey = `<OPENAI_API_KEY>`;

const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

const models = {
  gpt3_5_0301: 'gpt-3.5-turbo-0301',
  gpt3_5: 'gpt-3.5-turbo',
  gpt4: 'gpt-4',
};

const systemContent = `
入力値はIT技術者試験の過去問でありPDFからOCRを実施した際に正しい情報が失われた可能性がある。
元のデータの特徴は、

- ラベル、問題文、選択肢が存在する
- どの問題も選択肢はア、イ、ウ、エの4つのみ存在する
- 問題によっては図や表が存在する
- 問題によっては四則演算等の計算が必要である

文章について読めるように成形を行い、必要があれば問題や選択肢の文章の補完をして以下のYAML形式に変換しYAMLとして出力しなさい。

label: '1' # 問題番号を記載する。例えば "問1"であれば 1を記載
question: aを正の整数とし、b = a^2とする。aを2進数で表現するとnビットであるとき、bを2進数で表現すると最大で何ビットになるか。
choice:
  - label: ア
    text: n+1
  - label: イ
    text: 2n
  - label: ウ
    text: n^2
  - label: エ
    text: 2n-1
calculation: true # 解くのに計算が必要であれば true を記載
figure: false # 図形が存在したと思われる場合は true として記載
answer: イ # ア、イ、ウ、エの中から正答と思われる選択肢を記載
category: T # T(テクノロジ),S(ストラテジ),M(マネジメント)のうち該当するカテゴリを記載
figureText: '' # 図形が存在したと思われる場合は テキスト(Markdown)で図形を表現し記載
`

const src = [];


const main = async () => {
  for (const content of src) {
    const res = await openai.createChatCompletion({
      model: models.gpt3_5,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: systemContent,
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content,
        },
      ],
    });
    const ans = res.data.choices[0].message?.content;
    if (ans) {
      try {
        // console.log(ans)
        const data = yaml.load(ans) as any;
        const filepath = path.join(__dirname, './log', `${data.label.padStart(2, '0')}.yaml`);
        fs.writeFileSync(filepath, ans);
      } catch (err) {
        console.error(err)
      }
    }
  }
};

main();
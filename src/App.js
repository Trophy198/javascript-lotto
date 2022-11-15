const { Console, Random } = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
class App {
  constructor() {
    this.money = null;
    this.lotto = []; 
    this.winNum = [];
    this.bonusNum = null;
  }

  setMoney() {
    Console.readLine("구입금액을 입력해 주세요.\n",(num) => {
      if (!/^\d+$/.test(num))
        throw new Error("[ERROR] 구입금액에 문자가 포함되어 있습니다.");
      const money = parseInt(num);
      if(money % 1000 !== 0)
        throw new Error("[ERROR] 구입금액 오류");
        this.money = money;
        this.buy();
        this.Lottos();
        this.winningNum();
    });
  }
  buy() {
    let getMoney = this.money
    let count = parseInt(this.money / 1000);
    while (getMoney > 0) {
      getMoney -= 1000;
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
      this.lotto.push(new Lotto(numbers));
    }
    Console.print("\n"+ count + "개를 구매했습니다.");
  }
  Lottos() {
    this.lotto.forEach((lottoArr) => {
      Console.print(lottoArr.toString());
    });
  }
 winningNum() {
  Console.readLine("\n당첨 번호를 입력해 주세요.\n",(num) => {
    if (!/^(\d{1,2}[,]){5}\d{1,2}$/.test(num))
      throw new Error("[ERROR] 입력형식이 올바르지 않습니다.");
    const numbers = num.split(",").map((number) => {
      if(number < 1 || number > 45)
      throw new Error("[ERROR] 로또 번호는 1부터 45사이의 숫자여야 합니다.");
      return parseInt(number);
    });
    const duplication =  new Set(numbers);
    if (duplication.size != 6)
      throw new Error("[ERROR] 중복번호가 포함되어 있습니다.");
      this.winNum = numbers;
      this.bonusNumber();
  })
 }
 bonusNumber() {
  Console.readLine("\n보너스 번호를 입력해 주세요.\n", (num) => {
    if (!/^\d+$/.test(num)) 
      throw new Error("[ERROR] 번호가 올바르지 않습니다.");
    const bonus = parseInt(num);
    if(bonus < 1 || bonus > 45)
      throw new Error("[ERROR] 보너스 번호는 1부터 45까지의 숫자입니다.");
    if(this.winNum.includes(num))
      throw new Error("[ERROR] 당첨번호에 포함되어 있는 번호입니다.");
      this.bonusNum = bonus;   
  });
 }
  play() {
    this.setMoney();
  }
}
const app = new App();
app.play();
module.exports = App;
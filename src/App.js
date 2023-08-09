import HandleLogin from "./components/HandleLogin.js";
import HandleTheater from "./components/HandleTheater.js";

class App {
  constructor({ $target }) {
    this.$target = $target;
    this.handleLogin;
    this.handleTheater;
    this.initialSetting();
  }

  initialSetting = () => {
    const $loginSection = this.$target.querySelector("#loginSection");
    const $theaterSection = this.$target.querySelector("#theaterSection");
    this.handleLogin = new HandleLogin({
      $target: $loginSection,
    });
    this.handleTheater = new HandleTheater({
      $target: $theaterSection,
    });
  };
}

export default App;

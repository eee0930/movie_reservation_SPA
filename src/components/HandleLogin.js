class HandleLogin {
  constructor({ $target }) {
    this.$target = $target;
    this.$email = this.$target.querySelector("#email");
    this.$password = this.$target.querySelector("#password");
    this.$btn = this.$target.querySelector("#theaterLoginBtn");
    this.initialSetting();
  }

  initialSetting = () => {
    this.$btn.addEventListener("click", this.handleLogin);
  };

  verifyEmail = (value) => {
    const regex = new RegExp("[a-zA-Z0-9.]+@[a-zA-Z0-9._-]+.co");
    if (regex.test(value)) {
      return true;
    } else {
      alert("이메일 형식이 올바르지 않습니다.");
      return false;
    }
  };

  verifyPassword = (value) => {
    const num = value.search(/[0-9]/g);
    const eng = value.search(/[A-Za-z]/gi);
    const spe = value.search(/[!@@~]/gi);
    const len = value.length;
    if (len < 8 || len > 20) {
      alert("비밀번호는 최소 8자 이상, 최대 20자 이하로 구성해야 합니다.");
      return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
      alert("비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.");
      return false;
    } else {
      return true;
    }
  };

  handleLogin = () => {
    const email = this.$email.value;
    const password = this.$password.value;
    if (
      email === "" ||
      email.length < 1 ||
      password === "" ||
      password.length < 1
    ) {
      alert("이메일 혹은 비밀번호가 입력되지 않았습니다.");
    } else {
      if (this.verifyEmail(email) && this.verifyPassword(password)) {
        alert("로그인 성공!");
      } else {
        return;
      }
    }
  };
}

export default HandleLogin;

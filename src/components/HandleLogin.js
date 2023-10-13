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

  verifyEmail = () => {
    const value = this.$email.value;
    const regex = new RegExp("[a-zA-Z0-9.]+@[a-zA-Z0-9._-]+.co");
    return regex.test(value) ? true : false;
  };

  verifyPasswordSize = (min, max) => {
    const value = this.$password.value;
    const len = value.length;
    return len < min || len > max ? false : true;
  };

  verifyPassword = () => {
    const value = this.$password.value;
    const num = value.search(/[0-9]/g);
    const eng = value.search(/[A-Za-z]/gi);
    const spe = value.search(/[!@@~]/gi);
    return num < 0 || eng < 0 || spe < 0 ? false : true;
  };

  verifyEnteredInFeild = () => {
    return [this.$email, this.$password].every(
      (input) => input.value.trim() !== ""
    );
  };

  handleLogin = () => {
    const validations = [
      {
        fn: this.verifyEnteredInFeild,
        errMsg: "아이디 혹은 비밀번호가 입력되지 않았습니다.",
      },
      {
        fn: this.verifyEmail,
        errMsg: "이메일 형식이 올바르지 않습니다.",
      },
      {
        fn: this.verifyPasswordSize(8, 20),
        errMsg: "비밀번호는 최소 8자 이상, 최대 20자 이하로 구성해야 합니다.",
      },
      {
        fn: this.verifyPassword,
        errMsg: "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.",
      },
    ];

    for (let validation of validations) {
      if (!validation.fn.call(this)) {
        alert(validation.errMsg);
        return;
      }
    }
    alert("로그인 성공!");
  };
}

export default HandleLogin;

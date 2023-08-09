class SelectNumOfPeople {
  constructor({ $target, handleNumButton, handleHandicap }) {
    this.$target = $target;
    this.handleNumButton = handleNumButton;
    this.handleHandicap = handleHandicap;
    this.$adultBtns = this.$target.querySelectorAll("#adultBtn button");
    this.$youthBtns = this.$target.querySelectorAll("#youthBtn button");
    this.$checkHandicap = this.$target.querySelector("#checkHandicap");
    this.adultSize = 0;
    this.youthSize = 0;

    this.initialSetting();
  }

  initialSetting = () => {
    this.$adultBtns.forEach((btn, i) =>
      btn.addEventListener("click", () => this.handleNumButton(true, i))
    );
    this.$youthBtns.forEach((btn, i) =>
      btn.addEventListener("click", () => this.handleNumButton(false, i))
    );
    this.$checkHandicap.addEventListener("click", this.handleHandicap);
    this.handleAdultSize(0);
    this.handleYouthSize(0);
  };

  settingBtn = (isAdult) => {
    if (isAdult) {
      this.$adultBtns.forEach((btn, i) => {
        btn.classList.remove("toggle");
        if (i === size) {
          btn.classList.add("toggle");
        }
      });
    } else {
      this.$youthBtns.forEach((btn, i) => {
        btn.classList.remove("toggle");
        if (i === size) {
          btn.classList.add("toggle");
        }
      });
    }
  };

  settingSelectedSize = (isAdult, size) => {
    if (isAdult) {
      this.adultSize = size;
    } else {
      this.youthSize = size;
    }
    return this.adultSize + this.youthSize;
  };

  handleValidHandicap = (isAdult, size) => {
    size = isAdult ? this.youthSize + size : this.adultSize + size;
    if (this.$checkHandicap.checked && size >= 4) {
      alert("머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.");
      return;
    }
  };

  handleDisableHandicap = () => {
    if (this.adultSize + this.youthSize === 0) {
      this.$checkHandicap.disabled = true;
    } else if (this.adultSize + this.youthSize >= 4) {
      this.$checkHandicap.disabled = true;
    } else {
      this.$checkHandicap.disabled = false;
    }
  };

  getCheckHandicap = () => {
    return this.$checkHandicap.checked;
  };
}

export default SelectNumOfPeople;

import HandleSeats from "./HandleSeats.js";

class HandleTheater {
  constructor({ $target }) {
    this.$target = $target;
    this.$adultBtns = this.$target.querySelectorAll("#adultBtn button");
    this.$youthBtns = this.$target.querySelectorAll("#youthBtn button");
    this.$checkHandicap = this.$target.querySelector("#checkHandicap");
    this.handleSeats;
    this.adultSize = 0;
    this.youthSize = 0;

    this.initialSetting();
  }

  initialSetting = () => {
    const $theaterSeat = this.$target.querySelector("#theaterSeat");
    this.handleSeats = new HandleSeats({
      $target: $theaterSeat,
      handleHandicap: this.handleHandicapFromSeats,
    });
    this.$adultBtns.forEach((btn, i) =>
      btn.addEventListener("click", () => this.handleAdultSize(i))
    );
    this.$youthBtns.forEach((btn, i) =>
      btn.addEventListener("click", () => this.handleYouthSize(i))
    );
    this.$checkHandicap.addEventListener("click", this.handleHandicap);
    this.handleAdultSize(0);
    this.handleYouthSize(0);
  };

  handleAdultSize = (size) => {
    if (this.$checkHandicap.checked && this.youthSize + size >= 4) {
      alert("머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.");
      return;
    }
    this.$adultBtns.forEach((btn, i) => {
      btn.classList.remove("toggle");
      if (i === size) {
        btn.classList.add("toggle");
      }
    });
    this.adultSize = size;
    this.handleSeats.setTotalSize(this.adultSize + this.youthSize);
    this.handleDisableHandicap();
  };

  handleYouthSize = (size) => {
    if (this.$checkHandicap.checked && this.adultSize + size >= 4) {
      alert("머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.");
      return;
    }
    this.$youthBtns.forEach((btn, i) => {
      btn.classList.remove("toggle");
      if (i === size) {
        btn.classList.add("toggle");
      }
    });
    this.youthSize = size;
    this.handleSeats.setTotalSize(this.adultSize + this.youthSize);
    this.handleDisableHandicap();
  };

  handleHandicap = () => {
    const ishandicap = this.$checkHandicap.checked;
    this.handleSeats.setIsHandicap(ishandicap);
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

  handleHandicapFromSeats = (isNormal) => {
    if (isNormal) {
      this.$checkHandicap.disabled = true;
    } else {
      this.$checkHandicap.disabled = false;
    }
  };
}

export default HandleTheater;

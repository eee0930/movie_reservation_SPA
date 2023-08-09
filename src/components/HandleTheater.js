import HandleSeats from "./HandleSeats.js";
import SelectNumOfPeople from "./SelectNumOfPeople.js";

class HandleTheater {
  constructor({ $target }) {
    this.$target = $target;
    this.handleSeats;
    this.selectNumOfPeople;
    this.totalSize = 0;
    this.initialSetting();
  }

  initialSetting = () => {
    const $theaterSeat = this.$target.querySelector("#theaterSeat");
    const $numOfPeople = this.$target.querySelector(".section-numOfPeople");
    this.selectNumOfPeople = new SelectNumOfPeople({
      $target: $numOfPeople,
      handleNumButton: this.handleNumPeopleButton,
      handleHandicap: this.handleHandicap,
    });
    this.handleSeats = new HandleSeats({
      $target: $theaterSeat,
      handleHandicap: this.handleHandicapFromSeats,
    });
  };

  handleNumPeopleButton = (isAdult, size) => {
    this.selectNumOfPeople.handleValidHandicap(isAdult, size);
    this.selectNumOfPeople.settingBtn(isAdult);
    this.totalSize = this.selectNumOfPeople.settingSelectedSize(isAdult, size);
    this.handleSeats.setTotalSize(this.totalSize);
    this.selectNumOfPeople.handleDisableHandicap();
  };

  handleHandicap = () => {
    const ishandicap = this.selectNumOfPeople.getCheckHandicap();
    this.handleSeats.setIsHandicap(ishandicap);
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

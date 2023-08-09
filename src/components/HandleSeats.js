class HandleSeats {
  constructor({ $target, handleHandicap }) {
    this.$target = $target;
    this.handleHandicap = handleHandicap;
    this.$seats = this.$target.querySelectorAll("button");
    this.totalSize = 0;
    this.seatType = 0;
    this.isHandicap = false;
    this.firstSelected = true;
    this.selectedSeats = [];
    this.initialSetting();
  }

  initialSetting = () => {
    this.$seats.forEach((btn, i) =>
      btn.addEventListener("click", () => this.handleClickSeats(i))
    );
  };

  settingSeatType = (idx) => {
    const seatRow = Math.floor(idx / 13);
    const seatCol = idx % 13;
    if (seatRow <= 1) {
      this.seatType = 1;
      this.settingNormalSeats();
    } else if (seatRow === 2 && seatCol < 10) {
      this.seatType = 2;
      this.settingMusseukSeats();
    } else if (seatRow === 2 && seatCol >= 10) {
      this.seatType = 3;
    }
  };

  handleClickSeats = (idx) => {
    const seat = this.$seats[idx];

    // 좌석 처음 선택시 좌석 타입 결정하기
    if (this.firstSelected) {
      this.settingSeatType(idx);
      this.firstSelected = false;
    }

    if (seat.classList.contains("clicked")) {
      // 선택 취소
      const i = this.selectedSeats.indexOf(idx);
      this.selectedSeats.splice(i, 1);
      seat.classList.remove("clicked");
    } else {
      // 좌석 선택
      this.selectedSeats.push(idx);
      seat.classList.add("clicked");
    }

    this.handleDisableSeats();
  };

  settingNormalSeats = () => {
    this.$seats.forEach((seat) => {
      if (
        seat.classList.contains("handicap") ||
        seat.classList.contains("musseukbox")
      ) {
        seat.classList.add("disabled");
      } else {
        seat.classList.remove("disabled");
      }
    });
  };

  settingMusseukSeats = () => {
    this.$seats.forEach((seat) => {
      if (seat.classList.contains("musseukbox")) {
        seat.classList.remove("disabled");
      } else {
        seat.classList.add("disabled");
      }
    });
  };

  settingHandicapSeats = () => {
    if (this.isHandicap) {
      this.$seats.forEach((seat) => {
        if (seat.classList.contains("handicap")) {
          seat.classList.remove("disabled");
        } else {
          seat.classList.add("disabled");
        }
      });
    } else {
      if (this.totalSize > 0) {
        this.$seats.forEach((seat) => seat.classList.remove("disabled"));
      } else {
        this.$seats.forEach((seat) => seat.classList.add("disabled"));
      }
    }
  };

  handleDisableSeats = () => {
    // 장애인 체크박스 체크 여부 확인
    // 모두 취소하고 선택한 좌석이 0개일 때 모두 활성화
    // 인원 수만큼의 좌석을 모두 선택했을 때
    const len = this.selectedSeats.length;
    if (len === 0) {
      if (!this.isHandicap) {
      }
      this.$seats.forEach((seat) => {});
      this.seatType = 0;
    } else if (len === this.totalSize) {
      this.$seats.forEach((seat, i) => {
        if (!this.selectedSeats.includes(i)) {
          seat.classList.add("disabled");
        }
      });
    }
  };

  setTotalSize = (totalSize) => {
    this.totalSize = totalSize;
    this.settingHandicapSeats();
  };

  setIsHandicap = (isHandicap) => {
    this.isHandicap = isHandicap;
    this.settingHandicapSeats();
  };
}

export default HandleSeats;

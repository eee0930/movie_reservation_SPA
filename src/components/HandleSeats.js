class HandleSeats {
  constructor({ $target, handleHandicap }) {
    this.$target = $target;
    this.handleHandicap = handleHandicap;
    this.$seats = this.$target.querySelectorAll("button");
    this.totalSize = 0;
    this.seatType = 0;
    this.isHandicap = false;
    this.selectedSeats = [];
    this.initialSetting();
  }

  initialSetting = () => {
    this.$seats.forEach((btn, i) =>
      btn.addEventListener("click", () => this.handleClickSeats(i))
    );
  };

  handleDisableSeats = () => {
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

  handleClickSeats = (idx) => {
    const seatRow = Math.floor(idx / 13);
    const seatCol = idx % 13;
    const seat = this.$seats[idx];
    let len = this.selectedSeats.length;
    // 최초 일반석 선택시 머쓱석과 장애인석 비활성화
    if (len === 0 && seatRow <= 1) {
      this.handleClickNormal();
      this.handleHandicap(true);
      this.seatType = 1;
    } else if (len === 0 && seatRow === 2 && seatCol < 10) {
      if (this.totalSize % 2 !== 0) {
        alert(
          "선택하신 ‘MUSSEUKBOX’ 좌석은 2인 좌석입니다. 2인 단위로 인원을 선택해주세요."
        );
        return;
      }
      this.handleClickMusseuk();
      this.handleHandicap(true);
      this.seatType = 2;
    } else if (len === 0 && seatRow === 2 && seatCol >= 10) {
      this.handleClickHandicap();
      this.handleHandicap(false);
      this.seatType = 3;
    }
    if (seat.classList.contains("clicked")) {
      const i = this.selectedSeats.indexOf(idx);
      this.selectedSeats.splice(i, 1);
      seat.classList.remove("clicked");
      len--;
      if (len === 0) {
        console.log("check");
        this.seatType === 0;
        this.$seats.forEach((seat) => seat.classList.remove("disabled"));
        this.handleHandicap(false);
      }
      if (this.seatType === 1) {
        this.handleClickNormal();
      } else if (this.seatType === 2) {
        this.handleClickMusseuk();
      } else if (this.seatType === 3) {
        this.handleClickHandicap();
      }
    } else {
      this.selectedSeats.push(idx);
      len++;
      seat.classList.add("clicked");
    }
    if (this.totalSize === len) {
      this.$seats.forEach((seat, i) => {
        if (!this.selectedSeats.includes(i)) {
          seat.classList.add("disabled");
        }
      });
    }
  };

  handleClickNormal = () => {
    this.$seats.forEach((seat) => {
      if (
        seat.classList.contains("handicap") ||
        seat.classList.contains("musseukbox")
      ) {
        seat.classList.add("disabled");
      }
    });
  };

  handleClickMusseuk = () => {
    this.$seats.forEach((seat) => {
      if (seat.classList.contains("musseukbox")) {
        seat.classList.remove("disabled");
      } else {
        seat.classList.add("disabled");
      }
    });
  };

  handleClickHandicap = () => {
    this.$seats.forEach((seat) => {
      if (seat.classList.contains("handicap")) {
        seat.classList.remove("disabled");
      } else {
        seat.classList.add("disabled");
      }
    });
  };

  setTotalSize = (totalSize) => {
    this.totalSize = totalSize;
    this.handleDisableSeats();
  };

  setIsHandicap = (isHandicap) => {
    this.isHandicap = isHandicap;
    this.handleDisableSeats();
  };
}

export default HandleSeats;

const dateAndClock = {
  elements: {
    clock: document.querySelector('.timeAndDate__clock'),
    date: document.querySelector('.timeAndDate__date'),
  },
  data: {
    clock: {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    },
    date: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
  },
  addZeroIfLessThan10 () {
    for (let item in this.data.clock) {
      if (this.data.clock[item] < 10) this.data.clock[item] = `0${this.data.clock[item]}`;
    }
  },
  generateClock () {
    this.addZeroIfLessThan10();
    let { hours, minutes } = this.data.clock;

    this.elements.clock.textContent = `${hours}:${minutes}`;
  },
  generateDate () {
    let { day, month, year } = this.data.date;
    const monthWord = {1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "June",
                       7: "July", 8: "Aug", 9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec"};
    let ordinalNum = {1: 'st', 2: 'nd', 3: 'rd'}

    this.elements.date.textContent =
      `${day < 4 ? day + ordinalNum[day] : day + 'th'} ${monthWord[month]}. ${year}`
  },
  show () {
    this.generateClock();
    this.generateDate();
  }
}

function setDayTime () {
  let dayTimeElement = document.querySelector('.daytime'),
    currentHour = new Date().getHours(),
    dayTime = '';

  if (currentHour <= 12) dayTime = 'morning';
  else dayTime = 'afternoon';

  dayTimeElement.textContent = dayTime;
}


setDayTime();
dateAndClock.show();

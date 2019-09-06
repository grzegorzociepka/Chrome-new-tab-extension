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

const GetBookmars = () => {
  chrome.bookmarks.getRecent(7, (itemTree)=>{
    
    itemTree.forEach(function(item){
      const list = document.getElementById("bookmarks_list");
      let li = document.createElement("li");
      li.className = 'bookmarks__element';

      let anchor = document.createElement("a");
      anchor.className = 'bookmarks__link';
      anchor.href = item.url;
      anchor.target = "_blank";

      let img = document.createElement("img");
      img.src = GetFavicon(item.url);
      img.className = "bookmarks__icon";
      img.alt = "bookmarks_icon";

      anchor.appendChild(img);
      li.appendChild(anchor);
      list.appendChild(li);
    });
  });
}
const GetFavicon = (url) =>{
    var splittedLink = url.split("/");
    var link = splittedLink[0] +'/' + splittedLink[1] +'/'+ splittedLink[2]+ '/' + 'favicon.ico';
    return link;
}

GetBookmars();
setDayTime();
dateAndClock.show();

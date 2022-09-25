
// สุ่มตัวเลขระหว่าง parameter ที่รับมา
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ค้นหาตัวเลขที่น้อยที่สุด
const findNumber = (type, arr, priority) => {
  let arrs = arr || [];
  let lowest = Number.POSITIVE_INFINITY;
  let tmp;

  if (arrs.length > 1) {
    /*  Type List
      P = Priority
      PA = Priority ArrivalTime
      UA = USB ArrivalTime
    */
    if (type === 'P') {
      for (let i = arrs.length - 1; i >= 0; i--) {
        tmp = arrs[i].priority;
        if (tmp < lowest && arrs[i].usb.active === false) lowest = tmp;
      }
    } else if (type === 'PA') {
      for (let i = arrs.length - 1; i >= 0; i--) {
        if (arrs[i].priority === priority) {
          tmp = arrs[i].arrivalTime;
          if (tmp < lowest && arrs[i].usb.active === false) lowest = tmp;
        }
      }
    } else if (type === 'UA') {
      for (let i = arrs.length - 1; i >= 0; i--) {
        if (arrs[i].usb?.active === true) {
          tmp = arrs[i].usb.arrivalTime;
          if (tmp < lowest) lowest = tmp;
        }
      }
    }
  }

  return lowest
}

export {
  getRandomInt,
  findNumber,
}
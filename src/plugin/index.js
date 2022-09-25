
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
    for (let i = arrs.length - 1; i >= 0; i--) {
      switch (type) {
        case 'P':
          tmp = arrs[i].priority;
          if (tmp < lowest && arrs[i].usb.active === false) lowest = tmp;
          break;
        case 'PA':
          if (arrs[i].priority === priority) {
            tmp = arrs[i].arrivalTime;
            if (tmp < lowest && arrs[i].usb.active === false) lowest = tmp;
          }
          break;
        case 'UA':
          if (arrs[i].usb?.active === true) {
            tmp = arrs[i].usb.arrivalTime;
            if (tmp < lowest) lowest = tmp;
          }
          break;
        default: alert("Plese input type");
          break;
      }
    }
  }

  return lowest
}

export {
  getRandomInt,
  findNumber,
}
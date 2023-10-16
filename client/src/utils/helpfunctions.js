import moment from "moment";

export function getNumberOfDays(startDateStr, endDateStr) {
  const startDate = moment(startDateStr, "MMM DD YYYY");
  const endDate = moment(endDateStr, "MMM DD YYYY");
  const duration = moment.duration(endDate.diff(startDate));
  const numberOfDays = duration.asDays();
  return numberOfDays + 1;
}

export function calculateLeaveDuration(
  startDate,
  endDate,
  selectedLeave,
  leaveData,
  days_data
) {
  console.log("leave data ");
  console.log(leaveData);
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  // const weekdays = leaveData.weekDays;
  // const halfDays = leaveData.halfDays;
  // const weekdays = [1, 2, 3, 4, 5, 6, 7];
  // const halfDays = [6];
  const { halfDays, weekDays } = days_data;
  while (start <= end) {
    const currentDay = start.getDay();
    if (selectedLeave.leave_object.inclusiveOffDays) {
      if (selectedLeave.leave_object.countHalfDayFullDay) {
        count += 1;
      } else {
        count += halfDays.includes(currentDay) ? 0.5 : 1;
      }
    } else {
      if (weekDays.includes(currentDay)) {
        if (selectedLeave.leave_object.countHalfDayFullDay) {
          count += 1;
        } else {
          count += halfDays.includes(currentDay) ? 0.5 : 1;
        }
      }
    }
    start.setDate(start.getDate() + 1);
  }
  return count;
}

export function sortTrue(leave) {
  let properties = [];
  if (leave?.halfday === true) {
    properties[0] = ["Half day request", true];
    properties[1] = ["Enforce allowance", leave?.enforce];
  } else if (leave?.enforce === true) {
    properties[0] = ["Enforce allowance", true];
    properties[1] = ["Half day request", false];
  }
  return properties;
}

export const Availed = (item) => {
  let days = 1;
  // item.leavesTaken.availed_leaveData.lea
  // item.leavesTaken.forEach((ele) => {
  //   if (ele.status === "Approved") days += ele.numberOfDays;
  // });
  return days;
};

export const Remaining = (item) => {
  let days = 1;

  return days;
};

export function calculateProRataLeave(
  annualLeaveEntitlement,
  employmentStartDate,
  currentDate
) {
  const startDate = new Date(employmentStartDate);
  const endDate = new Date(currentDate);
  const daysWorkedThisYear = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const daysInFullYear = 365;
  const proRataLeave =
    (daysWorkedThisYear / daysInFullYear) * annualLeaveEntitlement;
  return Math.ceil(proRataLeave);
}

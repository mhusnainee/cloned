import {
  tool,
  addUserIcon,
  activeHR,
  usersLogo,
  generateRoster,
  viewRoster,
  preferences,
  offboarding,
  folderIcon,
  companyPolicy,
  uploadPolicy,
  departments,
  id,
  updateProfile,
  companySettings,
  logoIcon,
  accountSetting,
} from "../assets/icons";

export const colorData = [
  {
    id: 1,
    bgColor: "bg-cyan-500",
  },
  {
    id: 2,
    bgColor: "bg-blue-800",
  },
  {
    id: 3,
    bgColor: "bg-purple-600",
  },
  {
    id: 4,
    bgColor: "bg-slate-400",
  },
  {
    id: 5,
    bgColor: "bg-orange-400",
  },
  {
    id: 6,
    bgColor: "bg-slate-700",
  },
  {
    id: 7,
    bgColor: "bg-rose-300",
  },
  {
    id: 8,
    bgColor: "bg-green-700",
  },
  {
    id: 9,
    bgColor: "bg-orange-700",
  },
  {
    id: 10,
    bgColor: "bg-fuchsia-700",
  },
  {
    id: 11,
    bgColor: "bg-black",
  },
  {
    id: 12,
    bgColor: "bg-pink-500",
  },
  {
    id: 13,
    bgColor: "bg-slate-500",
  },
  {
    id: 14,
    bgColor: "bg-yellow-300",
  },
  {
    id: 15,
    bgColor: "bg-yellow-800",
  },
  {
    id: 16,
    bgColor: "bg-lime-500",
  },
];

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const tabData = [
  {
    _id: 1,
    name: "Leave settings",
    icon: tool,
  },
  // {
  //   _id: 2,
  //   name: "Subscription",
  //   icon: cart,
  // },
  {
    _id: 3,
    name: "Departments",
    icon: departments,
  },
  {
    _id: 4,
    name: "Company settings",
    icon: companySettings,
  },
];

export const manageHR_Tabs = [
  {
    _id: 1,
    name: "Active HR",
    icon: activeHR,
  },
  {
    _id: 2,
    name: "Onboard employee",
    icon: addUserIcon,
  },
  {
    _id: 3,
    name: "Archived HR",
    icon: usersLogo,
  },
  {
    _id: 4,
    name: "Offboard employee",
    icon: offboarding,
  },
];

export const roster_Tabs = [
  {
    _id: 1,
    name: "Generate roster",
    icon: generateRoster,
  },
  {
    _id: 2,
    name: "View roster",
    icon: viewRoster,
  },
  {
    _id: 3,
    name: "Preferences",
    icon: preferences,
  },
];

export const companySettingTabs = [
  {
    _id: 1,
    name: "Logo setting",
    icon: logoIcon,
  },
  {
    _id: 2,
    name: "Other setting",
    icon: viewRoster,
  },
];

export const profile_Tabs = [
  {
    _id: 1,
    name: "My profile",
    icon: id,
  },
  {
    _id: 2,
    name: "Update profile",
    icon: updateProfile,
  },
  {
    _id: 3,
    name: "Account settings",
    icon: accountSetting,
  },
];

export const document_Tabs = [
  {
    _id: 1,
    name: "My files",
    icon: folderIcon,
  },
  {
    _id: 2,
    name: "Company policies",
    icon: companyPolicy,
  },
  {
    _id: 3,
    name: "Upload policies",
    icon: uploadPolicy,
  },
];

export const datePlaceHolder = new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export const initialDate = new Date()
  .toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
  .replace(",", "");

export const rosterData = [
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: -1, afternoon: 0 },
    date: "Sunday, January 1, 2023",
    fiveDayStaff: { one: "M", two: "A", three: "M", four: "A" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "R", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Monday, January 2, 2023",
    fiveDayStaff: { one: "R", two: "M", three: "A", four: "A" },
    fixedStaff: { five: "R" },
    sixDayStaff: { six: "A", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Tuesday, January 3, 2023",
    fiveDayStaff: { one: "R", two: "R", three: "M", four: "A" },
    fixedStaff: { five: "R" },
    sixDayStaff: { six: "F", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Wednesday, January 4, 2023",
    fiveDayStaff: { one: "A", two: "R", three: "R", four: "M" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Thirsday, January 5, 2023",
    fiveDayStaff: { one: "M", two: "A", three: "R", four: "R" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: -1, afternoon: 0 },
    date: "Friday, January 6, 2023",
    fiveDayStaff: { one: "M", two: "M", three: "A", four: "R" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "M" },
  },
  {
    minStaff: { morning: 3, afternoon: 4 },
    shortage: { morning: 1, afternoon: 0 },
    date: "Saturday, January 7, 2023",
    fiveDayStaff: { one: "A", two: "M", three: "M", four: "A" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "R" },
  },
  {
    minStaff: { morning: 3, afternoon: 4 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Sunday, January 8, 2023",
    fiveDayStaff: { one: "A", two: "A", three: "M", four: "M" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "M", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Monday, January 9, 2023",
    fiveDayStaff: { one: "M", two: "A", three: "A", four: "M" },
    fixedStaff: { five: "R" },
    sixDayStaff: { six: "R", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Tuesday, January 10, 2023",
    fiveDayStaff: { one: "R", two: "M", three: "A", four: "A" },
    fixedStaff: { five: "R" },
    sixDayStaff: { six: "A", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Wednesday, January 11, 2023",
    fiveDayStaff: { one: "R", two: "R", three: "M", four: "M" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "M", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Thursday, January 12, 2023",
    fiveDayStaff: { one: "A", two: "R", three: "R", four: "M" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "M", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Friday, January 13, 2023",
    fiveDayStaff: { one: "M", two: "A", three: "R", four: "R" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: -1, afternoon: 0 },
    date: "Saturday, January 14, 2023",
    fiveDayStaff: { one: "M", two: "M", three: "A", four: "R" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Sunday, January 15, 2023",
    fiveDayStaff: { one: "A", two: "M", three: "M", four: "R" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "R" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: -1, afternoon: 0 },
    date: "Monday, January 16, 2023",
    fiveDayStaff: { one: "A", two: "A", three: "M", four: "A" },
    fixedStaff: { five: "R" },
    sixDayStaff: { six: "M", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Tuesday, January 17, 2023",
    fiveDayStaff: { one: "M", two: "A", three: "A", four: "M" },
    fixedStaff: { five: "R" },
    sixDayStaff: { six: "R", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: -1, afternoon: 0 },
    date: "Wednesday, January 18, 2023",
    fiveDayStaff: { one: "R", two: "M", three: "A", four: "M" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Thirsday, January 19, 2023",
    fiveDayStaff: { one: "R", two: "R", three: "M", four: "A" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Friday, January 20, 2023",
    fiveDayStaff: { one: "A", two: "R", three: "R", four: "M" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "M", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Saturday, January 21, 2023",
    fiveDayStaff: { one: "M", two: "A", three: "R", four: "R" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "M", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Sunday, January 22, 2023",
    fiveDayStaff: { one: "A", two: "M", three: "R", four: "R" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: -1, afternoon: 0 },
    date: "Monday, January 23, 2023",
    fiveDayStaff: { one: "F", two: "M", three: "A", four: "R" },
    fixedStaff: { five: "R" },
    sixDayStaff: { six: "F", seven: "R" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: -1, afternoon: 0 },
    date: "Tuesday, January 24, 2023",
    fiveDayStaff: { one: "A", two: "M", three: "M", four: "A" },
    fixedStaff: { five: "R" },
    sixDayStaff: { six: "M", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: -1, afternoon: 0 },
    date: "Wednesday, January 25, 2023",
    fiveDayStaff: { one: "M", two: "A", three: "M", four: "M" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "R", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Thirsday, January 26, 2023",
    fiveDayStaff: { one: "R", two: "M", three: "A", four: "M" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Friday, January 27, 2023",
    fiveDayStaff: { one: "R", two: "R", three: "M", four: "M" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Saturday, January 28, 2023",
    fiveDayStaff: { one: "A", two: "R", three: "R", four: "A" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "M", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 0 },
    date: "Sunday, January 29, 2023",
    fiveDayStaff: { one: "M", two: "R", three: "R", four: "M" },
    fixedStaff: { five: "A" },
    sixDayStaff: { six: "A", seven: "A" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 1 },
    date: "Monday, January 30, 2023",
    fiveDayStaff: { one: "M", two: "A", three: "R", four: "R" },
    fixedStaff: { five: "R" },
    sixDayStaff: { six: "A", seven: "M" },
  },
  {
    minStaff: { morning: 2, afternoon: 3 },
    shortage: { morning: 0, afternoon: 2 },
    date: "Tuesday, January 31, 2023",
    fiveDayStaff: { one: "M", two: "M", three: "R", four: "R" },
    fixedStaff: { five: "R" },
    sixDayStaff: { six: "A", seven: "M" },
  },
];

export const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDate: "08-Sep-2023",
    endDate: "24-Sep-2023",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDate: "08-Sep-2023",
    endDate: "24-Sep-2023",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDate: "08-Sep-2023",
    endDate: "24-Sep-2023",
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDate: "08-Sep-2023",
    endDate: "24-Sep-2023",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDate: "08-Sep-2023",
    endDate: "24-Sep-2023",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDate: "08-Sep-2023",
    endDate: "24-Sep-2023",
  },
];

export const events = [
  {
    _id: 1,
    title: "Meeting with the client",
    time: "07:30 AM",
    dueDate: new Date().toDateString(),
    details:
      "Meeting with the client to discuss current progress and upcoming work",
  },
  {
    _id: 2,
    title: "Annual party",
    time: "08:30 PM",
    dueDate: new Date().toDateString(),
    details: "Annual party at BBQ hotel",
  },
  {
    _id: 3,
    title: "Full-Stack interviews",
    time: "02:00 PM",
    dueDate: new Date().toDateString(),
    details: "Interviews of Full-Stack applicants",
  },
];

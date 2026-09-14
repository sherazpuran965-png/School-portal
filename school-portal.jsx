import React, { useState, useMemo, useRef, useContext, createContext } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Wallet,
  Phone,
  Mail,
  Pencil,
  Plus,
  X,
  Check,
  Search,
  Camera,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  Printer,
  Award,
  Banknote,
} from "lucide-react";

// ---------- design tokens ----------
const COLORS = {
  paper: "#F5F1E7",
  card: "#FFFFFF",
  ink: "#24211B",
  sub: "#6B6355",
  forest: "#1F3B33",
  forestLight: "#2C5045",
  brass: "#B4884A",
  brassLight: "#E4CFA0",
  border: "#E3DAC5",
  rose: "#B0453A",
  roseBg: "#F6E5E1",
  sage: "#4C7A5C",
  sageBg: "#E4EEE2",
  amberBg: "#F5EAD5",
};

const AVATAR_PALETTE = [
  { bg: "#DCE7E1", fg: "#1F3B33" },
  { bg: "#F0E2C4", fg: "#8A6323" },
  { bg: "#E8D9DC", fg: "#8C3D45" },
  { bg: "#DCE0EC", fg: "#3B4A8A" },
  { bg: "#E6E9D9", fg: "#556B2F" },
];

const DEFAULT_LOGO = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0OCIgZmlsbD0iI0Y1RjFFNyIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ3IiBmaWxsPSJub25lIiBzdHJva2U9IiNCNDg4NEEiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPHBhdGggZD0iTTUwIDQwIEMgNDIgMzIsIDI1IDMyLCAxOCAzOCBMMTggNjggQyAyNSA2MiwgNDIgNjIsIDUwIDY4IEMgNTggNjIsIDc1IDYyLCA4MiA2OCBMODIgMzggQyA3NSAzMiwgNTggMzIsIDUwIDQwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFGM0IzMyIgc3Ryb2tlLXdpZHRoPSIzLjIiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSI1MCIgeTE9IjQwIiB4Mj0iNTAiIHkyPSI2OCIgc3Ryb2tlPSIjMUYzQjMzIiBzdHJva2Utd2lkdGg9IjMuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTMwIDQ0IEMgMzQgNDIsIDQwIDQyLCA0NCA0NCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUYzQjMzIiBzdHJva2Utd2lkdGg9IjEuNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTMwIDUxIEMgMzQgNDksIDQwIDQ5LCA0NCA1MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUYzQjMzIiBzdHJva2Utd2lkdGg9IjEuNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTU2IDQ0IEMgNjAgNDIsIDY2IDQyLCA3MCA0NCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUYzQjMzIiBzdHJva2Utd2lkdGg9IjEuNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTU2IDUxIEMgNjAgNDksIDY2IDQ5LCA3MCA1MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUYzQjMzIiBzdHJva2Utd2lkdGg9IjEuNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTY5IDIwIEE5IDkgMCAxIDAgNjkgMzggQTYuNSA2LjUgMCAxIDEgNjkgMjAgWiIgZmlsbD0iI0I0ODg0QSIvPgo8L3N2Zz4=";

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}
function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[h];
}
function pad2(n) {
  return String(n).padStart(2, "0");
}

// ---------- language strings ----------
const STRINGS = {
  en: {
    tagline: "School management portal",
    tabs: { admin: "Administration", teachers: "Teachers", students: "Students", fees: "Fees", expenses: "Expenses" },
    stats: { students: "Students", teachers: "Teachers", staff: "Staff (total)", collected: "Fees collected" },
    administrator: "School administrator",
    addAdminStaff: "Add administration staff",
    feeAlerts: "Fee alerts",
    directorySearch: "Directory search",
    searchAll: "Search students or teachers",
    searchTeachers: "Search teachers",
    searchStudents: "Search students in this class",
    addTeacher: "Add teacher",
    addStudent: "Add student",
    saveChanges: "Save changes",
    cancel: "Cancel",
    add: "Add",
    markPaid: "Mark paid",
    due: "Due",
    collected: "Collected",
    outstanding: "Outstanding",
    totalOutstanding: "Total outstanding",
    feeAmount: "Amount",
    paidOn: "Paid on",
    statusLabel: "Status",
    editDetails: "Edit details",
    classesHeading: "Classes",
    addClass: "Add class",
    classFeeLabel: "Class fee (monthly)",
    saveApply: "Save & apply to unpaid months",
    studentsInClass: "students",
    monthlyRecord: "Monthly fee record",
    otherFees: "Other fees",
    addOtherFee: "Add other fee",
    typeLabel: "Fee type",
    customFeeName: "Fee name",
    otherFeeTypes: { admission: "Admission fee", exam: "Exam fee", promotion: "Promotion fee", custom: "Other" },
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    fields: {
      name: "Full name",
      subject: "Subject",
      role: "Role",
      phone: "Phone",
      email: "Email",
      guardian: "Guardian name",
      guardianPhone: "Guardian phone",
      className: "Class name",
      classFee: "Class fee (monthly)",
      fatherName: "Father's name",
    },
    status: { paid: "Paid", pending: "Pending", overdue: "Overdue" },
    guardianLabel: "Guardian",
    certificatesHeading: "Student certificates",
    selectStudentPlaceholder: "Select a student",
    fatherName: "Father's name",
    dateOfIssue: "Date of issue",
    printCertificate: "Print certificate",
    certifyIntro: "This is to certify that",
    sonDaughterOf: "son/daughter of",
    isStudentOf: "is a student of",
    principalSignature: "Principal's signature",
    certificateTypeLabel: "Certificate type",
    certTypes: {
      general: "Bonafide / study certificate",
      character: "Character certificate",
      sports: "Sports certificate",
      leaving: "School leaving certificate",
    },
    conductLabel: "Conduct",
    conductOptions: { excellent: "Excellent", good: "Good", satisfactory: "Satisfactory" },
    sportNameLabel: "Sport / event name",
    positionLabel: "Position / achievement",
    eventDateLabel: "Event date",
    dobLabel: "Date of birth",
    admissionDateLabel: "Date of admission",
    leavingDateLabel: "Date of leaving",
    reasonLabel: "Reason for leaving",
    salariesHeading: "Teacher salaries",
    salaryAmountLabel: "Salary amount",
    paymentMethodLabel: "Payment method",
    methodBank: "Bank transfer",
    methodCash: "Cash",
    methodEasypaisa: "Easypaisa",
    paySalary: "Pay salary",
    salaryPaid: "Salary paid",
    expensesHeading: "Expenses",
    teacherSalariesSection: "Teacher salaries",
    otherExpensesSection: "Other expenses",
    purposeLabel: "Purpose",
    addExpense: "Add expense",
    accountNoLabel: "Account / mobile number",
    sendToAccount: "Send to account",
    totalPaidLabel: "Total paid",
    totalPendingLabel: "Total pending",
    certText: {
      general: (name, father, cls) =>
        `This is to certify that ${name}, son/daughter of ${father}, is a student of ${cls} at this institution.`,
      character: (name, father, cls, conduct) =>
        `This is to certify that ${name}, son/daughter of ${father}, is a student of ${cls} at this institution. During his/her stay, his/her character and conduct have been found to be ${conduct}.`,
      sports: (name, father, cls, sport, position, eventDate) =>
        `This is to certify that ${name}, son/daughter of ${father}, a student of ${cls}, participated in ${sport} held on ${eventDate} and secured ${position}.`,
      leaving: (name, father, cls, dob, admissionDate, leavingDate, conduct, reason) =>
        `This is to certify that ${name}, son/daughter of ${father}, was a student of this institution (${cls}) from ${admissionDate} to ${leavingDate}. Date of birth: ${dob}. Conduct during this period was ${conduct}. Reason for leaving: ${reason}.`,
    },
  },
  ur: {
    tagline: "اسکول مینجمنٹ پورٹل",
    tabs: { admin: "انتظامیہ", teachers: "اساتذہ", students: "طلبہ", fees: "فیس", expenses: "اخراجات" },
    stats: { students: "طلبہ", teachers: "اساتذہ", staff: "عملہ (کل)", collected: "وصول شدہ فیس" },
    administrator: "اسکول ایڈمنسٹریٹر",
    addAdminStaff: "انتظامی عملہ شامل کریں",
    feeAlerts: "فیس کی یاد دہانی",
    directorySearch: "ڈائریکٹری تلاش کریں",
    searchAll: "طلبہ یا اساتذہ تلاش کریں",
    searchTeachers: "اساتذہ تلاش کریں",
    searchStudents: "اس جماعت میں طلبہ تلاش کریں",
    addTeacher: "استاد شامل کریں",
    addStudent: "طالب علم شامل کریں",
    saveChanges: "تبدیلیاں محفوظ کریں",
    cancel: "منسوخ کریں",
    add: "شامل کریں",
    markPaid: "ادا شدہ نشان زد کریں",
    due: "آخری تاریخ",
    collected: "وصول شدہ",
    outstanding: "باقی رقم",
    totalOutstanding: "کل باقی رقم",
    feeAmount: "رقم",
    paidOn: "ادائیگی کی تاریخ",
    statusLabel: "حیثیت",
    editDetails: "تفصیلات میں ترمیم کریں",
    classesHeading: "جماعتیں",
    addClass: "جماعت شامل کریں",
    classFeeLabel: "جماعت کی فیس (ماہانہ)",
    saveApply: "محفوظ کریں اور غیر ادا شدہ مہینوں پر لاگو کریں",
    studentsInClass: "طلبہ",
    monthlyRecord: "ماہانہ فیس کا ریکارڈ",
    otherFees: "دیگر فیسیں",
    addOtherFee: "دیگر فیس شامل کریں",
    typeLabel: "فیس کی قسم",
    customFeeName: "فیس کا نام",
    otherFeeTypes: { admission: "داخلہ فیس", exam: "امتحانی فیس", promotion: "پروموشن فیس", custom: "دیگر" },
    months: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"],
    fields: {
      name: "پورا نام",
      subject: "مضمون",
      role: "عہدہ",
      phone: "فون نمبر",
      email: "ای میل",
      guardian: "سرپرست کا نام",
      guardianPhone: "سرپرست کا فون",
      className: "جماعت کا نام",
      classFee: "جماعت کی فیس (ماہانہ)",
      fatherName: "والد کا نام",
    },
    status: { paid: "ادا شدہ", pending: "زیر التوا", overdue: "میعاد گزشتہ" },
    guardianLabel: "سرپرست",
    certificatesHeading: "طلبہ کے سرٹیفکیٹ",
    selectStudentPlaceholder: "طالب علم منتخب کریں",
    fatherName: "والد کا نام",
    dateOfIssue: "اجراء کی تاریخ",
    printCertificate: "سرٹیفکیٹ پرنٹ کریں",
    certifyIntro: "یہ سرٹیفائی کیا جاتا ہے کہ",
    sonDaughterOf: "ولد/بنت",
    isStudentOf: "کا طالب علم ہے",
    principalSignature: "پرنسپل کے دستخط",
    certificateTypeLabel: "سرٹیفکیٹ کی قسم",
    certTypes: {
      general: "تصدیقی / تعلیمی سرٹیفکیٹ",
      character: "کریکٹر سرٹیفکیٹ",
      sports: "کھیلوں کا سرٹیفکیٹ",
      leaving: "اسکول چھوڑنے کا سرٹیفکیٹ",
    },
    conductLabel: "کردار",
    conductOptions: { excellent: "عمدہ", good: "اچھا", satisfactory: "تسلی بخش" },
    sportNameLabel: "کھیل / ایونٹ کا نام",
    positionLabel: "پوزیشن / کارکردگی",
    eventDateLabel: "ایونٹ کی تاریخ",
    dobLabel: "تاریخ پیدائش",
    admissionDateLabel: "داخلے کی تاریخ",
    leavingDateLabel: "اسکول چھوڑنے کی تاریخ",
    reasonLabel: "اسکول چھوڑنے کی وجہ",
    salariesHeading: "اساتذہ کی تنخواہ",
    salaryAmountLabel: "تنخواہ کی رقم",
    paymentMethodLabel: "ادائیگی کا طریقہ",
    methodBank: "بینک اکاؤنٹ میں بھیجیں",
    methodCash: "نقد",
    methodEasypaisa: "ایزی پیسہ",
    paySalary: "تنخواہ ادا کریں",
    salaryPaid: "تنخواہ ادا ہو چکی",
    expensesHeading: "اخراجات",
    teacherSalariesSection: "اساتذہ کی تنخواہ",
    otherExpensesSection: "دیگر اخراجات",
    purposeLabel: "مقصد",
    addExpense: "خرچہ شامل کریں",
    accountNoLabel: "اکاؤنٹ / موبائل نمبر",
    sendToAccount: "اکاؤنٹ میں بھیجیں",
    totalPaidLabel: "کل ادا شدہ",
    totalPendingLabel: "کل باقی",
    certText: {
      general: (name, father, cls) =>
        `یہ سرٹیفائی کیا جاتا ہے کہ ${name} ولد/بنت ${father} اس ادارے میں جماعت ${cls} کے طالب علم ہیں۔`,
      character: (name, father, cls, conduct) =>
        `یہ سرٹیفائی کیا جاتا ہے کہ ${name} ولد/بنت ${father} اس ادارے میں جماعت ${cls} کے طالب علم ہیں۔ ادارے میں قیام کے دوران ان کا کردار اور اخلاق ${conduct} پایا گیا۔`,
      sports: (name, father, cls, sport, position, eventDate) =>
        `یہ سرٹیفائی کیا جاتا ہے کہ ${name} ولد/بنت ${father}، جماعت ${cls} کے طالب علم، نے ${eventDate} کو منعقدہ ${sport} میں شرکت کی اور ${position} حاصل کی۔`,
      leaving: (name, father, cls, dob, admissionDate, leavingDate, conduct, reason) =>
        `یہ سرٹیفائی کیا جاتا ہے کہ ${name} ولد/بنت ${father} اس ادارے میں جماعت ${cls} تک زیر تعلیم رہے۔ داخلے کی تاریخ ${admissionDate} اور اسکول چھوڑنے کی تاریخ ${leavingDate} ہے۔ تاریخ پیدائش: ${dob}۔ اس عرصے میں ان کا کردار ${conduct} رہا۔ اسکول چھوڑنے کی وجہ: ${reason}۔`,
    },
  },
  ar: {
    tagline: "بوابة إدارة المدرسة",
    tabs: { admin: "الإدارة", teachers: "المعلمون", students: "الطلاب", fees: "الرسوم", expenses: "المصروفات" },
    stats: { students: "الطلاب", teachers: "المعلمون", staff: "الموظفون (الإجمالي)", collected: "الرسوم المحصلة" },
    administrator: "مسؤول المدرسة",
    addAdminStaff: "إضافة موظف إداري",
    feeAlerts: "تنبيهات الرسوم",
    directorySearch: "بحث في الدليل",
    searchAll: "ابحث عن طالب أو معلم",
    searchTeachers: "ابحث عن معلم",
    searchStudents: "ابحث عن طالب في هذا الصف",
    addTeacher: "إضافة معلم",
    addStudent: "إضافة طالب",
    saveChanges: "حفظ التغييرات",
    cancel: "إلغاء",
    add: "إضافة",
    markPaid: "تحديد كمدفوع",
    due: "الاستحقاق",
    collected: "المحصّل",
    outstanding: "المتبقي",
    totalOutstanding: "إجمالي المتبقي",
    feeAmount: "المبلغ",
    paidOn: "تاريخ الدفع",
    statusLabel: "الحالة",
    editDetails: "تعديل التفاصيل",
    classesHeading: "الصفوف",
    addClass: "إضافة صف",
    classFeeLabel: "رسوم الصف (شهرية)",
    saveApply: "حفظ وتطبيق على الأشهر غير المدفوعة",
    studentsInClass: "طلاب",
    monthlyRecord: "سجل الرسوم الشهري",
    otherFees: "رسوم أخرى",
    addOtherFee: "إضافة رسم آخر",
    typeLabel: "نوع الرسم",
    customFeeName: "اسم الرسم",
    otherFeeTypes: { admission: "رسوم القبول", exam: "رسوم الامتحان", promotion: "رسوم الترفيع", custom: "أخرى" },
    months: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    fields: {
      name: "الاسم الكامل",
      subject: "المادة",
      role: "المنصب",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      guardian: "اسم ولي الأمر",
      guardianPhone: "هاتف ولي الأمر",
      className: "اسم الصف",
      classFee: "رسوم الصف (شهرية)",
      fatherName: "اسم الأب",
    },
    status: { paid: "مدفوع", pending: "قيد الانتظار", overdue: "متأخر" },
    guardianLabel: "ولي الأمر",
    certificatesHeading: "شهادات الطلاب",
    selectStudentPlaceholder: "اختر طالبًا",
    fatherName: "اسم الأب",
    dateOfIssue: "تاريخ الإصدار",
    printCertificate: "طباعة الشهادة",
    certifyIntro: "تشهد هذه المدرسة بأن",
    sonDaughterOf: "ابن/ابنة",
    isStudentOf: "طالب في",
    principalSignature: "توقيع المدير",
    certificateTypeLabel: "نوع الشهادة",
    certTypes: {
      general: "شهادة قيد / دراسة",
      character: "شهادة حسن سيرة وسلوك",
      sports: "شهادة رياضية",
      leaving: "شهادة ترك المدرسة",
    },
    conductLabel: "السلوك",
    conductOptions: { excellent: "ممتاز", good: "جيد", satisfactory: "مُرضٍ" },
    sportNameLabel: "اسم الرياضة / الفعالية",
    positionLabel: "المركز / الإنجاز",
    eventDateLabel: "تاريخ الفعالية",
    dobLabel: "تاريخ الميلاد",
    admissionDateLabel: "تاريخ الالتحاق",
    leavingDateLabel: "تاريخ المغادرة",
    reasonLabel: "سبب المغادرة",
    salariesHeading: "رواتب المعلمين",
    salaryAmountLabel: "مبلغ الراتب",
    paymentMethodLabel: "طريقة الدفع",
    methodBank: "تحويل بنكي",
    methodCash: "نقدًا",
    methodEasypaisa: "إيزي بيسة",
    paySalary: "دفع الراتب",
    salaryPaid: "تم دفع الراتب",
    expensesHeading: "المصروفات",
    teacherSalariesSection: "رواتب المعلمين",
    otherExpensesSection: "مصروفات أخرى",
    purposeLabel: "الغرض",
    addExpense: "إضافة مصروف",
    accountNoLabel: "رقم الحساب / الجوال",
    sendToAccount: "إرسال إلى الحساب",
    totalPaidLabel: "إجمالي المدفوع",
    totalPendingLabel: "إجمالي المتبقي",
    certText: {
      general: (name, father, cls) =>
        `تشهد هذه المدرسة بأن ${name}، ابن/ابنة ${father}، طالب في ${cls}.`,
      character: (name, father, cls, conduct) =>
        `تشهد هذه المدرسة بأن ${name}، ابن/ابنة ${father}، طالب في ${cls}. وخلال فترة دراسته، وُجد سلوكه وأخلاقه ${conduct}.`,
      sports: (name, father, cls, sport, position, eventDate) =>
        `تشهد هذه المدرسة بأن ${name}، ابن/ابنة ${father}، طالب في ${cls}، قد شارك في ${sport} المقامة بتاريخ ${eventDate} وحصل على ${position}.`,
      leaving: (name, father, cls, dob, admissionDate, leavingDate, conduct, reason) =>
        `تشهد هذه المدرسة بأن ${name}، ابن/ابنة ${father}، كان طالبًا في ${cls} من تاريخ الالتحاق ${admissionDate} حتى تاريخ المغادرة ${leavingDate}. تاريخ الميلاد: ${dob}. وكان سلوكه خلال هذه الفترة ${conduct}. سبب المغادرة: ${reason}.`,
    },
  },
};

const LANGS = [
  { key: "en", label: "English" },
  { key: "ur", label: "اردو" },
  { key: "ar", label: "العربية" },
];

// ---------- currency ----------
const CURRENCIES = [
  { key: "PKR", label: "Rs (PKR)", symbol: "Rs" },
  { key: "USD", label: "$ (USD)", symbol: "$" },
  { key: "SAR", label: "SAR", symbol: "SAR" },
];
const CurrencyContext = createContext({ symbol: "Rs", fmt: (n) => "Rs " + Number(n || 0).toLocaleString() });

// ---------- fee ledger seed helpers ----------
const CURRENT_MONTH_INDEX = 8; // September (0-based)

function buildLedger(monthlyFee, paidThrough, lateStatus) {
  const arr = [];
  for (let i = 0; i < 12; i++) {
    let status;
    let paidDate = null;
    if (i <= paidThrough) {
      status = "paid";
      paidDate = `2026-${pad2(i + 1)}-08`;
    } else if (i <= CURRENT_MONTH_INDEX) {
      status = lateStatus;
    } else {
      status = "pending";
    }
    arr.push({ id: "m" + i, monthIndex: i, amount: monthlyFee, status, paidDate });
  }
  return arr;
}
function buildOtherFees(sid, examStatus) {
  return [
    { id: sid + "-admission", typeKey: "admission", label: "", amount: 500, status: "paid", paidDate: "2026-01-10" },
    { id: sid + "-exam", typeKey: "exam", label: "", amount: 150, status: examStatus, paidDate: examStatus === "paid" ? "2026-06-12" : null },
    { id: sid + "-promotion", typeKey: "promotion", label: "", amount: 200, status: "pending", paidDate: null },
  ];
}
function buildSalaryLedger(monthlyAmount, paidThrough) {
  const arr = [];
  for (let i = 0; i < 12; i++) {
    let status = "pending";
    let paidDate = null;
    let method = "bank";
    let accountNo = "";
    if (i <= paidThrough) {
      status = "paid";
      paidDate = `2026-${pad2(i + 1)}-05`;
      accountNo = "PK00BANK0001" + (2200 + i);
    }
    arr.push({ id: "sm" + i, monthIndex: i, amount: monthlyAmount, status, paidDate, method, accountNo });
  }
  return arr;
}
function methodLabel(m, t) {
  if (m === "bank") return t.methodBank;
  if (m === "easypaisa") return t.methodEasypaisa;
  return t.methodCash;
}

// ---------- seed data ----------
const SEED_CLASSES = [
  { id: "c1", name: "Grade 8 - A", fee: 100 },
  { id: "c2", name: "Grade 8 - B", fee: 100 },
  { id: "c3", name: "Grade 9 - A", fee: 113 },
  { id: "c4", name: "Grade 9 - B", fee: 113 },
  { id: "c5", name: "Grade 10 - A", fee: 125 },
];

const SEED_TEACHERS = [
  { id: "t1", name: "Miriam Okafor", subject: "Mathematics", role: "Head of Department", phone: "+1 (555) 201-4487", email: "m.okafor@greenfield.edu", photo: null, salaryLedger: buildSalaryLedger(3200, 8) },
  { id: "t2", name: "Daniel Herrera", subject: "Physics", role: "Senior Teacher", phone: "+1 (555) 201-3392", email: "d.herrera@greenfield.edu", photo: null, salaryLedger: buildSalaryLedger(3000, 8) },
  { id: "t3", name: "Amara Singh", subject: "English Literature", role: "Senior Teacher", phone: "+1 (555) 201-7710", email: "a.singh@greenfield.edu", photo: null, salaryLedger: buildSalaryLedger(2900, 5) },
  { id: "t4", name: "Kofi Mensah", subject: "History", role: "Teacher", phone: "+1 (555) 201-5563", email: "k.mensah@greenfield.edu", photo: null, salaryLedger: buildSalaryLedger(2600, 5) },
  { id: "t5", name: "Elena Petrova", subject: "Biology", role: "Teacher", phone: "+1 (555) 201-9021", email: "e.petrova@greenfield.edu", photo: null, salaryLedger: buildSalaryLedger(2700, 6) },
  { id: "t6", name: "Sheraz Ahmad", subject: "Mathematics", role: "Teacher", phone: "+92 300 0000000", email: "s.ahmad@greenfield.edu", photo: "data:image/jpeg;base64,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", salaryLedger: buildSalaryLedger(2500, 4) },
];

const SEED_STUDENTS = [
  { id: "s1", name: "Liam Chen", classId: "c1", guardian: "Wen Chen", fatherName: "Wen Chen", phone: "+1 (555) 330-1120", photo: null, feeRecord: { monthly: buildLedger(100, 7, "pending"), other: buildOtherFees("s1", "paid") } },
  { id: "s2", name: "Sofia Ramirez", classId: "c1", guardian: "Carla Ramirez", fatherName: "Carla Ramirez", phone: "+1 (555) 330-2245", photo: null, feeRecord: { monthly: buildLedger(100, 6, "pending"), other: buildOtherFees("s2", "pending") } },
  { id: "s3", name: "Noah Williams", classId: "c2", guardian: "Grace Williams", fatherName: "Grace Williams", phone: "+1 (555) 330-4471", photo: null, feeRecord: { monthly: buildLedger(100, 5, "overdue"), other: buildOtherFees("s3", "pending") } },
  { id: "s4", name: "Aisha Bello", classId: "c3", guardian: "Tunde Bello", fatherName: "Tunde Bello", phone: "+1 (555) 330-6690", photo: null, feeRecord: { monthly: buildLedger(113, 7, "pending"), other: buildOtherFees("s4", "paid") } },
  { id: "s5", name: "Ethan Novak", classId: "c3", guardian: "Petra Novak", fatherName: "Petra Novak", phone: "+1 (555) 330-7712", photo: null, feeRecord: { monthly: buildLedger(113, 6, "pending"), other: buildOtherFees("s5", "pending") } },
  { id: "s6", name: "Priya Nair", classId: "c4", guardian: "Suresh Nair", fatherName: "Suresh Nair", phone: "+1 (555) 330-8801", photo: null, feeRecord: { monthly: buildLedger(113, 5, "overdue"), other: buildOtherFees("s6", "pending") } },
  { id: "s7", name: "Marcus Lee", classId: "c5", guardian: "Diane Lee", fatherName: "Diane Lee", phone: "+1 (555) 330-9934", photo: null, feeRecord: { monthly: buildLedger(125, 7, "pending"), other: buildOtherFees("s7", "paid") } },
  { id: "s8", name: "Isabella Conti", classId: "c5", guardian: "Marco Conti", fatherName: "Marco Conti", phone: "+1 (555) 330-1187", photo: null, feeRecord: { monthly: buildLedger(125, 7, "pending"), other: buildOtherFees("s8", "paid") } },
];

const SEED_EXPENSES = [
  { id: "e1", purpose: "Electricity bill", amount: 180, method: "bank", accountNo: "PK00BANK00019001", status: "paid", paidDate: "2026-08-05" },
  { id: "e2", purpose: "Building maintenance", amount: 250, method: "cash", accountNo: "", status: "pending", paidDate: null },
  { id: "e3", purpose: "Stationery & supplies", amount: 90, method: "cash", accountNo: "", status: "paid", paidDate: "2026-08-20" },
];

// ---------- small UI atoms ----------
function PhotoAvatar({ name, photo, size = 44, editable, onPhotoChange }) {
  const inputRef = useRef(null);
  const c = avatarColor(name);
  return (
    <div style={{ position: "relative", flexShrink: 0, width: size, height: size }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: c.bg,
          color: c.fg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: size * 0.36,
          overflow: "hidden",
          fontFamily: "Georgia, serif",
        }}
      >
        {photo ? (
          <img src={photo} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          initials(name)
        )}
      </div>
      {editable && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            title="Change photo"
            style={{
              position: "absolute",
              bottom: -2,
              right: -2,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: COLORS.brass,
              border: "2px solid " + COLORS.card,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Camera size={11} color="#fff" />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => onPhotoChange(reader.result);
              reader.readAsDataURL(file);
              e.target.value = "";
            }}
          />
        </>
      )}
    </div>
  );
}

function StatusBadge({ status, t }) {
  const map = {
    paid: { bg: COLORS.sageBg, fg: COLORS.sage },
    pending: { bg: COLORS.amberBg, fg: "#8A6323" },
    overdue: { bg: COLORS.roseBg, fg: COLORS.rose },
  };
  const s = map[status];
  return (
    <span style={{ background: s.bg, color: s.fg, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, whiteSpace: "nowrap" }}>
      {t.status[status]}
    </span>
  );
}

function Card({ children, style, onClick }) {
  return (
    <div onClick={onClick} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, ...style }}>
      {children}
    </div>
  );
}

function IconBtn({ onClick, children, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: "transparent",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 8,
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: COLORS.forest,
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

function TextField({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 8,
        padding: "8px 10px",
        fontSize: 14,
        fontFamily: "inherit",
        color: COLORS.ink,
        background: "#FCFBF8",
        boxSizing: "border-box",
      }}
    />
  );
}

function BackButton({ onClick, dir }) {
  const Icon = dir === "rtl" ? ArrowRight : ArrowLeft;
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "transparent",
        border: "none",
        color: COLORS.forest,
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        padding: "4px 0",
        marginBottom: 12,
      }}
    >
      <Icon size={16} />
    </button>
  );
}

// ---------- big photo card (used for Teachers grid) ----------
function TeacherCard({ person, fields, onSave, onDelete, t }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(person);
  const inputRef = useRef(null);
  const c = avatarColor(person.name);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onSave({ ...person, photo: reader.result });
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  if (editing) {
    return (
      <Card style={{ marginBottom: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {fields.map((f) => (
            <div key={f.key}>
              <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{f.label}</div>
              <TextField value={draft[f.key] ?? ""} onChange={(v) => setDraft({ ...draft, [f.key]: v })} />
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button
              onClick={() => {
                onSave(draft);
                setEditing(false);
              }}
              style={{
                flex: 1,
                background: COLORS.forest,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 0",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <Check size={14} /> {t.saveChanges}
            </button>
            <button
              onClick={() => {
                setDraft(person);
                setEditing(false);
              }}
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: "8px 10px",
                fontSize: 13,
                cursor: "pointer",
                color: COLORS.ink,
              }}
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1",
          borderRadius: 14,
          overflow: "hidden",
          background: c.bg,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {person.photo ? (
            <img src={person.photo} alt={person.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 40, color: c.fg }}>{initials(person.name)}</span>
          )}
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          title="Change photo"
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: COLORS.brass,
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Camera size={15} color="#fff" />
        </button>
        <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
      </div>

      <div style={{ textAlign: "center", marginTop: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.ink }}>{person.name}</div>
        {person.subject && <div style={{ fontSize: 12, color: COLORS.brass, fontWeight: 600, marginTop: 1 }}>{person.subject}</div>}
        {person.role && <div style={{ fontSize: 11, color: COLORS.sub, marginTop: 1 }}>{person.role}</div>}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 6 }}>
        <IconBtn title="Edit" onClick={() => { setDraft(person); setEditing(true); }}>
          <Pencil size={13} />
        </IconBtn>
        {onDelete && (
          <IconBtn title="Remove" onClick={() => onDelete(person.id)}>
            <X size={13} />
          </IconBtn>
        )}
      </div>
    </div>
  );
}

// ---------- contact row (inline editable, with photo slot) ----------
function ContactRow({ person, fields, onSave, onDelete, t }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(person);

  function setPhoto(photo) {
    onSave({ ...person, photo });
  }

  if (editing) {
    return (
      <Card style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {fields.map((f) => (
            <div key={f.key}>
              <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{f.label}</div>
              <TextField value={draft[f.key] ?? ""} onChange={(v) => setDraft({ ...draft, [f.key]: v })} />
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button
              onClick={() => {
                onSave(draft);
                setEditing(false);
              }}
              style={{
                flex: 1,
                background: COLORS.forest,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 0",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <Check size={14} /> {t.saveChanges}
            </button>
            <button
              onClick={() => {
                setDraft(person);
                setEditing(false);
              }}
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                cursor: "pointer",
                color: COLORS.ink,
              }}
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <PhotoAvatar name={person.name} photo={person.photo} editable onPhotoChange={setPhoto} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.ink }}>{person.name}</div>
          {(person.subject || person.grade) && (
            <div style={{ fontSize: 13, color: COLORS.brass, fontWeight: 600, marginTop: 1 }}>
              {person.subject || person.grade}
            </div>
          )}
          {person.role && <div style={{ fontSize: 12, color: COLORS.sub, marginTop: 1 }}>{person.role}</div>}
          {person.guardian && (
            <div style={{ fontSize: 12, color: COLORS.sub, marginTop: 1 }}>
              {t.guardianLabel}: {person.guardian}
            </div>
          )}
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ fontSize: 13, color: COLORS.ink, display: "flex", alignItems: "center", gap: 6 }}>
              <Phone size={13} color={COLORS.sub} /> {person.phone}
            </div>
            {person.email && (
              <div style={{ fontSize: 13, color: COLORS.ink, display: "flex", alignItems: "center", gap: 6 }}>
                <Mail size={13} color={COLORS.sub} /> {person.email}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <IconBtn title="Edit" onClick={() => setEditing(true)}>
            <Pencil size={14} />
          </IconBtn>
          {onDelete && (
            <IconBtn title="Remove" onClick={() => onDelete(person.id)}>
              <X size={14} />
            </IconBtn>
          )}
        </div>
      </div>
    </Card>
  );
}

// ---------- generic add-record form ----------
function AddForm({ fields, onAdd, onCancel, title, t }) {
  const [draft, setDraft] = useState({});
  return (
    <Card style={{ marginBottom: 14, background: "#FCFBF8" }}>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: COLORS.forest }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {fields.map((f) => (
          <div key={f.key}>
            <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{f.label}</div>
            <TextField value={draft[f.key] ?? ""} onChange={(v) => setDraft({ ...draft, [f.key]: v })} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button
            onClick={() => {
              if (!draft.name) return;
              onAdd(draft);
              setDraft({});
            }}
            style={{
              flex: 1,
              background: COLORS.brass,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 0",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t.add}
          </button>
          <button
            onClick={onCancel}
            style={{
              background: "transparent",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 13,
              cursor: "pointer",
              color: COLORS.ink,
            }}
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </Card>
  );
}

// ---------- class card (used in Students & Fees class lists) ----------
function ClassCard({ cls, studentCount, collected, outstanding, onClick, t }) {
  const { fmt } = useContext(CurrencyContext);
  return (
    <Card onClick={onClick} style={{ marginBottom: 10, cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: COLORS.amberBg,
            color: COLORS.brass,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Users size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{cls.name}</div>
          <div style={{ fontSize: 12, color: COLORS.sub, marginTop: 2 }}>
            {studentCount} {t.studentsInClass}
          </div>
          {collected !== undefined && (
            <div style={{ fontSize: 12, color: COLORS.sub, marginTop: 2 }}>
              {t.collected} {fmt(collected)} &middot; {t.outstanding} {fmt(outstanding)}
            </div>
          )}
        </div>
        <ChevronDown size={16} color={COLORS.sub} style={{ transform: "rotate(-90deg)" }} />
      </div>
    </Card>
  );
}

// ---------- class-level fee editor (used inside Fees > class view) ----------
function ClassFeeEditor({ cls, onApply, t }) {
  const [value, setValue] = useState(cls.fee);
  return (
    <Card style={{ marginBottom: 16, background: "#FCFBF8" }}>
      <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.classFeeLabel}</div>
      <div style={{ display: "flex", gap: 8 }}>
        <TextField type="number" value={value} onChange={setValue} />
      </div>
      <button
        onClick={() => onApply(Number(value) || 0)}
        style={{
          marginTop: 8,
          width: "100%",
          background: COLORS.brass,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "9px 0",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {t.saveApply}
      </button>
    </Card>
  );
}

// ---------- one line item inside a student's fee ledger (month or other fee) ----------
function FeeLineItem({ label, item, onSave, onDelete, editableLabel, t }) {
  const { fmt } = useContext(CurrencyContext);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item);
  const [draftLabel, setDraftLabel] = useState(label);

  function startEdit(e) {
    e.stopPropagation();
    setDraft(item);
    setDraftLabel(label);
    setEditing(true);
  }
  function save(e) {
    e.stopPropagation();
    const upd = { ...draft, amount: Number(draft.amount) || 0 };
    if (editableLabel) upd.label = draftLabel;
    onSave(upd);
    setEditing(false);
  }
  function cancelEdit(e) {
    e.stopPropagation();
    setDraft(item);
    setEditing(false);
  }
  function quickMarkPaid(e) {
    e.stopPropagation();
    onSave({ ...item, status: "paid", paidDate: "2026-09-11" });
  }

  if (editing) {
    return (
      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10, marginBottom: 6, background: "#FCFBF8" }} onClick={(e) => e.stopPropagation()}>
        {editableLabel && (
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.customFeeName}</div>
            <TextField value={draftLabel} onChange={setDraftLabel} />
          </div>
        )}
        <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.feeAmount}</div>
            <TextField type="number" value={draft.amount} onChange={(v) => setDraft({ ...draft, amount: v })} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.paidOn}</div>
            <TextField type="date" value={draft.paidDate || ""} onChange={(v) => setDraft({ ...draft, paidDate: v })} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {["paid", "pending", "overdue"].map((st) => (
            <button
              key={st}
              onClick={() => setDraft({ ...draft, status: st })}
              style={{
                flex: 1,
                padding: "6px 0",
                borderRadius: 8,
                border: `1px solid ${draft.status === st ? COLORS.forest : COLORS.border}`,
                background: draft.status === st ? COLORS.forest : "transparent",
                color: draft.status === st ? "#fff" : COLORS.ink,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t.status[st]}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={save}
            style={{
              flex: 1,
              background: COLORS.forest,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "7px 0",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Check size={12} /> {t.saveChanges}
          </button>
          <button
            onClick={cancelEdit}
            style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "7px 10px", fontSize: 12, cursor: "pointer", color: COLORS.ink }}
          >
            {t.cancel}
          </button>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              style={{ background: "transparent", border: `1px solid ${COLORS.rose}`, color: COLORS.rose, borderRadius: 8, padding: "7px 10px", cursor: "pointer" }}
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }} onClick={(e) => e.stopPropagation()}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
        {item.status === "paid" && item.paidDate && (
          <div style={{ fontSize: 11, color: COLORS.sub, marginTop: 1 }}>
            {t.paidOn}: {item.paidDate}
          </div>
        )}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{fmt(item.amount)}</div>
      <StatusBadge status={item.status} t={t} />
      {item.status !== "paid" && (
        <button onClick={quickMarkPaid} title={t.markPaid} style={{ background: "transparent", border: "none", color: COLORS.sage, cursor: "pointer", padding: 3 }}>
          <Check size={14} />
        </button>
      )}
      {item.status !== "paid" && (
        <button onClick={startEdit} style={{ background: "transparent", border: "none", color: COLORS.forest, cursor: "pointer", padding: 3 }}>
          <Pencil size={13} />
        </button>
      )}
    </div>
  );
}

// ---------- form to add a new "other fee" (admission / exam / promotion / custom) ----------
function AddOtherFeeForm({ onAdd, onCancel, t }) {
  const [type, setType] = useState("admission");
  const [amount, setAmount] = useState("");
  const [customLabel, setCustomLabel] = useState("");
  const types = ["admission", "exam", "promotion", "custom"];
  return (
    <Card style={{ marginBottom: 10, background: "#FCFBF8" }}>
      <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 6 }}>{t.typeLabel}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {types.map((ty) => (
          <button
            key={ty}
            onClick={() => setType(ty)}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: `1px solid ${type === ty ? COLORS.forest : COLORS.border}`,
              background: type === ty ? COLORS.forest : "transparent",
              color: type === ty ? "#fff" : COLORS.ink,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t.otherFeeTypes[ty]}
          </button>
        ))}
      </div>
      {type === "custom" && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.customFeeName}</div>
          <TextField value={customLabel} onChange={setCustomLabel} />
        </div>
      )}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.feeAmount}</div>
        <TextField type="number" value={amount} onChange={setAmount} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => {
            if (!amount) return;
            onAdd({ typeKey: type, label: type === "custom" ? customLabel : "", amount: Number(amount) || 0 });
          }}
          style={{ flex: 1, background: COLORS.brass, color: "#fff", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          {t.add}
        </button>
        <button onClick={onCancel} style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer", color: COLORS.ink }}>
          {t.cancel}
        </button>
      </div>
    </Card>
  );
}

// ---------- full fee card for one student: monthly ledger + other fees ----------
function FeeStudentCard({ student, onPhotoChange, onUpdateMonth, onUpdateOther, onAddOther, onDeleteOther, t }) {
  const { fmt } = useContext(CurrencyContext);
  const [open, setOpen] = useState(false);
  const [showAddOther, setShowAddOther] = useState(false);

  const outstanding = useMemo(() => {
    const mo = student.feeRecord.monthly.filter((m) => m.status !== "paid").reduce((a, m) => a + m.amount, 0);
    const oo = student.feeRecord.other.filter((o) => o.status !== "paid").reduce((a, o) => a + o.amount, 0);
    return mo + oo;
  }, [student]);

  return (
    <Card style={{ marginBottom: 10 }}>
      <div onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <PhotoAvatar name={student.name} photo={student.photo} size={40} editable onPhotoChange={onPhotoChange} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{student.name}</div>
          <div style={{ fontSize: 12, color: outstanding > 0 ? COLORS.rose : COLORS.sage, fontWeight: 600, marginTop: 2 }}>
            {t.totalOutstanding}: {fmt(outstanding)}
          </div>
        </div>
        {open ? <ChevronUp size={16} color={COLORS.sub} /> : <ChevronDown size={16} color={COLORS.sub} />}
      </div>

      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.forest, marginBottom: 4 }}>{t.monthlyRecord}</div>
          {student.feeRecord.monthly.map((item) => (
            <FeeLineItem key={item.id} label={t.months[item.monthIndex]} item={item} onSave={(upd) => onUpdateMonth(item.id, upd)} t={t} />
          ))}

          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.forest, margin: "14px 0 4px" }}>{t.otherFees}</div>
          {student.feeRecord.other.map((item) => (
            <FeeLineItem
              key={item.id}
              label={item.typeKey === "custom" ? item.label : t.otherFeeTypes[item.typeKey]}
              item={item}
              editableLabel={item.typeKey === "custom"}
              onSave={(upd) => onUpdateOther(item.id, upd)}
              onDelete={() => onDeleteOther(item.id)}
              t={t}
            />
          ))}

          {showAddOther ? (
            <div onClick={(e) => e.stopPropagation()}>
              <AddOtherFeeForm
                t={t}
                onCancel={() => setShowAddOther(false)}
                onAdd={(d) => {
                  onAddOther({ id: "o" + Date.now(), typeKey: d.typeKey, label: d.label, amount: d.amount, status: "pending", paidDate: null });
                  setShowAddOther(false);
                }}
              />
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAddOther(true);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100%",
                background: "transparent",
                border: `1px dashed ${COLORS.brass}`,
                color: COLORS.brass,
                borderRadius: 8,
                padding: "9px 0",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              <Plus size={14} /> {t.addOtherFee}
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

// ---------- printable student certificate ----------
function CertificateView({ student, className, fatherName, schoolNameText, logoImage, logoLetter, date, type, extra, t, dir }) {
  const bodyText = (() => {
    if (type === "character") {
      return t.certText.character(student.name, fatherName, className, t.conductOptions[extra.conduct]);
    }
    if (type === "sports") {
      return t.certText.sports(student.name, fatherName, className, extra.sportName || "—", extra.position || "—", extra.eventDate || date);
    }
    if (type === "leaving") {
      return t.certText.leaving(
        student.name,
        fatherName,
        className,
        extra.dob || "—",
        extra.admissionDate || "—",
        extra.leavingDate || date,
        t.conductOptions[extra.conduct],
        extra.reason || "—"
      );
    }
    return t.certText.general(student.name, fatherName, className);
  })();

  return (
    <div
      id="certificate-print-area"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#FFFDF8",
        border: `2px solid ${COLORS.brass}`,
        borderRadius: 6,
        padding: "28px 20px",
        textAlign: "center",
        fontFamily: "Georgia, serif",
      }}
      dir={dir}
    >
      {/* watermark logo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 220,
          height: 220,
          opacity: 0.08,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {logoImage ? (
          <img src={logoImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: 180, fontWeight: 700, color: COLORS.brass }}>{logoLetter}</span>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            width: 46,
            height: 46,
            margin: "0 auto 8px",
            borderRadius: 8,
            overflow: "hidden",
            background: COLORS.brass,
            color: "#2A1D0B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {logoImage ? (
            <img src={logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            logoLetter
          )}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.forest }}>{schoolNameText}</div>
        <div style={{ fontSize: 13, letterSpacing: 1, color: COLORS.brass, fontWeight: 700, margin: "6px 0 20px", textTransform: "uppercase" }}>
          {t.certTypes[type]}
        </div>

        <div style={{ fontSize: 14, color: COLORS.ink, lineHeight: 1.9, maxWidth: 480, margin: "0 auto", fontStyle: "italic" }}>{bodyText}</div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 40,
            paddingTop: 12,
            fontSize: 12,
            color: COLORS.sub,
          }}
        >
          <div>
            {t.dateOfIssue}: <strong style={{ color: COLORS.ink }}>{date}</strong>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ borderTop: `1px solid ${COLORS.ink}`, width: 120, marginBottom: 4 }} />
            {t.principalSignature}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- expense / salary line item (amount, method, account, status) ----------
function ExpenseLineItem({ label, item, onSave, onDelete, editableLabel, t }) {
  const { fmt } = useContext(CurrencyContext);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item);
  const [draftLabel, setDraftLabel] = useState(label);

  function startEdit(e) {
    e.stopPropagation();
    setDraft(item);
    setDraftLabel(label);
    setEditing(true);
  }
  function save(e) {
    e.stopPropagation();
    const upd = { ...draft, amount: Number(draft.amount) || 0 };
    if (editableLabel) upd.label = draftLabel;
    onSave(upd);
    setEditing(false);
  }
  function cancelEdit(e) {
    e.stopPropagation();
    setDraft(item);
    setEditing(false);
  }
  function quickMarkPaid(e) {
    e.stopPropagation();
    onSave({ ...item, status: "paid", paidDate: "2026-09-11" });
  }

  if (editing) {
    return (
      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10, marginBottom: 6, background: "#FCFBF8" }} onClick={(e) => e.stopPropagation()}>
        {editableLabel && (
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.purposeLabel}</div>
            <TextField value={draftLabel} onChange={setDraftLabel} />
          </div>
        )}
        <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.salaryAmountLabel}</div>
            <TextField type="number" value={draft.amount} onChange={(v) => setDraft({ ...draft, amount: v })} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.paidOn}</div>
            <TextField type="date" value={draft.paidDate || ""} onChange={(v) => setDraft({ ...draft, paidDate: v })} />
          </div>
        </div>
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.paymentMethodLabel}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["bank", "cash", "easypaisa"].map((m) => (
              <button
                key={m}
                onClick={() => setDraft({ ...draft, method: m })}
                style={{
                  flex: 1,
                  padding: "6px 0",
                  borderRadius: 8,
                  border: `1px solid ${draft.method === m ? COLORS.forest : COLORS.border}`,
                  background: draft.method === m ? COLORS.forest : "transparent",
                  color: draft.method === m ? "#fff" : COLORS.ink,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {methodLabel(m, t)}
              </button>
            ))}
          </div>
        </div>
        {(draft.method === "bank" || draft.method === "easypaisa") && (
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.accountNoLabel}</div>
            <TextField value={draft.accountNo || ""} onChange={(v) => setDraft({ ...draft, accountNo: v })} />
          </div>
        )}
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {["paid", "pending"].map((st) => (
            <button
              key={st}
              onClick={() => setDraft({ ...draft, status: st })}
              style={{
                flex: 1,
                padding: "6px 0",
                borderRadius: 8,
                border: `1px solid ${draft.status === st ? COLORS.forest : COLORS.border}`,
                background: draft.status === st ? COLORS.forest : "transparent",
                color: draft.status === st ? "#fff" : COLORS.ink,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t.status[st]}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={save}
            style={{
              flex: 1,
              background: COLORS.forest,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "7px 0",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Check size={12} /> {t.saveChanges}
          </button>
          <button
            onClick={cancelEdit}
            style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "7px 10px", fontSize: 12, cursor: "pointer", color: COLORS.ink }}
          >
            {t.cancel}
          </button>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              style={{ background: "transparent", border: `1px solid ${COLORS.rose}`, color: COLORS.rose, borderRadius: 8, padding: "7px 10px", cursor: "pointer" }}
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }} onClick={(e) => e.stopPropagation()}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 11, color: COLORS.sub, marginTop: 1 }}>
          {methodLabel(item.method, t)}
          {(item.method === "bank" || item.method === "easypaisa") && item.accountNo ? ` · ${item.accountNo}` : ""}
        </div>
        {item.status === "paid" && item.paidDate && (
          <div style={{ fontSize: 11, color: COLORS.sub, marginTop: 1 }}>
            {t.paidOn}: {item.paidDate}
          </div>
        )}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{fmt(item.amount)}</div>
      <StatusBadge status={item.status} t={t} />
      {item.status !== "paid" && (
        <button onClick={quickMarkPaid} title={t.markPaid} style={{ background: "transparent", border: "none", color: COLORS.sage, cursor: "pointer", padding: 3 }}>
          <Check size={14} />
        </button>
      )}
      {item.status !== "paid" && (
        <button onClick={startEdit} style={{ background: "transparent", border: "none", color: COLORS.forest, cursor: "pointer", padding: 3 }}>
          <Pencil size={13} />
        </button>
      )}
    </div>
  );
}

// ---------- form to add a new "other expense" (free-text purpose) ----------
function AddExpenseForm({ onAdd, onCancel, t }) {
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [accountNo, setAccountNo] = useState("");
  return (
    <Card style={{ marginBottom: 10, background: "#FCFBF8" }}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.purposeLabel}</div>
        <TextField value={purpose} onChange={setPurpose} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.salaryAmountLabel}</div>
        <TextField type="number" value={amount} onChange={setAmount} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.paymentMethodLabel}</div>
        <div style={{ display: "flex", gap: 6 }}>
          {["bank", "cash", "easypaisa"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 8,
                border: `1px solid ${method === m ? COLORS.forest : COLORS.border}`,
                background: method === m ? COLORS.forest : "transparent",
                color: method === m ? "#fff" : COLORS.ink,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {methodLabel(m, t)}
            </button>
          ))}
        </div>
      </div>
      {(method === "bank" || method === "easypaisa") && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.accountNoLabel}</div>
          <TextField value={accountNo} onChange={setAccountNo} />
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => {
            if (!purpose || !amount) return;
            onAdd({ purpose, amount: Number(amount) || 0, method, accountNo });
          }}
          style={{ flex: 1, background: COLORS.brass, color: "#fff", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          {t.add}
        </button>
        <button onClick={onCancel} style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer", color: COLORS.ink }}>
          {t.cancel}
        </button>
      </div>
    </Card>
  );
}

// ---------- full salary card for one teacher: 12-month ledger ----------
function TeacherSalaryLedgerCard({ teacher, onUpdateMonth, t, months }) {
  const { fmt } = useContext(CurrencyContext);
  const [open, setOpen] = useState(false);

  const outstanding = useMemo(
    () => teacher.salaryLedger.filter((m) => m.status !== "paid").reduce((a, m) => a + m.amount, 0),
    [teacher]
  );

  return (
    <Card style={{ marginBottom: 10 }}>
      <div onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <PhotoAvatar name={teacher.name} photo={teacher.photo} size={40} editable={false} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{teacher.name}</div>
          <div style={{ fontSize: 12, color: COLORS.sub, marginTop: 1 }}>{teacher.subject}</div>
          <div style={{ fontSize: 12, color: outstanding > 0 ? COLORS.rose : COLORS.sage, fontWeight: 600, marginTop: 2 }}>
            {t.totalPendingLabel}: {fmt(outstanding)}
          </div>
        </div>
        {open ? <ChevronUp size={16} color={COLORS.sub} /> : <ChevronDown size={16} color={COLORS.sub} />}
      </div>

      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
          {teacher.salaryLedger.map((item) => (
            <ExpenseLineItem key={item.id} label={months[item.monthIndex]} item={item} onSave={(upd) => onUpdateMonth(item.id, upd)} t={t} />
          ))}
        </div>
      )}
    </Card>
  );
}

// ---------- main app ----------
export default function SchoolPortal() {
  const [lang, setLang] = useState("en");
  const t = STRINGS[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  const [currency, setCurrency] = useState("PKR");
  const currencySymbol = CURRENCIES.find((c) => c.key === currency).symbol;
  const fmt = (n) => currencySymbol + " " + Number(n || 0).toLocaleString();

  const [schoolName, setSchoolName] = useState({
    en: "Iqra Islamic Education System",
    ur: "اقرا اسلامک ایجوکیشن سسٹم",
    ar: "نظام إقرأ للتعليم الإسلامي",
  });
  const [editingName, setEditingName] = useState(false);
  const [nameDraftAll, setNameDraftAll] = useState({ en: "", ur: "", ar: "" });
  const [logoLetter, setLogoLetter] = useState("I");
  const [logoImage, setLogoImage] = useState(DEFAULT_LOGO);
  const logoInputRef = useRef(null);

  const [adminStaff, setAdminStaff] = useState([
    { id: "admin1", name: "Robert Hayes", role: "Principal", phone: "+1 (555) 100-2200", email: "principal@greenfield.edu", photo: null },
  ]);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const [activeTab, setActiveTab] = useState("admin");
  const [teachers, setTeachers] = useState(SEED_TEACHERS);
  const [students, setStudents] = useState(SEED_STUDENTS);
  const [classes, setClasses] = useState(SEED_CLASSES);
  const [query, setQuery] = useState("");
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [otherExpenses, setOtherExpenses] = useState(SEED_EXPENSES);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const [studentsClassId, setStudentsClassId] = useState(null);
  const [feesClassId, setFeesClassId] = useState(null);
  const [certificateStudentId, setCertificateStudentId] = useState("");
  const [certificateDate, setCertificateDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [certificateType, setCertificateType] = useState("general");
  const [certExtra, setCertExtra] = useState({
    conduct: "good",
    sportName: "",
    position: "",
    eventDate: new Date().toISOString().slice(0, 10),
    dob: "",
    admissionDate: "",
    leavingDate: new Date().toISOString().slice(0, 10),
    reason: "",
  });

  function getClassName(classId) {
    return classes.find((c) => c.id === classId)?.name || "—";
  }

  function studentOutstanding(s) {
    const mo = s.feeRecord.monthly.filter((m) => m.status !== "paid").reduce((a, m) => a + m.amount, 0);
    const oo = s.feeRecord.other.filter((o) => o.status !== "paid").reduce((a, o) => a + o.amount, 0);
    return mo + oo;
  }
  function studentCollected(s) {
    const mc = s.feeRecord.monthly.filter((m) => m.status === "paid").reduce((a, m) => a + m.amount, 0);
    const oc = s.feeRecord.other.filter((o) => o.status === "paid").reduce((a, o) => a + o.amount, 0);
    return mc + oc;
  }
  function studentAlertStatus(s) {
    const hasOverdue = s.feeRecord.monthly.some((m) => m.status === "overdue") || s.feeRecord.other.some((o) => o.status === "overdue");
    if (hasOverdue) return "overdue";
    if (studentOutstanding(s) > 0) return "pending";
    return "paid";
  }

  const filteredTeachers = useMemo(
    () => teachers.filter((x) => x.name.toLowerCase().includes(query.toLowerCase())),
    [teachers, query]
  );
  const allFilteredStudents = useMemo(
    () => students.filter((x) => x.name.toLowerCase().includes(query.toLowerCase())),
    [students, query]
  );
  const classFilteredStudents = useMemo(
    () => students.filter((x) => x.classId === studentsClassId && x.name.toLowerCase().includes(query.toLowerCase())),
    [students, studentsClassId, query]
  );

  const feeStats = useMemo(() => {
    let collected = 0;
    let outstanding = 0;
    students.forEach((s) => {
      collected += studentCollected(s);
      outstanding += studentOutstanding(s);
    });
    const total = collected + outstanding;
    return { collected, outstanding, pct: total ? Math.round((collected / total) * 100) : 0 };
  }, [students]);

  function classFeeStats(classId) {
    const list = students.filter((s) => s.classId === classId);
    let collected = 0;
    let outstanding = 0;
    list.forEach((s) => {
      collected += studentCollected(s);
      outstanding += studentOutstanding(s);
    });
    return { count: list.length, collected, outstanding };
  }

  function updateTeacher(updated) {
    setTeachers((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
  }
  function updateAdminStaff(updated) {
    setAdminStaff((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
  }
  function addAdminStaff(d) {
    setAdminStaff((prev) => [
      ...prev,
      { id: "admin" + Date.now(), name: d.name, role: d.role || "Staff", phone: d.phone || "—", email: d.email || "—", photo: null },
    ]);
    setShowAddAdmin(false);
  }
  function removeAdminStaff(id) {
    setAdminStaff((prev) => prev.filter((x) => x.id !== id));
  }
  function updateStudent(updated) {
    setStudents((prev) => prev.map((x) => (x.id === updated.id ? { ...x, ...updated } : x)));
  }
  function updateMonth(studentId, monthId, updates) {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, feeRecord: { ...s.feeRecord, monthly: s.feeRecord.monthly.map((m) => (m.id === monthId ? { ...m, ...updates } : m)) } }
          : s
      )
    );
  }
  function updateOther(studentId, otherId, updates) {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, feeRecord: { ...s.feeRecord, other: s.feeRecord.other.map((o) => (o.id === otherId ? { ...o, ...updates } : o)) } }
          : s
      )
    );
  }
  function addOtherFee(studentId, item) {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, feeRecord: { ...s.feeRecord, other: [...s.feeRecord.other, item] } } : s))
    );
  }
  function deleteOtherFee(studentId, otherId) {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, feeRecord: { ...s.feeRecord, other: s.feeRecord.other.filter((o) => o.id !== otherId) } } : s
      )
    );
  }
  function addTeacher(d) {
    setTeachers((prev) => [
      ...prev,
      { id: "t" + Date.now(), name: d.name, subject: d.subject || "—", role: d.role || "Teacher", phone: d.phone || "—", email: d.email || "—", photo: null },
    ]);
    setShowAddTeacher(false);
  }
  function addStudent(d) {
    const cls = classes.find((c) => c.id === studentsClassId);
    const monthlyFee = cls?.fee || 100;
    setStudents((prev) => [
      ...prev,
      {
        id: "s" + Date.now(),
        name: d.name,
        classId: studentsClassId,
        guardian: d.guardian || "—",
        fatherName: d.fatherName || d.guardian || "—",
        phone: d.phone || "—",
        photo: null,
        feeRecord: {
          monthly: buildLedger(monthlyFee, -1, "pending"),
          other: [{ id: "o-admission-" + Date.now(), typeKey: "admission", label: "", amount: 500, status: "pending", paidDate: null }],
        },
      },
    ]);
    setShowAddStudent(false);
  }
  function removeTeacher(id) {
    setTeachers((prev) => prev.filter((x) => x.id !== id));
  }
  function removeStudent(id) {
    setStudents((prev) => prev.filter((x) => x.id !== id));
  }
  function addClass(d) {
    setClasses((prev) => [...prev, { id: "c" + Date.now(), name: d.name, fee: Number(d.fee) || 0 }]);
    setShowAddClass(false);
  }
  function applyClassFee(classId, amount) {
    setClasses((prev) => prev.map((c) => (c.id === classId ? { ...c, fee: amount } : c)));
    setStudents((prev) =>
      prev.map((s) =>
        s.classId === classId
          ? { ...s, feeRecord: { ...s.feeRecord, monthly: s.feeRecord.monthly.map((m) => (m.status !== "paid" ? { ...m, amount } : m)) } }
          : s
      )
    );
  }
  function updateSalaryMonth(teacherId, monthId, updates) {
    setTeachers((prev) =>
      prev.map((tc) => (tc.id === teacherId ? { ...tc, salaryLedger: tc.salaryLedger.map((m) => (m.id === monthId ? { ...m, ...updates } : m)) } : tc))
    );
  }
  function addExpense(d) {
    setOtherExpenses((prev) => [
      ...prev,
      { id: "e" + Date.now(), purpose: d.purpose, amount: d.amount, method: d.method, accountNo: d.accountNo || "", status: "pending", paidDate: null },
    ]);
    setShowAddExpense(false);
  }
  function updateExpense(id, updates) {
    setOtherExpenses((prev) => prev.map((ex) => (ex.id === id ? { ...ex, ...updates } : ex)));
  }
  function deleteExpense(id) {
    setOtherExpenses((prev) => prev.filter((ex) => ex.id !== id));
  }

  const totalStaff = teachers.length + adminStaff.length;

  const TABS = [
    { key: "admin", label: t.tabs.admin, icon: LayoutDashboard },
    { key: "teachers", label: t.tabs.teachers, icon: GraduationCap },
    { key: "students", label: t.tabs.students, icon: Users },
    { key: "fees", label: t.tabs.fees, icon: Wallet },
    { key: "expenses", label: t.tabs.expenses, icon: Banknote },
  ];

  return (
    <CurrencyContext.Provider value={{ symbol: currencySymbol, fmt }}>
    <div
      dir={dir}
      style={{
        background: COLORS.paper,
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, 'Noto Nastaliq Urdu', 'Noto Naskh Arabic', sans-serif",
        color: COLORS.ink,
        paddingBottom: 40,
      }}
    >
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #certificate-print-area, #certificate-print-area * { visibility: visible; }
          #certificate-print-area { position: absolute; top: 0; left: 0; width: 100%; }
        }
      `}</style>
      {/* Header */}
      <div style={{ background: COLORS.forest, padding: "16px 16px 22px", position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -20,
            right: dir === "rtl" ? "auto" : -20,
            left: dir === "rtl" ? -20 : "auto",
            width: 160,
            height: 160,
            opacity: 0.12,
            pointerEvents: "none",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {logoImage ? (
            <img src={logoImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 130, color: COLORS.brass }}>{logoLetter}</span>
          )}
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 8, position: "relative" }}>
          {LANGS.map((l) => (
            <button
              key={l.key}
              onClick={() => setLang(l.key)}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 14,
                border: "1px solid " + (lang === l.key ? COLORS.brass : "rgba(255,255,255,0.25)"),
                background: lang === l.key ? COLORS.brass : "transparent",
                color: lang === l.key ? "#2A1D0B" : "#EDE7D8",
                cursor: "pointer",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 14, position: "relative" }}>
          {CURRENCIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCurrency(c.key)}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 9px",
                borderRadius: 12,
                border: "1px solid " + (currency === c.key ? COLORS.brassLight : "rgba(255,255,255,0.2)"),
                background: currency === c.key ? "rgba(180,136,74,0.25)" : "transparent",
                color: currency === c.key ? COLORS.brassLight : "#C9C2B2",
                cursor: "pointer",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
            <div
              onClick={() => logoInputRef.current?.click()}
              title="Change logo"
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: COLORS.brass,
                color: "#2A1D0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                fontSize: 20,
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              {logoImage ? (
                <img src={logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                logoLetter
              )}
            </div>
            <div
              onClick={() => logoInputRef.current?.click()}
              style={{
                position: "absolute",
                bottom: -3,
                right: -3,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: COLORS.forestLight,
                border: "2px solid " + COLORS.forest,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Camera size={10} color="#EDE7D8" />
            </div>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => setLogoImage(reader.result);
                reader.readAsDataURL(file);
                e.target.value = "";
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {editingName ? (
              <div style={{ background: "rgba(0,0,0,0.18)", borderRadius: 8, padding: 10 }}>
                {LANGS.map((l) => (
                  <div key={l.key} style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 10, color: COLORS.brassLight, marginBottom: 2 }}>{l.label}</div>
                    <input
                      value={nameDraftAll[l.key]}
                      onChange={(e) => setNameDraftAll((prev) => ({ ...prev, [l.key]: e.target.value }))}
                      dir={l.key === "en" ? "ltr" : "rtl"}
                      style={{
                        width: "100%",
                        fontSize: 14,
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: "none",
                        background: "#FCFBF8",
                        color: COLORS.ink,
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                ))}
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <button
                    onClick={() => {
                      setSchoolName({
                        en: nameDraftAll.en || schoolName.en,
                        ur: nameDraftAll.ur || schoolName.ur,
                        ar: nameDraftAll.ar || schoolName.ar,
                      });
                      setEditingName(false);
                    }}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      background: COLORS.brass,
                      color: "#2A1D0B",
                      border: "none",
                      borderRadius: 6,
                      padding: "7px 0",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    <Check size={14} /> {t.saveChanges}
                  </button>
                  <button
                    onClick={() => setEditingName(false)}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.3)",
                      color: "#EDE7D8",
                      borderRadius: 6,
                      padding: "7px 12px",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  setNameDraftAll(schoolName);
                  setEditingName(true);
                }}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {schoolName[lang]}
                <Pencil size={13} color={COLORS.brassLight} />
              </div>
            )}
            <div style={{ fontSize: 12, color: COLORS.brassLight, marginTop: 2 }}>{t.tagline}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 18, overflowX: "auto", paddingBottom: 2, position: "relative" }}>
          {TABS.map((tb) => {
            const Icon = tb.icon;
            const active = activeTab === tb.key;
            return (
              <button
                key={tb.key}
                onClick={() => {
                  setActiveTab(tb.key);
                  setQuery("");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 20,
                  border: "none",
                  background: active ? COLORS.brass : "rgba(255,255,255,0.08)",
                  color: active ? "#2A1D0B" : "#EDE7D8",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <Icon size={14} /> {tb.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 16px 0" }}>
        {activeTab === "admin" && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.forest, fontFamily: "Georgia, serif" }}>{t.administrator}</div>
              <IconBtn title={t.addAdminStaff} onClick={() => setShowAddAdmin((v) => !v)}>
                <Plus size={16} />
              </IconBtn>
            </div>
            {showAddAdmin && (
              <AddForm
                title={t.addAdminStaff}
                onCancel={() => setShowAddAdmin(false)}
                onAdd={addAdminStaff}
                t={t}
                fields={[
                  { key: "name", label: t.fields.name },
                  { key: "role", label: t.fields.role },
                  { key: "phone", label: t.fields.phone },
                  { key: "email", label: t.fields.email },
                ]}
              />
            )}
            {adminStaff.map((a) => (
              <ContactRow
                key={a.id}
                person={a}
                onSave={updateAdminStaff}
                onDelete={adminStaff.length > 1 ? removeAdminStaff : undefined}
                t={t}
                fields={[
                  { key: "name", label: t.fields.name },
                  { key: "role", label: t.fields.role },
                  { key: "phone", label: t.fields.phone },
                  { key: "email", label: t.fields.email },
                ]}
              />
            ))}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18, marginBottom: 18 }}>
              {[
                { label: t.stats.students, value: students.length },
                { label: t.stats.teachers, value: teachers.length },
                { label: t.stats.staff, value: totalStaff },
                { label: t.stats.collected, value: feeStats.pct + "%" },
              ].map((s) => (
                <Card key={s.label}>
                  <div style={{ fontSize: 12, color: COLORS.sub, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: COLORS.forest }}>{s.value}</div>
                </Card>
              ))}
            </div>

            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.forest, marginBottom: 10, fontFamily: "Georgia, serif" }}>{t.feeAlerts}</div>
            {students
              .filter((s) => studentOutstanding(s) > 0)
              .sort((a, b) => studentOutstanding(b) - studentOutstanding(a))
              .slice(0, 4)
              .map((s) => (
                <Card key={s.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <PhotoAvatar name={s.name} photo={s.photo} size={36} editable onPhotoChange={(p) => updateStudent({ ...s, photo: p })} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: COLORS.sub }}>
                        {getClassName(s.classId)} &middot; {fmt(studentOutstanding(s))}
                      </div>
                    </div>
                    <StatusBadge status={studentAlertStatus(s)} t={t} />
                  </div>
                </Card>
              ))}

            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.forest, margin: "18px 0 10px", fontFamily: "Georgia, serif" }}>{t.directorySearch}</div>
            <div style={{ position: "relative", marginBottom: 12 }}>
              <Search size={15} color={COLORS.sub} style={{ position: "absolute", left: dir === "rtl" ? "auto" : 10, right: dir === "rtl" ? 10 : "auto", top: 10 }} />
              <div style={{ paddingLeft: dir === "rtl" ? 0 : 26, paddingRight: dir === "rtl" ? 26 : 0 }}>
                <TextField value={query} onChange={setQuery} placeholder={t.searchAll} />
              </div>
            </div>
            {query && (
              <>
                {filteredTeachers.map((x) => (
                  <ContactRow key={x.id} person={x} fields={[]} onSave={updateTeacher} t={t} />
                ))}
                {allFilteredStudents.map((x) => (
                  <ContactRow key={x.id} person={{ ...x, grade: getClassName(x.classId) }} fields={[]} onSave={updateStudent} t={t} />
                ))}
              </>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "22px 0 10px" }}>
              <Award size={16} color={COLORS.forest} />
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.forest, fontFamily: "Georgia, serif" }}>
                {t.certificatesHeading}
              </div>
            </div>
            <Card style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 4 }}>{t.certificateTypeLabel}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {["general", "character", "sports", "leaving"].map((ty) => (
                  <button
                    key={ty}
                    onClick={() => setCertificateType(ty)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: `1px solid ${certificateType === ty ? COLORS.forest : COLORS.border}`,
                      background: certificateType === ty ? COLORS.forest : "transparent",
                      color: certificateType === ty ? "#fff" : COLORS.ink,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {t.certTypes[ty]}
                  </button>
                ))}
              </div>

              <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 4 }}>{t.selectStudentPlaceholder}</div>
              <select
                value={certificateStudentId}
                onChange={(e) => setCertificateStudentId(e.target.value)}
                style={{
                  width: "100%",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "8px 10px",
                  fontSize: 14,
                  fontFamily: "inherit",
                  color: COLORS.ink,
                  background: "#FCFBF8",
                  boxSizing: "border-box",
                  marginBottom: 10,
                }}
              >
                <option value="">{t.selectStudentPlaceholder}</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {getClassName(s.classId)}
                  </option>
                ))}
              </select>

              {certificateStudentId && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.dateOfIssue}</div>
                    <TextField type="date" value={certificateDate} onChange={setCertificateDate} />
                  </div>

                  {(certificateType === "character" || certificateType === "leaving") && (
                    <div>
                      <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.conductLabel}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {["excellent", "good", "satisfactory"].map((c) => (
                          <button
                            key={c}
                            onClick={() => setCertExtra((prev) => ({ ...prev, conduct: c }))}
                            style={{
                              flex: 1,
                              padding: "6px 0",
                              borderRadius: 8,
                              border: `1px solid ${certExtra.conduct === c ? COLORS.forest : COLORS.border}`,
                              background: certExtra.conduct === c ? COLORS.forest : "transparent",
                              color: certExtra.conduct === c ? "#fff" : COLORS.ink,
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            {t.conductOptions[c]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {certificateType === "sports" && (
                    <>
                      <div>
                        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.sportNameLabel}</div>
                        <TextField value={certExtra.sportName} onChange={(v) => setCertExtra((p) => ({ ...p, sportName: v }))} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.positionLabel}</div>
                        <TextField value={certExtra.position} onChange={(v) => setCertExtra((p) => ({ ...p, position: v }))} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.eventDateLabel}</div>
                        <TextField type="date" value={certExtra.eventDate} onChange={(v) => setCertExtra((p) => ({ ...p, eventDate: v }))} />
                      </div>
                    </>
                  )}

                  {certificateType === "leaving" && (
                    <>
                      <div>
                        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.dobLabel}</div>
                        <TextField type="date" value={certExtra.dob} onChange={(v) => setCertExtra((p) => ({ ...p, dob: v }))} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.admissionDateLabel}</div>
                        <TextField type="date" value={certExtra.admissionDate} onChange={(v) => setCertExtra((p) => ({ ...p, admissionDate: v }))} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.leavingDateLabel}</div>
                        <TextField type="date" value={certExtra.leavingDate} onChange={(v) => setCertExtra((p) => ({ ...p, leavingDate: v }))} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: COLORS.sub, marginBottom: 3 }}>{t.reasonLabel}</div>
                        <TextField value={certExtra.reason} onChange={(v) => setCertExtra((p) => ({ ...p, reason: v }))} />
                      </div>
                    </>
                  )}
                </div>
              )}
            </Card>

            {certificateStudentId &&
              (() => {
                const s = students.find((x) => x.id === certificateStudentId);
                if (!s) return null;
                return (
                  <>
                    <CertificateView
                      student={s}
                      className={getClassName(s.classId)}
                      fatherName={s.fatherName || s.guardian}
                      schoolNameText={schoolName[lang]}
                      logoImage={logoImage}
                      logoLetter={logoLetter}
                      date={certificateDate}
                      type={certificateType}
                      extra={certExtra}
                      t={t}
                      dir={dir}
                    />
                    <button
                      onClick={() => window.print()}
                      style={{
                        marginTop: 12,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background: COLORS.forest,
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "11px 0",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <Printer size={16} /> {t.printCertificate}
                    </button>
                  </>
                );
              })()}
          </>
        )}

        {activeTab === "teachers" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={15} color={COLORS.sub} style={{ position: "absolute", left: dir === "rtl" ? "auto" : 10, right: dir === "rtl" ? 10 : "auto", top: 10 }} />
                <div style={{ paddingLeft: dir === "rtl" ? 0 : 26, paddingRight: dir === "rtl" ? 26 : 0 }}>
                  <TextField value={query} onChange={setQuery} placeholder={t.searchTeachers} />
                </div>
              </div>
              <IconBtn title={t.addTeacher} onClick={() => setShowAddTeacher((v) => !v)}>
                <Plus size={16} />
              </IconBtn>
            </div>
            {showAddTeacher && (
              <AddForm
                title={t.addTeacher}
                onCancel={() => setShowAddTeacher(false)}
                onAdd={addTeacher}
                t={t}
                fields={[
                  { key: "name", label: t.fields.name },
                  { key: "subject", label: t.fields.subject },
                  { key: "role", label: t.fields.role },
                  { key: "phone", label: t.fields.phone },
                  { key: "email", label: t.fields.email },
                ]}
              />
            )}
            {filteredTeachers.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {filteredTeachers.map((x) => (
                  <TeacherCard
                    key={x.id}
                    person={x}
                    onDelete={removeTeacher}
                    onSave={updateTeacher}
                    t={t}
                    fields={[
                      { key: "name", label: t.fields.name },
                      { key: "subject", label: t.fields.subject },
                      { key: "role", label: t.fields.role },
                      { key: "phone", label: t.fields.phone },
                      { key: "email", label: t.fields.email },
                    ]}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "students" && (
          <>
            {!studentsClassId ? (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.forest, fontFamily: "Georgia, serif" }}>{t.classesHeading}</div>
                  <IconBtn title={t.addClass} onClick={() => setShowAddClass((v) => !v)}>
                    <Plus size={16} />
                  </IconBtn>
                </div>
                {showAddClass && (
                  <AddForm
                    title={t.addClass}
                    onCancel={() => setShowAddClass(false)}
                    onAdd={addClass}
                    t={t}
                    fields={[
                      { key: "name", label: t.fields.className },
                      { key: "fee", label: t.fields.classFee },
                    ]}
                  />
                )}
                {classes.map((c) => (
                  <ClassCard
                    key={c.id}
                    cls={c}
                    studentCount={students.filter((s) => s.classId === c.id).length}
                    onClick={() => {
                      setStudentsClassId(c.id);
                      setQuery("");
                    }}
                    t={t}
                  />
                ))}
              </>
            ) : (
              <>
                <BackButton
                  dir={dir}
                  onClick={() => {
                    setStudentsClassId(null);
                    setQuery("");
                  }}
                />
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.forest, marginBottom: 14, fontFamily: "Georgia, serif" }}>{getClassName(studentsClassId)}</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <Search size={15} color={COLORS.sub} style={{ position: "absolute", left: dir === "rtl" ? "auto" : 10, right: dir === "rtl" ? 10 : "auto", top: 10 }} />
                    <div style={{ paddingLeft: dir === "rtl" ? 0 : 26, paddingRight: dir === "rtl" ? 26 : 0 }}>
                      <TextField value={query} onChange={setQuery} placeholder={t.searchStudents} />
                    </div>
                  </div>
                  <IconBtn title={t.addStudent} onClick={() => setShowAddStudent((v) => !v)}>
                    <Plus size={16} />
                  </IconBtn>
                </div>
                {showAddStudent && (
                  <AddForm
                    title={t.addStudent}
                    onCancel={() => setShowAddStudent(false)}
                    onAdd={addStudent}
                    t={t}
                    fields={[
                      { key: "name", label: t.fields.name },
                      { key: "fatherName", label: t.fields.fatherName },
                      { key: "guardian", label: t.fields.guardian },
                      { key: "phone", label: t.fields.guardianPhone },
                    ]}
                  />
                )}
                {classFilteredStudents.map((x) => (
                  <ContactRow
                    key={x.id}
                    person={{ ...x, grade: getClassName(x.classId) }}
                    onDelete={removeStudent}
                    onSave={updateStudent}
                    t={t}
                    fields={[
                      { key: "name", label: t.fields.name },
                      { key: "fatherName", label: t.fields.fatherName },
                      { key: "guardian", label: t.fields.guardian },
                      { key: "phone", label: t.fields.guardianPhone },
                    ]}
                  />
                ))}
              </>
            )}
          </>
        )}

        {activeTab === "fees" && (
          <>
            {!feesClassId ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                  <Card>
                    <div style={{ fontSize: 12, color: COLORS.sub, marginBottom: 6 }}>{t.collected}</div>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: COLORS.sage }}>{fmt(feeStats.collected)}</div>
                  </Card>
                  <Card>
                    <div style={{ fontSize: 12, color: COLORS.sub, marginBottom: 6 }}>{t.outstanding}</div>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: COLORS.rose }}>{fmt(feeStats.outstanding)}</div>
                  </Card>
                </div>

                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.forest, marginBottom: 10, fontFamily: "Georgia, serif" }}>{t.classesHeading}</div>
                {classes.map((c) => {
                  const stats = classFeeStats(c.id);
                  return (
                    <ClassCard
                      key={c.id}
                      cls={c}
                      studentCount={stats.count}
                      collected={stats.collected}
                      outstanding={stats.outstanding}
                      onClick={() => setFeesClassId(c.id)}
                      t={t}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <BackButton dir={dir} onClick={() => setFeesClassId(null)} />
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.forest, marginBottom: 14, fontFamily: "Georgia, serif" }}>{getClassName(feesClassId)}</div>

                <ClassFeeEditor cls={classes.find((c) => c.id === feesClassId)} onApply={(amount) => applyClassFee(feesClassId, amount)} t={t} />

                {students
                  .filter((s) => s.classId === feesClassId)
                  .map((s) => (
                    <FeeStudentCard
                      key={s.id}
                      student={s}
                      onPhotoChange={(p) => updateStudent({ ...s, photo: p })}
                      onUpdateMonth={(monthId, upd) => updateMonth(s.id, monthId, upd)}
                      onUpdateOther={(otherId, upd) => updateOther(s.id, otherId, upd)}
                      onAddOther={(item) => addOtherFee(s.id, item)}
                      onDeleteOther={(otherId) => deleteOtherFee(s.id, otherId)}
                      t={t}
                    />
                  ))}
              </>
            )}
          </>
        )}

        {activeTab === "expenses" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
              <Card>
                <div style={{ fontSize: 12, color: COLORS.sub, marginBottom: 6 }}>{t.totalPaidLabel}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: COLORS.sage }}>
                  {fmt(
                    teachers.reduce((a, tc) => a + tc.salaryLedger.filter((m) => m.status === "paid").reduce((x, m) => x + m.amount, 0), 0) +
                    otherExpenses.filter((ex) => ex.status === "paid").reduce((a, ex) => a + ex.amount, 0)
                  )}
                </div>
              </Card>
              <Card>
                <div style={{ fontSize: 12, color: COLORS.sub, marginBottom: 6 }}>{t.totalPendingLabel}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: COLORS.rose }}>
                  {fmt(
                    teachers.reduce((a, tc) => a + tc.salaryLedger.filter((m) => m.status !== "paid").reduce((x, m) => x + m.amount, 0), 0) +
                    otherExpenses.filter((ex) => ex.status !== "paid").reduce((a, ex) => a + ex.amount, 0)
                  )}
                </div>
              </Card>
            </div>

            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.forest, marginBottom: 10, fontFamily: "Georgia, serif" }}>
              {t.teacherSalariesSection}
            </div>
            {teachers.map((tc) => (
              <TeacherSalaryLedgerCard
                key={tc.id}
                teacher={tc}
                onUpdateMonth={(monthId, upd) => updateSalaryMonth(tc.id, monthId, upd)}
                t={t}
                months={t.months}
              />
            ))}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "22px 0 10px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.forest, fontFamily: "Georgia, serif" }}>{t.otherExpensesSection}</div>
              <IconBtn title={t.addExpense} onClick={() => setShowAddExpense((v) => !v)}>
                <Plus size={16} />
              </IconBtn>
            </div>
            {showAddExpense && <AddExpenseForm t={t} onCancel={() => setShowAddExpense(false)} onAdd={addExpense} />}
            {otherExpenses.map((ex) => (
              <ExpenseLineItem
                key={ex.id}
                label={ex.purpose}
                item={ex}
                editableLabel
                onSave={(upd) => updateExpense(ex.id, upd)}
                onDelete={() => deleteExpense(ex.id)}
                t={t}
              />
            ))}
          </>
        )}
      </div>
    </div>
    </CurrencyContext.Provider>
  );
}

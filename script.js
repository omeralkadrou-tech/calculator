/* =========================
   التنقل بين الحاسبات
========================= */

function showCalculator(id) {

    const sections =
        document.querySelectorAll(".calculator-section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   الوضع الداكن
========================= */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const button =
        document.getElementById("themeButton");

    if (document.body.classList.contains("dark")) {

        button.textContent = "☀️ الوضع الفاتح";

        localStorage.setItem("theme", "dark");

    } else {

        button.textContent = "🌙 الوضع الداكن";

        localStorage.setItem("theme", "light");
    }
}


/* تحميل الوضع المحفوظ */

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    document.getElementById("themeButton").textContent =
        "☀️ الوضع الفاتح";
}


/* =========================
   الحاسبة العادية
========================= */

let basicCurrent = "0";
let basicPrevious = "";
let basicOperatorValue = null;
let basicReset = false;

function updateBasicDisplay() {

    document.getElementById("basicCurrent").textContent =
        basicCurrent;

    document.getElementById("basicPrevious").textContent =
        basicOperatorValue && basicPrevious
        ? basicPrevious + " " + basicOperatorValue
        : "";
}

function basicNumber(number) {

    if (basicCurrent === "خطأ" || basicReset) {

        basicCurrent = number;

        basicReset = false;

    } else {

        if (basicCurrent === "0") {

            basicCurrent = number;

        } else {

            basicCurrent += number;
        }
    }

    updateBasicDisplay();
}

function basicDecimal() {

    if (basicReset) {

        basicCurrent = "0";

        basicReset = false;
    }

    if (!basicCurrent.includes(".")) {

        basicCurrent += ".";
    }

    updateBasicDisplay();
}

function basicOperator(operator) {

    if (basicCurrent === "خطأ") {
        return;
    }

    if (basicOperatorValue && !basicReset) {

        basicCalculate();
    }

    basicPrevious = basicCurrent;

    basicOperatorValue = operator;

    basicReset = true;

    updateBasicDisplay();
}

function basicCalculate() {

    if (!basicOperatorValue || basicPrevious === "") {
        return;
    }

    const first =
        parseFloat(basicPrevious);

    const second =
        parseFloat(basicCurrent);

    let result;

    switch (basicOperatorValue) {

        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "×":
            result = first * second;
            break;

        case "÷":

            if (second === 0) {

                basicCurrent = "خطأ";

                basicPrevious = "";

                basicOperatorValue = null;

                updateBasicDisplay();

                return;
            }

            result = first / second;

            break;

        case "%":

            result = first % second;

            break;
    }

    basicCurrent =
        Number(result.toFixed(10)).toString();

    basicPrevious = "";

    basicOperatorValue = null;

    basicReset = true;

    updateBasicDisplay();
}

function basicClear() {

    basicCurrent = "0";

    basicPrevious = "";

    basicOperatorValue = null;

    basicReset = false;

    updateBasicDisplay();
}

function basicDelete() {

    if (basicReset || basicCurrent === "خطأ") {
        return;
    }

    if (basicCurrent.length === 1) {

        basicCurrent = "0";

    } else {

        basicCurrent =
            basicCurrent.slice(0, -1);
    }

    updateBasicDisplay();
}


/* =========================
   الحاسبة العلمية
========================= */

let scientificValue = "0";
let scientificFirst = "";
let scientificOperatorValue = null;
let scientificReset = false;

const scientificDisplay =
    document.getElementById("scientificDisplay");

function updateScientific() {

    scientificDisplay.value =
        scientificValue;
}

function scientificNumber(number) {

    if (scientificReset ||
        scientificValue === "خطأ") {

        scientificValue = number;

        scientificReset = false;

    } else {

        if (scientificValue === "0") {

            scientificValue = number;

        } else {

            scientificValue += number;
        }
    }

    updateScientific();
}

function scientificDecimal() {

    if (scientificReset) {

        scientificValue = "0";

        scientificReset = false;
    }

    if (!scientificValue.includes(".")) {

        scientificValue += ".";
    }

    updateScientific();
}

function scientificOperator(operator) {

    scientificFirst = scientificValue;

    scientificOperatorValue = operator;

    scientificReset = true;
}

function scientificCalculate() {

    if (!scientificOperatorValue) {
        return;
    }

    const first =
        parseFloat(scientificFirst);

    const second =
        parseFloat(scientificValue);

    let result;

    switch (scientificOperatorValue) {

        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "*":
            result = first * second;
            break;

        case "/":

            if (second === 0) {

                scientificValue = "خطأ";

                updateScientific();

                return;
            }

            result = first / second;

            break;
    }

    scientificValue =
        Number(result.toFixed(10)).toString();

    scientificOperatorValue = null;

    scientificReset = true;

    updateScientific();
}

function scientificFunction(type) {

    const number =
        parseFloat(scientificValue);

    let result;

    if (type === "sqrt") {

        if (number < 0) {

            scientificValue = "خطأ";

            updateScientific();

            return;
        }

        result = Math.sqrt(number);
    }

    if (type === "square") {

        result = number * number;
    }

    scientificValue =
        Number(result.toFixed(10)).toString();

    scientificReset = true;

    updateScientific();
}

function scientificClear() {

    scientificValue = "0";

    scientificFirst = "";

    scientificOperatorValue = null;

    scientificReset = false;

    updateScientific();
}

function scientificDelete() {

    if (scientificValue.length <= 1) {

        scientificValue = "0";

    } else {

        scientificValue =
            scientificValue.slice(0, -1);
    }

    updateScientific();
}


/* =========================
   النسبة المئوية
========================= */

function calculatePercentage() {

    const value =
        parseFloat(
            document.getElementById(
                "percentageValue"
            ).value
        );

    const percentage =
        parseFloat(
            document.getElementById(
                "percentageNumber"
            ).value
        );

    if (isNaN(value) || isNaN(percentage)) {

        document.getElementById(
            "percentageResult"
        ).textContent =
            "أدخل الأرقام أولاً.";

        return;
    }

    const result =
        value * percentage / 100;

    document.getElementById(
        "percentageResult"
    ).textContent =
        `${percentage}% من ${value} = ${result}`;
}


/* =========================
   حاسبة الخصم
========================= */

function calculateDiscount() {

    const price =
        parseFloat(
            document.getElementById(
                "originalPrice"
            ).value
        );

    const discount =
        parseFloat(
            document.getElementById(
                "discountPercent"
            ).value
        );

    if (isNaN(price) || isNaN(discount)) {

        document.getElementById(
            "discountResult"
        ).textContent =
            "أدخل السعر ونسبة الخصم.";

        return;
    }

    const discountAmount =
        price * discount / 100;

    const finalPrice =
        price - discountAmount;

    document.getElementById(
        "discountResult"
    ).innerHTML =
        `قيمة الخصم: ${discountAmount.toFixed(2)}
        <br>
        السعر بعد الخصم: ${finalPrice.toFixed(2)}`;
}


/* =========================
   حاسبة القروض
========================= */

function calculateLoan() {

    const amount =
        parseFloat(
            document.getElementById(
                "loanAmount"
            ).value
        );

    const annualInterest =
        parseFloat(
            document.getElementById(
                "loanInterest"
            ).value
        );

    const years =
        parseFloat(
            document.getElementById(
                "loanYears"
            ).value
        );

    if (
        isNaN(amount) ||
        isNaN(annualInterest) ||
        isNaN(years)
    ) {

        document.getElementById(
            "loanResult"
        ).textContent =
            "أدخل جميع البيانات.";

        return;
    }

    const months =
        years * 12;

    const monthlyInterest =
        annualInterest / 100 / 12;

    let monthlyPayment;

    if (monthlyInterest === 0) {

        monthlyPayment =
            amount / months;

    } else {

        monthlyPayment =
            amount *
            monthlyInterest *
            Math.pow(
                1 + monthlyInterest,
                months
            ) /
            (
                Math.pow(
                    1 + monthlyInterest,
                    months
                ) - 1
            );
    }

    const total =
        monthlyPayment * months;

    document.getElementById(
        "loanResult"
    ).innerHTML =
        `القسط الشهري التقريبي:
        ${monthlyPayment.toFixed(2)}
        <br><br>
        إجمالي المدفوع:
        ${total.toFixed(2)}`;
}
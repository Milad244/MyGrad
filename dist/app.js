"use strict";
document.addEventListener('DOMContentLoaded', function () {
    LoadStage();
});
function DisplayChanges(mode, elements, opacityLevel = 15) {
    if (Array.isArray(elements) === false) {
        elements = [elements];
    }
    const divElement = document.getElementsByTagName('div');
    Object.keys(divElement).forEach(function (_, index) {
        if (mode === 'display') {
            divElement[index].setAttribute('style', `opacity: ${opacityLevel}%; pointer-events: none`);
        }
        else if (mode === 'no-display' || mode === 'display-all') {
            divElement[index].setAttribute('style', 'opacity: 100%; pointer-events: all');
        }
    });
    elements.forEach(function (_, index) {
        if (Array.isArray(elements) === true) {
            if (mode === 'display' || mode === 'just-display') {
                elements[index].classList.remove('no-display');
                elements[index].setAttribute('style', 'opacity: 100%; pointer-events: all');
            }
            else if (mode === 'no-display') {
                elements[index].classList.add('no-display');
            }
            else if (mode === 'disable') {
                elements[index].setAttribute('style', `opacity: ${opacityLevel}%; pointer-events: none`);
            }
            else if (mode === 'enable') {
                elements[index].setAttribute('style', 'opacity: 100%; pointer-events: all');
            }
        }
        else {
            GiveError('Element is not an array (displayChanges)', 1);
        }
    });
}
function GiveError(reason = 'Not specified', num = 1) {
    console.log(`Error-${num}: ${reason}`);
}
function areElementsTruthy(elements) {
    return Object.values(elements).every(Boolean);
}
function checkMinLength(string, minLength = 0) {
    return string.replace(/\s/g, '').length >= minLength;
}
function checkMaxLength(string, maxLength = Infinity) {
    return string.length <= maxLength;
}
function checkInvalid(string, checkElement) {
    checkElement.innerHTML = string;
    const nameDup = checkElement.innerHTML;
    return string === nameDup;
}
function checkStringDuplicate(string, list) {
    return list.includes(string);
}
function addEventListenerOnce(element, eventType, callback) {
    if (element) {
        element.removeEventListener(eventType, callback);
        element.addEventListener(eventType, callback);
    }
}
function usernameCheck(username) {
    if (!checkMinLength(username, 3)) {
        return {
            isUsernameValid: false,
            problemMsg: 'Username must have a minimum of 3 characters'
        };
    }
    else if (!checkMaxLength(username, 12)) {
        return {
            isUsernameValid: false,
            problemMsg: 'Username must have no more than 12 characters'
        };
    }
    const checkSameValueUsernameEl = document.getElementById('username-invalid-check');
    if (checkSameValueUsernameEl) {
        if (!checkInvalid(username, checkSameValueUsernameEl)) {
            return {
                isUsernameValid: false,
                problemMsg: 'Username contains an invalid character'
            };
        }
    }
    else {
        GiveError('Not getting element', 4);
    }
    return {
        isUsernameValid: true,
        problemMsg: ''
    };
}
function creditChecker(totalCredits, neededCredits) {
    if (totalCredits < neededCredits) {
        return {
            canContinue: false,
            problemMsg: `You are missing ${neededCredits - totalCredits} credits out of the minimum ${neededCredits} needed to graduate`
        };
    }
    else {
        return {
            canContinue: true,
            problemMsg: ''
        };
    }
}
function addNewCourse(newCourseName, newCourseCredit, newCourseType = 'inactive') {
    if (newCourseCredit < 0) {
        return {
            addedCourse: false,
            problemMsg: 'Invalid credits for this course'
        };
    }
    else if (!checkMaxLength(newCourseName, 100)) {
        return {
            addedCourse: false,
            problemMsg: 'Course name must not have more than 100 characters'
        };
    }
    else if (!checkMinLength(newCourseName, 3)) {
        return {
            addedCourse: false,
            problemMsg: 'Course name must have a minimum of 3 characters'
        };
    }
    else {
        const checkSameValueUsernameEl = document.getElementById('course-name-invalid-check');
        if (checkSameValueUsernameEl) {
            if (!checkInvalid(newCourseName, checkSameValueUsernameEl)) {
                return {
                    addedCourse: false,
                    problemMsg: 'Course name contains an invalid character'
                };
            }
        }
        else {
            GiveError('Not getting element', 4);
            return {
                addedCourse: false,
                problemMsg: 'Internal error'
            };
        }
        if (checkStringDuplicate(newCourseName, Object.keys(yourGraduation.courses))) {
            return {
                addedCourse: false,
                problemMsg: 'You already have this course'
            };
        }
        else {
            yourGraduation.courses[newCourseName] = { creditValue: newCourseCredit, courseType: newCourseType };
            saveCookies();
            return {
                addedCourse: true,
                problemMsg: ''
            };
        }
    }
}
var ElementIds;
(function (ElementIds) {
    ElementIds["startingPageContainer"] = "starting-page-container";
    ElementIds["signUpButton"] = "js-signUp-button";
    ElementIds["step1Container"] = "js-step-1-container";
    ElementIds["step1Continue"] = "js-step1-continue";
    ElementIds["step1UsernameInput"] = "js-step1-username-input";
    ElementIds["step1UsernameError"] = "js-username-error";
    ElementIds["step2Container"] = "js-step-2-container";
    ElementIds["step2CourseListContainer"] = "js-course-list-container";
    ElementIds["step2Continue"] = "js-step2-continue";
    ElementIds["step2CourseNameInput"] = "js-step2-course-name-input";
    ElementIds["step2AddCourseError"] = "js-add-course-error";
    ElementIds["step2CreditMinus"] = "js-credit-minus";
    ElementIds["step2CreditCount"] = "js-credit-count";
    ElementIds["step2CreditAdd"] = "js-credit-add";
    ElementIds["step2AddCourse"] = "js-add-course";
    ElementIds["step2CreditError"] = "js-credit-error";
    ElementIds["step2TotalCreditMinus"] = "js-total-credit-minus";
    ElementIds["step2TotalCreditCount"] = "js-total-credit-count";
    ElementIds["step2TotalCreditAdd"] = "js-total-credit-add";
    ElementIds["MainContainer"] = "js-main-content-container";
    ElementIds["MainAllCoursesButton"] = "js-all-courses-button";
    ElementIds["MainActiveCoursesButton"] = "js-active-courses-button";
    ElementIds["MainInactiveCoursesButton"] = "js-inactive-courses-button";
    ElementIds["MainFinishedCoursesButton"] = "js-finished-courses-button";
    ElementIds["MainAllCoursesContainer"] = "js-all-courses-container";
    ElementIds["MainActiveCoursesContainer"] = "js-active-courses-container";
    ElementIds["MainInactiveCoursesContainer"] = "js-inactive-courses-container";
    ElementIds["MainFinishedCoursesContainer"] = "js-finished-courses-container";
    ElementIds["MainCourseHeader"] = "js-main-course-header";
})(ElementIds || (ElementIds = {}));
function getSignUpElements() {
    return getElementsByIds(['startingPageContainer', 'signUpButton']);
}
function getStep1Elements() {
    return getElementsByIds(['step1Container', 'step1Continue', 'step1UsernameInput', 'step1UsernameError']);
}
function getstep2Elements() {
    return getElementsByIds(['step2Container', 'step2CourseListContainer', 'step2Continue', 'step2CourseNameInput', 'step2AddCourseError', 'step2CreditMinus', 'step2CreditCount',
        'step2CreditAdd', 'step2AddCourse', 'step2CreditError', 'step2TotalCreditMinus', 'step2TotalCreditCount', 'step2TotalCreditAdd']);
}
function getMainElements() {
    return getElementsByIds(['MainContainer', 'MainAllCoursesButton', 'MainActiveCoursesButton', 'MainInactiveCoursesButton', 'MainFinishedCoursesButton', 'MainAllCoursesContainer',
        'MainActiveCoursesContainer', 'MainInactiveCoursesContainer', 'MainFinishedCoursesContainer', 'MainCourseHeader']);
}
function saveCookies() {
    localStorage.setItem('yourGraduation', JSON.stringify(yourGraduation));
    console.log(yourGraduation);
}
function deleteAll() {
    localStorage.removeItem('yourGraduation');
    window.location.reload();
}
const yourGraduation = JSON.parse(localStorage.getItem('yourGraduation')) || {
    username: 'unnamed',
    courses: {},
    'needed credits': 48,
    'new course credits': 4,
    stage: 'SignUp',
    mainMode: 'All courses',
};
var Stages;
(function (Stages) {
    Stages["SignUp"] = "SignUp";
    Stages["SetUpPart1"] = "SetUpPart1";
    Stages["SetUpPart2"] = "SetUpPart2";
    Stages["Main"] = "Main";
})(Stages || (Stages = {}));
function makeCourseValue(credit, type = 'inactive') {
    return { creditValue: credit, courseType: type };
}
const defaultCourses = {
    'A Language Arts 10': makeCourseValue(2),
    'A second Language Arts 10': makeCourseValue(2),
    'A Language Arts 11': makeCourseValue(4),
    'A Language Arts 12': makeCourseValue(4),
    'A Social Studies 10': makeCourseValue(4),
    'A Social Studies 11 or 12': makeCourseValue(4),
    'A Mathematics 10': makeCourseValue(4),
    'A Mathematics 11 or 12': makeCourseValue(4),
    'A Science 10': makeCourseValue(4),
    'A Science 11 or 12': makeCourseValue(4),
    'Physical and Health Education 10': makeCourseValue(4),
    'Career Life Education': makeCourseValue(4),
    'Career Life Connections': makeCourseValue(4),
};
function LoadStage() {
    const stage = yourGraduation.stage;
    switch (stage) {
        case Stages.SignUp:
            handleSignUp();
            break;
        case Stages.SetUpPart1:
            handleSetUpPart1();
            break;
        case Stages.SetUpPart2:
            handleSetUpPart2();
            break;
        case Stages.Main:
            handleMain();
            break;
        default:
            GiveError('Invalid Stage', 1);
    }
}
function getElementsByIds(ids) {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return ids.reduce((elements, id) => {
        elements[id] = document.getElementById(ElementIds[id]);
        return elements;
    }, {});
}
function getTotalCredits() {
    let totalCredits = 0;
    Object.keys(yourGraduation.courses).forEach((value) => {
        const courseCredit = yourGraduation.courses[value].creditValue;
        totalCredits += courseCredit;
    });
    return totalCredits;
}
function handleSignUp() {
    const signUpElements = getSignUpElements();
    if (areElementsTruthy(signUpElements)) {
        DisplayChanges('just-display', signUpElements.startingPageContainer);
        signUpElements.signUpButton.addEventListener('click', () => {
            DisplayChanges('no-display', signUpElements.startingPageContainer);
            yourGraduation.stage = 'SetUpPart1';
            saveCookies();
            LoadStage();
        });
    }
    else {
        GiveError('Not getting element', 1);
    }
}
function handleSetUpPart1() {
    const step1Elements = getStep1Elements();
    if (areElementsTruthy(step1Elements)) {
        DisplayChanges('just-display', step1Elements.step1Container);
        step1Elements.step1Continue.addEventListener('click', () => {
            const newUsername = step1Elements.step1UsernameInput.value;
            const usernameCheckReturn = usernameCheck(newUsername);
            if (usernameCheckReturn.isUsernameValid) {
                step1Elements.step1UsernameError.innerHTML = '';
                yourGraduation.username = newUsername;
                saveCookies();
                DisplayChanges('no-display', step1Elements.step1Container);
                yourGraduation.stage = 'SetUpPart2';
                saveCookies();
                LoadStage();
            }
            else {
                step1Elements.step1UsernameError.innerHTML = usernameCheckReturn.problemMsg;
            }
        });
    }
    else {
        GiveError('Not getting element', 2);
    }
}
function handleSetUpPart2() {
    const step2Elements = getstep2Elements();
    if (areElementsTruthy(step2Elements)) {
        DisplayChanges('just-display', step2Elements.step2Container);
        if (!Object.keys(yourGraduation.courses).length) {
            yourGraduation.courses = defaultCourses;
            saveCookies();
        }
        step2Elements.step2CreditAdd.addEventListener('click', () => {
            yourGraduation['new course credits']++;
            saveCookies();
            loadSetUpPart2();
        });
        step2Elements.step2CreditMinus.addEventListener('click', () => {
            yourGraduation['new course credits']--;
            saveCookies();
            loadSetUpPart2();
        });
        step2Elements.step2TotalCreditMinus.addEventListener('click', () => {
            yourGraduation['needed credits']--;
            saveCookies();
            loadSetUpPart2();
        });
        step2Elements.step2TotalCreditAdd.addEventListener('click', () => {
            yourGraduation['needed credits']++;
            saveCookies();
            loadSetUpPart2();
        });
        const addCourseFunc = () => {
            const newCourseInput = step2Elements.step2CourseNameInput;
            const newCourseName = newCourseInput.value;
            newCourseInput.value = '';
            const newCourseCredit = parseInt(step2Elements.step2CreditCount.innerHTML.replace('Credit worth: ', ''));
            const addCourseReturn = addNewCourse(newCourseName, newCourseCredit);
            if (addCourseReturn.addedCourse === true) {
                step2Elements.step2AddCourseError.innerHTML = '';
                loadSetUpPart2();
            }
            else {
                step2Elements.step2AddCourseError.innerHTML = addCourseReturn.problemMsg;
            }
        };
        step2Elements.step2CourseNameInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addCourseFunc();
            }
        });
        step2Elements.step2AddCourse.addEventListener('click', () => {
            addCourseFunc();
        });
        step2Elements.step2Continue.addEventListener("click", () => {
            const totalCredits = getTotalCredits();
            const neededCredits = yourGraduation['needed credits'];
            const creditCheckReturn = creditChecker(totalCredits, neededCredits);
            if (creditCheckReturn.canContinue === true) {
                step2Elements.step2CreditError.innerHTML = '';
                DisplayChanges('no-display', step2Elements.step2Container);
                yourGraduation.stage = 'Main';
                saveCookies();
                LoadStage();
            }
            else {
                step2Elements.step2CreditError.innerHTML = creditCheckReturn.problemMsg;
            }
        });
        loadSetUpPart2();
    }
    else {
        GiveError('Not getting element', 3);
    }
}
function loadSetUpPart2() {
    const step2Elements = getstep2Elements();
    if (areElementsTruthy(step2Elements)) {
        step2Elements.step2CourseListContainer.innerHTML = '';
        Object.keys(yourGraduation.courses).forEach((value, index) => {
            const courseName = value;
            const courseCredit = yourGraduation.courses[value].creditValue;
            step2Elements.step2CourseListContainer.innerHTML += `<li>${courseName} (${courseCredit}) <i onclick="deleteCourse(${index})" class="fa-solid fa-trash trashDelete"></i></li>`;
        });
        step2Elements.step2CreditCount.innerHTML = `Credit worth: ${yourGraduation['new course credits']}`;
        step2Elements.step2TotalCreditCount.innerHTML = `Needed Credits: ${yourGraduation['needed credits']}`;
    }
    else {
        GiveError('Not getting element', 4);
    }
}
function handleMain() {
    const mainElements = getMainElements();
    if (areElementsTruthy(mainElements)) {
        DisplayChanges('just-display', mainElements.MainContainer);
        mainElements.MainAllCoursesButton.addEventListener('click', () => {
            loadCourses('All courses');
        });
        mainElements.MainActiveCoursesButton.addEventListener('click', () => {
            loadCourses('Active courses');
        });
        mainElements.MainInactiveCoursesButton.addEventListener('click', () => {
            loadCourses('Inactive courses');
        });
        mainElements.MainFinishedCoursesButton.addEventListener('click', () => {
            loadCourses('Finished courses');
        });
        loadMain();
        loadCourses(yourGraduation.mainMode);
    }
    else {
        GiveError('Not getting element', 5);
    }
}
function loadMain() {
    const mainElements = getMainElements();
    if (areElementsTruthy(mainElements)) {
    }
    else {
        GiveError('Not getting element', 6);
    }
}
function activeCourseHTML(courseName, courseCredit, courseIndex) {
    return `<div class="course-container"> <i class="fa-solid fa-grip move-icon"></i> <i class="fa-solid fa-ellipsis-vertical course-options">
    <div class="course-menu"> <button onclick="editCourseName(${courseIndex})">Edit course name</button>
    <button onclick="editCourseCredit(${courseIndex})">Edit course credit</button>
    <button onclick="changeCourseType(${courseIndex}, 'inactive')">Mark course as inactive</button>
    <button onclick="changeCourseType(${courseIndex}, 'finished')">Mark course as finished</button>
    <button onclick="deleteCourse(${courseIndex})">Delete this course</button> </div></i>
    <h4>${courseName}</h4> <br> <h4>Credit value: ${courseCredit}</h4> <br> <h4>Active Course</h4> </div>`;
}
function inactiveCourseHTML(courseName, courseCredit, courseIndex) {
    return `<div class="course-container"> <i class="fa-solid fa-grip move-icon"></i> <i class="fa-solid fa-ellipsis-vertical course-options">
    <div class="course-menu"> <button onclick="editCourseName(${courseIndex})">Edit course name</button>
    <button onclick="editCourseCredit(${courseIndex})">Edit course credit</button>
    <button onclick="changeCourseType(${courseIndex}, 'active')">Mark course as active</button>
    <button onclick="changeCourseType(${courseIndex}, 'finished')">Mark course as finished</button>
    <button onclick="deleteCourse(${courseIndex})">Delete this course</button> </div></i>
    <h4>${courseName}</h4> <br> <h4>Credit value: ${courseCredit}</h4> <br> <h4>Inactive Course</h4> </div>`;
}
function finishedCourseHTML(courseName, courseCredit, courseIndex) {
    return `<div class="course-container"> <i class="fa-solid fa-grip move-icon"></i> <i class="fa-solid fa-ellipsis-vertical course-options">
    <div class="course-menu"> <button onclick="editCourseName(${courseIndex})">Edit course name</button>
    <button onclick="editCourseCredit(${courseIndex})">Edit course credit</button>
    <button onclick="changeCourseType(${courseIndex}, 'active')">Mark course as active</button>
    <button onclick="changeCourseType(${courseIndex}, 'inactive')">Mark course as inactive</button>
    <button onclick="deleteCourse(${courseIndex})">Delete this course</button> </div></i>
    <h4>${courseName}</h4> <br> <h4>Credit value: ${courseCredit}</h4> <br> <h4>Finished Course</h4> </div>`;
}
function addCourseHTML() {
    return `<div class="add-course-container"> <h4>Add New Course</h4> <br> <i onclick="addCourse();" class="fa-regular fa-square-plus square-add-button"></i> </div>`;
}
function editBoxHTML(boxId, editType, courseName, courseCredit) {
    const closeButtonHTML = `<i class="fa-solid fa-x close-button" onclick="removeBox(${boxId});"></i>`;
    switch (editType) {
        case 'editName': return `<div id="${boxId}" class="main-power-box"><h4>Current Course Name: ${courseName}</h4>${closeButtonHTML}</div>`;
        case 'editCredit': return `<div id="${boxId}" class="main-power-box"><h4>Current Course Credit Value: ${courseCredit}</h4>${closeButtonHTML}</div>`;
        case 'addNew': return `<div id="${boxId}" class="main-power-box"><h4>New course name:</h4>${closeButtonHTML}</div>`;
    }
}
const removeBox = (boxId) => {
    const boxElement = boxId;
    DisplayChanges('display-all', boxElement);
    boxElement.remove();
    loadCourses(yourGraduation.mainMode);
};
function changeCourseType(courseIndex, newType) {
    const courseName = Object.keys(yourGraduation.courses)[courseIndex];
    yourGraduation.courses[courseName].courseType = newType;
    saveCookies();
    loadCourses(yourGraduation.mainMode);
}
function editCourseName(courseIndex) {
    cancelMenu();
    const courseName = Object.keys(yourGraduation.courses)[courseIndex];
    const courseElements = getCourseElements(yourGraduation.mainMode);
    const MainCoursesContainer = courseElements.MainCoursesContainer;
    const MainCourseHeader = courseElements.MainCourseHeader;
    const boxIdName = 'editCourseNameBox';
    MainCoursesContainer.innerHTML += editBoxHTML(boxIdName, 'editName', courseName);
    const boxElement = document.getElementById(boxIdName);
    DisplayChanges('display', [boxElement, MainCourseHeader, MainCoursesContainer, document.getElementById('course-content-container')], 15);
}
function editCourseCredit(courseIndex) {
    cancelMenu();
    const courseName = Object.keys(yourGraduation.courses)[courseIndex];
    const courseCreditValue = yourGraduation.courses[courseName].creditValue;
    const courseElements = getCourseElements(yourGraduation.mainMode);
    const MainCoursesContainer = courseElements.MainCoursesContainer;
    const MainCourseHeader = courseElements.MainCourseHeader;
    const boxIdName = 'editCourseCreditBox';
    MainCoursesContainer.innerHTML += editBoxHTML(boxIdName, 'editCredit', undefined, courseCreditValue);
    const boxElement = document.getElementById(boxIdName);
    DisplayChanges('display', [boxElement, MainCourseHeader, MainCoursesContainer, document.getElementById('course-content-container')], 15);
}
function addCourse() {
    cancelMenu();
    const courseElements = getCourseElements(yourGraduation.mainMode);
    const MainCoursesContainer = courseElements.MainCoursesContainer;
    const MainCourseHeader = courseElements.MainCourseHeader;
    const boxIdName = 'addCourseBox';
    MainCoursesContainer.innerHTML += editBoxHTML(boxIdName, 'addNew');
    const boxElement = document.getElementById(boxIdName);
    DisplayChanges('display', [boxElement, MainCourseHeader, MainCoursesContainer, document.getElementById('course-content-container')], 15);
}
function deleteCourse(courseNum) {
    let courseName;
    const courses = yourGraduation.courses;
    Object.keys(courses).forEach((value, index) => {
        const currentCourseName = value;
        if (courseNum === index) {
            courseName = currentCourseName;
            delete courses[courseName];
            saveCookies();
        }
    });
    if (yourGraduation.stage === 'SetUpPart2') {
        loadSetUpPart2();
    }
    else if (yourGraduation.stage === 'Main') {
        loadCourses(yourGraduation.mainMode);
    }
}
function cancelMenu() {
    document.querySelectorAll('.course-container').forEach((container) => {
        const courseOptions = container.querySelector('.course-options');
        const courseMenu = container.querySelector('.course-menu');
        if (courseOptions && courseMenu) {
            courseMenu.style.display = 'none';
        }
        else {
            GiveError('Not getting element', 10);
        }
    });
}
function getCourseElements(course) {
    const mainElements = getMainElements();
    switch (course) {
        case 'All courses':
            return {
                MainCoursesContainer: mainElements.MainAllCoursesContainer,
                MainCourseHeader: mainElements.MainCourseHeader
            };
        case 'Active courses':
            return {
                MainCoursesContainer: mainElements.MainActiveCoursesContainer,
                MainCourseHeader: mainElements.MainCourseHeader
            };
        case 'Inactive courses':
            return {
                MainCoursesContainer: mainElements.MainInactiveCoursesContainer,
                MainCourseHeader: mainElements.MainCourseHeader
            };
        case 'Finished courses':
            return {
                MainCoursesContainer: mainElements.MainFinishedCoursesContainer,
                MainCourseHeader: mainElements.MainCourseHeader
            };
        case 'Progress courses':
            return {
                MainCoursesContainer: mainElements.MainActiveCoursesContainer,
                MainCourseHeader: mainElements.MainCourseHeader
            };
        default:
            GiveError('Invalid Stage', 1);
            return {
                MainCoursesContainer: mainElements.MainAllCoursesContainer,
                MainCourseHeader: mainElements.MainCourseHeader
            };
    }
}
function loadCourses(mode) {
    const mainElements = getMainElements();
    DisplayChanges('no-display', mainElements.MainAllCoursesContainer);
    DisplayChanges('no-display', mainElements.MainActiveCoursesContainer);
    DisplayChanges('no-display', mainElements.MainInactiveCoursesContainer);
    DisplayChanges('no-display', mainElements.MainFinishedCoursesContainer);
    if (mode === 'All courses') {
        const courseElements = getCourseElements('All courses');
        const MainCoursesContainer = courseElements.MainCoursesContainer;
        const MainCourseHeader = courseElements.MainCourseHeader;
        DisplayChanges('just-display', MainCoursesContainer);
        yourGraduation.mainMode = 'All courses';
        saveCookies();
        MainCoursesContainer.innerHTML = '';
        MainCourseHeader.innerHTML = 'All courses';
        Object.keys(yourGraduation.courses).forEach((value, index) => {
            const courseName = value;
            const courseCredit = yourGraduation.courses[courseName].creditValue;
            if (yourGraduation.courses[courseName].courseType === 'active') {
                MainCoursesContainer.innerHTML += activeCourseHTML(courseName, courseCredit, index);
            }
            else if (yourGraduation.courses[courseName].courseType === 'inactive') {
                MainCoursesContainer.innerHTML += inactiveCourseHTML(courseName, courseCredit, index);
            }
            else if (yourGraduation.courses[courseName].courseType === 'finished') {
                MainCoursesContainer.innerHTML += finishedCourseHTML(courseName, courseCredit, index);
            }
        });
        MainCoursesContainer.innerHTML += addCourseHTML();
    }
    else if (mode === 'Active courses') {
        const courseElements = getCourseElements('Active courses');
        const MainCoursesContainer = courseElements.MainCoursesContainer;
        const MainCourseHeader = courseElements.MainCourseHeader;
        DisplayChanges('just-display', MainCoursesContainer);
        yourGraduation.mainMode = 'Active courses';
        saveCookies();
        MainCoursesContainer.innerHTML = '';
        MainCourseHeader.innerHTML = 'Active courses';
        Object.keys(yourGraduation.courses).forEach((value, index) => {
            const courseName = value;
            if (yourGraduation.courses[courseName].courseType === 'active') {
                const courseCredit = yourGraduation.courses[courseName].creditValue;
                MainCoursesContainer.innerHTML += activeCourseHTML(courseName, courseCredit, index);
            }
        });
        MainCoursesContainer.innerHTML += addCourseHTML();
    }
    else if (mode === 'Inactive courses') {
        const courseElements = getCourseElements('Inactive courses');
        const MainCoursesContainer = courseElements.MainCoursesContainer;
        const MainCourseHeader = courseElements.MainCourseHeader;
        DisplayChanges('just-display', MainCoursesContainer);
        yourGraduation.mainMode = 'Inactive courses';
        saveCookies();
        MainCoursesContainer.innerHTML = '';
        MainCourseHeader.innerHTML = 'Inactive courses';
        Object.keys(yourGraduation.courses).forEach((value, index) => {
            const courseName = value;
            if (yourGraduation.courses[courseName].courseType === 'inactive') {
                const courseCredit = yourGraduation.courses[courseName].creditValue;
                MainCoursesContainer.innerHTML += inactiveCourseHTML(courseName, courseCredit, index);
            }
        });
        MainCoursesContainer.innerHTML += addCourseHTML();
    }
    else if (mode === "Finished courses") {
        const courseElements = getCourseElements('Finished courses');
        const MainCoursesContainer = courseElements.MainCoursesContainer;
        const MainCourseHeader = courseElements.MainCourseHeader;
        DisplayChanges('just-display', MainCoursesContainer);
        yourGraduation.mainMode = 'Finished courses';
        saveCookies();
        MainCoursesContainer.innerHTML = '';
        MainCourseHeader.innerHTML = 'Finished courses';
        Object.keys(yourGraduation.courses).forEach((value, index) => {
            const courseName = value;
            if (yourGraduation.courses[courseName].courseType === 'finished') {
                const courseCredit = yourGraduation.courses[courseName].creditValue;
                MainCoursesContainer.innerHTML += finishedCourseHTML(courseName, courseCredit, index);
            }
        });
    }
    else if (mode === 'Progress courses') {
    }
    if (mode === 'All courses' || 'Active courses' || 'Finished courses') {
        document.querySelectorAll('.course-container').forEach((container) => {
            const courseOptions = container.querySelector('.course-options');
            const courseMenu = container.querySelector('.course-menu');
            if (courseOptions && courseMenu) {
                courseOptions.addEventListener('mouseenter', () => {
                    courseMenu.style.display = 'block';
                });
                courseMenu.addEventListener('mouseleave', () => {
                    courseMenu.style.display = 'none';
                });
                container.addEventListener('mouseleave', () => {
                    courseMenu.style.display = 'none';
                });
            }
            else {
                GiveError('Not getting element', 9);
            }
        });
    }
}
//# sourceMappingURL=app.js.map
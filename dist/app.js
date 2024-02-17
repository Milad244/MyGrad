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
        else if (mode === 'no-display') {
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
function usernameCheck(username) {
    if (username.length <= 3 || username.replace(/\s/g, '').length <= 3) {
        return {
            isUsernameValid: false,
            problemMsg: 'Username must have a minimum of 4 characters'
        };
    }
    else if (username.length >= 12 || username.replace(/\s/g, '').length >= 12) {
        return {
            isUsernameValid: false,
            problemMsg: 'Username must have less than 12 characters'
        };
    }
    else {
        const checkSameValueUsernameEl = document.getElementById('username-invalid-check');
        if (checkSameValueUsernameEl) {
            checkSameValueUsernameEl.innerHTML = username;
            const nameDup = checkSameValueUsernameEl.innerHTML;
            if (username != nameDup) {
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
function addNewCourse(newCourseName, newCourseCredit) {
    if (newCourseCredit < 0) {
        return {
            addedCourse: false,
            problemMsg: 'Inavlid credits for this course'
        };
    }
    else if (newCourseName.length >= 100) {
        return {
            addedCourse: false,
            problemMsg: 'Course name must have less than 100 characters'
        };
    }
    else if (newCourseName.length <= 3) {
        return {
            addedCourse: false,
            problemMsg: 'Course name must have a minimum of 4 characters'
        };
    }
    else {
        const checkSameValueUsernameEl = document.getElementById('course-name-invalid-check');
        if (checkSameValueUsernameEl) {
            checkSameValueUsernameEl.innerHTML = newCourseName;
            const nameDup = checkSameValueUsernameEl.innerHTML;
            if (newCourseName != nameDup) {
                return {
                    addedCourse: false,
                    problemMsg: 'Course name contains an invalid character'
                };
            }
        }
        else {
            GiveError('Not getting element', 4);
        }
        let sameName = false;
        Object.keys(yourGraduation.courses).forEach((value) => {
            const courseName = value;
            if (courseName === newCourseName) {
                sameName = true;
            }
        });
        if (sameName) {
            return {
                addedCourse: false,
                problemMsg: 'You already have this course'
            };
        }
        else {
            yourGraduation.courses[newCourseName] = newCourseCredit;
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
})(ElementIds || (ElementIds = {}));
const yourGraduation = {
    username: 'unnamed',
    courses: {},
    'max credits': 48,
    stage: 'SetUpPart2'
};
var Stages;
(function (Stages) {
    Stages["SignUp"] = "SignUp";
    Stages["SetUpPart1"] = "SetUpPart1";
    Stages["SetUpPart2"] = "SetUpPart2";
})(Stages || (Stages = {}));
const defaultCourses = {
    'A Language Arts 10': 2,
    'A second Language Arts 10': 2,
    'A Language Arts 11': 4,
    'A Language Arts 12': 4,
    'A Social Studies 10': 4,
    'A Social Studies 11 or 12': 4,
    'A Mathematics 10': 4,
    'A Mathematics 11 or 12': 4,
    'A Science 10': 4,
    'A Science 11 or 12': 4,
    'Physical and Health Education 10': 4,
    'Career Life Education': 4,
    'Career Life Connections': 4,
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
        default:
            GiveError('Invalid Stage', 1);
    }
}
function handleSignUp() {
    const signUpElements = getElementsByIds(['startingPageContainer', 'signUpButton']);
    if (areElementsTruthy(signUpElements)) {
        DisplayChanges('just-display', signUpElements.startingPageContainer);
        signUpElements.signUpButton.addEventListener('click', () => {
            DisplayChanges('no-display', signUpElements.startingPageContainer);
            yourGraduation.stage = 'SetUpPart1';
            LoadStage();
        });
    }
    else {
        GiveError('Not getting element', 1);
    }
}
function handleSetUpPart1() {
    const step1Elements = getElementsByIds(['step1Container', 'step1Continue', 'step1UsernameInput', 'step1UsernameError']);
    if (areElementsTruthy(step1Elements)) {
        DisplayChanges('just-display', step1Elements.step1Container);
        step1Elements.step1Continue.addEventListener('click', () => {
            const newUsername = step1Elements.step1UsernameInput.value;
            const usernameCheckReturn = usernameCheck(newUsername);
            if (usernameCheckReturn.isUsernameValid) {
                step1Elements.step1UsernameError.innerHTML = '';
                yourGraduation.username = newUsername;
                DisplayChanges('no-display', step1Elements.step1Container);
                yourGraduation.stage = 'SetUpPart2';
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
        const courseCredit = yourGraduation.courses[value];
        totalCredits += courseCredit;
    });
    return totalCredits;
}
function deleteCourse(courseNum) {
    const courses = yourGraduation.courses;
    let courseName;
    Object.keys(courses).forEach((value, index) => {
        const currentCourseName = value;
        if (courseNum === index) {
            courseName = currentCourseName;
            delete yourGraduation.courses[courseName];
        }
    });
    LoadStage();
}
function handleSetUpPart2() {
    const step2Elements = getElementsByIds(['step2Container', 'step2CourseListContainer', 'step2Continue', 'step2CourseNameInput', 'step2AddCourseError', 'step2CreditMinus', 'step2CreditCount', 'step2CreditAdd', 'step2AddCourse', 'step2CreditError']);
    if (areElementsTruthy(step2Elements)) {
        DisplayChanges('just-display', step2Elements.step2Container);
        if (!Object.keys(yourGraduation.courses).length) {
            yourGraduation.courses = defaultCourses;
        }
        step2Elements.step2CourseListContainer.innerHTML = '';
        Object.keys(yourGraduation.courses).forEach((value, index) => {
            const courseName = value;
            const courseCredit = yourGraduation.courses[value];
            step2Elements.step2CourseListContainer.innerHTML += `<li>${courseName} (${courseCredit}) <i onclick="deleteCourse(${index})" class="fa-solid fa-trash trashDelete"></i></li>`;
        });
        let courseCredit = 4;
        step2Elements.step2CreditCount.innerHTML = `Credit worth: ${courseCredit}`;
        step2Elements.step2CourseNameInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const newCourseInput = step2Elements.step2CourseNameInput;
                const newCourseName = newCourseInput.value;
                newCourseInput.value = '';
                const newCourseCredit = parseInt(step2Elements.step2CreditCount.innerHTML.replace('Credit worth: ', ''));
                const addCourseReturn = addNewCourse(newCourseName, newCourseCredit);
                if (addCourseReturn.addedCourse === true) {
                    step2Elements.step2AddCourseError.innerHTML = '';
                    LoadStage();
                }
                else {
                    step2Elements.step2AddCourseError.innerHTML = addCourseReturn.problemMsg;
                }
            }
        });
        step2Elements.step2Continue.addEventListener('click', () => {
            const totalCredits = getTotalCredits();
            const neededCredits = yourGraduation['max credits'];
            const creditCheckReturn = creditChecker(totalCredits, neededCredits);
            if (creditCheckReturn.canContinue === true) {
                step2Elements.step2CreditError.innerHTML = '';
                DisplayChanges('no-display', step2Elements.step2Continue);
                yourGraduation.stage = 'Main';
                LoadStage();
            }
            else {
                step2Elements.step2CreditError.innerHTML = creditCheckReturn.problemMsg;
            }
        });
    }
    else {
        GiveError('Not getting element', 3);
    }
}
//# sourceMappingURL=app.js.map
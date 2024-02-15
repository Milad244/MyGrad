document.addEventListener('DOMContentLoaded', function() {
    LoadStage();
});
// General Functions
function DisplayChanges(mode: 'display' | 'no-display' | 'just-display' | 'disable' | 'enable', elements: Element | Element[], opacityLevel = 15): void{
    if (Array.isArray(elements) === false){
        elements = [elements];
    }
    const divElement = document.getElementsByTagName('div');
    Object.keys(divElement).forEach(function(_, index){
        if (mode === 'display'){
            divElement[index].setAttribute('style', `opacity: ${opacityLevel}%; pointer-events: none`);
        } else if (mode === 'no-display'){
            divElement[index].setAttribute('style', 'opacity: 100%; pointer-events: all');
        }
    });
    elements.forEach(function(_, index){
        if (Array.isArray(elements) === true) {
            if (mode === 'display' || mode === 'just-display'){
                elements[index].classList.remove('no-display');
                elements[index].setAttribute('style', 'opacity: 100%; pointer-events: all');
            } else if (mode === 'no-display'){
                elements[index].classList.add('no-display');
            } else if (mode === 'disable'){
                elements[index].setAttribute('style', `opacity: ${opacityLevel}%; pointer-events: none`);
            } else if (mode === 'enable'){
                elements[index].setAttribute('style', 'opacity: 100%; pointer-events: all');
            }
        } else{
            GiveError('Element is not an array (displayChanges)', 1)
        }
    });
}

function GiveError(reason = 'Not specified', num = 1):void{
    console.log(`Error-${num}: ${reason}`);
}

function areElementsTruthy(elements: Record<string, HTMLElement | null>): boolean {
    return Object.values(elements).every(Boolean);
}

function usernameCheck(username: string): {isUsernameValid: boolean, problemMsg: string}{
    if (username.length <= 3 || username.replace(/\s/g, '').length <= 3){
        return{
            isUsernameValid: false,
            problemMsg: 'Username must have a minimum of 4 characters'
        }
    } else if(username.length >= 12 || username.replace(/\s/g, '').length >= 12){
        return{
            isUsernameValid: false,
            problemMsg: 'Username must have less than 12 characters'
        } 
    }else{
        const checkSameValueEl = document.getElementById('check-same-value');
        if(checkSameValueEl){
            checkSameValueEl.innerHTML = username;
            const nameDup = checkSameValueEl.innerHTML;
        if (username != nameDup){
            return{
                isUsernameValid: false,
                problemMsg: 'Username contains an invalid character'
            }
        }
        } else{
            GiveError('Not getting element', 4);
        }
        return{
            isUsernameValid: true,
            problemMsg: ''
        }
    }
}

function creditChecker(totalCredits: number, neededCredits: number): {canContinue: boolean, problemMsg: string}{
    if(totalCredits < neededCredits){
        return {
            canContinue: false,
            problemMsg: `You are missing ${neededCredits-totalCredits} credits out of the minimum ${neededCredits} needed to graduate`
        }
    } else{
        return {
            canContinue: true,
            problemMsg: ''
        }
    }
}

// General Elements
enum ElementIds {
    // SignUpPage
    startingPageContainer = 'starting-page-container',
    signUpButton = 'js-signUp-button',
    // setUpStep1
    step1Container = 'js-step-1-container',
    step1Continue = 'js-step1-continue',
    step1UsernameInput = 'js-step1-username-input',
    step1UsernameError = 'js-username-error',
    // setUpStep2
    step2Container = 'js-step-2-container',
    step2CourseListContainer = 'js-course-list-container',
    step2Continue = 'js-step2-continue',
    step2CourseName = 'js-step2-course-name-input',
    step2CreditMinus = 'js-credit-minus',
    step2CreditCount = 'js-credit-count',
    step2CreditAdd = 'js-credit-add',
    step2AddCourse = 'js-add-course',
    step2CreditError = 'js-credit-error',
}

// General Variables
type yourGraduationType = {
    username: string;
    courses: { [key: string]: number};
    'max credits': number;
    stage: string;
}
const yourGraduation: yourGraduationType = {
    username: 'unnamed',
    courses: {
        // 'Example Course': 4,
        // 'Example Course2': 4
    },
    'max credits': 48,
    stage: 'SetUpPart2'
};

enum Stages {
    SignUp = 'SignUp',
    SetUpPart1 = 'SetUpPart1',
    SetUpPart2 = 'SetUpPart2',
}

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
}

function LoadStage(): void{
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

function handleSignUp(){
    const signUpElements = getElementsByIds(['startingPageContainer', 'signUpButton']);
    if (areElementsTruthy(signUpElements)){
        DisplayChanges('just-display', signUpElements.startingPageContainer!);
        signUpElements.signUpButton!.addEventListener('click', () => {
            DisplayChanges('no-display', signUpElements.startingPageContainer!);
            yourGraduation.stage = 'SetUpPart1';
            LoadStage();
        })
    } else{
        GiveError('Not getting element', 1);
    }
}

function handleSetUpPart1(){
    const step1Elements = getElementsByIds(['step1Container', 'step1Continue', 'step1UsernameInput', 'step1UsernameError']);
    if (areElementsTruthy(step1Elements)){
        DisplayChanges('just-display', step1Elements.step1Container!);
        step1Elements.step1Continue!.addEventListener('click', () => {
            const newUsername = (step1Elements.step1UsernameInput as HTMLInputElement)!.value
            const usernameCheckReturn = usernameCheck(newUsername);
            if (usernameCheckReturn.isUsernameValid){
                yourGraduation.username = newUsername;
                DisplayChanges('no-display', step1Elements.step1Container!);
                yourGraduation.stage = 'SetUpPart2';
                LoadStage();
            } else {
                step1Elements.step1UsernameError!.innerHTML = usernameCheckReturn.problemMsg;
            }
        })
    } else{
        GiveError('Not getting element', 2);
    }
}

function getElementsByIds(ids: keyof typeof ElementIds | (keyof typeof ElementIds)[]): Record<string, HTMLElement | null> {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return ids.reduce((elements, id) => {
        elements[id] = document.getElementById(ElementIds[id]);
        return elements;
    }, {} as Record<string, HTMLElement | null>);
}

function getTotalCredits(): number{
    let totalCredits = 0;
    Object.keys(yourGraduation.courses).forEach((value: string) => {
        const courseCredit = yourGraduation.courses[value];
        totalCredits += courseCredit;
    });
    return totalCredits;
}

function deleteCourse(courseNum: number): void{
    const courses = yourGraduation.courses;
    let courseName: string;
    Object.keys(courses).forEach((value: string, index: number) => {
        const currentCourseName = value;
        if (courseNum === index){
            courseName = currentCourseName;
            delete yourGraduation.courses[courseName];
        }
    });
    LoadStage();
}

function handleSetUpPart2(){
    const step2Elements = getElementsByIds(['step2Container', 'step2CourseListContainer', 'step2Continue', 'step2CourseName', 'step2CreditMinus', 'step2CreditCount', 'step2CreditAdd', 'step2AddCourse', 'step2CreditError']);
    if (areElementsTruthy(step2Elements)){
        DisplayChanges('just-display', step2Elements.step2Container!);
        if (!Object.keys(yourGraduation.courses).length){
            yourGraduation.courses = defaultCourses;
        }
        step2Elements.step2CourseListContainer!.innerHTML = '';
        Object.keys(yourGraduation.courses).forEach((value: string, index: number) => {
            const courseName = value;
            const courseCredit = yourGraduation.courses[value];
            step2Elements.step2CourseListContainer!.innerHTML += `<li>${courseName} (${courseCredit}) <i onclick="deleteCourse(${index})" class="fa-solid fa-trash trashDelete"></i></li>`;
        });
        let courseCredit = 4;
        step2Elements.step2CreditCount!.innerHTML = `Credit worth: ${courseCredit}`;
        //courseCredit = parseInt(step2Elements.step2CreditCount!.innerHTML);
        // working on this part later (please ignore)
        step2Elements.step2Continue!.addEventListener('click', () => {
            const totalCredits = getTotalCredits();
            const neededCredits = yourGraduation['max credits'];
            const creditCheckReturn = creditChecker(totalCredits, neededCredits);
            if (creditCheckReturn.canContinue === true){
                DisplayChanges('no-display', step2Elements.step2Continue!);
                yourGraduation.stage = 'Main';
                LoadStage();
            } else{
                step2Elements.step2CreditError!.innerHTML = creditCheckReturn.problemMsg;
            }
        })
    } else{
        GiveError('Not getting element', 3);
    }
}
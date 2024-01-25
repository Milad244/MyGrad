document.addEventListener('DOMContentLoaded', function() {
    LoadStage();
});
// General Functions
function DisplayChanges(mode: 'display' | 'no-display' | 'just-display' | 'disable' | 'enable', elements: Element[], opacityLevel = 15): void{
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
    stage: 'signUp'
};
const yourCourses = yourGraduation.courses;

enum Stages {
    SignUp = 'signUp',
    SetUpPart1 = 'setUpPart1',
    SetUpPart2 = 'setUpPart2',
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
    const signUpElements = {
        startingPageContainer: document.getElementById(ElementIds.startingPageContainer),
        signUpButton: document.getElementById(ElementIds.signUpButton)
    }
    if (areElementsTruthy(signUpElements)){
        DisplayChanges('just-display', [signUpElements.startingPageContainer!]);
        signUpElements.signUpButton!.addEventListener('click', () => {
            DisplayChanges('no-display', [signUpElements.startingPageContainer!]);
            yourGraduation.stage = 'setUpPart1';
            LoadStage();
        })
    } else{
        GiveError('Not getting element', 1);
    }
}
function handleSetUpPart1(){
        const step1Elements = {
            step1Container: document.getElementById(ElementIds.step1Container),
            step1Continue: document.getElementById(ElementIds.step1Continue),
            step1UsernameInput: document.getElementById(ElementIds.step1UsernameInput) as HTMLInputElement,
            step1UsernameError: document.getElementById(ElementIds.step1UsernameError)
        }
        if (areElementsTruthy(step1Elements)){
            DisplayChanges('just-display', [step1Elements.step1Container!]);
            step1Elements.step1Continue!.addEventListener('click', () => {
                const newUsername = step1Elements.step1UsernameInput!.value
                const usernameCheckReturn = usernameCheck(newUsername);
                if (usernameCheckReturn.isUsernameValid){
                    yourGraduation.username = newUsername;
                    DisplayChanges('no-display', [step1Elements.step1Container!]);
                    yourGraduation.stage = 'setUpPart2';
                    LoadStage();
                } else {
                    step1Elements.step1UsernameError!.innerHTML = usernameCheckReturn.problemMsg;
                }
            })
        } else{
            GiveError('Not getting element', 2);
        }
}
function handleSetUpPart2(){
    const step2Elements = {
        step2Container: document.getElementById(ElementIds.step2Container),
    }
    if (areElementsTruthy(step2Elements)){
        DisplayChanges('just-display', [step2Elements.step2Container!]);
        //code to pick your courses
    } else{
        GiveError('Not getting element', 2);
    }
}
window.onload = function(){
    LoadElements(yourGraduation.stage);
}
// General Functions
function DisplayChanges(mode: string, elements: Element[], opacityLevel = 15): void{
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
// Function that loads different stages of the website
function LoadElements(stage: string): void{
    if (stage === 'signUp'){
        const startingPage = document.getElementById('starting-page-container');
        const signUpButton = document.getElementById('js-signUp-button');
        if (startingPage && signUpButton){
            DisplayChanges('just-display', [startingPage]);
            signUpButton.addEventListener('click', () => {
                DisplayChanges('no-display', [startingPage]);
                yourGraduation.stage = 'setUp';
                LoadElements(yourGraduation.stage);
            })
        } else{
            GiveError('Not getting element', 1);
        }
    } else if(stage === 'setUp'){
        const startingPage = document.getElementById('setup-page-container');
        if (startingPage){
            DisplayChanges('just-display', [startingPage]);
            if (Object.keys(yourCourses).length){
                Object.keys(yourCourses).forEach((value: string) => {
                    const courseName = value;
                    console.log(courseName);
                    console.log(yourCourses[courseName]);
                });
            } else{
                const step1Elements = {
                    step1: document.getElementById('js-step-1'),
                    step1Continue: document.getElementById('js-step1-continue')
                }
                if (areElementsTruthy(step1Elements)){
                    DisplayChanges('just-display', [step1Elements.step1!]);
                    step1Elements.step1Continue!.addEventListener('click', () => {
                        
                    })
                } else{
                    GiveError('Not getting element', 2);
                }
            }
        } else{
            GiveError('Not getting element', 3);
        }
    }
}

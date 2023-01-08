export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,200}$/;
export const DUMMY_USER_PHOTO = 'https://th.bing.com/th/id/OIP.qWxWnrBHWhc8nexK2HjpdwAAAA?pid=ImgDet&rs=1';
export const BASE_URL = 'https://localhost:7175/api';

export const capitalize = (word) => {
    return word.toLowerCase().replace(/\w/, firstLetter => firstLetter.toUpperCase()).trim();
}

export const stringIsNullOrWhiteSpace = (word) => {
    return  word === "" || word.trim() === "" ? true : false;
}

export const isValidPhoneNumber = (phone) => {
    phone = phone.trim();
    return phone[0] === "+" && phone.length >= 8 ? true : false;
}

export const atLeastTwoCharacters = (word) => {
    return word.length >= 2 && !stringIsNullOrWhiteSpace(word) ? true : false;
}

export const atLeastFiveCharacters = (word) => {
    return word.length >= 5 && !stringIsNullOrWhiteSpace(word) ? true : false;
}


export const shortDateTime = (date) => {
    let dateObject = new Date(date);
    return dateObject.toLocaleDateString('en-US');
}

export const shortLocalTime = (date) => {
    let dateObj = new Date(date);
    return dateObj.toLocaleTimeString("en-US");
}

export const yyyyMmDd = (date) => {
     return new Date(date).toLocaleDateString('en-GB').split('/').reverse().join('-')
}

export const ratingColor = (level) => {
    let color = '';
    if(level === 'Beginer'){
        color = rating.Beginner
    } else if(level === 'Proficient'){
        color = rating.Proficient
    } else if(level === 'Advance'){
        color = rating.Advance
    } else {
        color = rating.Expert
    }
    return color;
}

export const extractContent = (html) => {
    return new DOMParser().parseFromString(html, "text/html").documentElement.textContent;
}

export const date = () => {
    const minDate = new Date(-8640000000000000);
    return minDate;
}

export const ROLES = {
    'Applicant': 'Applicant',
    'Employer': 'Employer',
    'Admin': 'Administrator',
    'SuperAdmin': 'SuperAdministrator'
}

export const rating = {
    Beginer: '#707070',
    Proficient: '#7F4A00',
    Advance: '#C0C0C0',
    Expert: '#FFD700' 
}

export const EDUCATION_LEVEL_ARR = ['Basic', 'Post Basic', 'Diploma', 'Bachelor Degree', 'Master Degree', 'Ph.D']

export const quillModules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ]
};

export const quillFormats = [
    'font',
    'size',
    'bold', 
    'italic', 
    'underline',
    'list', 
    'bullet',
    'align',
    'color',
    'link',
    'background'
  ];

  export const skillLevels = ["Beginer", "Proficient", "Advance", "Expert"];
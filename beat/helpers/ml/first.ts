import * as tf from '@tensorflow/tfjs';

export type DataInput = {
    gender: string; 
    age: number; 
    weight: number; 
    height: number; 
    smoking_history: string; 
    hypertension: boolean; 
    heart_disease: boolean;
    HbA1c: number;
    blood_glucose: number; 
}

async function load_model(){
    const model = await tf.loadLayersModel('@/predictors/h5/linear/ann01.h5'); 
    console.log('model loaded!'); 
    return model; 
}

function preprocess(data: DataInput){
    let g = data.gender;
    let ge; 
    if(g === 'male'){
        ge = 0; 
    }else {
        ge = 1; 
    }

    let s = data.smoking_history;
    let sh;
    if(sh === 'never'){
        sh = 0;
    } else if(sh === 'no info'){
        sh = 1; 
    } else if(sh === 'current'){
        sh = 2; 
    } else if (sh === 'former'){
        sh = 3; 
    } else if (sh === 'ever'){
        sh = 4;
    } else {
        sh = 5;
    }



    const gender = ge; 
    const age = data.age; 
    const smoking_history = sh;
    const hypertension = data.hypertension ? 1 : 0;
    const heart_disease = data.heart_disease ? 1 : 0;
    const HbA1c = data.HbA1c;
    const blood_glucose = data.blood_glucose
    const bmi = data.weight / (data.height * data.height);  
    
    return [gender, age, hypertension, heart_disease, bmi, HbA1c, blood_glucose];
}

export default function first(data : DataInput) {
    load_model().then((model) => {
        const input = tf.tensor2d(preprocess(data)); 
        const output = model.predict(input);
        return output; 
     }); 

}
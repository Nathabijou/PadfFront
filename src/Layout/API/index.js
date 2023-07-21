export const getBeneficiaire=()=>{
    return fetch('https://dummyjson.com/carts/1')
    .then(res => res.json());  
};

export const getBeneficiaireAge=()=>{
    return fetch('https://dummyjson.com/carts')
    .then(res => res.json());  
}
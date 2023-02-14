/* eslint-disable no-useless-escape */
//https://www.geeksforgeeks.org/how-to-count-number-of-occurrences-of-repeated-names-in-an-array-of-objects-in-javascript/
const findCounts = (arr,key, field) => {   
    let arr2 = [];
      
    arr.forEach((x)=>{
         
      // Checking if there is any object in arr2
      // which contains the key value
       if(arr2.some((val)=>{ return val[key] == x[key] })){
          // x is items in arr console.log(x);
         // If yes! then increase the occurrence by 1
         arr2.forEach((k)=>{
           if(k[key] === x[key]){ 
             k["count"]++
             k[field] = x[field]
           }
           
        })
           
       }else{
         // If not! Then create a new object initialize 
         // it with the present iteration key's value and 
         // set the count to 1
         let a = {}
         a[key] = x[key]
         a[field] = x[field];
         a["count"] = 1
         arr2.push(a);
       }
    })
    return arr2;
  };
  
  export default findCounts;
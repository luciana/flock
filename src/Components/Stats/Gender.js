import { Pie } from './../../Components/Chart';
import { Loading }  from '../../Components';


export default function GenderStats({data, optionId}) {
  const [loading, setLoading] = useState(false);
  const allMaleGender = (data.stats).filter((i) => i.userGender === 'male').length;
  const allFemaleGender = (data.stats).filter((i) => i.userGender === 'female').length;
  const allNonBinaryGender = (data.stats).filter((i) => i.userGender === 'non-binary').length;
  const allNoneGender = (data.stats).filter((i) => i.userGender === '').length;
  setLoading(true);  

  const pieAllGenderData = [
    { value: allMaleGender, name: 'male' },
    { value: allFemaleGender, name: 'female' },
    { value: allNonBinaryGender, name: 'non-binary' },
    { value: allNoneGender, name: 'not given' },
];


  const maleGenderListFor = (optionId) => ((data.stats).filter((i) => i.optionId === optionId && i.userGender === 'male').length);
  const femaleGenderListFor = (optionId) => ((data.stats).filter((i) => i.optionId === optionId && i.userGender === 'female').length);
  const nonBinaryGenderListFor = (optionId) => ((data.stats).filter((i) => i.optionId === optionId && i.userGender === 'non-binary').length);
  const noneGenderListFor = (optionId) => ((data.stats).filter((i) => i.optionId === optionId && i.userGender === '').length);

  setLoading(false);  

  return (

    <>
     {loading && <Loading />}
    {!optionId && (
         <>
         <div className="my-2">Male Votes: {allMaleGender} </div>
         <div className="my-2">Female Votes: {allFemaleGender} </div>
         <div className="my-2">Non-Binary Votes: {allNonBinaryGender} </div>     
         <div className="my-2">Not Entered: {noneGenderListFor}</div>  
         <div><Pie data={pieAllGenderData} /></div>  
         </>
    )}                                               
    
    {optionId && (
        <>
         <div className="my-2">Male Votes: {maleGenderListFor(optionId)} </div>
        <div className="my-2">Female Votes: {femaleGenderListFor(optionId)} </div>
        <div className="my-2">Non-Binary Votes: {nonBinaryGenderListFor(optionId)} </div>  
        <div className="my-2">Not Entered: {noneGenderListFor(optionId)}</div>   
         </>
    )} 
    </>

  );
}
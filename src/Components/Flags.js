import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Contexts";
import { LANGUAGES, ROUTES, TYPES } from "../Constants";
import Arrow from "../Assets/Images/Arrow";
import BR from "../Assets/Images/flags/pt-BR.svg";
import EN from "../Assets/Images/flags/en-US.svg";

export default function Flags() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  function showFlag(lang) {
    if (lang === "pt-BR")
      return <img src={BR} alt="Português" className="w-6 h-6" />;
    return <img src={EN} alt="English" className="w-6 h-6" />;
  }

  function handleChangeLanguage(lang) {
    const currentRoute = Object.keys(ROUTES[state.lang])
      .map((k) => ({ key: k, value: ROUTES[state.lang][k] }))
      .find((r) => r.value === location.pathname);
    dispatch({ type: TYPES.UPDATE_LANG, payload: lang });
    navigate(ROUTES[lang][currentRoute.key]);
    setOpen(false);
  }

  return (
    <div className="">
      <button
        type="button"
        className=""
        onClick={() => setOpen(!open)}
      >
        {showFlag(state.lang)}    
        <Arrow styles={`ml-1 w-4 h-4 ${open && "rotate-180"}`} />   
      </button>
      <ul       
        className={`flex flex-col items-start pl-1 mt-2 ${!open && "hidden"}`}
      >
        {Object.keys(LANGUAGES)
          .filter((l) => l !== state.lang)
          .map((l) => (
            <li key={l}>
              <button type="button" onClick={() => handleChangeLanguage(l)}>
                {showFlag(l)}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
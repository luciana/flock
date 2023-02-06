import React, {useContext} from 'react';
import { LANGUAGES } from "../../Constants";
import { AppContext } from "../../Contexts";
import './Badge.scss';



const Badge = (count) => {

    const { state } = useContext(AppContext);
    const { user } = state;
    let lang = "en-US";
    if (user) lang= user.locale;
  
    const badges = [{
        id: 1,
        color: "badge-earned yellow",
        icon: "fa fa-bolt",
        label: LANGUAGES[lang].Badges.Initiator
      },{
        id: 2,
        color: "badge-earned orange",
        icon: "fa fa-shield",
        label: LANGUAGES[lang].Badges.Support
      },{
        id: 3,
        color: "badge-earned pink",
        icon: "fa fa-bicycle",
        label: LANGUAGES[lang].Badges.Jungler
      },
      {
        id: 4,
        color: "badge-earned red",
        icon: "fa fa-shield",
        label: LANGUAGES[lang].Badges.Jungler
      },{
        id: 5,
        color: "badge-earned blue-dark",
        icon: "fa fa-rocket",
        label: LANGUAGES[lang].Badges.Jungler
      },{
        id: 5,
        color: "badge-earned blue",
        icon: "fa fa-users",
        label: LANGUAGES[lang].Badges.Community
      },
      {
        id: 6,
        color: "badge-earned green",
        icon: "fa fa-tree",
        label: LANGUAGES[lang].Badges.Solid
      },{
        id: 7,
        color: "badge-earned green-dark",
        icon: "fa fa-user",
        label: LANGUAGES[lang].Badges.Jungler
      },{
        id: 8,
        color: "badge-earned purple",
        icon: "fa fa-anchor",
        label: LANGUAGES[lang].Badges.Jungler
      },{
        id: 9,
        color: "badge-earned teal",
        icon: "fa fa-user fa-street-view",
        label: LANGUAGES[lang].Badges.Solid
      },
      {
        id: 10,
        color: "badge-earned silver",
        icon: "fa fa-battery-full",
        label: LANGUAGES[lang].Badges.Charged
      },{
        id: 11,
        color: "badge-earned gold",
        icon: "fa fa-magic",
        label: LANGUAGES[lang].Badges.Jungler
      },{
        id: 12,
        color: "badge-earned silver-dark",
        icon: "fa fa-award",
        label: LANGUAGES[lang].Badges.Award
      }
      ];
    
    const translateToBadgeId = (count) => {
        if(count < 10 ) return 1;
        if(count < 50 ) return 2;
        if(count < 100 ) return 3;
        if(count < 150 ) return 4;
        if(count < 200 ) return 5;
        if(count < 250 ) return 6;
        if(count < 400 ) return 7;
        if(count < 550 ) return 8;
        if(count < 700 ) return 9;
        if(count < 850 ) return 10;
        if(count < 950 ) return 11;
        if(count > 950 ) return 12;
    }

    let selectBadge = badges;  
    console.log("badge count", count);
    if (count){
        const userCount = count.count;  
        if (userCount){
        const id = translateToBadgeId(userCount);
            console.log("badge id", id);
            selectBadge = badges.filter((l) => l.id === id)
        }
    }
    return (        
        <div className="main-badge-wrapper">
         {
            selectBadge.map((badge, index) =>(                     
                <div className={badge.color} key={`badge-${index}`}>            
                    <div className="circle">
                        <i className={badge.icon} aria-hidden="true"></i>
                        <div className="ribbon">{badge.label}</div>
                    </div>                
                </div>
        
            ))
        }
        </div>
    );
}


export default Badge
import{r as l,j as e}from"./react.Cv0jp0yw.js";import{I as w,M as b,a as X}from"./index.CJ_4wcqA.js";import V from"./LeadFormNew.BR7ewIhm.js";const Q=t=>{switch(String(t??"").toLowerCase().replace(/[\s_-]/g,"")){case"fulltimer":return"fullTimer";case"hours":return"hours";default:return"default"}},Z=t=>t.days>=1?`${t.days} ${t.days===1?"Day":"Days"} left`:"Few hours left",ee=t=>{const o=t.days*24+t.hours;return o>=1?`${o} ${o===1?"Hour":"Hours"} left`:"Less than 1 hour left"},te=(t,o,i)=>{switch(Q(o)){case"fullTimer":return i(t);case"hours":return ee(t);default:return Z(t)}};function A(t){const o={days:0,hours:0,minutes:0,seconds:0};if(!t)return{timeLeft:o,isExpired:!0};const i=new Date(t).getTime();if(Number.isNaN(i))return{timeLeft:o,isExpired:!0};const d=i-Date.now();return d<=0?{timeLeft:o,isExpired:!0}:{timeLeft:{days:Math.floor(d/(1e3*60*60*24)),hours:Math.floor(d/(1e3*60*60)%24),minutes:Math.floor(d/(1e3*60)%60),seconds:Math.floor(d/1e3%60)},isExpired:!1}}const F=t=>String(t).padStart(2,"0"),ne=t=>`${t.days>0?`${F(t.days)}d : `:""}${F(t.hours)}h : ${F(t.minutes)}m : ${F(t.seconds)}s`,re=t=>{if(!t)return{};if(typeof t=="object")return t;try{const o=JSON.parse(t);return o&&typeof o=="object"?o:{}}catch{return{}}},oe=t=>{if(!t)return{};const o=t;if(o.url)return{url:o.url,alternativeText:o.alternativeText};const i=t?.data?.attributes;return i?.url?{url:i.url,alternativeText:i.alternativeText}:{}},_=({popupTimer:t,className:o=""})=>{const i=t?.timerCountDown,[d,m]=l.useState(!1),[n,a]=l.useState(!1),[{timeLeft:N,isExpired:s},y]=l.useState(()=>A(i));if(l.useEffect(()=>{const I=()=>a(window.innerWidth<768);return I(),window.addEventListener("resize",I),()=>window.removeEventListener("resize",I)},[]),l.useEffect(()=>{if(m(!0),!i)return;y(A(i));const I=setInterval(()=>{const M=A(i);y(M),M.isExpired&&clearInterval(I)},1e3);return()=>clearInterval(I)},[i]),!d||!t||!i||s)return null;const{text:p,icon:j,iconDimension:g,customStyle:T,endDateUiType:k}=t,x=re(T),E=x.textColor,u=x.timerTextColor,v=x.timerBackground,L=x.containerBorderColor,R=x.containerBackground||x.textBackground,D=oe(j),h=g,$=N.days>0;let C=`${p||"Offer ends in"} `;return $&&(C+=`${N.days} days `),C+=`${N.hours} hours ${N.minutes} minutes ${N.seconds} seconds`,e.jsxs("div",{tabIndex:0,role:"timer","aria-label":C.trim(),style:{padding:n?"4px 5px 4px 4px":"4px",gap:n?"8px":"10px",borderRadius:"32px",border:L?`1px solid ${L}`:void 0,boxShadow:"0 4px 12px 0 rgba(20, 58, 114, 0.20)",background:R||void 0},className:`tabfocus inline-flex w-fit items-center ${o}`,children:[e.jsxs("div",{className:"flex items-center gap-[8px] text-center",children:[D.url&&e.jsx(w,{src:D.url,alt:D.alternativeText||"timer",imageDimension:h||"20x20",className:"shrink-0"}),p&&e.jsx("span",{style:{color:E||void 0,fontSize:"13px"},className:"font-family-noto font-bold leading-normal whitespace-nowrap",children:p})]}),e.jsx("div",{style:{padding:n?"0 8px":"2px 8px",gap:"2px",borderRadius:"32px",border:"1px solid #E8EBF1",background:v||void 0},className:"flex items-center justify-center text-center",children:e.jsx("span",{style:{color:u||void 0,fontSize:n?"13px":"16px"},className:"font-family-noto font-bold leading-normal whitespace-nowrap tabular-nums",children:te(N,k,ne)})})]})},ae=typeof window<"u"&&window.innerWidth<768,q=({title:t,subTitle:o,description:i,disclaimer:d,image:m,mobileImage:n,descriptionList:a,imageDimension:N,savingPopupImage:s,termPopupImage:y,termPopupBackground:p,savingPopupBackground:j,popupTimer:g})=>{const[k,x]=N?.split("#")||["",""],E=!!g?.timerCountDown;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-head",children:[e.jsxs("div",{className:"hidden lg:flex lg:min-w-[19.69rem] w-full h-auto flex-col gap-[7.7px] pb-[42.5px]",children:[e.jsxs("div",{className:"flex flex-col gap-3 lg:gap-[12px]",children:[t&&e.jsx("h3",{tabIndex:0,className:"tabfocus max-w-[18.125rem] lg:max-w-[16.75rem] w-full",children:e.jsx(b,{description:`<h3 class="text-primary font-family-lato text-[0.8125rem] lg:text-[1.25rem] font-weight-semi-bold lg:font-weight-bold leading-[normal] tracking-[-0.0025rem]">${t}</h3>`})}),e.jsx(_,{popupTimer:g,className:"relative z-[2]"}),o&&e.jsxs("div",{className:"px-2 lg:px-[0.53rem] py-[0.13rem] lg:py-2 rounded-[0.25rem] bg-[#1C509C] flex items-center gap-1 w-fit",children:[s&&e.jsx(w,{imageDimension:ae?"12x12":"16x16",src:s?.url}),e.jsx(b,{className:"!text-white font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-semi-bold lg:font-weight-medium leading-[normal]",description:o,tag:"p"})]})]}),p&&e.jsx("div",{children:e.jsx(w,{className:`absolute left-[0rem] ${E?"top-[9.5rem]":"top-[6.5rem]"}`,imageDimension:"300x16",src:p.url})}),e.jsxs("div",{tabIndex:0,className:"tabfocus lg:max-w-[15.5rem] w-full flex flex-col gap-3 lg:gap-[20px]",children:[i&&e.jsx(b,{tag:"p",className:"text-primary font-family-lato text-[1.25rem] lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",description:i}),a&&e.jsx("div",{className:"flex md:flex-col lg:flex-col gap-[20px] relative z-[1]",children:a.map((u,v)=>e.jsxs("div",{className:"bg-white px-2 lg:px-4 py-2 lg:py-[0.56rem] rounded-lg shadow-[0_4px_12px_0_var(--Effects-Shadows-Information,rgba(0,146,219,0.20))] flex flex-col gap-1 max-w-[9.875rem] lg:max-w-[13.0625rem] w-fit",children:[e.jsx("p",{className:"text-secondary whitespace-nowrap text-center font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",children:u.title}),e.jsx("p",{className:"text-primary text-center font-family-lato text-base lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",children:e.jsx(b,{description:u.description})})]},v))}),j&&e.jsx(w,{className:"absolute top-[20.85rem] right-[0.75rem]",imageDimension:k,src:j.url}),m&&e.jsx(w,{className:"absolute top-[13.8rem] left-[0.4rem] h-[42px] w-[37px]",src:m.url})]}),d&&y&&e.jsxs("div",{className:"flex flex-row gap-x-[8px] pt-[23px]",children:[e.jsx(w,{imageDimension:"16x16",src:y.url}),e.jsx("p",{children:e.jsx(b,{className:"text-secondary font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",description:d,tag:"span"})})]})]}),e.jsxs("div",{className:"relative w-full h-auto flex flex-col gap-[10px] lg:hidden pt-4",children:[e.jsxs("div",{className:"flex flex-col gap-3 px-3",children:[t&&e.jsx("h3",{tabIndex:0,className:"tabfocus max-w-[18.125rem] lg:max-w-[16.75rem] w-full",children:e.jsx(b,{description:`<h3 class="text-primary font-family-lato text-[0.8125rem] lg:text-[1.25rem] font-weight-semi-bold lg:font-weight-bold leading-[normal] tracking-[-0.0025rem]">${t}</h3>`})}),e.jsx(_,{popupTimer:g,className:"relative z-[2]"}),p&&e.jsx(w,{className:`absolute left-[0rem] w-full ${E?"top-[92px]":"top-[34px]"}`,imageDimension:"300x16",src:p.url}),o&&s&&e.jsxs("div",{className:"px-2 lg:px-[0.53rem] py-[0.13rem] lg:py-2 rounded-[0.25rem] bg-[#1C509C] flex items-center gap-1 w-fit",children:[e.jsx(w,{imageDimension:"12x12",src:s.url}),e.jsx(b,{className:"!text-white font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-semi-bold lg:font-weight-medium leading-[normal]",description:o,tag:"p"})]})]}),e.jsxs("div",{tabIndex:0,className:"tabfocus lg:max-w-[15.5rem] w-full flex flex-col gap-3 px-3",children:[i&&e.jsx(b,{tag:"p",className:"text-primary font-family-lato text-[1.25rem] lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",description:i}),a&&e.jsx("div",{className:"flex md:flex-col lg:flex-col gap-[20px] relative z-[1]",children:a.map((u,v)=>e.jsxs("div",{className:"bg-white px-2 lg:px-4 py-2 lg:py-[0.56rem] rounded-lg shadow-[0_4px_12px_0_var(--Effects-Shadows-Information,rgba(0,146,219,0.20))] flex flex-col gap-1 w-[9.875rem] max-w-[9.875rem] lg:w-auto lg:max-w-[11.0625rem]",children:[e.jsx("p",{className:"text-secondary text-center font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",children:u.title}),e.jsx("p",{className:"text-primary text-center font-family-lato text-base lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",children:e.jsx(b,{description:u.description})})]},v))}),n&&e.jsx(w,{className:"absolute top-[4.5rem] right-[3.5rem]",imageDimension:x,src:n.url}),m&&e.jsx(w,{className:"absolute top-[10rem] left-[0rem] h-[42px] w-[37px]",src:m.url})]})]})]}),e.jsx("style",{jsx:!0,children:`
        .modal-head {
          display: flex;
          padding-top: 0px;
          padding-left: 12px;
          flex-direction: column;
          row-gap: 0.5rem;
          padding-bottom: 0.62rem;
          background: linear-gradient(
            45deg,
            var(--Gradient-Secondary-Shalimar-shalimar-color-stop1, rgba(199, 255, 240, 0.4)) 0%,
            var(--Gradient-Secondary-Shalimar-shalimar-color-stop2, rgba(250, 255, 184, 0.4)) 100%
          );
          border-radius: 1.5rem 1.5rem 0rem 0rem;
        }

        @media (min-width: 1024px) {
          .modal-head {
            row-gap: 0.5rem;
            padding-left: 26.5px;
            padding-top: 2rem;
            padding-bottom: 0px;
            row-gap: 1.25rem;
            border-radius: 1.5rem 0rem 0rem 1.5rem;
          }
        }

        @media screen and (max-width: 768px) {
          .modal-head {
            padding-left: 0px !important;
            margin-bottom: 6.5px;
          }
        }
      `})]})},ie=({title:t,subTitle:o,description:i,disclaimer:d,image:m,mobileImage:n,descriptionList:a,imageDimension:N,savingPopupImage:s,termPopupImage:y,termPopupBackground:p,savingPopupBackground:j,popupTimer:g})=>{const[k,x]=N?.split("#")||["",""],E=!!g?.timerCountDown;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-head",children:[e.jsxs("div",{className:"hidden lg:flex lg:min-w-[19.69rem] w-full h-auto flex-col gap-[7.7px] pb-[42.5px]",children:[e.jsxs("div",{className:"flex flex-col gap-3 lg:gap-[12px]",children:[t&&e.jsx("h3",{tabIndex:0,className:"tabfocus max-w-[18.125rem] lg:max-w-[16.75rem] w-full",children:e.jsx(b,{description:`<h3 class="text-primary font-family-lato text-[0.8125rem] lg:text-[1.25rem] font-weight-semi-bold lg:font-weight-bold leading-[normal] tracking-[-0.0025rem]">${t}</h3>`})}),e.jsx(_,{popupTimer:g,className:"relative z-[2]"}),o&&s&&e.jsxs("div",{className:"px-2 lg:px-[0.53rem] py-[0.13rem] lg:py-2 rounded-[0.25rem] bg-gradient-to-tr from-[#0092db] to-[#91dcfd] flex items-center gap-1 w-fit",children:[e.jsx(w,{imageDimension:"16x16",src:s.url}),e.jsx(b,{className:"!text-white font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-semi-bold lg:font-weight-medium leading-[normal]",description:o,tag:"p"})]})]}),p&&e.jsx("div",{children:e.jsx(w,{className:`absolute left-[0rem] ${E?"top-[9.5rem]":"top-[6.5rem]"}`,imageDimension:"300x16",src:p.url})}),e.jsxs("div",{tabIndex:0,className:"tabfocus lg:max-w-[15.5rem] w-full flex flex-col gap-3 lg:gap-[20px]",children:[i&&e.jsx(b,{tag:"p",className:"text-primary font-family-lato text-[1.25rem] lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",description:i}),a&&e.jsx("div",{className:"flex md:flex-col lg:flex-col gap-[20px] relative z-[1]",children:a.map((u,v)=>e.jsxs("div",{className:"bg-white px-2 lg:px-4 py-2 lg:py-[0.56rem] rounded-lg shadow-[0_4px_12px_0_var(--Effects-Shadows-Information,rgba(0,146,219,0.20))] flex flex-col gap-1 max-w-[9.875rem] lg:max-w-[10.0625rem]",children:[e.jsx("p",{className:"text-secondary whitespace-nowrap text-center font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",children:u.title}),e.jsx("p",{className:"text-primary text-center font-family-lato text-base lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",children:e.jsx(b,{description:u.description})})]},v))}),j&&e.jsx(w,{className:"absolute top-[20.85rem] right-[0.09rem]",imageDimension:k,src:j.url}),m&&e.jsx(w,{className:"absolute top-[13.8rem] left-[0.4rem] h-[42px] w-[37px]",src:m.url})]}),d&&y&&e.jsxs("div",{className:"flex flex-row gap-x-[8px] pt-[23px]",children:[e.jsx(w,{imageDimension:"16x16",src:y.url}),e.jsx("p",{children:e.jsx(b,{className:"text-secondary font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",description:d,tag:"span"})})]})]}),e.jsxs("div",{className:"relative w-full h-auto flex flex-col gap-[10px] lg:hidden pt-4",children:[e.jsxs("div",{className:"flex flex-col gap-3 px-3",children:[t&&e.jsx("h3",{tabIndex:0,className:"tabfocus max-w-[18.125rem] lg:max-w-[16.75rem] w-full",children:e.jsx(b,{description:`<h3 class="text-primary font-family-lato text-[0.8125rem] lg:text-[1.25rem] font-weight-semi-bold lg:font-weight-bold leading-[normal] tracking-[-0.0025rem]">${t}</h3>`})}),e.jsx(_,{popupTimer:g,className:"relative z-[2]"}),p&&e.jsx(w,{className:`absolute left-[0rem] w-full ${E?"top-[92px]":"top-[34px]"}`,imageDimension:"300x16",src:p.url}),o&&s&&e.jsxs("div",{className:"px-2 lg:px-[0.53rem] py-[0.13rem] lg:py-2 rounded-[0.25rem] bg-gradient-to-tr from-[#0092db] to-[#91dcfd] flex items-center gap-1 w-fit",children:[e.jsx(w,{imageDimension:"12x12",src:s.url}),e.jsx(b,{className:"!text-white font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-semi-bold lg:font-weight-medium leading-[normal]",description:o,tag:"p"})]})]}),e.jsxs("div",{tabIndex:0,className:"tabfocus lg:max-w-[15.5rem] w-full flex flex-col gap-3 px-3",children:[i&&e.jsx(b,{tag:"p",className:"text-primary font-family-lato text-[1.25rem] lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",description:i}),a&&e.jsx("div",{className:"flex md:flex-col lg:flex-col gap-[20px] relative z-[1]",children:a.map((u,v)=>e.jsxs("div",{className:"bg-white px-2 lg:px-4 py-2 lg:py-[0.56rem] rounded-lg shadow-[0_4px_12px_0_var(--Effects-Shadows-Information,rgba(0,146,219,0.20))] flex flex-col gap-1 w-[9.875rem] max-w-[9.875rem] lg:w-auto lg:max-w-[11.0625rem]",children:[e.jsx("p",{className:"text-secondary text-center font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",children:u.title}),e.jsx("p",{className:"text-primary text-center font-family-lato text-base lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",children:e.jsx(b,{description:u.description})})]},v))}),n&&e.jsx(w,{className:"absolute top-[4.5rem] right-0",imageDimension:x,src:n.url}),m&&e.jsx(w,{className:"absolute top-[10rem] left-[0rem] h-[42px] w-[37px]",src:m.url})]})]})]}),e.jsx("style",{jsx:!0,children:`
        .modal-head {
          display: flex;
          padding-top: 0px;
          padding-left: 12px;
          flex-direction: column;
          row-gap: 0.5rem;
          padding-bottom: 0.62rem;
          background: var(--Gradient-Alerts-light-information, linear-gradient(180deg, var(--Gradient-Alerts-Light-Information-lightinformation-color-stop1, #eff8fd) 0%, var(--Gradient-Alerts-Light-Information-lightinformation-color-stop2, #fff) 100%));
          border-radius: 1.5rem 1.5rem 0rem 0rem;
        }

        @media (min-width: 1024px) {
          .modal-head {
            row-gap: 0.5rem;
            padding-left: 1.62rem;
            padding-top: 2rem;
            padding-bottom: 4rem;
            row-gap: 1.25rem;
            border-radius: 1.5rem 0rem 0rem 1.5rem;
          }
        }

        @media screen and (max-width: 768px) {
          .modal-head {
            padding-left: 0px !important;
            margin-bottom: 6.5px;
          }
        }
      `})]})},U=({title:t,subTitle:o,description:i,disclaimer:d,button:m,image:n,mobileImage:a,descriptionList:N,imageDimension:s,form:y,dataConfig:p,savingPopupImage:j,termPopupImage:g,termPopupBackground:T,savingPopupBackground:k,popupTimer:x,newPopupType:E,slug:u,onClose:v,specificCountryCodeValidations:L})=>{const R=l.useContext(W)||v||(()=>{}),D=()=>{m?.buttonLink&&m?.buttonLink!=="#"&&window.open(m?.buttonLink,"_blank"),R()},h=E?.toLowerCase()?.trim()||"health",C={health:q,investment:ie}[h]||q;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 z-[998] opacity-[0.3]",style:{backdropFilter:"blur(4px)"}}),e.jsx("div",{className:"modal-container-popup lg:w-[100%] w-[93%] fixed inset-0 z-[999] flex items-center justify-center mx-auto my-0 overflow-x-hidden overflow-y-auto",children:e.jsx("div",{className:"modal-content modal-container-wrapper w-full h-auto relative",onClick:I=>I.stopPropagation(),children:e.jsxs("div",{className:"modal-content-header shadow-lg mx-auto rounded-3xl bg-white relative flex flex-col lg:flex-row lg:gap-[2rem]",children:[e.jsx("div",{tabIndex:0,className:"new-investment-popup-close tabfocus absolute z-[999999] right-3 lg:right-4 top-3 lg:top-3.5 flex justify-center items-center w-fit lg:w-6 h-fit lg:h-6 cursor-pointer",onClick:D,onKeyDown:I=>{I.key==="Enter"&&(I.preventDefault(),D())},role:"button","aria-label":"Close popup",children:e.jsx(X,{type:"close-popup"})}),e.jsx("div",{className:"relative lg:max-w-[18.6875rem] w-full",children:C&&e.jsx(C,{title:t,subTitle:o,description:i,disclaimer:d,button:m,image:n,mobileImage:a,descriptionList:N,imageDimension:s,form:y,dataConfig:p,savingPopupImage:j,termPopupImage:g,termPopupBackground:T,savingPopupBackground:k,popupTimer:x})}),e.jsx("div",{className:`form px-3 pb-6 lg:py-[1.5rem] lg:pl-0 lg:pr-[3rem] ${h==="term"?"lg:ml-8":""} ${h==="life"?"lg:pl-[23px] lg:pr-[61px] lg:max-w-[505px] lg:w-fit":""}`,children:e.jsx(V,{form:y,dataConfig:p,slug:u,isPopup:!0,specificCountryCodeValidations:L})})]})})}),e.jsx("style",{children:`
        .modal-container-popup {
          // margin-inline: 1rem;
          transition: all 0.3s ease;
          text-align: left;
        }

        .modal-content {
          width: 100%;
          transition: all 0.5s ease-in-out;
        }

        @media (min-width: 1024px) {
          .modal-content {
            width: 835px !important;
            max-height: 90vh !important;
          }
        }

        .modal-content-header {
          outline: none;
          border-width: 0;
          position: relative;
          animation: animatebottom 0.4s;
        }

        @media (min-width: 1024px) {
          .modal-content-header {
            padding-top: 0rem;
            padding-bottom: 0rem;
          }
        }

        @keyframes animatebottom {
          from {
            top: -300px;
            opacity: 0;
          }
          to {
            top: 0;
            opacity: 1;
          }
        }

        .modal-content-header:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        /* Form Overrides */
        .form .lead-container .form {
          padding: 0 !important;
          box-shadow: none !important;
          margin-left: 0.5rem !important;
        }

        .form .lead-container {
          padding-top: 0 !important;
          padding-bottom: 10px !important;
        }

        @media (min-width: 1024px) {
          .form .lead-container {
            padding-bottom: 0 !important;
          }
        }

        .outer-container {
          padding-right: 0 !important;
        }

        /* Mobile Scrolling */
        @media screen and (max-width: 768px) {
          .modal-container-popup {
            margin-top: 15px;
            align-items: flex-start;
            overflow-x: hidden;
          }

          .modal-content.modal-container-wrapper {
            max-height: 100dvh;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.28) transparent;
          }

          .modal-content.modal-container-wrapper::-webkit-scrollbar {
            width: 4px;
          }

          .modal-content.modal-container-wrapper::-webkit-scrollbar-track {
            background: transparent;
          }

          .modal-content.modal-container-wrapper::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.28);
            border-radius: 9999px;
          }

          .new-investment-popup-close {
            position: absolute !important;
            top: calc(env(safe-area-inset-top, 0px) + 20px) !important;
            right: 12px !important;
          }

          .modal-content-header {
            border-radius: 1.5rem !important;
          }
        }

        /* Focus styles for accessibility */
        .tabfocus:focus {
          outline: 2px solid #4299e1;
          outline-offset: 2px;
        }
      `})]})},se=({popUpData:t,onClose:o,dataConfig:i,slug:d,specificCountryCodeValidations:m})=>{const n=t?.attributes||{};return e.jsx(U,{title:n.title,subTitle:n.subTitle,description:n.description,disclaimer:n.disclaimer,button:n.button,image:n.image,mobileImage:n.mobileImage,descriptionList:n.descriptionList,imageDimension:n.imageDimension,form:n.form,dataConfig:i,savingPopupImage:n.savingPopupImage,termPopupImage:n.termPopupImage,termPopupBackground:n.termPopupBackground,savingPopupBackground:n.savingPopupBackground,popupTimer:n.popupTimer,newPopupType:n.newPopupType,slug:d,onClose:o,specificCountryCodeValidations:m})},G=({popUpData:t,onClose:o,dataConfig:i,slug:d,specificCountryCodeValidations:m})=>{const n=t?.attributes||{};return e.jsx(U,{title:n.title,subTitle:n.subTitle,description:n.description,disclaimer:n.disclaimer,button:n.button,image:n.image,mobileImage:n.mobileImage,descriptionList:n.descriptionList,imageDimension:n.imageDimension,form:n.form,dataConfig:i,savingPopupImage:n.savingPopupImage,termPopupImage:n.termPopupImage,termPopupBackground:n.termPopupBackground,savingPopupBackground:n.savingPopupBackground,popupTimer:n.popupTimer,newPopupType:n.newPopupType,slug:d,onClose:o,specificCountryCodeValidations:m})},le=({popUpData:t,onClose:o,dataConfig:i,slug:d,layoutName:m,specificCountryCodeValidations:n})=>{const a=t?.attributes||{};return e.jsx(U,{title:a.title,subTitle:a.subTitle,description:a.description,disclaimer:a.disclaimer,button:a.button,image:a.image,mobileImage:a.mobileImage,descriptionList:a.descriptionList,imageDimension:a.imageDimension,form:a.form,dataConfig:i,savingPopupImage:a.savingPopupImage,termPopupImage:a.termPopupImage,termPopupBackground:a.termPopupBackground,savingPopupBackground:a.savingPopupBackground,popupTimer:a.popupTimer,newPopupType:a.newPopupType,slug:d,onClose:o,specificCountryCodeValidations:n})},W=l.createContext(null),xe=({popUps:t,slug:o,dataConfig:i,specificCountryCodeValidations:d})=>{const[m,n]=l.useState(null),[a,N]=l.useState(!1),s=l.useRef(null),y=l.useRef(!1),p=l.useRef(!1),j=l.useRef(new Set),g=l.useRef(new Set),T=l.useRef(!1),k=l.useRef(null),x=l.useRef(0),E=l.useRef(Date.now()),u=typeof window<"u"&&window.innerWidth<768,v=l.useCallback(()=>{m&&g.current.add(m),T.current=!0,n(null),y.current=!1,p.current=!0,s.current&&(clearTimeout(s.current),s.current=null),typeof window<"u"&&(document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.width="",window.scrollTo(0,x.current))},[m]);l.useEffect(()=>{if(typeof window>"u"||new URLSearchParams(window.location.search).get("source")==="CA")return;const c=localStorage.getItem("cwylLeadPage");if(c&&o==="/")try{if(JSON.parse(c)?.equoteNumber)return}catch(f){console.error("Error parsing cwylLeadPage:",f)}N(!0)},[o]);const L=l.useCallback((r,c)=>r?r.find(f=>u&&f.attributes.mobileViewType===c||f.attributes.type===c):null,[u]),R=l.useCallback((r,c)=>r?r.find(f=>f.attributes.name===c):null,[]),D=l.useCallback(r=>{if(T.current||g.current.has(r))return;s.current&&clearTimeout(s.current);const c=()=>{if(T.current||g.current.has(r)||y.current)return;const f=document.getElementById("certificate-image-modal"),P=document.getElementById("forceUpdateOnIOS");if(f||P)return;const O=Date.now()-E.current;if(O<7e3){const z=7e3-O+100;s.current=setTimeout(c,z);return}const S=document.activeElement;if(S&&(S.tagName==="INPUT"||S.tagName==="TEXTAREA"||S.tagName==="SELECT"||S.getAttribute("contenteditable")==="true")){s.current=setTimeout(c,7e3);return}x.current=window.scrollY||window.pageYOffset,document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${x.current}px`,document.body.style.width="100%",n(r),y.current=!0,j.current.add(r)};s.current=setTimeout(c,7e3)},[]),h=l.useCallback(()=>{if(E.current=Date.now(),T.current)return;const r=document.getElementById("certificate-image-modal"),c=document.getElementById("forceUpdateOnIOS");if(r||c||u&&y.current)return;if(s.current&&(clearTimeout(s.current),s.current=null),u){const B=document.activeElement;if(B&&(B.tagName==="INPUT"||B.tagName==="TEXTAREA"||B.tagName==="SELECT"||B.getAttribute("contenteditable")==="true"))return}const P=window.location.pathname==="/corp-static-old"?"nfoIntentPopup":"idleIntentPopup",O=L(t?.data||[],P);if(!O)return;const S=O.attributes.name;if(g.current.has(S))return;const Y=j.current.has("exit-intent-popup"),z=j.current.has("instant-popup");!y.current&&!Y&&!z&&D(S)},[u,t,L,D]),$=l.useCallback(()=>{if(T.current)return;const r=document.getElementById("certificate-image-modal"),c=document.getElementById("forceUpdateOnIOS");if(!(r||c)&&!p.current){if(u){const f=L(t?.data||[],"idleIntentPopup");if(f){const P=f.attributes.name;if(g.current.has(P))return;D(P)}}else{const f=L(t?.data||[],"exitIntentPopup");if(f){const P=f.attributes.name;if(g.current.has(P))return;x.current=window.scrollY||window.pageYOffset,document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${x.current}px`,document.body.style.width="100%",n(P),j.current.add(P)}}s.current&&clearTimeout(s.current),p.current=!0}},[u,t,L,D]),C=l.useCallback(r=>{const c=r.relatedTarget;(!c||c.nodeName==="HTML")&&r.clientY<=10&&$()},[$]),I=l.useCallback(r=>{if(E.current=Date.now(),r.key==="Escape"&&v(),r.key==="Tab"&&k.current){const c=k.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),f=c[0],P=c[c.length-1];r.shiftKey?document.activeElement===f&&(r.preventDefault(),P?.focus()):document.activeElement===P&&(r.preventDefault(),f?.focus())}s.current&&(clearTimeout(s.current),s.current=null),h()},[v,h]);if(l.useEffect(()=>{if(!a||!t?.data?.length)return;h();const r={click:h,scroll:h,wheel:h,mousemove:h,touchstart:h,touchmove:h,input:h,focusin:h,keydown:I,mouseout:C,visibilitychange:()=>{document.visibilityState==="visible"&&(E.current=Date.now(),$())}};return window.addEventListener("click",r.click,{passive:!0}),window.addEventListener("scroll",r.scroll,{passive:!0}),window.addEventListener("wheel",r.wheel,{passive:!0}),window.addEventListener("mousemove",r.mousemove,{passive:!0}),window.addEventListener("touchstart",r.touchstart,{passive:!0}),window.addEventListener("touchmove",r.touchmove,{passive:!0}),window.addEventListener("input",r.input,{passive:!0}),window.addEventListener("focusin",r.focusin,{passive:!0}),window.addEventListener("keydown",r.keydown),document.addEventListener("mouseout",r.mouseout),document.addEventListener("visibilitychange",r.visibilitychange),()=>{s.current&&clearTimeout(s.current),window.removeEventListener("click",r.click),window.removeEventListener("scroll",r.scroll),window.removeEventListener("wheel",r.wheel),window.removeEventListener("mousemove",r.mousemove),window.removeEventListener("touchstart",r.touchstart),window.removeEventListener("touchmove",r.touchmove),window.removeEventListener("input",r.input),window.removeEventListener("focusin",r.focusin),window.removeEventListener("keydown",r.keydown),document.removeEventListener("mouseout",r.mouseout),document.removeEventListener("visibilitychange",r.visibilitychange)}},[a,t,h,I,C,$]),l.useEffect(()=>{m&&k.current&&requestAnimationFrame(()=>{k.current?.focus()})},[m]),l.useEffect(()=>{if(!a||!t?.data?.length||T.current)return;const r=L(t.data,"instantPopup");if(r){const c=r.attributes.name;g.current.has(c)||(x.current=window.scrollY||window.pageYOffset,document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${x.current}px`,document.body.style.width="100%",n(c),j.current.add(c))}},[a,t,L]),!a||!t?.data?.length||!m)return null;const M=R(t.data,m);if(!M)return null;const K=M.attributes.type,J=M.attributes.layout?.layoutType?.name,H={exitIntentPopup:se,idleIntentPopup:G,instantPopup:le,nfoIntentPopup:G}[K];return H?e.jsx(W.Provider,{value:v,children:e.jsx("div",{ref:k,tabIndex:-1,style:{outline:"none"},children:e.jsx(H,{popUpData:M,onClose:v,dataConfig:i,slug:o,layoutName:J,specificCountryCodeValidations:d})})}):null};export{W as PopupCloseContext,xe as default};

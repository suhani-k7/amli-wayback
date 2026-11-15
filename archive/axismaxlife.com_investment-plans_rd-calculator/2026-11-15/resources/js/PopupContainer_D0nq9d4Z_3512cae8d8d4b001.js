import{r as l,j as e}from"./react.C0ahgC7j.js";import{I as w,M as b,a as X}from"./elements.C61zLici.js";import V from"./LeadFormNew.Cu56o7B6.js";function A(r){const a={days:0,hours:0,minutes:0,seconds:0};if(!r)return{timeLeft:a,isExpired:!0};const i=new Date(r).getTime();if(Number.isNaN(i))return{timeLeft:a,isExpired:!0};const d=i-Date.now();return d<=0?{timeLeft:a,isExpired:!0}:{timeLeft:{days:Math.floor(d/(1e3*60*60*24)),hours:Math.floor(d/(1e3*60*60)%24),minutes:Math.floor(d/(1e3*60)%60),seconds:Math.floor(d/1e3%60)},isExpired:!1}}const F=r=>String(r).padStart(2,"0"),Q=r=>{if(!r)return{};if(typeof r=="object")return r;try{const a=JSON.parse(r);return a&&typeof a=="object"?a:{}}catch{return{}}},Z=r=>{if(!r)return{};const a=r;if(a.url)return{url:a.url,alternativeText:a.alternativeText};const i=r?.data?.attributes;return i?.url?{url:i.url,alternativeText:i.alternativeText}:{}},_=({popupTimer:r,className:a=""})=>{const i=r?.timerCountDown,[d,m]=l.useState(!1),[t,o]=l.useState(!1),[{timeLeft:y,isExpired:s},v]=l.useState(()=>A(i));if(l.useEffect(()=>{const L=()=>o(window.innerWidth<768);return L(),window.addEventListener("resize",L),()=>window.removeEventListener("resize",L)},[]),l.useEffect(()=>{if(m(!0),!i)return;v(A(i));const L=setInterval(()=>{const D=A(i);v(D),D.isExpired&&clearInterval(L)},1e3);return()=>clearInterval(L)},[i]),!d||!r||!i||s)return null;const{text:u,icon:N,iconDimension:f,customStyle:P}=r,h=Q(P),E=h.textColor,I=h.timerTextColor,p=h.timerBackground,j=h.containerBorderColor,T=h.containerBackground||h.textBackground,M=Z(N),C=f,g=y.days>0;let S=`${u||"Offer ends in"} `;return g&&(S+=`${y.days} days `),S+=`${y.hours} hours ${y.minutes} minutes ${y.seconds} seconds`,e.jsxs("div",{tabIndex:0,role:"timer","aria-label":S.trim(),style:{padding:t?"4px 5px 4px 4px":"4px",gap:t?"8px":"10px",borderRadius:"32px",border:j?`1px solid ${j}`:void 0,boxShadow:"0 4px 12px 0 rgba(20, 58, 114, 0.20)",background:T||void 0},className:`tabfocus inline-flex w-fit items-center ${a}`,children:[e.jsxs("div",{className:"flex items-center gap-[8px] text-center",children:[M.url&&e.jsx(w,{src:M.url,alt:M.alternativeText||"timer",imageDimension:C||"20x20",className:"shrink-0"}),u&&e.jsx("span",{style:{color:E||void 0,fontSize:"13px"},className:"font-family-noto font-bold leading-normal whitespace-nowrap",children:u})]}),e.jsx("div",{style:{padding:t?"0 8px":"2px 8px",gap:"2px",borderRadius:"32px",border:"1px solid #E8EBF1",background:p||void 0},className:"flex items-center justify-center text-center",children:e.jsxs("span",{style:{color:I||void 0,fontSize:t?"13px":"16px"},className:"font-family-noto font-bold leading-normal whitespace-nowrap tabular-nums",children:[g&&`${F(y.days)}d : `,F(y.hours),"h : ",F(y.minutes),"m : ",F(y.seconds),"s"]})})]})},ee=typeof window<"u"&&window.innerWidth<768,G=({title:r,subTitle:a,description:i,disclaimer:d,image:m,mobileImage:t,descriptionList:o,imageDimension:y,savingPopupImage:s,termPopupImage:v,termPopupBackground:u,savingPopupBackground:N,popupTimer:f})=>{const[h,E]=y?.split("#")||["",""],I=!!f?.timerCountDown;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-head",children:[e.jsxs("div",{className:"hidden lg:flex lg:min-w-[19.69rem] w-full h-auto flex-col gap-[7.7px] pb-[42.5px]",children:[e.jsxs("div",{className:"flex flex-col gap-3 lg:gap-[12px]",children:[r&&e.jsx("h3",{tabIndex:0,className:"tabfocus max-w-[18.125rem] lg:max-w-[16.75rem] w-full",children:e.jsx(b,{description:`<h3 class="text-primary font-family-lato text-[0.8125rem] lg:text-[1.25rem] font-weight-semi-bold lg:font-weight-bold leading-[normal] tracking-[-0.0025rem]">${r}</h3>`})}),e.jsx(_,{popupTimer:f,className:"relative z-[2]"}),a&&e.jsxs("div",{className:"px-2 lg:px-[0.53rem] py-[0.13rem] lg:py-2 rounded-[0.25rem] bg-[#1C509C] flex items-center gap-1 w-fit",children:[s&&e.jsx(w,{imageDimension:ee?"12x12":"16x16",src:s?.url}),e.jsx(b,{className:"!text-white font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-semi-bold lg:font-weight-medium leading-[normal]",description:a,tag:"p"})]})]}),u&&e.jsx("div",{children:e.jsx(w,{className:`absolute left-[0rem] ${I?"top-[9.5rem]":"top-[6.5rem]"}`,imageDimension:"300x16",src:u.url})}),e.jsxs("div",{tabIndex:0,className:"tabfocus lg:max-w-[15.5rem] w-full flex flex-col gap-3 lg:gap-[20px]",children:[i&&e.jsx(b,{tag:"p",className:"text-primary font-family-lato text-[1.25rem] lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",description:i}),o&&e.jsx("div",{className:"flex md:flex-col lg:flex-col gap-[20px] relative z-[1]",children:o.map((p,j)=>e.jsxs("div",{className:"bg-white px-2 lg:px-4 py-2 lg:py-[0.56rem] rounded-lg shadow-[0_4px_12px_0_var(--Effects-Shadows-Information,rgba(0,146,219,0.20))] flex flex-col gap-1 max-w-[9.875rem] lg:max-w-[13.0625rem] w-fit",children:[e.jsx("p",{className:"text-secondary whitespace-nowrap text-center font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",children:p.title}),e.jsx("p",{className:"text-primary text-center font-family-lato text-base lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",children:e.jsx(b,{description:p.description})})]},j))}),N&&e.jsx(w,{className:"absolute top-[20.85rem] right-[0.75rem]",imageDimension:h,src:N.url}),m&&e.jsx(w,{className:"absolute top-[13.8rem] left-[0.4rem] h-[42px] w-[37px]",src:m.url})]}),d&&v&&e.jsxs("div",{className:"flex flex-row gap-x-[8px] pt-[23px]",children:[e.jsx(w,{imageDimension:"16x16",src:v.url}),e.jsx("p",{children:e.jsx(b,{className:"text-secondary font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",description:d,tag:"span"})})]})]}),e.jsxs("div",{className:"relative w-full h-auto flex flex-col gap-[10px] lg:hidden pt-4",children:[e.jsxs("div",{className:"flex flex-col gap-3 px-3",children:[r&&e.jsx("h3",{tabIndex:0,className:"tabfocus max-w-[18.125rem] lg:max-w-[16.75rem] w-full",children:e.jsx(b,{description:`<h3 class="text-primary font-family-lato text-[0.8125rem] lg:text-[1.25rem] font-weight-semi-bold lg:font-weight-bold leading-[normal] tracking-[-0.0025rem]">${r}</h3>`})}),e.jsx(_,{popupTimer:f,className:"relative z-[2]"}),u&&e.jsx(w,{className:`absolute left-[0rem] w-full ${I?"top-[92px]":"top-[34px]"}`,imageDimension:"300x16",src:u.url}),a&&s&&e.jsxs("div",{className:"px-2 lg:px-[0.53rem] py-[0.13rem] lg:py-2 rounded-[0.25rem] bg-[#1C509C] flex items-center gap-1 w-fit",children:[e.jsx(w,{imageDimension:"12x12",src:s.url}),e.jsx(b,{className:"!text-white font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-semi-bold lg:font-weight-medium leading-[normal]",description:a,tag:"p"})]})]}),e.jsxs("div",{tabIndex:0,className:"tabfocus lg:max-w-[15.5rem] w-full flex flex-col gap-3 px-3",children:[i&&e.jsx(b,{tag:"p",className:"text-primary font-family-lato text-[1.25rem] lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",description:i}),o&&e.jsx("div",{className:"flex md:flex-col lg:flex-col gap-[20px] relative z-[1]",children:o.map((p,j)=>e.jsxs("div",{className:"bg-white px-2 lg:px-4 py-2 lg:py-[0.56rem] rounded-lg shadow-[0_4px_12px_0_var(--Effects-Shadows-Information,rgba(0,146,219,0.20))] flex flex-col gap-1 w-[9.875rem] max-w-[9.875rem] lg:w-auto lg:max-w-[11.0625rem]",children:[e.jsx("p",{className:"text-secondary text-center font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",children:p.title}),e.jsx("p",{className:"text-primary text-center font-family-lato text-base lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",children:e.jsx(b,{description:p.description})})]},j))}),t&&e.jsx(w,{className:"absolute top-[4.5rem] right-[3.5rem]",imageDimension:E,src:t.url}),m&&e.jsx(w,{className:"absolute top-[10rem] left-[0rem] h-[42px] w-[37px]",src:m.url})]})]})]}),e.jsx("style",{jsx:!0,children:`
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
      `})]})},te=({title:r,subTitle:a,description:i,disclaimer:d,image:m,mobileImage:t,descriptionList:o,imageDimension:y,savingPopupImage:s,termPopupImage:v,termPopupBackground:u,savingPopupBackground:N,popupTimer:f})=>{const[h,E]=y?.split("#")||["",""],I=!!f?.timerCountDown;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-head",children:[e.jsxs("div",{className:"hidden lg:flex lg:min-w-[19.69rem] w-full h-auto flex-col gap-[7.7px] pb-[42.5px]",children:[e.jsxs("div",{className:"flex flex-col gap-3 lg:gap-[12px]",children:[r&&e.jsx("h3",{tabIndex:0,className:"tabfocus max-w-[18.125rem] lg:max-w-[16.75rem] w-full",children:e.jsx(b,{description:`<h3 class="text-primary font-family-lato text-[0.8125rem] lg:text-[1.25rem] font-weight-semi-bold lg:font-weight-bold leading-[normal] tracking-[-0.0025rem]">${r}</h3>`})}),e.jsx(_,{popupTimer:f,className:"relative z-[2]"}),a&&s&&e.jsxs("div",{className:"px-2 lg:px-[0.53rem] py-[0.13rem] lg:py-2 rounded-[0.25rem] bg-gradient-to-tr from-[#0092db] to-[#91dcfd] flex items-center gap-1 w-fit",children:[e.jsx(w,{imageDimension:"16x16",src:s.url}),e.jsx(b,{className:"!text-white font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-semi-bold lg:font-weight-medium leading-[normal]",description:a,tag:"p"})]})]}),u&&e.jsx("div",{children:e.jsx(w,{className:`absolute left-[0rem] ${I?"top-[9.5rem]":"top-[6.5rem]"}`,imageDimension:"300x16",src:u.url})}),e.jsxs("div",{tabIndex:0,className:"tabfocus lg:max-w-[15.5rem] w-full flex flex-col gap-3 lg:gap-[20px]",children:[i&&e.jsx(b,{tag:"p",className:"text-primary font-family-lato text-[1.25rem] lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",description:i}),o&&e.jsx("div",{className:"flex md:flex-col lg:flex-col gap-[20px] relative z-[1]",children:o.map((p,j)=>e.jsxs("div",{className:"bg-white px-2 lg:px-4 py-2 lg:py-[0.56rem] rounded-lg shadow-[0_4px_12px_0_var(--Effects-Shadows-Information,rgba(0,146,219,0.20))] flex flex-col gap-1 max-w-[9.875rem] lg:max-w-[10.0625rem]",children:[e.jsx("p",{className:"text-secondary whitespace-nowrap text-center font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",children:p.title}),e.jsx("p",{className:"text-primary text-center font-family-lato text-base lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",children:e.jsx(b,{description:p.description})})]},j))}),N&&e.jsx(w,{className:"absolute top-[20.85rem] right-[0.09rem]",imageDimension:h,src:N.url}),m&&e.jsx(w,{className:"absolute top-[13.8rem] left-[0.4rem] h-[42px] w-[37px]",src:m.url})]}),d&&v&&e.jsxs("div",{className:"flex flex-row gap-x-[8px] pt-[23px]",children:[e.jsx(w,{imageDimension:"16x16",src:v.url}),e.jsx("p",{children:e.jsx(b,{className:"text-secondary font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",description:d,tag:"span"})})]})]}),e.jsxs("div",{className:"relative w-full h-auto flex flex-col gap-[10px] lg:hidden pt-4",children:[e.jsxs("div",{className:"flex flex-col gap-3 px-3",children:[r&&e.jsx("h3",{tabIndex:0,className:"tabfocus max-w-[18.125rem] lg:max-w-[16.75rem] w-full",children:e.jsx(b,{description:`<h3 class="text-primary font-family-lato text-[0.8125rem] lg:text-[1.25rem] font-weight-semi-bold lg:font-weight-bold leading-[normal] tracking-[-0.0025rem]">${r}</h3>`})}),e.jsx(_,{popupTimer:f,className:"relative z-[2]"}),u&&e.jsx(w,{className:`absolute left-[0rem] w-full ${I?"top-[92px]":"top-[34px]"}`,imageDimension:"300x16",src:u.url}),a&&s&&e.jsxs("div",{className:"px-2 lg:px-[0.53rem] py-[0.13rem] lg:py-2 rounded-[0.25rem] bg-gradient-to-tr from-[#0092db] to-[#91dcfd] flex items-center gap-1 w-fit",children:[e.jsx(w,{imageDimension:"12x12",src:s.url}),e.jsx(b,{className:"!text-white font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-semi-bold lg:font-weight-medium leading-[normal]",description:a,tag:"p"})]})]}),e.jsxs("div",{tabIndex:0,className:"tabfocus lg:max-w-[15.5rem] w-full flex flex-col gap-3 px-3",children:[i&&e.jsx(b,{tag:"p",className:"text-primary font-family-lato text-[1.25rem] lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",description:i}),o&&e.jsx("div",{className:"flex md:flex-col lg:flex-col gap-[20px] relative z-[1]",children:o.map((p,j)=>e.jsxs("div",{className:"bg-white px-2 lg:px-4 py-2 lg:py-[0.56rem] rounded-lg shadow-[0_4px_12px_0_var(--Effects-Shadows-Information,rgba(0,146,219,0.20))] flex flex-col gap-1 w-[9.875rem] max-w-[9.875rem] lg:w-auto lg:max-w-[11.0625rem]",children:[e.jsx("p",{className:"text-secondary text-center font-family-noto text-[0.625rem] lg:text-[0.8125rem] font-weight-medium lg:font-weight-regular leading-[normal]",children:p.title}),e.jsx("p",{className:"text-primary text-center font-family-lato text-base lg:text-[1.5625rem] font-weight-semi-bold leading-[normal] tracking-[-0.0025rem]",children:e.jsx(b,{description:p.description})})]},j))}),t&&e.jsx(w,{className:"absolute top-[4.5rem] right-0",imageDimension:E,src:t.url}),m&&e.jsx(w,{className:"absolute top-[10rem] left-[0rem] h-[42px] w-[37px]",src:m.url})]})]})]}),e.jsx("style",{jsx:!0,children:`
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
      `})]})},U=({title:r,subTitle:a,description:i,disclaimer:d,button:m,image:t,mobileImage:o,descriptionList:y,imageDimension:s,form:v,dataConfig:u,savingPopupImage:N,termPopupImage:f,termPopupBackground:P,savingPopupBackground:h,popupTimer:E,newPopupType:I,slug:p,onClose:j,specificCountryCodeValidations:T})=>{const M=l.useContext(W)||j||(()=>{}),C=()=>{m?.buttonLink&&m?.buttonLink!=="#"&&window.open(m?.buttonLink,"_blank"),M()},g=I?.toLowerCase()?.trim()||"health",L={health:G,investment:te}[g]||G;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 z-[998] opacity-[0.3]",style:{backdropFilter:"blur(4px)"}}),e.jsx("div",{className:"modal-container-popup lg:w-[100%] w-[93%] fixed inset-0 z-[999] flex items-center justify-center mx-auto my-0 overflow-x-hidden overflow-y-auto",children:e.jsx("div",{className:"modal-content modal-container-wrapper w-full h-auto relative",onClick:D=>D.stopPropagation(),children:e.jsxs("div",{className:"modal-content-header shadow-lg mx-auto rounded-3xl bg-white relative flex flex-col lg:flex-row lg:gap-[2rem]",children:[e.jsx("div",{tabIndex:0,className:"new-investment-popup-close tabfocus absolute z-[999999] right-3 lg:right-4 top-3 lg:top-3.5 flex justify-center items-center w-fit lg:w-6 h-fit lg:h-6 cursor-pointer",onClick:C,onKeyDown:D=>{D.key==="Enter"&&(D.preventDefault(),C())},role:"button","aria-label":"Close popup",children:e.jsx(X,{type:"close-popup"})}),e.jsx("div",{className:"relative lg:max-w-[18.6875rem] w-full",children:L&&e.jsx(L,{title:r,subTitle:a,description:i,disclaimer:d,button:m,image:t,mobileImage:o,descriptionList:y,imageDimension:s,form:v,dataConfig:u,savingPopupImage:N,termPopupImage:f,termPopupBackground:P,savingPopupBackground:h,popupTimer:E})}),e.jsx("div",{className:`form px-3 pb-6 lg:py-[1.5rem] lg:pl-0 lg:pr-[3rem] ${g==="term"?"lg:ml-8":""} ${g==="life"?"lg:pl-[23px] lg:pr-[61px] lg:max-w-[505px] lg:w-fit":""}`,children:e.jsx(V,{form:v,dataConfig:u,slug:p,isPopup:!0,specificCountryCodeValidations:T})})]})})}),e.jsx("style",{children:`
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
      `})]})},ne=({popUpData:r,onClose:a,dataConfig:i,slug:d,specificCountryCodeValidations:m})=>{const t=r?.attributes||{};return e.jsx(U,{title:t.title,subTitle:t.subTitle,description:t.description,disclaimer:t.disclaimer,button:t.button,image:t.image,mobileImage:t.mobileImage,descriptionList:t.descriptionList,imageDimension:t.imageDimension,form:t.form,dataConfig:i,savingPopupImage:t.savingPopupImage,termPopupImage:t.termPopupImage,termPopupBackground:t.termPopupBackground,savingPopupBackground:t.savingPopupBackground,popupTimer:t.popupTimer,newPopupType:t.newPopupType,slug:d,onClose:a,specificCountryCodeValidations:m})},H=({popUpData:r,onClose:a,dataConfig:i,slug:d,specificCountryCodeValidations:m})=>{const t=r?.attributes||{};return e.jsx(U,{title:t.title,subTitle:t.subTitle,description:t.description,disclaimer:t.disclaimer,button:t.button,image:t.image,mobileImage:t.mobileImage,descriptionList:t.descriptionList,imageDimension:t.imageDimension,form:t.form,dataConfig:i,savingPopupImage:t.savingPopupImage,termPopupImage:t.termPopupImage,termPopupBackground:t.termPopupBackground,savingPopupBackground:t.savingPopupBackground,popupTimer:t.popupTimer,newPopupType:t.newPopupType,slug:d,onClose:a,specificCountryCodeValidations:m})},re=({popUpData:r,onClose:a,dataConfig:i,slug:d,layoutName:m,specificCountryCodeValidations:t})=>{const o=r?.attributes||{};return e.jsx(U,{title:o.title,subTitle:o.subTitle,description:o.description,disclaimer:o.disclaimer,button:o.button,image:o.image,mobileImage:o.mobileImage,descriptionList:o.descriptionList,imageDimension:o.imageDimension,form:o.form,dataConfig:i,savingPopupImage:o.savingPopupImage,termPopupImage:o.termPopupImage,termPopupBackground:o.termPopupBackground,savingPopupBackground:o.savingPopupBackground,popupTimer:o.popupTimer,newPopupType:o.newPopupType,slug:d,onClose:a,specificCountryCodeValidations:t})},W=l.createContext(null),me=({popUps:r,slug:a,dataConfig:i,specificCountryCodeValidations:d})=>{const[m,t]=l.useState(null),[o,y]=l.useState(!1),s=l.useRef(null),v=l.useRef(!1),u=l.useRef(!1),N=l.useRef(new Set),f=l.useRef(new Set),P=l.useRef(!1),h=l.useRef(null),E=l.useRef(0),I=l.useRef(Date.now()),p=typeof window<"u"&&window.innerWidth<768,j=l.useCallback(()=>{m&&f.current.add(m),P.current=!0,t(null),v.current=!1,u.current=!0,s.current&&(clearTimeout(s.current),s.current=null),typeof window<"u"&&(document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.width="",window.scrollTo(0,E.current))},[m]);l.useEffect(()=>{if(typeof window>"u"||new URLSearchParams(window.location.search).get("source")==="CA")return;const c=localStorage.getItem("cwylLeadPage");if(c&&a==="/")try{if(JSON.parse(c)?.equoteNumber)return}catch(x){console.error("Error parsing cwylLeadPage:",x)}y(!0)},[a]);const T=l.useCallback((n,c)=>n?n.find(x=>p&&x.attributes.mobileViewType===c||x.attributes.type===c):null,[p]),M=l.useCallback((n,c)=>n?n.find(x=>x.attributes.name===c):null,[]),C=l.useCallback(n=>{if(P.current||f.current.has(n))return;s.current&&clearTimeout(s.current);const c=()=>{if(P.current||f.current.has(n)||v.current)return;const x=document.getElementById("certificate-image-modal"),k=document.getElementById("forceUpdateOnIOS");if(x||k)return;const R=Date.now()-I.current;if(R<7e3){const z=7e3-R+100;s.current=setTimeout(c,z);return}const $=document.activeElement;if($&&($.tagName==="INPUT"||$.tagName==="TEXTAREA"||$.tagName==="SELECT"||$.getAttribute("contenteditable")==="true")){s.current=setTimeout(c,7e3);return}E.current=window.scrollY||window.pageYOffset,document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${E.current}px`,document.body.style.width="100%",t(n),v.current=!0,N.current.add(n)};s.current=setTimeout(c,7e3)},[]),g=l.useCallback(()=>{if(I.current=Date.now(),P.current)return;const n=document.getElementById("certificate-image-modal"),c=document.getElementById("forceUpdateOnIOS");if(n||c||p&&v.current)return;if(s.current&&(clearTimeout(s.current),s.current=null),p){const O=document.activeElement;if(O&&(O.tagName==="INPUT"||O.tagName==="TEXTAREA"||O.tagName==="SELECT"||O.getAttribute("contenteditable")==="true"))return}const k=window.location.pathname==="/corp-static-old"?"nfoIntentPopup":"idleIntentPopup",R=T(r?.data||[],k);if(!R)return;const $=R.attributes.name;if(f.current.has($))return;const q=N.current.has("exit-intent-popup"),z=N.current.has("instant-popup");!v.current&&!q&&!z&&C($)},[p,r,T,C]),S=l.useCallback(()=>{if(P.current)return;const n=document.getElementById("certificate-image-modal"),c=document.getElementById("forceUpdateOnIOS");if(!(n||c)&&!u.current){if(p){const x=T(r?.data||[],"idleIntentPopup");if(x){const k=x.attributes.name;if(f.current.has(k))return;C(k)}}else{const x=T(r?.data||[],"exitIntentPopup");if(x){const k=x.attributes.name;if(f.current.has(k))return;E.current=window.scrollY||window.pageYOffset,document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${E.current}px`,document.body.style.width="100%",t(k),N.current.add(k)}}s.current&&clearTimeout(s.current),u.current=!0}},[p,r,T,C]),L=l.useCallback(n=>{const c=n.relatedTarget;(!c||c.nodeName==="HTML")&&n.clientY<=10&&S()},[S]),D=l.useCallback(n=>{if(I.current=Date.now(),n.key==="Escape"&&j(),n.key==="Tab"&&h.current){const c=h.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),x=c[0],k=c[c.length-1];n.shiftKey?document.activeElement===x&&(n.preventDefault(),k?.focus()):document.activeElement===k&&(n.preventDefault(),x?.focus())}s.current&&(clearTimeout(s.current),s.current=null),g()},[j,g]);if(l.useEffect(()=>{if(!o||!r?.data?.length)return;g();const n={click:g,scroll:g,wheel:g,mousemove:g,touchstart:g,touchmove:g,input:g,focusin:g,keydown:D,mouseout:L,visibilitychange:()=>{document.visibilityState==="visible"&&(I.current=Date.now(),S())}};return window.addEventListener("click",n.click,{passive:!0}),window.addEventListener("scroll",n.scroll,{passive:!0}),window.addEventListener("wheel",n.wheel,{passive:!0}),window.addEventListener("mousemove",n.mousemove,{passive:!0}),window.addEventListener("touchstart",n.touchstart,{passive:!0}),window.addEventListener("touchmove",n.touchmove,{passive:!0}),window.addEventListener("input",n.input,{passive:!0}),window.addEventListener("focusin",n.focusin,{passive:!0}),window.addEventListener("keydown",n.keydown),document.addEventListener("mouseout",n.mouseout),document.addEventListener("visibilitychange",n.visibilitychange),()=>{s.current&&clearTimeout(s.current),window.removeEventListener("click",n.click),window.removeEventListener("scroll",n.scroll),window.removeEventListener("wheel",n.wheel),window.removeEventListener("mousemove",n.mousemove),window.removeEventListener("touchstart",n.touchstart),window.removeEventListener("touchmove",n.touchmove),window.removeEventListener("input",n.input),window.removeEventListener("focusin",n.focusin),window.removeEventListener("keydown",n.keydown),document.removeEventListener("mouseout",n.mouseout),document.removeEventListener("visibilitychange",n.visibilitychange)}},[o,r,g,D,L,S]),l.useEffect(()=>{m&&h.current&&requestAnimationFrame(()=>{h.current?.focus()})},[m]),l.useEffect(()=>{if(!o||!r?.data?.length||P.current)return;const n=T(r.data,"instantPopup");if(n){const c=n.attributes.name;f.current.has(c)||(E.current=window.scrollY||window.pageYOffset,document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${E.current}px`,document.body.style.width="100%",t(c),N.current.add(c))}},[o,r,T]),!o||!r?.data?.length||!m)return null;const B=M(r.data,m);if(!B)return null;const K=B.attributes.type,J=B.attributes.layout?.layoutType?.name,Y={exitIntentPopup:ne,idleIntentPopup:H,instantPopup:re,nfoIntentPopup:H}[K];return Y?e.jsx(W.Provider,{value:j,children:e.jsx("div",{ref:h,tabIndex:-1,style:{outline:"none"},children:e.jsx(Y,{popUpData:B,onClose:j,dataConfig:i,slug:a,layoutName:J,specificCountryCodeValidations:d})})}):null};export{W as PopupCloseContext,me as default};

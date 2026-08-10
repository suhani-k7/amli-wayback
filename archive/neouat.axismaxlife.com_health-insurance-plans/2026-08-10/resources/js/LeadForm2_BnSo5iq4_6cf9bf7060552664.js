import{j as e,r as x,P as z,u as O,a as W}from"./react.BOl5x_Ca.js";import{s as B,a as U}from"./index.teTPlh0X.js";const G="https://www.axismaxlife.com/corp-static/images/calculator-banner-img.png",Y=()=>e.jsx("svg",{className:"lf2b-tick",width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M3 8.5l3 3 7-7",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),H=({title:r,data:t,id:a})=>e.jsxs("div",{id:a,className:"lf2b-root",children:[e.jsx("img",{className:"lf2b-illustration",alt:"",src:G,width:200,height:150,loading:"lazy"}),e.jsxs("div",{className:"lf2b-content",children:[r?e.jsx("h2",{className:"lf2b-title",children:r}):null,e.jsx("ul",{className:"lf2b-list",children:(t||[]).map((i,s)=>e.jsxs("li",{className:"lf2b-item",children:[e.jsx(Y,{}),e.jsx("span",{className:"lf2b-desc",dangerouslySetInnerHTML:{__html:i?.description||""}})]},`${i?.description}-${s}`))})]}),e.jsx("style",{children:`
        .lf2b-root {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          width: 100%;
          max-width: 30rem;
        }
        @media (min-width: 1080px) {
          .lf2b-root { max-width: none; }
        }
        .lf2b-illustration {
          width: 10rem;
          height: auto;
          display: block;
        }
        @media (min-width: 1080px) {
          .lf2b-illustration { width: 12rem; }
        }
        .lf2b-content { width: 100%; }
        .lf2b-title {
          color: var(--color-secondary, #143A72);
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.25;
          margin: 0 0 1rem;
          max-width: 20rem;
        }
        @media (min-width: 1080px) {
          .lf2b-title { font-size: 1.875rem; }
        }
        .lf2b-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .lf2b-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          color: var(--color-text-primary, #171A21);
          font-size: 0.9375rem;
          line-height: 1.4;
        }
        .lf2b-tick {
          color: var(--color-text-success, #099a4f);
          flex-shrink: 0;
          margin-top: 0.1rem;
        }
        .lf2b-desc :global(p) {
          margin: 0;
          padding: 0 !important;
        }
        .lf2b-desc {
          display: inline;
        }
      `})]}),g=r=>`<span class="font-weight-bold text-success">${r}</span>`,X=[{description:`High life cover ${g("at affordable premiums")}`},{description:`Death Claims Paid Ratio ${g("99.70%<sup>^</sup>")}`},{description:`Coverage against ${g("64 critical illnesses<sup>@</sup>")}`}],q=[{description:`किफायती प्रीमियम पर ${g("उच्च जीवन कवर")}`},{description:`डेथ क्लेम पेड रेश्यो ${g("99.70%<sup>^</sup>")}`},{description:"वर्ल्डवाइड क्लेम्स"},{description:`${g("64 गंभीर बीमारियों<sup>@</sup>")} के खिलाफ कवरेज`}],K=[{description:`High life cover ${g("at affordable premiums")}`},{description:`Death Claims Paid Ratio ${g("99.70%<sup>^</sup>")}`},{description:"Worldwide Claims"},{description:`Coverage against ${g("64 critical illnesses<sup>@</sup>")}`}],V="https://www.axismaxlife.com/utp-service/api/rates",J=.088,Q=.18,Z="TNSTPR",$=50,_=r=>Number.isFinite(r)?parseFloat(r.toFixed(2)):0,ee=r=>{const t=(r||"").toString().trim().toUpperCase();return t==="Y"||t==="YES"||t==="S"||t==="SMOKER"?"S":"N"},re=r=>{const t=(r||"").toString().trim().toUpperCase();return t==="F"||t==="FEMALE"?"F":"M"},te=r=>{const t=re(r.gender),a=ee(r.tobacco),i=Math.max(18,Math.min(75,Math.round(r.age||0)));return`${V}/${t}/${a}/${i}`},D={};let j=null;const ae=async r=>{if(typeof window>"u")return;const t=te(r);if(D[t])return D[t];j&&j.abort();const a=new AbortController;j=a;try{const i=await fetch(t,{method:"GET",headers:{Accept:"application/json"},signal:a.signal});if(!i.ok)throw new Error(`Rates API ${i.status} ${i.statusText}`);const s=await i.json(),l=s?.data?.rates||s?.rates||s?.data||s;return l?.plans&&Array.isArray(l.plans)?(D[t]=l,l):void 0}catch(i){if(i?.name==="AbortError")return;console.error("[LeadForm2] fetchRates failed",i);return}finally{j===a&&(j=null)}},ie=(r,t,a)=>{if(!r?.plans?.length)return;const i=r.plans.find(f=>f?.planId===Z);if(!i)return;const s=i.sumAssured?.find(f=>Number(t)<=Number(f?.sumAssuredRateBand));if(!s)return;const d=s.terms?.find(f=>Number(f?.maturityTerm)===Number(a))?.lcRate;if(d==null||d==="")return;const m=Number(d);return Number.isFinite(m)&&m>0?m:void 0},oe=(r,t,a)=>{const i=typeof a=="string"?Number(a):a;if(!r||!t||!i)return;const s=75-t>$?$:75-t,l=ie(r,i,s);if(!l)return;const d=_(l*i*J/1e3),m=_(d*Q),f=_(d+m);return Math.ceil(f)},se=r=>r==null||Number.isNaN(r)?"":Number(r).toLocaleString("en-IN"),ne=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"9",r:"4",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M8 6.5C8 4 10 3 12 3s4 1 4 3.5",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),le=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"9",r:"4",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M6 6c2-3 4-4 6-4s4 1 6 4",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),ce=()=>e.jsxs("svg",{width:"20",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:"M3 14h14v3H3z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),e.jsx("path",{d:"M7 14v3M11 14v3",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M4 4l16 16",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),de=()=>e.jsxs("svg",{width:"20",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:"M3 14h14v3H3z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),e.jsx("path",{d:"M7 14v3M11 14v3",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M14 4c1 2-1 3 0 5",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M18 4c1 2-1 3 0 5",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),me=[{id:"gender-m",label:"Male",value:"M",icon:e.jsx(ne,{})},{id:"gender-f",label:"Female",value:"F",icon:e.jsx(le,{})}],ue=[{id:"tobacco-n",label:"No",value:"N",icon:e.jsx(ce,{})},{id:"tobacco-y",label:"Yes",value:"Y",icon:e.jsx(de,{})}],P=[{label:"₹ 75L",value:"7500000"},{label:"₹ 80L",value:"8000000"},{label:"₹ 1 cr",value:"10000000"},{label:"₹ 1.5 cr",value:"15000000"},{label:"₹ 2 cr",value:"20000000"}],u=[18,25,35,45,55,60,65],fe=u[0],pe=u[u.length-1],k=u.length-1,he=.02,ge=r=>{const t=Math.max(0,Math.min(k,r)),a=Math.floor(t),i=Math.min(k,a+1),s=t-a;return Math.round(u[a]+(u[i]-u[a])*s)},be=r=>{const t=Math.max(fe,Math.min(pe,r));for(let a=0;a<k;a++)if(t>=u[a]&&t<=u[a+1]){const i=u[a+1]-u[a],s=i===0?0:(t-u[a])/i;return a+s}return k},R=r=>r/k*100,xe=({title:r="Term Plan Calculator",subTitle:t="Secure your future in just 5 minutes",components:a,state:i,premium:s,loader:l,buttonLabel:d="Check Premium",buttonLink:m,locale:f="en",onChange:p,onSubmit:b})=>{const v=f==="hi",E=x.useMemo(()=>{const o=(a||[]).find(c=>c?.__typename==="ComponentUiOption"&&c?.fieldName?.name==="sumAssured");if(!o?.dataFilter?.length)return P;const n={"seventy-five-lakhs":{label:"₹ 75L",value:"7500000"},"Eighty-Lakh":{label:"₹ 80L",value:"8000000"},"one-crore":{label:"₹ 1 cr",value:"10000000"},"one-point-five-crore":{label:"₹ 1.5 cr",value:"15000000"},"two-crore":{label:"₹ 2 cr",value:"20000000"}},h=o.dataFilter.map(c=>c?.value?n[c.value]:void 0).filter(c=>!!c);return h.length?h:P},[a]),A=be(i.age),C=R(A),M=se(s),S=!!s,T=o=>{o.preventDefault(),b()};return e.jsxs("form",{className:"lf2-card",onSubmit:T,children:[l&&e.jsx("div",{className:"lf2-loading-overlay","aria-live":"polite","aria-label":"Calculating premium",children:e.jsx("div",{className:"lf2-loading-spinner",children:e.jsx("svg",{className:"lf2-spinner-svg",viewBox:"0 0 50 50",children:e.jsx("circle",{className:"lf2-spinner-circle",cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"4"})})})}),e.jsxs("div",{className:"lf2-body",children:[e.jsxs("header",{className:"lf2-header",children:[e.jsx("h3",{className:"lf2-title",children:r}),t?e.jsx("p",{className:"lf2-subtitle",children:t}):null]}),e.jsxs("div",{className:"lf2-two-col",children:[e.jsxs("fieldset",{className:"lf2-group",children:[e.jsx("legend",{className:"lf2-label",children:"Describe your gender"}),e.jsx("div",{className:"lf2-pill-row",role:"radiogroup",children:me.map(o=>e.jsxs("button",{type:"button",role:"radio","aria-checked":i.gender===o.value,className:`lf2-pill ${i.gender===o.value?"is-active":""}`,onClick:()=>p({gender:o.value}),children:[e.jsx("span",{className:"lf2-pill-icon",children:o.icon}),e.jsx("span",{children:o.label})]},o.id))})]}),e.jsxs("fieldset",{className:"lf2-group",children:[e.jsx("legend",{className:"lf2-label",children:"Do you smoke / consume tobacco?"}),e.jsx("div",{className:"lf2-pill-row",role:"radiogroup",children:ue.map(o=>e.jsxs("button",{type:"button",role:"radio","aria-checked":i.tobacco===o.value,className:`lf2-pill ${i.tobacco===o.value?"is-active":""}`,onClick:()=>p({tobacco:o.value}),children:[e.jsx("span",{className:"lf2-pill-icon",children:o.icon}),e.jsx("span",{children:o.label})]},o.id))})]})]}),e.jsxs("div",{className:"lf2-age",children:[e.jsx("label",{className:"lf2-label",htmlFor:"lf2-age-slider",children:"How old are you"}),e.jsxs("div",{className:"lf2-age-slider-wrap",children:[e.jsxs("div",{className:"lf2-age-bubble",style:{left:`${C}%`},"aria-hidden":"true",children:[i.age,"yrs"]}),e.jsxs("div",{className:"lf2-age-track",children:[e.jsx("div",{className:"lf2-age-track-fill",style:{width:`${C}%`}}),u.map((o,n)=>e.jsx("span",{className:"lf2-age-tick-dot",style:{left:`${R(n)}%`},"aria-hidden":"true"},`tick-${o}`)),e.jsx("input",{id:"lf2-age-slider",type:"range",min:0,max:k,step:he,value:A,onChange:o=>{const n=parseFloat(o.target.value);p({age:ge(Number.isFinite(n)?n:0)})},className:"lf2-age-input","aria-label":"Age","aria-valuetext":`${i.age} years`})]}),e.jsx("div",{className:"lf2-age-ticks",children:u.map((o,n)=>e.jsxs("span",{className:"lf2-age-tick-label",style:{left:`${R(n)}%`},children:[e.jsxs("span",{className:"lf2-age-tick-full",children:[o,"yrs"]}),e.jsx("span",{className:"lf2-age-tick-short",children:o})]},`lbl-${o}`))})]})]}),e.jsxs("div",{className:"lf2-sa",children:[e.jsx("label",{className:"lf2-label",children:"I would like to purchase life cover of"}),e.jsx("div",{className:"lf2-sa-row",role:"radiogroup",children:E.map(o=>e.jsx("button",{type:"button",role:"radio","aria-checked":i.sumAssured===o.value,className:`lf2-sa-chip ${i.sumAssured===o.value?"is-active":""}`,onClick:()=>p({sumAssured:o.value}),children:o.label},o.value))})]})]}),e.jsxs("div",{className:"lf2-footer",children:[e.jsxs("div",{className:`lf2-premium ${S?"is-visible ":"is-hidden"}`,"aria-live":"polite",children:[e.jsxs("div",{className:"lf2-premium-left md:pr-[1.5rem]",children:[e.jsx("div",{className:"lf2-premium-label",children:v?"प्रीमियम":"Premium starting at"}),e.jsx("div",{className:"lf2-premium-sub",children:v?"GST सहित":"Inclusive of GST"})]}),e.jsxs("div",{className:"lf2-premium-amount",children:["₹ ",M||"—",e.jsxs("span",{className:"lf2-premium-unit",children:[v?"/महीना ":"/month",e.jsx("sup",{children:"*6"})]})]})]}),m?e.jsx("a",{className:"lf2-submit",href:m,rel:"noreferrer",target:"_blank",onClick:()=>b(),children:l?"...":d}):e.jsx("button",{type:"submit",className:"lf2-submit",disabled:l,children:l?"...":d})]}),e.jsx("style",{children:`
        .lf2-card {
          background: var(--color-default, #fff);
          border-radius: 1rem;
          box-shadow: 0 0.25rem 1.25rem rgba(23, 26, 33, 0.08);
          width: 100%;
          max-width: 30rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        @media (min-width: 1080px) {
          .lf2-card { max-width: none; }
        }

        /* Loading overlay */
        .lf2-loading-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
        }
        .lf2-loading-spinner {
          width: 48px;
          height: 48px;
        }
        .lf2-spinner-svg {
          width: 100%;
          height: 100%;
          animation: lf2-rotate 1.4s linear infinite;
        }
        .lf2-spinner-circle {
          stroke: #97144D;
          stroke-linecap: round;
          animation: lf2-dash 1.4s ease-in-out infinite;
        }
        @keyframes lf2-rotate {
          100% { transform: rotate(360deg); }
        }
        @keyframes lf2-dash {
          0% {
            stroke-dasharray: 1, 126;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 126;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 126;
            stroke-dashoffset: -124;
          }
        }

        .lf2-body { padding: 1.25rem 1rem 1rem; }
        @media (min-width: 768px) {
          .lf2-body { padding: 1.5rem 1.5rem 1.25rem; }
        }

        .lf2-header { text-align: center; margin-bottom: 1rem; }
        .lf2-title {
          color: var(--color-text-primary, #171A21);
          font-weight: 700;
          font-size: 1.125rem;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .lf2-subtitle {
          color: var(--color-text-secondary, #6c757d);
          font-size: 0.875rem;
          margin: 0.25rem 0 0;
        }

        .lf2-label {
          display: block;
          font-weight: 700;
          font-size: 0.8125rem;
          color: var(--color-text-primary, #171A21);
          margin: 0 0 0.5rem;
        }

        /* Gender + tobacco: stacked on mobile, side-by-side on desktop */
        .lf2-two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) {
          .lf2-two-col {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
        }
        .lf2-group { border: 0; padding: 0; margin: 0; }

        .lf2-pill-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .lf2-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.65rem 0.5rem;
          border: 1px solid #d7dbe3;
          background: #fff;
          color: var(--color-text-primary, #171A21);
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .lf2-pill:first-child {
          border-radius: 0.5rem 0 0 0.5rem;
          border-right-width: 0;
        }
        .lf2-pill:last-child { border-radius: 0 0.5rem 0.5rem 0; }
        .lf2-pill.is-active {
          background: #E8F1FC;
          border-color: #3597EC;
          color: var(--color-secondary, #143A72);
          font-weight: 700;
        }
        .lf2-pill.is-active + .lf2-pill { border-left-color: #3597EC; }
        .lf2-pill:first-child.is-active { border-right-width: 1px; }
        .lf2-pill-icon {
          display: inline-flex;
          align-items: center;
          color: var(--color-secondary, #143A72);
        }

        /* Age slider */
        .lf2-age { margin-bottom: 1rem; }
        .lf2-age-slider-wrap {
          position: relative;
          padding: 2.25rem 0.25rem 1.5rem;
        }
        .lf2-age-bubble {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          background: var(--color-secondary, #143A72);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 0.75rem;
          white-space: nowrap;
          pointer-events: none;
        }
        .lf2-age-bubble::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -4px;
          border: 4px solid transparent;
          border-top-color: var(--color-secondary, #143A72);
        }
        .lf2-age-track {
          position: relative;
          height: 1rem;
          display: flex;
          align-items: center;
        }
        .lf2-age-track::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 2px;
          background: #BED6F0;
          border-radius: 2px;
        }
        .lf2-age-track-fill {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 2px;
          background: #3597EC;
          border-radius: 2px;
          pointer-events: none;
        }
        .lf2-age-tick-dot {
          position: absolute;
          top: 50%;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3597EC;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .lf2-age-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          background: transparent;
          -webkit-appearance: none;
          appearance: none;
          cursor: pointer;
        }
        .lf2-age-input:focus { outline: none; }
        .lf2-age-input::-webkit-slider-runnable-track {
          height: 100%;
          background: transparent;
        }
        .lf2-age-input::-moz-range-track {
          height: 100%;
          background: transparent;
          border: 0;
        }
        .lf2-age-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #3597EC;
          cursor: pointer;
          margin-top: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        }
        .lf2-age-input::-moz-range-thumb {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #3597EC;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        }
        .lf2-age-ticks {
          position: relative;
          height: 1rem;
          margin-top: 0.5rem;
        }
        .lf2-age-tick-label {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          font-size: 0.8125rem;
          color: var(--color-text-primary, #171A21);
          font-weight: 700;
          white-space: nowrap;
        }
        .lf2-age-tick-full { display: none; }
        .lf2-age-tick-short { display: inline; }
        @media (min-width: 1080px) {
          .lf2-age-tick-full { display: inline; }
          .lf2-age-tick-short { display: none; }
        }

        /* Sum assured chips */
        .lf2-sa { margin-bottom: 0; }
        .lf2-sa-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 0.375rem;
        }
        .lf2-sa-chip {
          padding: 0.55rem 0.25rem;
          border: 1px solid #d7dbe3;
          border-radius: 0.5rem;
          background: #fff;
          color: var(--color-text-primary, #171A21);
          font-size: 0.875rem;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .lf2-sa-chip.is-active {
          background: #E8F1FC;
          border-color: #3597EC;
          color: var(--color-secondary, #143A72);
          font-weight: 700;
        }

        /* Footer: premium band + submit button */
        .lf2-footer {
          background: var(--color-background-default-dark, #F4F6FA);
          padding: 1rem 1rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        @media (min-width: 768px) {
          .lf2-footer { padding: 1.1rem 1.5rem 1.2rem; }
        }
        .lf2-premium {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          transition: opacity 0.2s ease;
        }
        .lf2-premium.is-hidden { opacity: 0; }
        .lf2-premium.is-visible { opacity: 1; }
        .lf2-premium-label {
          font-size: 0.9375rem;
          color: var(--color-text-primary, #171A21);
          font-weight: 700;
          font-size:18px;
          line-height:1.735rem;
        }
          @media (max-width: 567px) {
          .lf2-premium-label  { font-size: 13px }
        }
        .lf2-premium-sub {
          font-size: 0.8125rem;
          color: var(--color-text-secondary, #6c757d);
          margin-top: 0.125rem;
          font-weight: 400;
        }
        .lf2-premium-amount {
          color: var(--color-text-primary, #171A21);
          font-weight: 700;
          font-size: 40px;
          white-space: nowrap;
        }
        @media (max-width: 567px) {
          .lf2-premium-amount  { font-size: 18px }
        }
        .lf2-premium-unit {
          font-size: 0.8125rem;
          font-weight: 400;
          color: var(--color-text-primary, #171A21);
          margin-left: 0.125rem;
        }
        .lf2-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.9rem 1rem;
          border-radius: 1.75rem;
          background: var(--color-background-button-secondary, #97144D);
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          text-align: center;
          border: 0;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s;
          width:20.375rem;
          margin:0 auto;
        }
          @media (max-width : 567px){
          .lf2-submit {
              width: 18.375rem;
            }
          }
        .lf2-submit:hover {
          background: var(--color-background-button-secondary-hover, #7A1039);
        }
        .lf2-submit[disabled] { opacity: 0.7; cursor: wait; }
      `})]})},w={TERM_CALC:"termCalculatorData",LEAD:"leadData"},L=(r,t)=>{if(typeof window>"u")return t;try{const a=localStorage.getItem(r);return a?JSON.parse(a):t}catch{return t}},I=(r,t)=>{if(!(typeof window>"u"))try{localStorage.setItem(r,JSON.stringify(t))}catch{}},N={gender:"M",tobacco:"N",age:35,sumAssured:"10000000"},ve=new Set(["7500000","8000000","10000000","15000000","20000000"]),we=()=>{if(typeof window>"u")return N;const r=L(w.TERM_CALC,{}),t=L(w.LEAD,{}),a=(t?.user_gender||"").toString().toUpperCase(),i=a==="F"?"F":a==="M"?"M":N.gender,l=((Array.isArray(t?.user_tobacco)?t?.user_tobacco[0]:t?.user_tobacco)||"").toString().toUpperCase(),d=l==="Y"||l==="YES"||l==="S"?"Y":l==="N"||l==="NO"?"N":N.tobacco,m=Number(r?.age),f=Number.isFinite(m)&&m>=18&&m<=65?Math.round(m):N.age,p=r?.amount?String(r.amount):"",b=ve.has(p)?p:N.sumAssured;return{gender:i,tobacco:d,age:f,sumAssured:b}},ke=({form:r,locale:t="en",isNri:a=!1})=>{const i=O();W(n=>n.newLead);const[s,l]=x.useState(()=>we()),[d,m]=x.useState(void 0),[f,p]=x.useState(!1),b=x.useRef(0),v=x.useCallback(async n=>{const h=++b.current;p(!0);try{const c=await ae({gender:n.gender,tobacco:n.tobacco,age:n.age});if(h!==b.current)return;const y=oe(c,n.age,n.sumAssured);m(y)}finally{h===b.current&&p(!1)}},[]);x.useEffect(()=>{v(s)},[s.gender,s.tobacco,s.age,s.sumAssured,v]);const E=n=>{l(h=>{const c={...h,...n},y=L(w.TERM_CALC,{});I(w.TERM_CALC,{...y,age:c.age,amount:c.sumAssured});const F=L(w.LEAD,{});return I(w.LEAD,{...F,user_gender:c.gender,user_tobacco:c.tobacco}),i(U({...n})),c})},A=()=>{const{gender:n,tobacco:h,age:c,sumAssured:y}=s,F={user_gender:n,user_tobacco:h,user_age:c,user_sum_assured:y,premium:d,submittedAt:Date.now()};I("termLeadForm2Submission",F)},C=x.useMemo(()=>t==="hi"?q:a?K:X,[t,a]),M=t==="hi"?"परिवार की फ़ाइनेंशियल प्लानिंग (वित्तीय योजना) यहां से शुरू होती है":"Family's Financial Planning Starts Here",S=(r?.components||[]).find(n=>n?.type==="Submit"||n?.type==="submit"),T=S?.label||"Check Premium",o=S?.buttonLink||"https://www.axismaxlife.com/term-insurance-plans/premium-calculator?stage=lead&utmCode=1111&utm_theme=1Crore";return e.jsxs("section",{className:"lead-form2-section",id:r?.name||"lead-form-2nd",children:[e.jsxs("div",{className:"lead-form2-container pcp-container",children:[e.jsx("div",{className:"lead-form2-banner",children:e.jsx(H,{title:M,data:C,id:"calculator-banner"})}),e.jsx("div",{className:"lead-form2-calculator",children:e.jsx(xe,{title:r?.title||"Term Plan Calculator",subTitle:r?.subTitle||"Secure your future in just 5 minutes",components:r?.components,state:s,premium:d,loader:f,buttonLabel:T,buttonLink:o,locale:t,onChange:E,onSubmit:A})})]}),e.jsx("style",{children:`
        .lead-form2-section {
          width: 100%;
          padding: 2rem 1rem;
          background: var(--color-background-default-dark, #F4F6FA);
          max-width:85.375rem;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .lead-form2-section { padding: 2.5rem 1.5rem; }
        }
        .lead-form2-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: start;
          width: 100%;
          max-width: 85.375rem;
          margin: 0 auto;
        }
        @media (min-width: 1080px) {
          .lead-form2-container {
            grid-template-columns: 2fr 3fr;
            gap: 0;
            column-gap: 2rem;
          }
        }
        .lead-form2-banner {
          width: 100%;
          min-width: 0;
          display: flex;
          justify-content: center;
        }
        .lead-form2-calculator {
          width: 100%;
          min-width: 0;
          display: flex;
          justify-content: center;
        }
        @media (min-width: 1080px) {
          .lead-form2-banner { justify-content: flex-start; }
          .lead-form2-calculator { justify-content: flex-end; }
        }
      `})]})},Ne=r=>e.jsx(z,{store:B,children:e.jsx(ke,{...r})});export{Ne as default};

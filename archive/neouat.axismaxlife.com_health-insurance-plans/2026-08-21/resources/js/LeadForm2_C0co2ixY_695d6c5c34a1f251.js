import{j as e,r as g,P as z,u as O,b as W}from"./react.BPjBwH1J.js";import{s as B,a as U}from"./index.teTPlh0X.js";const G="https://www.axismaxlife.com/corp-static/images/calculator-banner-img.png",Y=()=>e.jsx("svg",{className:"lf2b-tick",width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M3 8.5l3 3 7-7",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),H=({title:r,data:t,id:a})=>e.jsxs("div",{id:a,className:"lf2b-root",children:[e.jsx("img",{className:"lf2b-illustration",alt:"",src:G,width:200,height:150,loading:"lazy"}),e.jsxs("div",{className:"lf2b-content",children:[r?e.jsx("h2",{className:"lf2b-title",children:r}):null,e.jsx("ul",{className:"lf2b-list",children:(t||[]).map((i,s)=>e.jsxs("li",{className:"lf2b-item",children:[e.jsx(Y,{}),e.jsx("span",{className:"lf2b-desc",dangerouslySetInnerHTML:{__html:i?.description||""}})]},`${i?.description}-${s}`))})]}),e.jsx("style",{children:`
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
      `})]}),b=r=>`<span class="font-weight-bold text-success">${r}</span>`,X=[{description:`High life cover ${b("at affordable premiums")}`},{description:`Death Claims Paid Ratio ${b("99.70%<sup>^</sup>")}`},{description:`Coverage against ${b("64 critical illnesses<sup>@</sup>")}`}],q=[{description:`किफायती प्रीमियम पर ${b("उच्च जीवन कवर")}`},{description:`डेथ क्लेम पेड रेश्यो ${b("99.70%<sup>^</sup>")}`},{description:"वर्ल्डवाइड क्लेम्स"},{description:`${b("64 गंभीर बीमारियों<sup>@</sup>")} के खिलाफ कवरेज`}],K=[{description:`High life cover ${b("at affordable premiums")}`},{description:`Death Claims Paid Ratio ${b("99.70%<sup>^</sup>")}`},{description:"Worldwide Claims"},{description:`Coverage against ${b("64 critical illnesses<sup>@</sup>")}`}],J="https://neouat.axismaxlife.com/utp-service/api/rates",V=.088,Q="TSTRCR",$=50,Z=.15,R=r=>Number.isFinite(r)?parseFloat(r.toFixed(2)):0,ee=r=>{const t=(r||"").toString().trim().toUpperCase();return t==="Y"||t==="YES"||t==="S"||t==="SMOKER"?"S":"N"},re=r=>{const t=(r||"").toString().trim().toUpperCase();return t==="F"||t==="FEMALE"?"F":"M"},te=r=>{const t=re(r.gender),a=ee(r.tobacco),i=Math.max(18,Math.min(60,Math.round(r.age||0)));return`${J}/${t}/${a}/${i}`},D={};let j=null;const ae=async r=>{if(typeof window>"u")return;const t=te(r);if(D[t])return D[t];j&&j.abort();const a=new AbortController;j=a;try{const i=await fetch(t,{method:"GET",headers:{Accept:"application/json"},signal:a.signal});if(!i.ok)throw new Error(`Rates API ${i.status} ${i.statusText}`);const s=await i.json(),l=s?.data?.rates||s?.rates||s?.data||s;return l?.plans&&Array.isArray(l.plans)?(D[t]=l,l):void 0}catch(i){if(i?.name==="AbortError")return;console.error("[LeadForm2] fetchRates failed",i);return}finally{j===a&&(j=null)}},ie=(r,t,a)=>{if(!r?.plans?.length)return;const i=r.plans.find(f=>f?.planId===Q);if(!i)return;const s=i.sumAssured?.find(f=>Number(t)<=Number(f?.sumAssuredRateBand));if(!s)return;const m=s.terms?.find(f=>Number(f?.maturityTerm)===Number(a))?.lcRate;if(m==null||m==="")return;const d=Number(m);return Number.isFinite(d)&&d>0?d:void 0},oe=r=>r>=18&&r<=40?60:r>=41&&r<=55?65:r>=56&&r<=60?r+10:65,se=(r,t,a)=>{const i=typeof a=="string"?Number(a):a;if(!r||!t||!i)return;const s=oe(t),l=s-t>$?$:s-t,m=ie(r,i,l);if(!m)return;const d=R(m*i*V/1e3),f=R(d*Z),p=R(d-f);return Math.ceil(p)},ne=r=>r==null||Number.isNaN(r)?"":Number(r).toLocaleString("en-IN"),le=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"9",r:"4",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M8 6.5C8 4 10 3 12 3s4 1 4 3.5",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),ce=()=>e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"9",r:"4",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M6 6c2-3 4-4 6-4s4 1 6 4",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),de=()=>e.jsxs("svg",{width:"20",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:"M3 14h14v3H3z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),e.jsx("path",{d:"M7 14v3M11 14v3",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M4 4l16 16",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]}),me=()=>e.jsxs("svg",{width:"20",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:"M3 14h14v3H3z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),e.jsx("path",{d:"M7 14v3M11 14v3",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M14 4c1 2-1 3 0 5",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M18 4c1 2-1 3 0 5",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),ue=[{id:"gender-m",label:"Male",value:"M",icon:e.jsx(le,{})},{id:"gender-f",label:"Female",value:"F",icon:e.jsx(ce,{})}],fe=[{id:"tobacco-n",label:"No",value:"N",icon:e.jsx(de,{})},{id:"tobacco-y",label:"Yes",value:"Y",icon:e.jsx(me,{})}],P=[{label:"₹ 50L",value:"5000000"},{label:"₹ 1 cr",value:"10000000"},{label:"₹ 2 cr",value:"20000000"},{label:"₹ 3 cr",value:"30000000"},{label:"₹ 5 cr",value:"50000000"}],u=[18,25,35,45,55,60],pe=u[0],he=u[u.length-1],k=u.length-1,ge=.02,be=r=>{const t=Math.max(0,Math.min(k,r)),a=Math.floor(t),i=Math.min(k,a+1),s=t-a;return Math.round(u[a]+(u[i]-u[a])*s)},xe=r=>{const t=Math.max(pe,Math.min(he,r));for(let a=0;a<k;a++)if(t>=u[a]&&t<=u[a+1]){const i=u[a+1]-u[a],s=i===0?0:(t-u[a])/i;return a+s}return k},I=r=>r/k*100,ve=({title:r="Term Plan Calculator",subTitle:t="Secure your future in just 5 minutes",components:a,state:i,premium:s,loader:l,buttonLabel:m="Check Premium",buttonLink:d,locale:f="en",onChange:p,onSubmit:v})=>{const w=f==="hi",E=g.useMemo(()=>{const o=(a||[]).find(c=>c?.__typename==="ComponentUiOption"&&c?.fieldName?.name==="sumAssured");if(!o?.dataFilter?.length)return P;const n={"fifty-lakhs":{label:"₹ 50L",value:"5000000"},"one-crore":{label:"₹ 1 cr",value:"10000000"},"two-crore":{label:"₹ 2 cr",value:"20000000"},"three-crore":{label:"₹ 3 cr",value:"30000000"},"five-crore":{label:"₹ 5 cr",value:"50000000"}},h=o.dataFilter.map(c=>c?.value?n[c.value]:void 0).filter(c=>!!c);return h.length?h:P},[a]),C=xe(i.age),S=I(C),L=ne(s),T=!!s,F=o=>{o.preventDefault(),v()};return e.jsxs("form",{className:"lf2-card",onSubmit:F,children:[l&&e.jsx("div",{className:"lf2-loading-overlay","aria-live":"polite","aria-label":"Calculating premium",children:e.jsx("div",{className:"lf2-loading-spinner",children:e.jsx("svg",{className:"lf2-spinner-svg",viewBox:"0 0 50 50",children:e.jsx("circle",{className:"lf2-spinner-circle",cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"4"})})})}),e.jsxs("div",{className:"lf2-body",children:[e.jsxs("header",{className:"lf2-header",children:[e.jsx("h3",{className:"lf2-title",children:r}),t?e.jsx("p",{className:"lf2-subtitle",children:t}):null]}),e.jsxs("div",{className:"lf2-two-col",children:[e.jsxs("fieldset",{className:"lf2-group",children:[e.jsx("legend",{className:"lf2-label",children:"Describe your gender"}),e.jsx("div",{className:"lf2-pill-row",role:"radiogroup",children:ue.map(o=>e.jsxs("button",{type:"button",role:"radio","aria-checked":i.gender===o.value,className:`lf2-pill ${i.gender===o.value?"is-active":""}`,onClick:()=>p({gender:o.value}),children:[e.jsx("span",{className:"lf2-pill-icon",children:o.icon}),e.jsx("span",{children:o.label})]},o.id))})]}),e.jsxs("fieldset",{className:"lf2-group",children:[e.jsx("legend",{className:"lf2-label",children:"Do you smoke / consume tobacco?"}),e.jsx("div",{className:"lf2-pill-row",role:"radiogroup",children:fe.map(o=>e.jsxs("button",{type:"button",role:"radio","aria-checked":i.tobacco===o.value,className:`lf2-pill ${i.tobacco===o.value?"is-active":""}`,onClick:()=>p({tobacco:o.value}),children:[e.jsx("span",{className:"lf2-pill-icon",children:o.icon}),e.jsx("span",{children:o.label})]},o.id))})]})]}),e.jsxs("div",{className:"lf2-age",children:[e.jsx("label",{className:"lf2-label",htmlFor:"lf2-age-slider",children:"How old are you"}),e.jsxs("div",{className:"lf2-age-slider-wrap",children:[e.jsxs("div",{className:"lf2-age-bubble",style:{left:`${S}%`},"aria-hidden":"true",children:[i.age,"yrs"]}),e.jsxs("div",{className:"lf2-age-track",children:[e.jsx("div",{className:"lf2-age-track-fill",style:{width:`${S}%`}}),u.map((o,n)=>e.jsx("span",{className:"lf2-age-tick-dot",style:{left:`${I(n)}%`},"aria-hidden":"true"},`tick-${o}`)),e.jsx("input",{id:"lf2-age-slider",type:"range",min:0,max:k,step:ge,value:C,onChange:o=>{const n=parseFloat(o.target.value);p({age:be(Number.isFinite(n)?n:0)})},className:"lf2-age-input","aria-label":"Age","aria-valuetext":`${i.age} years`})]}),e.jsx("div",{className:"lf2-age-ticks",children:u.map((o,n)=>e.jsxs("span",{className:"lf2-age-tick-label",style:{left:`${I(n)}%`},children:[e.jsxs("span",{className:"lf2-age-tick-full",children:[o,"yrs"]}),e.jsx("span",{className:"lf2-age-tick-short",children:o})]},`lbl-${o}`))})]})]}),e.jsxs("div",{className:"lf2-sa",children:[e.jsx("label",{className:"lf2-label",children:"I would like to purchase life cover of"}),e.jsx("div",{className:"lf2-sa-row",role:"radiogroup",children:E.map(o=>e.jsx("button",{type:"button",role:"radio","aria-checked":i.sumAssured===o.value,className:`lf2-sa-chip ${i.sumAssured===o.value?"is-active":""}`,onClick:()=>p({sumAssured:o.value}),children:o.label},o.value))})]})]}),e.jsxs("div",{className:"lf2-footer",children:[e.jsxs("div",{className:`lf2-premium ${T?"is-visible ":"is-hidden"}`,"aria-live":"polite",children:[e.jsxs("div",{className:"lf2-premium-left md:pr-[1.5rem]",children:[e.jsx("div",{className:"lf2-premium-label",children:w?"प्रीमियम":"Premium starting at"}),e.jsx("div",{className:"lf2-premium-sub",children:w?"GST सहित":"Inclusive of GST"})]}),e.jsxs("div",{className:"lf2-premium-amount",children:["₹ ",L||"—",e.jsxs("span",{className:"lf2-premium-unit",children:[w?"/महीना ":"/month",e.jsx("sup",{children:"*6"})]})]})]}),d?e.jsx("a",{className:"lf2-submit",href:d,rel:"noreferrer",target:"_blank",onClick:()=>v(),children:l?"...":m}):e.jsx("button",{type:"submit",className:"lf2-submit",disabled:l,children:l?"...":m})]}),e.jsx("style",{children:`
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
      `})]})},x={TERM_CALC:"termCalculatorData",LEAD:"leadData"},A=(r,t)=>{if(typeof window>"u")return t;try{const a=localStorage.getItem(r);return a?JSON.parse(a):t}catch{return t}},M=(r,t)=>{if(!(typeof window>"u"))try{localStorage.setItem(r,JSON.stringify(t))}catch{}},N={gender:"M",tobacco:"N",age:35,sumAssured:"10000000"},we=()=>{if(typeof window>"u")return N;const r=A(x.TERM_CALC,{}),t=A(x.LEAD,{}),a=(t?.user_gender||"").toString().toUpperCase(),i=a==="F"?"F":a==="M"?"M":N.gender,l=((Array.isArray(t?.user_tobacco)?t?.user_tobacco[0]:t?.user_tobacco)||"").toString().toUpperCase(),m=l==="Y"||l==="YES"||l==="S"?"Y":l==="N"||l==="NO"?"N":N.tobacco,d=Number(r?.age),f=Number.isFinite(d)&&d>=18&&d<=60?Math.round(d):N.age,p=N.sumAssured;return{gender:i,tobacco:m,age:f,sumAssured:p}},ke=({form:r,locale:t="en",isNri:a=!1})=>{const i=O();W(n=>n.newLead);const[s,l]=g.useState(()=>we()),[m,d]=g.useState(void 0),[f,p]=g.useState(!1),v=g.useRef(0);g.useEffect(()=>{const n=A(x.TERM_CALC,{});M(x.TERM_CALC,{...n,amount:s.sumAssured})},[]);const w=g.useCallback(async n=>{const h=++v.current;p(!0);try{const c=await ae({gender:n.gender,tobacco:n.tobacco,age:n.age});if(h!==v.current)return;const y=se(c,n.age,n.sumAssured);d(y)}finally{h===v.current&&p(!1)}},[]);g.useEffect(()=>{w(s)},[s.gender,s.tobacco,s.age,s.sumAssured,w]);const E=n=>{l(h=>{const c={...h,...n},y=A(x.TERM_CALC,{});M(x.TERM_CALC,{...y,age:c.age,amount:c.sumAssured});const _=A(x.LEAD,{});return M(x.LEAD,{..._,user_gender:c.gender,user_tobacco:c.tobacco}),i(U({...n})),c})},C=()=>{const{gender:n,tobacco:h,age:c,sumAssured:y}=s,_={user_gender:n,user_tobacco:h,user_age:c,user_sum_assured:y,premium:m,submittedAt:Date.now()};M("termLeadForm2Submission",_)},S=g.useMemo(()=>t==="hi"?q:a?K:X,[t,a]),L=t==="hi"?"परिवार की फ़ाइनेंशियल प्लानिंग (वित्तीय योजना) यहां से शुरू होती है":"Family's Financial Planning Starts Here",T=(r?.components||[]).find(n=>n?.type==="Submit"||n?.type==="submit"),F=T?.label||"Check Premium",o=T?.buttonLink||"https://www.axismaxlife.com/term-insurance-plans/premium-calculator?stage=lead&utmCode=1111&utm_theme=1Crore";return e.jsxs("section",{className:"lead-form2-section",id:r?.name||"lead-form-2nd",children:[e.jsxs("div",{className:"lead-form2-container pcp-container",children:[e.jsx("div",{className:"lead-form2-banner",children:e.jsx(H,{title:L,data:S,id:"calculator-banner"})}),e.jsx("div",{className:"lead-form2-calculator",children:e.jsx(ve,{title:r?.title||"Term Plan Calculator",subTitle:r?.subTitle||"Secure your future in just 5 minutes",components:r?.components,state:s,premium:m,loader:f,buttonLabel:F,buttonLink:o,locale:t,onChange:E,onSubmit:C})})]}),e.jsx("style",{children:`
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

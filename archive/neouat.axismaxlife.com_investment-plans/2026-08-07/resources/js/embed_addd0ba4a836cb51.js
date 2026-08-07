/*! WebTranslate embed — Project 27 */
  
  
(function() {
  var SOURCE_LOCALE  = "en";
  var API_BASE       = "https://webtransai.chlsoftech.com/projects/27/deliver/";
  var COLLECT_URL    = "https://webtransai.chlsoftech.com/projects/27/collect/";
  var DEFAULT_LOCALE = (document.currentScript && document.currentScript.getAttribute('data-wt-locale')) || (window.WT_LOCALE || '');
  var STATUS_MIN     = (document.currentScript && document.currentScript.getAttribute('data-wt-status')) || "mt";
  var DEBUG_OVERLAY  = (document.currentScript && document.currentScript.getAttribute('data-wt-debug')) === '1';
  var CAPTURE        = (document.currentScript && document.currentScript.getAttribute('data-wt-capture')) === '1';
  var LEARN_ENABLED  = true;

  function normalizeWS(s) { return (s || '').replace(/\s+/g, ' ').trim(); }
  
function rememberSourceOnce() {
  walkTextNodes(document.body, function(node) {
    if (node.__wt_src == null) {
      node.__wt_src = node.nodeValue;   // ✅ Store ORIGINAL text
    }
  });
}

  function sha1(input) {
    if (window.crypto && window.crypto.subtle && window.TextEncoder) {
      return window.crypto.subtle.digest('SHA-1', new TextEncoder().encode(input)).then(function(buf){
        var b = new Uint8Array(buf), hex = '';
        for (var i=0;i<b.length;i++) hex += ('0' + b[i].toString(16)).slice(-2);
        return hex;
      });
    }
    function rrot(n,c){return (n>>>c)|(n<<(32-c));} function tohex(n){return('00000000'+(n>>>0).toString(16)).slice(-8);}
    var msg=unescape(encodeURIComponent(input)),ml=msg.length,wd=[],i;
    for(i=0;i<ml;i++) wd[i>>2]=(wd[i>>2]||0)|(msg.charCodeAt(i)<<(24-(i%4)*8));
    wd[ml>>2]=(wd[ml>>2]||0)|(0x80<<(24-(ml%4)*8)); wd[((ml+8>>6)+1)*16-1]=ml*8;
    var H0=0x67452301,H1=0xEFCDAB89,H2=0x98BADCFE,H3=0x10325476,H4=0xC3D2E1F0;
    for(i=0;i<wd.length;i+=16){var w=[],a=H0,b=H1,c=H2,d=H3,e=H4;for(var t=0;t<80;t++){w[t]=t<16?wd[i+t]>>>0:rrot((w[t-3]^w[t-8]^w[t-14]^w[t-16])>>>0,31)>>>0;var f,k;if(t<20){f=(b&c)|((~b)&d);k=0x5A827999;}else if(t<40){f=b^c^d;k=0x6ED9EBA1;}else if(t<60){f=(b&c)|(b&d)|(c&d);k=0x8F1BBCDC;}else{f=b^c^d;k=0xCA62C1D6;}var tmp=(((rrot(a,5)+f)>>>0+e)>>>0+k)>>>0;tmp=(tmp+w[t])>>>0;e=d;d=c;c=rrot(b,30)>>>0;b=a;a=tmp;}H0=(H0+a)>>>0;H1=(H1+b)>>>0;H2=(H2+c)>>>0;H3=(H3+d)>>>0;H4=(H4+e)>>>0;}
    return Promise.resolve(tohex(H0)+tohex(H1)+tohex(H2)+tohex(H3)+tohex(H4));
  }
  


  function walkTextNodes(root, cb) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (!node || !node.parentElement) return NodeFilter.FILTER_REJECT;
        var tag = node.parentElement.tagName;
        if (/^(SCRIPT|STYLE|NOSCRIPT|IFRAME|CODE|PRE)$/i.test(tag)) return NodeFilter.FILTER_REJECT;
        var t = normalizeWS(node.nodeValue); if (!t) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n; while ((n = walker.nextNode())) cb(n);
  }

  function fetchMap(locale) {
    var u = new URL(API_BASE);
    u.searchParams.set('url', window.location.href.split('#')[0]);
    u.searchParams.set('locale', locale);
    u.searchParams.set('status_min', STATUS_MIN);

    return fetch(u.toString(), { credentials: 'omit' })
      .then(function(r) {
        return r.status === 304
          ? { ok: true, segments: {}, sources: {} }
          : r.json();
      })
      .then(function(js) {
        if (!js.ok) throw new Error(js.error || 'delivery failed');

        return {
          segments: js.segments || {},
          sources: js.sources || {}
        };
      });
  } 

  function buildSourcePairs(data) {
    var pairs = [];
    var segs = data.segments || {};
    var srcs = data.sources || {};

    Object.keys(srcs).forEach(function(sid) {
      var src = normalizeWS(srcs[sid]);
      var tgt = segs[sid];

      if (src && tgt && src.length >= 3) {
        pairs.push({
          src: src,
          tgt: tgt
        });
      }
    });

    pairs.sort(function(a, b) {
      return b.src.length - a.src.length;
    });

    return pairs;
  }

  function highlight(node) {
    if (!DEBUG_OVERLAY) return;
    try {
      var el = node.parentElement;
      if (el && !el.__wt_dbg) {
        el.__wt_dbg = true;
        el.style.outline = '2px dashed #7c3aed';
        el.style.outlineOffset = '2px';
        setTimeout(function(){ el.style.outline=''; el.__wt_dbg=false; }, 1200);
      }
    } catch(e){}
  }


function applyMap(data) {
  var segmentsMap = data.segments || {};
  var sourcePairs = buildSourcePairs(data);

  var pending = [];

  walkTextNodes(document.body, function(node) {
    var raw = node.nodeValue;
    var norm = normalizeWS(raw);
    var keyBase = SOURCE_LOCALE + ':' + norm;

    pending.push(
      sha1(keyBase).then(function(sid) {
        var replace = segmentsMap[sid];

        // Exact SID match
        if (replace != null && replace !== '') {

          if (node.__wt_src == null)
            node.__wt_src = raw;

          var leading = raw.match(/^\s*/)[0];
          var trailing = raw.match(/\s*$/)[0];

          node.nodeValue = leading + replace + trailing;

          highlight(node);
          return;
        }

        // Partial replacement fallback
        var changed = false;
        var newText = raw;

        for (var i = 0; i < sourcePairs.length; i++) {
          var p = sourcePairs[i];

          if (newText.indexOf(p.src) !== -1) {
            newText = newText.split(p.src).join(p.tgt);
            changed = true;
          }
        }

        if (changed) {
          if (node.__wt_src == null)
            node.__wt_src = raw;

          node.nodeValue = newText;

          highlight(node);
        }
      })
    );
  });

  return Promise.all(pending);
}

  function captureAndRefetch(locale, knownMap) {
    if (!LEARN_ENABLED || !CAPTURE) return Promise.resolve();
   
    var missing = []; var url = window.location.href.split('#')[0];
    var limit = 200;
    var seen = 0;
    var gather = [];
    walkTextNodes(document.body, function(node){
      if (seen >= limit) return;
      var srcNorm = normalizeWS(node.__wt_src != null ? String(node.__wt_src) : node.nodeValue);
      var keyBase = SOURCE_LOCALE + ':' + srcNorm;
      gather.push(sha1(keyBase).then(function(sid){
        if (!knownMap || knownMap[sid] == null) {
          missing.push({sid: sid, src_text: srcNorm});
          seen++;
        }
      }));
    });
    return Promise.all(gather).then(function(){
      if (!missing.length) return;
      return fetch(COLLECT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url, locale: locale || '', items: missing })
      }).then(function(){ return; });
    });
  }

    var WT = window.WebTranslate = window.WebTranslate || {};

     rememberSourceOnce();
    
    WT.setLocale = function (locale) {
        // For "Original" we now use WT.clear(), so ignore empty/false values here
        if (!locale) {
        return;
        }
        WT.locale = locale;
        
        rememberSourceOnce();

        // Fetch + apply + (optionally) capture
        fetchMap(locale)
        .then(function (map) {
            return applyMap(map).then(function () {
            return captureAndRefetch(locale, map.segments || {});
            });
        })
        .catch(function (e) {
            if (window.console) {
            console.warn('[WebTranslate]', e);
            }
        });
    };

    // Reset back to original (English) without reloading the page
    WT.clear = function () {
        WT.locale = '';
        // Restore original text from __wt_src if we previously replaced this node
        walkTextNodes(document.body, function (node) {
        if (node.__wt_src != null) {
            node.nodeValue = node.__wt_src;
        }
        });
    };

  var obs;
  function observe() {
    if (obs) obs.disconnect();
    obs = new MutationObserver(function() {
      clearTimeout(observe._t);
      observe._t = setTimeout(function() { if (WT.locale) WT.setLocale(WT.locale); }, 200);
    });
    obs.observe(document.documentElement, { childList:true, subtree:true, characterData:true });
  }

  if (DEFAULT_LOCALE) {
    WT.locale = DEFAULT_LOCALE;
    fetchMap(DEFAULT_LOCALE)
      .then(applyMap)
      .then(function(){ return captureAndRefetch('', {}); })
      .then(function(){ if (LEARN_ENABLED && CAPTURE) return fetchMap(DEFAULT_LOCALE).then(applyMap); })
      .then(observe)
      .catch(function(e){ if (window.console) console.warn('[WebTranslate]', e); });
  } else {
    observe();
  }
})();

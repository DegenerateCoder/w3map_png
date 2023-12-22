!function(t){"use strict";function e(){console.log.apply(console,arguments)}var s={id:null,caseSensitive:!1,include:[],shouldSort:!0,searchFn:o,sortFn:function(t,e){return t.score-e.score},getFn:function t(e,s,n){var o,r,h,a,c,p;if(s){if(-1!==(h=s.indexOf("."))?(o=s.slice(0,h),r=s.slice(h+1)):o=s,null!==(a=e[o])&&void 0!==a){if(r||"string"!=typeof a&&"number"!=typeof a){if(i(a))for(c=0,p=a.length;c<p;c++)t(a[c],r,n);else r&&t(a,r,n)}else n.push(a)}}else n.push(e);return n},keys:[],verbose:!1,tokenize:!1,matchAllTokens:!1,tokenSeparator:/ +/g,minMatchCharLength:1,findAllMatches:!1};function n(t,e){var n;for(n in this.list=t,this.options=e=e||{},s)s.hasOwnProperty(n)&&("boolean"==typeof s[n]?this.options[n]=n in e?e[n]:s[n]:this.options[n]=e[n]||s[n])}function i(t){return"[object Array]"===Object.prototype.toString.call(t)}function o(t,e){e=e||{},this.options=e,this.options.location=e.location||o.defaultOptions.location,this.options.distance="distance"in e?e.distance:o.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:o.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||o.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen<=this.options.maxPatternLength&&(this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet())}n.VERSION="2.7.3",n.prototype.set=function(t){return this.list=t,t},n.prototype.search=function(t){return this.options.verbose&&e("\nSearch term:",t,"\n"),this.pattern=t,this.results=[],this.resultMap={},this._keyMap=null,this._prepareSearchers(),this._startSearch(),this._computeScore(),this._sort(),this._format()},n.prototype._prepareSearchers=function(){var t=this.options,e=this.pattern,s=t.searchFn,n=e.split(t.tokenSeparator),i=0,o=n.length;if(this.options.tokenize)for(this.tokenSearchers=[];i<o;i++)this.tokenSearchers.push(new s(n[i],t));this.fullSeacher=new s(e,t)},n.prototype._startSearch=function(){var t,e,s,n,i=this.options.getFn,o=this.list,r=o.length,h=this.options.keys,a=h.length,c=null;if("string"==typeof o[0])for(s=0;s<r;s++)this._analyze("",o[s],s,s);else for(s=0,this._keyMap={};s<r;s++)for(n=0,c=o[s];n<a;n++){if("string"!=typeof(t=h[n])){if(e=1-t.weight||1,this._keyMap[t.name]={weight:e},t.weight<=0||t.weight>1)throw Error("Key weight has to be > 0 and <= 1");t=t.name}else this._keyMap[t]={weight:1};this._analyze(t,i(c,t,[]),c,s)}},n.prototype._analyze=function(t,s,n,o){var r,h,a,c,p,l,u,f,_,d,g,$,m,y,k,v=this.options,S=!1;if(null!=s){h=[];var b=0;if("string"==typeof s){if(r=s.split(v.tokenSeparator),v.verbose&&e("---------\nKey:",t),this.options.tokenize){for(y=0;y<this.tokenSearchers.length;y++){for(f=this.tokenSearchers[y],v.verbose&&e("Pattern:",f.pattern),_=[],$=!1,k=0;k<r.length;k++){d=r[k];var L={};(g=f.search(d)).isMatch?(L[d]=g.score,S=!0,$=!0,h.push(g.score)):(L[d]=1,this.options.matchAllTokens||h.push(1)),_.push(L)}$&&b++,v.verbose&&e("Token scores:",_)}for(y=1,c=h[0],l=h.length;y<l;y++)c+=h[y];c/=l,v.verbose&&e("Token score average:",c)}u=this.fullSeacher.search(s),v.verbose&&e("Full text score:",u.score),p=u.score,void 0!==c&&(p=(p+c)/2),v.verbose&&e("Score average:",p),m=!this.options.tokenize||!this.options.matchAllTokens||b>=this.tokenSearchers.length,v.verbose&&e("Check Matches",m),(S||u.isMatch)&&m&&((a=this.resultMap[o])?a.output.push({key:t,score:p,matchedIndices:u.matchedIndices}):(this.resultMap[o]={item:n,output:[{key:t,score:p,matchedIndices:u.matchedIndices}]},this.results.push(this.resultMap[o])))}else if(i(s))for(y=0;y<s.length;y++)this._analyze(t,s[y],n,o)}},n.prototype._computeScore=function(){var t,s,n,i,o,r,h,a,c,p=this._keyMap,l=this.results;for(this.options.verbose&&e("\n\nComputing score:\n"),t=0;t<l.length;t++){for(s=0,n=0,o=(i=l[t].output).length,a=1;s<o;s++)c=(r=i[s].score)*(h=p?p[i[s].key].weight:1),1!==h?a=Math.min(a,c):(n+=c,i[s].nScore=c);1===a?l[t].score=n/o:l[t].score=a,this.options.verbose&&e(l[t])}},n.prototype._sort=function(){var t=this.options;t.shouldSort&&(t.verbose&&e("\n\nSorting...."),this.results.sort(t.sortFn))},n.prototype._format=function(){var t,s,n,i,o=this.options,r=o.getFn,h=[],a=this.results,c=o.include;for(o.verbose&&e("\n\nOutput:\n\n",a),n=o.id?function(t){a[t].item=r(a[t].item,o.id,[])[0]}:function(){},i=function(t){var e,s,n,i,o,r=a[t];if(c.length>0){if(e={item:r.item},-1!==c.indexOf("matches"))for(s=0,n=r.output,e.matches=[];s<n.length;s++)o={indices:(i=n[s]).matchedIndices},i.key&&(o.key=i.key),e.matches.push(o);-1!==c.indexOf("score")&&(e.score=a[t].score)}else e=r.item;return e},t=0,s=a.length;t<s;t++)n(t),h.push(i(t));return h},o.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},o.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},o.prototype._bitapScore=function(t,e){var s=t/this.patternLen,n=Math.abs(this.options.location-e);return this.options.distance?s+n/this.options.distance:n?1:s},o.prototype.search=function(t){var e,s,n,i,o,r,h,a,c,p,l,u,f,_,d,g,$,m,y,k,v,S,b,L=this.options;if(t=L.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0,matchedIndices:[[0,t.length-1]]};if(this.patternLen>L.maxPatternLength){if(y=!!(m=t.match(RegExp(this.pattern.replace(L.tokenSeparator,"|")))))for(e=0,v=[],S=m.length;e<S;e++)b=m[e],v.push([t.indexOf(b),b.length-1]);return{isMatch:y,score:y?.5:1,matchedIndices:v}}for(e=0,i=L.findAllMatches,o=L.location,n=t.length,r=L.threshold,h=t.indexOf(this.pattern,o),k=[];e<n;e++)k[e]=0;for(-1!=h&&(r=Math.min(this._bitapScore(0,h),r),-1!=(h=t.lastIndexOf(this.pattern,o+this.patternLen))&&(r=Math.min(this._bitapScore(0,h),r))),h=-1,g=1,$=[],p=this.patternLen+n,e=0;e<this.patternLen;e++){for(a=0,c=p;a<c;)this._bitapScore(e,o+c)<=r?a=c:p=c,c=Math.floor((p-a)/2+a);for(p=c,l=Math.max(1,o-c+1),(f=Array((u=i?n:Math.min(o+c,n)+this.patternLen)+2))[u+1]=(1<<e)-1,s=u;s>=l;s--)if((d=this.patternAlphabet[t.charAt(s-1)])&&(k[s-1]=1),f[s]=(f[s+1]<<1|1)&d,0!==e&&(f[s]|=(_[s+1]|_[s])<<1|1|_[s+1]),f[s]&this.matchmask&&(g=this._bitapScore(e,s-1))<=r){if(r=g,h=s-1,$.push(h),h<=o)break;l=Math.max(1,2*o-h)}if(this._bitapScore(e+1,o)>r)break;_=f}return{isMatch:h>=0,score:0===g?.001:g,matchedIndices:v=this._getMatchedIndices(k)}},o.prototype._getMatchedIndices=function(t){for(var e,s=[],n=-1,i=-1,o=0,r=t.length;o<r;o++)(e=t[o])&&-1===n?n=o:e||-1===n||((i=o-1)-n+1>=this.options.minMatchCharLength&&s.push([n,i]),n=-1);return t[o-1]&&o-1-n+1>=this.options.minMatchCharLength&&s.push([n,o-1]),s},"object"==typeof exports?module.exports=n:"function"==typeof define&&define.amd?define(function(){return n}):t.Fuse=n}(this);
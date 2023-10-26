const e={unwrapMatch(e,t){let n=e.match(t);return n&&n.length>0?[...n]:[]}},t=864e5,n=/^([0-9]+) *(days|hours|minutes|seconds|milliseconds{1}).*$/i;class r{/**
     * Construct a new duration from a parameter object representing the duration unit values. 
     * @param params:DurationParams - See DurationValues type for valid fields.
     */constructor(e){this.valueInMillis=this.flattenParamsToMillis(e)}/**
     * Return a Duration parsed from a space separated string in the format "{{count}} {{unit}}" e.g. 30 seconds, 5 minutes, 2 days
     * @param count the number of units the duration should represent
     * @param unit the time unit to create this duration from e.g. 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
     * @returns Duration
     */static of(e,t){switch(t){case"days":return new r({days:e});case"hours":return new r({hours:e});case"minutes":return new r({minutes:e});case"seconds":return new r({seconds:e});case"milliseconds":return new r({milliseconds:e})}throw Error(`Unable to construct a duration for count of ${e} and unit of ${t}`)}/**
     * Return a Duration parsed from a space separated string in the format "{{count}} {{unit}}" e.g. 30 seconds, 5 minutes, 2 days
     * @param parseable string to parse
     * @returns Duration
     */static parse(t){try{let s=e.unwrapMatch(t,n);if(!s||3!==s.length)throw Error("String could not be split into count and unit");let o=Number.parseInt(s[1]),i=function(e){switch(e){case"days":return"days";case"hours":return"hours";case"minutes":return"minutes";case"seconds":return"seconds";case"milliseconds":return"milliseconds"}throw Error(`String ${e} is not a valid duration unit`)}(s[2]);return r.of(o,i)}catch(e){throw Error(`Unable to parse ${t} as a Duration`,{cause:e})}}/**
     * Return the duration value converted to the target unit
     * @param unit The target duration unit
     * @returns The numerical value of this duration in the specified unit
     */in(e){switch(e){case"days":return this.valueInMillis/t;case"hours":return this.valueInMillis/36e5;case"minutes":return this.valueInMillis/6e4;case"seconds":return this.valueInMillis/1e3;case"milliseconds":return this.valueInMillis}throw Error(`Unit of ${e} is not supported.`)}/**
     * Converts this duration to an integer of the target unit. Remainder values will be truncated.
     * @param unit The target duration unit
     * @returns The truncated integer value of the duration converted to the target unit
     */as(e){return Math.trunc(this.in(e))}/**
     * Represents this duration as a values object where the length of the duration is distributed across the various units from largest to smallest
     * @returns DurationValues
     */asValues(){let e=this.asTotals();return{days:e.days,hours:e.hours-24*e.days,minutes:e.minutes-60*e.hours,seconds:e.seconds-60*e.minutes,milliseconds:e.milliseconds-1e3*e.seconds}}/**
     * Represents this duration as a values object where each value represents the total integer size of the duration expressed as that unit.
     * @returns DurationTotals
     */asTotals(){return{days:this.as("days"),hours:this.as("hours"),minutes:this.as("minutes"),seconds:this.as("seconds"),milliseconds:this.as("milliseconds")}}/**
     * @param other Duration
     * @param orEqual optional
     * @returns boolean
     */greaterThan(e,t){return t?this.valueInMillis>=e.in("milliseconds"):this.valueInMillis>e.in("milliseconds")}/**
     * @param other Duration
     * @param orEqual optional
     * @returns boolean
     */lessThan(e,t){return t?this.valueInMillis<=e.in("milliseconds"):this.valueInMillis<e.in("milliseconds")}flattenParamsToMillis(e){let n=0;return e.days&&(n+=e.days*t),e.hours&&(n+=36e5*e.hours),e.minutes&&(n+=6e4*e.minutes),e.seconds&&(n+=1e3*e.seconds),e.milliseconds&&(n+=Math.trunc(e.milliseconds)),n}}/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** *//* global Reflect, Promise, SuppressedError, Symbol */var s=function(e,t){return(s=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};function o(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}s(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}function i(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function a(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,s,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){s={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(s)throw s.error}}return i}function l(e,t,n){if(n||2==arguments.length)for(var r,s=0,o=t.length;s<o;s++)!r&&s in t||(r||(r=Array.prototype.slice.call(t,0,s)),r[s]=t[s]);return e.concat(r||Array.prototype.slice.call(t))}function c(e){return"function"==typeof e}function u(e){var t=e(function(e){Error.call(e),e.stack=Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}"function"==typeof SuppressedError&&SuppressedError;var h=u(function(e){return function(t){e(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map(function(e,t){return t+1+") "+e.toString()}).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t}});function d(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var p=function(){var e;function t(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return t.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var e,t,n,r,s,o=this._parentage;if(o){if(this._parentage=null,Array.isArray(o))try{for(var u=i(o),d=u.next();!d.done;d=u.next())d.value.remove(this)}catch(t){e={error:t}}finally{try{d&&!d.done&&(t=u.return)&&t.call(u)}finally{if(e)throw e.error}}else o.remove(this)}var p=this.initialTeardown;if(c(p))try{p()}catch(e){s=e instanceof h?e.errors:[e]}var f=this._finalizers;if(f){this._finalizers=null;try{for(var v=i(f),b=v.next();!b.done;b=v.next()){var y=b.value;try{m(y)}catch(e){s=null!=s?s:[],e instanceof h?s=l(l([],a(s)),a(e.errors)):s.push(e)}}}catch(e){n={error:e}}finally{try{b&&!b.done&&(r=v.return)&&r.call(v)}finally{if(n)throw n.error}}}if(s)throw new h(s)}},t.prototype.add=function(e){var n;if(e&&e!==this){if(this.closed)m(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=null!==(n=this._finalizers)&&void 0!==n?n:[]).push(e)}}},t.prototype._hasParent=function(e){var t=this._parentage;return t===e||Array.isArray(t)&&t.includes(e)},t.prototype._addParent=function(e){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e},t.prototype._removeParent=function(e){var t=this._parentage;t===e?this._parentage=null:Array.isArray(t)&&d(t,e)},t.prototype.remove=function(e){var n=this._finalizers;n&&d(n,e),e instanceof t&&e._removeParent(this)},t.EMPTY=((e=new t).closed=!0,e),t}(),f=p.EMPTY;function v(e){return e instanceof p||e&&"closed"in e&&c(e.remove)&&c(e.add)&&c(e.unsubscribe)}function m(e){c(e)?e():e.unsubscribe()}var b={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},y={setTimeout:function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var s=y.delegate;return(null==s?void 0:s.setTimeout)?s.setTimeout.apply(s,l([e,t],a(n))):setTimeout.apply(void 0,l([e,t],a(n)))},clearTimeout:function(e){var t=y.delegate;return((null==t?void 0:t.clearTimeout)||clearTimeout)(e)},delegate:void 0};function g(){}var w=E("C",void 0,void 0);function E(e,t,n){return{kind:e,value:t,error:n}}var S=null;function _(e){if(b.useDeprecatedSynchronousErrorHandling){var t=!S;if(t&&(S={errorThrown:!1,error:null}),e(),t){var n=S,r=n.errorThrown,s=n.error;if(S=null,r)throw s}}else e()}var T=function(e){function t(t){var n=e.call(this)||this;return n.isStopped=!1,t?(n.destination=t,v(t)&&t.add(n)):n.destination=D,n}return o(t,e),t.create=function(e,t,n){return new I(e,t,n)},t.prototype.next=function(e){this.isStopped?A(E("N",e,void 0),this):this._next(e)},t.prototype.error=function(e){this.isStopped?A(E("E",void 0,e),this):(this.isStopped=!0,this._error(e))},t.prototype.complete=function(){this.isStopped?A(w,this):(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(e){this.destination.next(e)},t.prototype._error=function(e){try{this.destination.error(e)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}(p),x=Function.prototype.bind;function M(e,t){return x.call(e,t)}var P=function(){function e(e){this.partialObserver=e}return e.prototype.next=function(e){var t=this.partialObserver;if(t.next)try{t.next(e)}catch(e){O(e)}},e.prototype.error=function(e){var t=this.partialObserver;if(t.error)try{t.error(e)}catch(e){O(e)}else O(e)},e.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(e){O(e)}},e}(),I=function(e){function t(t,n,r){var s,o,i=e.call(this)||this;return c(t)||!t?s={next:null!=t?t:void 0,error:null!=n?n:void 0,complete:null!=r?r:void 0}:i&&b.useDeprecatedNextContext?((o=Object.create(t)).unsubscribe=function(){return i.unsubscribe()},s={next:t.next&&M(t.next,o),error:t.error&&M(t.error,o),complete:t.complete&&M(t.complete,o)}):s=t,i.destination=new P(s),i}return o(t,e),t}(T);function O(e){b.useDeprecatedSynchronousErrorHandling?b.useDeprecatedSynchronousErrorHandling&&S&&(S.errorThrown=!0,S.error=e):y.setTimeout(function(){var t=b.onUnhandledError;if(t)t(e);else throw e})}function A(e,t){var n=b.onStoppedNotification;n&&y.setTimeout(function(){return n(e,t)})}var D={closed:!0,next:g,error:function(e){throw e},complete:g},j="function"==typeof Symbol&&Symbol.observable||"@@observable",C=function(){function e(e){e&&(this._subscribe=e)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(e,t,n){var r,s=this,o=(r=e)&&r instanceof T||r&&c(r.next)&&c(r.error)&&c(r.complete)&&v(r)?e:new I(e,t,n);return _(function(){var e=s.operator,t=s.source;o.add(e?e.call(o,t):t?s._subscribe(o):s._trySubscribe(o))}),o},e.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){e.error(t)}},e.prototype.forEach=function(e,t){var n=this;return new(t=U(t))(function(t,r){var s=new I({next:function(t){try{e(t)}catch(e){r(e),s.unsubscribe()}},error:r,complete:t});n.subscribe(s)})},e.prototype._subscribe=function(e){var t;return null===(t=this.source)||void 0===t?void 0:t.subscribe(e)},e.prototype[j]=function(){return this},e.prototype.pipe=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return(0===e.length?function(e){return e}:1===e.length?e[0]:function(t){return e.reduce(function(e,t){return t(e)},t)})(this)},e.prototype.toPromise=function(e){var t=this;return new(e=U(e))(function(e,n){var r;t.subscribe(function(e){return r=e},function(e){return n(e)},function(){return e(r)})})},e.create=function(t){return new e(t)},e}();function U(e){var t;return null!==(t=null!=e?e:b.Promise)&&void 0!==t?t:Promise}var z=u(function(e){return function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),H=function(e){function t(){var t=e.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return o(t,e),t.prototype.lift=function(e){var t=new N(this,this);return t.operator=e,t},t.prototype._throwIfClosed=function(){if(this.closed)throw new z},t.prototype.next=function(e){var t=this;_(function(){var n,r;if(t._throwIfClosed(),!t.isStopped){t.currentObservers||(t.currentObservers=Array.from(t.observers));try{for(var s=i(t.currentObservers),o=s.next();!o.done;o=s.next())o.value.next(e)}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}}})},t.prototype.error=function(e){var t=this;_(function(){if(t._throwIfClosed(),!t.isStopped){t.hasError=t.isStopped=!0,t.thrownError=e;for(var n=t.observers;n.length;)n.shift().error(e)}})},t.prototype.complete=function(){var e=this;_(function(){if(e._throwIfClosed(),!e.isStopped){e.isStopped=!0;for(var t=e.observers;t.length;)t.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){var e;return(null===(e=this.observers)||void 0===e?void 0:e.length)>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(t){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,t)},t.prototype._subscribe=function(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)},t.prototype._innerSubscribe=function(e){var t=this,n=this.hasError,r=this.isStopped,s=this.observers;return n||r?f:(this.currentObservers=null,s.push(e),new p(function(){t.currentObservers=null,d(s,e)}))},t.prototype._checkFinalizedStatuses=function(e){var t=this.hasError,n=this.thrownError,r=this.isStopped;t?e.error(n):r&&e.complete()},t.prototype.asObservable=function(){var e=new C;return e.source=this,e},t.create=function(e,t){return new N(e,t)},t}(C),N=function(e){function t(t,n){var r=e.call(this)||this;return r.destination=t,r.source=n,r}return o(t,e),t.prototype.next=function(e){var t,n;null===(n=null===(t=this.destination)||void 0===t?void 0:t.next)||void 0===n||n.call(t,e)},t.prototype.error=function(e){var t,n;null===(n=null===(t=this.destination)||void 0===t?void 0:t.error)||void 0===n||n.call(t,e)},t.prototype.complete=function(){var e,t;null===(t=null===(e=this.destination)||void 0===e?void 0:e.complete)||void 0===t||t.call(e)},t.prototype._subscribe=function(e){var t,n;return null!==(n=null===(t=this.source)||void 0===t?void 0:t.subscribe(e))&&void 0!==n?n:f},t}(H);class ${subscribe(e,t){switch(e){case"updated":return this.updatedEvent.subscribe(e=>t(e));case"started":return this.startedEvent.subscribe(e=>t(e));case"stopped":return this.stoppedEvent.subscribe(e=>t(e));case"finished":return this.finishedEvent.subscribe(e=>t(e));case"paused":return this.pausedEvent.subscribe(e=>t(e))}}publish(e,t){switch(e){case"updated":return this.updatedEvent.next(t);case"started":return this.startedEvent.next(t);case"stopped":return this.stoppedEvent.next(t);case"finished":return this.finishedEvent.next(t);case"paused":return this.pausedEvent.next(t)}}completeAll(){this.updatedEvent.complete(),this.startedEvent.complete(),this.pausedEvent.complete(),this.stoppedEvent.complete(),this.finishedEvent.complete()}constructor(){this.updatedEvent=new H,this.startedEvent=new H,this.pausedEvent=new H,this.stoppedEvent=new H,this.finishedEvent=new H}}const k={mode:"stopwatch",interval:r.of(500,"milliseconds"),target:r.parse("0 seconds"),initial:r.parse("0 seconds")},F={duration:(e,t=["minutes","seconds"],n=":")=>(function(e,t=["minutes","seconds"],n=":"){let r=e.asValues(),s=[];return t.forEach(e=>{let t=r[e];"milliseconds"===e?s.push(String(t).padStart(3,"0")):s.push(t)}),s.map(e=>String(e).padStart(2,"0")).join(n)})(e,t,n),durationParams(e,t=["minutes","seconds"],n=":"){return this.duration(new r(e),t,n)},seconds(e,t=["minutes","seconds"],n=":"){return this.duration(r.of(e,"seconds"),t,n)},milliseconds(e,t=["minutes","seconds"],n=":"){return this.duration(r.of(e,"milliseconds"),t,n)}},V=r.of(123456789876,"milliseconds");console.log(V.asValues()),console.log(F.duration(V)),console.log(F.duration(V,["hours","minutes","seconds","milliseconds"])),console.log(F.milliseconds(987654321,["days","hours","minutes","seconds","milliseconds"]));const L=r.of(10067,"milliseconds");console.log(L.asValues()),console.log(F.duration(L)),console.log(F.duration(L,["minutes","seconds","milliseconds"],";")),new r({});let Y=new class{get events(){return this.eventManager}get state(){return{time:this.currentTime,phase:this.phase}}constructor(e){this.config=k,this.phase="initialized",this.directionMultiplier=1,this.currentTime=r.of(0,"milliseconds"),this.lastPollMs=performance.now(),this.eventManager=new $,this.intervalId=void 0,this.configure({...k,...e}),this.eventManager=new $}configure(e){if(this.isInLivePhase())throw Error(`Cannot configure a clock that is ${this.phase}.`);this.config={...k,...e},this.directionMultiplier="countdown"===this.config.mode?-1:1,this.resetState()}start(){"running"!==this.phase&&(this.isInHaltedPhase()&&this.resetState(),this.intervalId=setInterval(()=>this.update(),this.config.interval.in("milliseconds")),this.lastPollMs=performance.now(),this.phase="running",this.eventManager.publish("started",this.state))}stop(){this.isInHaltedPhase()||("running"===this.phase&&clearInterval(this.intervalId),this.phase="stopped",this.eventManager.publish("stopped",this.state))}pause(){"running"===this.phase&&(clearInterval(this.intervalId),this.phase="paused",this.eventManager.publish("paused",this.state))}/**
     * Revert this clock back to factory settings. Performs the following definite actions in order:
     * - All event handlers will be unsubscribed
     * - The clock will be stopped, if it is running. 
     * - Configurations will be reset to defaults. 
     */revert(){this.eventManager.completeAll(),this.eventManager=new $,this.stop(),this.configure(k)}update(){let e=performance.now(),t=e-this.lastPollMs,n=this.currentTime.in("milliseconds")+t*this.directionMultiplier;if(this.currentTime=r.of(n,"milliseconds"),this.lastPollMs=e,this.isFinished()){this.stop(),this.phase="finished",this.eventManager.publish("finished",this.state);return}this.eventManager.publish("updated",this.state)}isFinished(){return"countdown"===this.config.mode?this.config.target.greaterThan(this.currentTime):this.config.target.lessThan(this.currentTime)}isInLivePhase(){return"running"===this.phase||"paused"===this.phase}isInHaltedPhase(){return"stopped"===this.phase||"finished"===this.phase}resetState(){this.setState({time:this.config.initial,phase:"initialized"})}setState(e){this.phase=e.phase,this.currentTime=e.time}};console.log(Y.state),Y.start(),console.log(Y.state),Y.pause(),console.log(Y.state),Y.stop(),console.log(Y.state);let R=r.of(65,"seconds");console.log(R.in("minutes")),console.log(R.as("minutes")),r.parse("5 minutes").in("seconds"),// c = new Clock({ mode: 'countdown', initial: Duration.of(1, 'minutes') });
Y.configure({mode:"countdown",initial:r.of(5,"seconds"),target:r.of(1,"seconds"),interval:r.of(500,"milliseconds")}),Y.events.subscribe("started",e=>{console.log("STARTED }}}}}}}}}}"),console.log(e),console.log(e.time.in("seconds")),console.log(e.time.as("milliseconds")),console.log(F.duration(e.time)),console.log("{{{{{{{{{ Started")}),Y.events.subscribe("updated",e=>{console.log("UPDATED >>>>>>>>>>"),console.log(e),console.log(e.time.in("seconds")),console.log(e.time.as("milliseconds")),console.log(F.duration(e.time,["minutes","seconds","milliseconds"])),console.log("<<<<<<<<<<<<< UPDATED")}),Y.events.subscribe("stopped",e=>{console.log("STOPPED ::::::::::"),console.log(e),console.log(e.time.in("seconds")),console.log(e.time.as("milliseconds"))}),Y.events.subscribe("finished",e=>{console.log("FINISHED"),console.log(e),console.log(e.time.in("seconds")),console.log(e.time.as("milliseconds")),Y.revert(),Y.configure({initial:r.of(0,"seconds"),target:r.of(1e3,"seconds")}),Y.events.subscribe("updated",e=>{console.log("UPDATED >>>>>>>>>> NEW"),console.log(e),console.log(e.time.in("seconds")),console.log(e.time.as("milliseconds")),console.log("<<<<<<<<<<<<< UPDATED")}),console.log("restart:"),// c.start();
console.log(Y.state)}),// c.configure({ mode: 'stopwatch' });
Y.start(),Y.pause(),Y.pause(),Y.start();//# sourceMappingURL=index.2c28994b.js.map

//# sourceMappingURL=index.2c28994b.js.map
function Ue(d,o){for(var k=0;k<o.length;k++){const p=o[k];if(typeof p!="string"&&!Array.isArray(p)){for(const _ in p)if(_!=="default"&&!(_ in d)){const y=Object.getOwnPropertyDescriptor(p,_);y&&Object.defineProperty(d,_,y.get?y:{enumerable:!0,get:()=>p[_]})}}}return Object.freeze(Object.defineProperty(d,Symbol.toStringTag,{value:"Module"}))}function Ie(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var Z={exports:{}},O={exports:{}};O.exports;var Ce;function Ye(){return Ce||(Ce=1,(function(d,o){/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){function k(e,t){Object.defineProperty(y.prototype,e,{get:function(){console.warn("%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1])}})}function p(e){return e===null||typeof e!="object"?null:(e=de&&e[de]||e["@@iterator"],typeof e=="function"?e:null)}function _(e,t){e=(e=e.constructor)&&(e.displayName||e.name)||"ReactClass";var n=e+"."+t;fe[n]||(console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",t,e),fe[n]=!0)}function y(e,t,n){this.props=e,this.context=t,this.refs=F,this.updater=n||he}function $(){}function w(e,t,n){this.props=e,this.context=t,this.refs=F,this.updater=n||he}function T(){}function S(e){return""+e}function M(e){try{S(e);var t=!1}catch{t=!0}if(t){t=console;var n=t.error,r=typeof Symbol=="function"&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object";return n.call(t,"The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",r),S(e)}}function j(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===xe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case B:return"Fragment";case se:return"Profiler";case ae:return"StrictMode";case ie:return"Suspense";case Pe:return"SuspenseList";case le:return"Activity"}if(typeof e=="object")switch(typeof e.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),e.$$typeof){case oe:return"Portal";case ce:return e.displayName||"Context";case G:return(e._context.displayName||"Context")+".Consumer";case ue:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Q:return t=e.displayName||null,t!==null?t:j(e.type)||"Memo";case A:t=e._payload,e=e._init;try{return j(e(t))}catch{}}return null}function X(e){if(e===B)return"<>";if(typeof e=="object"&&e!==null&&e.$$typeof===A)return"<...>";try{var t=j(e);return t?"<"+t+">":"<...>"}catch{return"<...>"}}function J(){var e=u.A;return e===null?null:e.getOwner()}function ee(){return Error("react-stack-top-frame")}function te(e){if(z.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return e.key!==void 0}function Ne(e,t){function n(){_e||(_e=!0,console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",t))}n.isReactWarning=!0,Object.defineProperty(e,"key",{get:n,configurable:!0})}function Oe(){var e=j(this.type);return ve[e]||(ve[e]=!0,console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")),e=this.props.ref,e!==void 0?e:null}function U(e,t,n,r,s,i){var c=n.ref;return e={$$typeof:W,type:e,key:t,props:n,_owner:r},(c!==void 0?c:null)!==null?Object.defineProperty(e,"ref",{enumerable:!1,get:Oe}):Object.defineProperty(e,"ref",{enumerable:!1,value:null}),e._store={},Object.defineProperty(e._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:0}),Object.defineProperty(e,"_debugInfo",{configurable:!1,enumerable:!1,writable:!0,value:null}),Object.defineProperty(e,"_debugStack",{configurable:!1,enumerable:!1,writable:!0,value:s}),Object.defineProperty(e,"_debugTask",{configurable:!1,enumerable:!1,writable:!0,value:i}),Object.freeze&&(Object.freeze(e.props),Object.freeze(e)),e}function $e(e,t){return t=U(e.type,t,e.props,e._owner,e._debugStack,e._debugTask),e._store&&(t._store.validated=e._store.validated),t}function ne(e){b(e)?e._store&&(e._store.validated=1):typeof e=="object"&&e!==null&&e.$$typeof===A&&(e._payload.status==="fulfilled"?b(e._payload.value)&&e._payload.value._store&&(e._payload.value._store.validated=1):e._store&&(e._store.validated=1))}function b(e){return typeof e=="object"&&e!==null&&e.$$typeof===W}function Se(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}function I(e,t){return typeof e=="object"&&e!==null&&e.key!=null?(M(e.key),Se(""+e.key)):t.toString(36)}function je(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(T,T):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function E(e,t,n,r,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var c=!1;if(e===null)c=!0;else switch(i){case"bigint":case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case W:case oe:c=!0;break;case A:return c=e._init,E(c(e._payload),t,n,r,s)}}if(c){c=e,s=s(c);var f=r===""?"."+I(c,0):r;return pe(s)?(n="",f!=null&&(n=f.replace(we,"$&/")+"/"),E(s,t,n,"",function(v){return v})):s!=null&&(b(s)&&(s.key!=null&&(c&&c.key===s.key||M(s.key)),n=$e(s,n+(s.key==null||c&&c.key===s.key?"":(""+s.key).replace(we,"$&/")+"/")+f),r!==""&&c!=null&&b(c)&&c.key==null&&c._store&&!c._store.validated&&(n._store.validated=2),s=n),t.push(s)),1}if(c=0,f=r===""?".":r+":",pe(e))for(var l=0;l<e.length;l++)r=e[l],i=f+I(r,l),c+=E(r,t,n,i,s);else if(l=p(e),typeof l=="function")for(l===e.entries&&(ge||console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),ge=!0),e=l.call(e),l=0;!(r=e.next()).done;)r=r.value,i=f+I(r,l++),c+=E(r,t,n,i,s);else if(i==="object"){if(typeof e.then=="function")return E(je(e),t,n,r,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return c}function L(e,t,n){if(e==null)return e;var r=[],s=0;return E(e,r,"","",function(i){return t.call(n,i,s++)}),r}function Le(e){if(e._status===-1){var t=e._ioInfo;t!=null&&(t.start=t.end=performance.now()),t=e._result;var n=t();if(n.then(function(s){if(e._status===0||e._status===-1){e._status=1,e._result=s;var i=e._ioInfo;i!=null&&(i.end=performance.now()),n.status===void 0&&(n.status="fulfilled",n.value=s)}},function(s){if(e._status===0||e._status===-1){e._status=2,e._result=s;var i=e._ioInfo;i!=null&&(i.end=performance.now()),n.status===void 0&&(n.status="rejected",n.reason=s)}}),t=e._ioInfo,t!=null){t.value=n;var r=n.displayName;typeof r=="string"&&(t.name=r)}e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return t=e._result,t===void 0&&console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,t),"default"in t||console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,t),t.default;throw e._result}function h(){var e=u.H;return e===null&&console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),e}function re(){u.asyncTransitions--}function P(e){if(q===null)try{var t=("require"+Math.random()).slice(0,7);q=(d&&d[t]).call(d,"timers").setImmediate}catch{q=function(r){be===!1&&(be=!0,typeof MessageChannel>"u"&&console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var s=new MessageChannel;s.port1.onmessage=r,s.port2.postMessage(void 0)}}return q(e)}function R(e){return 1<e.length&&typeof AggregateError=="function"?new AggregateError(e):e[0]}function x(e,t){t!==D-1&&console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),D=t}function Y(e,t,n){var r=u.actQueue;if(r!==null)if(r.length!==0)try{V(r),P(function(){return Y(e,t,n)});return}catch(s){u.thrownErrors.push(s)}else u.actQueue=null;0<u.thrownErrors.length?(r=R(u.thrownErrors),u.thrownErrors.length=0,n(r)):t(e)}function V(e){if(!K){K=!0;var t=0;try{for(;t<e.length;t++){var n=e[t];do{u.didUsePromise=!1;var r=n(!1);if(r!==null){if(u.didUsePromise){e[t]=n,e.splice(0,t);return}n=r}else break}while(!0)}e.length=0}catch(s){e.splice(0,t+1),u.thrownErrors.push(s)}finally{K=!1}}}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var W=Symbol.for("react.transitional.element"),oe=Symbol.for("react.portal"),B=Symbol.for("react.fragment"),ae=Symbol.for("react.strict_mode"),se=Symbol.for("react.profiler"),G=Symbol.for("react.consumer"),ce=Symbol.for("react.context"),ue=Symbol.for("react.forward_ref"),ie=Symbol.for("react.suspense"),Pe=Symbol.for("react.suspense_list"),Q=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),le=Symbol.for("react.activity"),de=Symbol.iterator,fe={},he={isMounted:function(){return!1},enqueueForceUpdate:function(e){_(e,"forceUpdate")},enqueueReplaceState:function(e){_(e,"replaceState")},enqueueSetState:function(e){_(e,"setState")}},ye=Object.assign,F={};Object.freeze(F),y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};var m={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]};for(N in m)m.hasOwnProperty(N)&&k(N,m[N]);$.prototype=y.prototype,m=w.prototype=new $,m.constructor=w,ye(m,y.prototype),m.isPureReactComponent=!0;var pe=Array.isArray,xe=Symbol.for("react.client.reference"),u={H:null,A:null,T:null,S:null,actQueue:null,asyncTransitions:0,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1,didUsePromise:!1,thrownErrors:[],getCurrentStack:null,recentlyCreatedOwnerStacks:0},z=Object.prototype.hasOwnProperty,ke=console.createTask?console.createTask:function(){return null};m={react_stack_bottom_frame:function(e){return e()}};var _e,me,ve={},ze=m.react_stack_bottom_frame.bind(m,ee)(),qe=ke(X(ee)),ge=!1,we=/\/+/g,Me=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},be=!1,q=null,D=0,H=!1,K=!1,Ee=typeof queueMicrotask=="function"?function(e){queueMicrotask(function(){return queueMicrotask(e)})}:P;m=Object.freeze({__proto__:null,c:function(e){return h().useMemoCache(e)}});var N={map:L,forEach:function(e,t,n){L(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return L(e,function(){t++}),t},toArray:function(e){return L(e,function(t){return t})||[]},only:function(e){if(!b(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};o.Activity=le,o.Children=N,o.Component=y,o.Fragment=B,o.Profiler=se,o.PureComponent=w,o.StrictMode=ae,o.Suspense=ie,o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=u,o.__COMPILER_RUNTIME=m,o.act=function(e){var t=u.actQueue,n=D;D++;var r=u.actQueue=t!==null?t:[],s=!1;try{var i=e()}catch(l){u.thrownErrors.push(l)}if(0<u.thrownErrors.length)throw x(t,n),e=R(u.thrownErrors),u.thrownErrors.length=0,e;if(i!==null&&typeof i=="object"&&typeof i.then=="function"){var c=i;return Ee(function(){s||H||(H=!0,console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),{then:function(l,v){s=!0,c.then(function(C){if(x(t,n),n===0){try{V(r),P(function(){return Y(C,l,v)})}catch(He){u.thrownErrors.push(He)}if(0<u.thrownErrors.length){var De=R(u.thrownErrors);u.thrownErrors.length=0,v(De)}}else l(C)},function(C){x(t,n),0<u.thrownErrors.length&&(C=R(u.thrownErrors),u.thrownErrors.length=0),v(C)})}}}var f=i;if(x(t,n),n===0&&(V(r),r.length!==0&&Ee(function(){s||H||(H=!0,console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"))}),u.actQueue=null),0<u.thrownErrors.length)throw e=R(u.thrownErrors),u.thrownErrors.length=0,e;return{then:function(l,v){s=!0,n===0?(u.actQueue=r,P(function(){return Y(f,l,v)})):l(f)}}},o.cache=function(e){return function(){return e.apply(null,arguments)}},o.cacheSignal=function(){return null},o.captureOwnerStack=function(){var e=u.getCurrentStack;return e===null?null:e()},o.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var r=ye({},e.props),s=e.key,i=e._owner;if(t!=null){var c;e:{if(z.call(t,"ref")&&(c=Object.getOwnPropertyDescriptor(t,"ref").get)&&c.isReactWarning){c=!1;break e}c=t.ref!==void 0}c&&(i=J()),te(t)&&(M(t.key),s=""+t.key);for(f in t)!z.call(t,f)||f==="key"||f==="__self"||f==="__source"||f==="ref"&&t.ref===void 0||(r[f]=t[f])}var f=arguments.length-2;if(f===1)r.children=n;else if(1<f){c=Array(f);for(var l=0;l<f;l++)c[l]=arguments[l+2];r.children=c}for(r=U(e.type,s,r,i,e._debugStack,e._debugTask),s=2;s<arguments.length;s++)ne(arguments[s]);return r},o.createContext=function(e){return e={$$typeof:ce,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:G,_context:e},e._currentRenderer=null,e._currentRenderer2=null,e},o.createElement=function(e,t,n){for(var r=2;r<arguments.length;r++)ne(arguments[r]);r={};var s=null;if(t!=null)for(l in me||!("__self"in t)||"key"in t||(me=!0,console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")),te(t)&&(M(t.key),s=""+t.key),t)z.call(t,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(r[l]=t[l]);var i=arguments.length-2;if(i===1)r.children=n;else if(1<i){for(var c=Array(i),f=0;f<i;f++)c[f]=arguments[f+2];Object.freeze&&Object.freeze(c),r.children=c}if(e&&e.defaultProps)for(l in i=e.defaultProps,i)r[l]===void 0&&(r[l]=i[l]);s&&Ne(r,typeof e=="function"?e.displayName||e.name||"Unknown":e);var l=1e4>u.recentlyCreatedOwnerStacks++;return U(e,s,r,J(),l?Error("react-stack-top-frame"):ze,l?ke(X(e)):qe)},o.createRef=function(){var e={current:null};return Object.seal(e),e},o.forwardRef=function(e){e!=null&&e.$$typeof===Q?console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof e!="function"?console.error("forwardRef requires a render function but was given %s.",e===null?"null":typeof e):e.length!==0&&e.length!==2&&console.error("forwardRef render functions accept exactly two parameters: props and ref. %s",e.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),e!=null&&e.defaultProps!=null&&console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");var t={$$typeof:ue,render:e},n;return Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return n},set:function(r){n=r,e.name||e.displayName||(Object.defineProperty(e,"name",{value:r}),e.displayName=r)}}),t},o.isValidElement=b,o.lazy=function(e){e={_status:-1,_result:e};var t={$$typeof:A,_payload:e,_init:Le},n={name:"lazy",start:-1,end:-1,value:null,owner:null,debugStack:Error("react-stack-top-frame"),debugTask:console.createTask?console.createTask("lazy()"):null};return e._ioInfo=n,t._debugInfo=[{awaited:n}],t},o.memo=function(e,t){e==null&&console.error("memo: The first argument must be a component. Instead received: %s",e===null?"null":typeof e),t={$$typeof:Q,type:e,compare:t===void 0?null:t};var n;return Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return n},set:function(r){n=r,e.name||e.displayName||(Object.defineProperty(e,"name",{value:r}),e.displayName=r)}}),t},o.startTransition=function(e){var t=u.T,n={};n._updatedFibers=new Set,u.T=n;try{var r=e(),s=u.S;s!==null&&s(n,r),typeof r=="object"&&r!==null&&typeof r.then=="function"&&(u.asyncTransitions++,r.then(re,re),r.then(T,Me))}catch(i){Me(i)}finally{t===null&&n._updatedFibers&&(e=n._updatedFibers.size,n._updatedFibers.clear(),10<e&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")),t!==null&&n.types!==null&&(t.types!==null&&t.types!==n.types&&console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."),t.types=n.types),u.T=t}},o.unstable_useCacheRefresh=function(){return h().useCacheRefresh()},o.use=function(e){return h().use(e)},o.useActionState=function(e,t,n){return h().useActionState(e,t,n)},o.useCallback=function(e,t){return h().useCallback(e,t)},o.useContext=function(e){var t=h();return e.$$typeof===G&&console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"),t.useContext(e)},o.useDebugValue=function(e,t){return h().useDebugValue(e,t)},o.useDeferredValue=function(e,t){return h().useDeferredValue(e,t)},o.useEffect=function(e,t){return e==null&&console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"),h().useEffect(e,t)},o.useEffectEvent=function(e){return h().useEffectEvent(e)},o.useId=function(){return h().useId()},o.useImperativeHandle=function(e,t,n){return h().useImperativeHandle(e,t,n)},o.useInsertionEffect=function(e,t){return e==null&&console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"),h().useInsertionEffect(e,t)},o.useLayoutEffect=function(e,t){return e==null&&console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"),h().useLayoutEffect(e,t)},o.useMemo=function(e,t){return h().useMemo(e,t)},o.useOptimistic=function(e,t){return h().useOptimistic(e,t)},o.useReducer=function(e,t,n){return h().useReducer(e,t,n)},o.useRef=function(e){return h().useRef(e)},o.useState=function(e){return h().useState(e)},o.useSyncExternalStore=function(e,t,n){return h().useSyncExternalStore(e,t,n)},o.useTransition=function(){return h().useTransition()},o.version="19.2.8",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})()})(O,O.exports)),O.exports}var Te;function Ve(){return Te||(Te=1,Z.exports=Ye()),Z.exports}var g=Ve();const We=Ie(g),tn=Ue({__proto__:null,default:We},[g]);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=d=>d.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ge=d=>d.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,k,p)=>p?p.toUpperCase():k.toLowerCase()),Re=d=>{const o=Ge(d);return o.charAt(0).toUpperCase()+o.slice(1)},Ae=(...d)=>d.filter((o,k,p)=>!!o&&o.trim()!==""&&p.indexOf(o)===k).join(" ").trim(),Qe=d=>{for(const o in d)if(o.startsWith("aria-")||o==="role"||o==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Fe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=g.forwardRef(({color:d="currentColor",size:o=24,strokeWidth:k=2,absoluteStrokeWidth:p,className:_="",children:y,iconNode:$,...w},T)=>g.createElement("svg",{ref:T,...Fe,width:o,height:o,stroke:d,strokeWidth:p?Number(k)*24/Number(o):k,className:Ae("lucide",_),...!y&&!Qe(w)&&{"aria-hidden":"true"},...w},[...$.map(([S,M])=>g.createElement(S,M)),...Array.isArray(y)?y:[y]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a=(d,o)=>{const k=g.forwardRef(({className:p,..._},y)=>g.createElement(Ke,{ref:y,iconNode:o,className:Ae(`lucide-${Be(Re(d))}`,`lucide-${d}`,p),..._}));return k.displayName=Re(d),k};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],nn=a("arrow-left",Ze);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],rn=a("award",Xe);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],on=a("badge-check",Je);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],an=a("book-open",et);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]],sn=a("calendar-days",tt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],cn=a("calendar",nt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],un=a("chart-column",rt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],ln=a("chevron-left",ot);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],dn=a("chevron-right",at);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],fn=a("circle-alert",st);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],hn=a("circle-check-big",ct);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],yn=a("circle-check",ut);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],pn=a("clock",it);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],kn=a("database",lt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],_n=a("download",dt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],mn=a("external-link",ft);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],vn=a("eye-off",ht);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],gn=a("eye",yt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]],wn=a("file-spreadsheet",pt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Mn=a("file-text",kt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],bn=a("funnel",_t);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],En=a("graduation-cap",mt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Cn=a("globe",vt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],Tn=a("image",gt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],Rn=a("info",wt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],An=a("key",Mt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Nn=a("layout-dashboard",bt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],On=a("link",Et);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],$n=a("lock",Ct);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]],Sn=a("log-in",Tt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],jn=a("mail",Rt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],Ln=a("map-pin",At);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=[["path",{d:"M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",key:"q8bfy3"}],["path",{d:"M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14",key:"1853fq"}],["path",{d:"M8 6v8",key:"15ugcq"}]],Pn=a("megaphone",Nt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],xn=a("message-circle",Ot);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],zn=a("message-square",$t);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=[["path",{d:"M5 12h14",key:"1ays0h"}]],qn=a("minus",St);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jt=[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],Dn=a("pen-line",jt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],Hn=a("pen",Lt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],Un=a("phone",Pt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xt=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],In=a("pin",xt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Yn=a("plus",zt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=[["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M18 5v16",key:"1ethyx"}],["path",{d:"m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6",key:"zywc2d"}],["path",{d:"m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11",key:"1d4ql0"}],["path",{d:"M6 5v16",key:"1sn0nx"}],["circle",{cx:"12",cy:"9",r:"2",key:"1092wv"}]],Vn=a("school",qt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Wn=a("search",Dt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],Bn=a("send",Ht);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]],Gn=a("server",Ut);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Qn=a("shield-check",It);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],Fn=a("sparkles",Yt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=[["path",{d:"M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",key:"2acyp4"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Kn=a("square-check-big",Vt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Zn=a("trash-2",Wt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]],Xn=a("trending-down",Bt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],Jn=a("trending-up",Gt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],er=a("triangle-alert",Qt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],tr=a("trophy",Ft);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],nr=a("upload",Kt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],rr=a("user-check",Zt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],or=a("user",Xt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],ar=a("users",Jt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const en=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],sr=a("x",en);export{er as $,nn as A,an as B,fn as C,_n as D,mn as E,bn as F,Cn as G,dn as H,Tn as I,Hn as J,An as K,Sn as L,Ln as M,Qn as N,on as O,Yn as P,$n as Q,tn as R,Vn as S,tr as T,or as U,vn as V,gn as W,sr as X,wn as Y,Mn as Z,nr as _,g as a,kn as a0,Gn as a1,Nn as a2,Jn as a3,un as a4,qn as a5,Xn as a6,Rn as a7,hn as b,Kn as c,rn as d,Un as e,Zn as f,Ie as g,rr as h,ar as i,jn as j,cn as k,Dn as l,zn as m,Bn as n,Wn as o,yn as p,Pn as q,Ve as r,On as s,In as t,xn as u,sn as v,En as w,pn as x,Fn as y,ln as z};

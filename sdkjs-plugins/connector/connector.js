/**
 *
 * (c) Copyright Ascensio System SIA 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function(e){function f(){if(window.crypto&&window.crypto.getRandomValues){var a=function(){return(65536+b[c++]).toString(16).substring(1)},b=new Uint16Array(8);window.crypto.getRandomValues(b);var c=0;return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}a=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)};return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}function d(a){this.frame=a.frame;this.guid="asc.{"+f()+"}";this.isConnected=!1;a.autoconnect&&this.connect();
this.callbacks=[];this.events={};this.tasks=[];this.onMessageBound=this.onMessage.bind(this)}d.prototype.onMessage=function(a){if("string"==typeof a.data){var b={};try{b=JSON.parse(a.data)}catch(c){b={}}if("onExternalPluginMessageCallback"===b.type&&(b=b.data,this.guid===b.guid))switch(b.type){case "onMethodReturn":0<this.callbacks.length&&(a=this.callbacks.shift())&&a(b.methodReturnData);0<this.tasks.length&&this.sendMessage(this.tasks.shift());break;case "onCommandCallback":0<this.callbacks.length&&
(a=this.callbacks.shift())&&a();0<this.tasks.length&&this.sendMessage(this.tasks.shift());break;case "onEvent":if(b.eventName&&this.events[b.eventName])this.events[b.eventName](b.eventData)}}};d.prototype.sendMessage=function(a){var b={frameEditorId:"iframeEditor",type:"onExternalPluginMessage",subType:"connector"};b.data=a;b.data.guid=this.guid;a=this.frame;"string"===typeof a&&(a=document.getElementById(this.frame));a&&a.contentWindow.postMessage(JSON.stringify(b),"*")};d.prototype.connect=function(){window.addEventListener?
window.addEventListener("message",this.onMessageBound,!1):window.attachEvent&&window.attachEvent("onmessage",this.onMessageBound);this.isConnected=!0;this.sendMessage({type:"register"})};d.prototype.disconnect=function(){window.removeEventListener?window.removeEventListener("message",this.onMessageBound,!1):window.detachEvent&&window.detachEvent("onmessage",this.onMessageBound);this.isConnected=!1;this.sendMessage({type:"unregister"})};d.prototype.callCommand=function(a,b,c){this.isConnected?(this.callbacks.push(b),
a="var Asc = {}; Asc.scope = "+JSON.stringify(window.Asc.scope||{})+"; var scope = Asc.scope; ("+a.toString()+")();",c={type:"command",recalculate:!0===c?!1:!0,data:a},1!==this.callbacks.length?this.tasks.push(c):this.sendMessage(c)):console.log("Connector is not connected with editor")};d.prototype.callMethod=function(a,b,c){this.isConnected?(this.callbacks.push(c),a={type:"method",methodName:a,data:b},1!==this.callbacks.length?this.tasks.push(a):this.sendMessage(a)):console.log("Connector is not connected with editor")};
d.prototype.attachEvent=function(a,b){this.isConnected?(this.events[a]=b,this.sendMessage({type:"attachEvent",name:a})):console.log("Connector is not connected with editor")};d.prototype.detachEvent=function(a){this.events[a]&&(delete this.events[a],this.isConnected?this.sendMessage({type:"detachEvent",name:a}):console.log("Connector is not connected with editor"))};e.Asc=e.Asc?e.Asc:{};e.Asc.EditorConnector=d})(window);

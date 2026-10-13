import {TABLE_FORMATS} from './progression.mjs';
/** Short expeditions, portable challenge links and a collection backed by real recall. */
export const TOUR_MODES=['pair','complete','write'];
export const TOUR_FORMATS=['classic','grand','marathon'];
export function sanitizeTours(tours){const out={};for(const [route,tour]of Object.entries(tours||{}).slice(0,16)){
 if(!/^(it|en|ar|ru)>(it|en|ar|ru)$/.test(route)||!tour||typeof tour.id!=='string'||!/^[a-z0-9_]{1,80}$/.test(tour.id)||!Array.isArray(tour.units)||tour.units.length!==3||tour.units.some(id=>typeof id!=='string'||!/^[a-z_0-9]{1,80}$/.test(id))||!Number.isInteger(tour.stage)||tour.stage<0||tour.stage>3)continue;
 out[route]={id:tour.id,units:[...tour.units],stage:tour.stage,score:Math.min(30000,Math.max(0,Number.isFinite(tour.score)?tour.score:0))};
 }return out;}
export function mergeTours(a,b){const out=sanitizeTours(a);for(const [route,tour]of Object.entries(sanitizeTours(b))){const old=out[route];if(!old||tour.id===old.id&&tour.stage>old.stage||tour.id!==old.id&&tour.id>old.id)out[route]=tour;}return out;}
export function advanceTour(tour,game){if(!tour||tour.id!==game.tourId||tour.stage!==game.tourStage)return tour;return {...tour,stage:Math.min(3,tour.stage+1),score:tour.score+game.score};}
export function collectionItems(memory,route,items){const found=new Set(Object.entries(memory).filter(([key,m])=>key.startsWith(route+'|')&&m.independent>0).map(([key])=>key.split('|')[2]));return items.filter(item=>found.has(item.id));}
export function challengeURL(base,challenge){const url=new URL(base);url.search='';url.hash='';for(const [key,value]of Object.entries({unit:challenge.unit,mode:challenge.mode,route:challenge.route,seed:challenge.seed,format:challenge.tableFormat||'classic',score:challenge.score||0}))url.searchParams.set(key,String(value));return url.href;}
export function parseChallenge(query,unitIds){const params=new URLSearchParams(query),unit=params.get('unit'),mode=params.get('mode'),route=params.get('route'),seed=Number(params.get('seed')),score=Number(params.get('score')||0),format=params.get('format');
 if(!unitIds.includes(unit)||!['pair','listen','complete','compose','write'].includes(mode)||!/^(it|en|ar|ru)>(it|en|ar|ru)$/.test(route)||!params.has('seed')||!Number.isInteger(seed)||seed<0||seed>4294967295||!Object.hasOwn(TABLE_FORMATS,format)||!Number.isFinite(score)||score<0||score>10000)return null;
 return {unit,mode,route,seed,score:Math.floor(score),tableFormat:format};
}

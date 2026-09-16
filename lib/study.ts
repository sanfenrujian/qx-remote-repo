export type Profile = {startDate:string; dailyMinutes:number};
export type Entry = {dayIndex:number; checks:boolean[]; minutes:number; note:string; completed:boolean; updatedAt:string; revision:number};
export const today = () => new Intl.DateTimeFormat("sv-SE", {timeZone:"Asia/Shanghai"}).format(new Date());
export const dateAt = (start:string, offset:number) => new Date(Date.parse(start+"T00:00:00Z")+offset*86400000).toISOString().slice(0,10);
export const dayOffset = (start:string, end:string) => Math.round((Date.parse(end+"T00:00:00Z")-Date.parse(start+"T00:00:00Z"))/86400000);
export const blankEntry = (dayIndex:number):Entry => ({dayIndex,checks:[false,false,false],minutes:0,note:"",completed:false,updatedAt:"",revision:0});
export function isDate(value:unknown):value is string {
  return typeof value==="string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value+"T00:00:00Z")) && new Date(value+"T00:00:00Z").toISOString().slice(0,10)===value;
}
export function validEntry(value:any) {
  return value && Number.isInteger(value.dayIndex) && value.dayIndex>=0 && value.dayIndex<168 && Array.isArray(value.checks) && value.checks.length===3 && value.checks.every((x:unknown)=>typeof x==="boolean") && Number.isInteger(value.minutes) && value.minutes>=0 && value.minutes<=1440 && typeof value.note==="string" && value.note.length<=5000 && Number.isInteger(value.revision) && value.revision>=0;
}


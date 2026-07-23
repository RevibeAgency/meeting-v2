import "./StatusTabs.css";

const tabs = [

"Calendar",

"All Tasks",

"Pending",

"To do",

"On progress",

"Done",

];

export default function StatusTabs(){

return(

<div className="status-tabs">

{tabs.map(tab=>(

<button
key={tab}
className="status-tab"
>

<div className="icon"></div>

<span>{tab}</span>

</button>

))}

</div>

);

}
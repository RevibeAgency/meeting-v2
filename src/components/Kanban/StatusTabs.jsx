import "./StatusTabs.css";

const tabs = [
  {
    id: "calendar",
    label: "Calendar",
    icon: (
      <svg
        width="49"
        height="49"
        viewBox="0 0 49 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0605 4.0127V12.0397"
          stroke="black"
          stroke-width="2.00674"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32.1113 4.0127V12.0397"
          stroke="black"
          stroke-width="2.00674"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M42.1467 34.1155V12.0413C42.1467 10.9769 41.7239 9.95603 40.9712 9.20335C40.2185 8.45068 39.1977 8.02783 38.1333 8.02783H10.0389C8.97443 8.02783 7.95359 8.45068 7.20091 9.20335C6.44824 9.95603 6.02539 10.9769 6.02539 12.0413V40.1357C6.02539 41.2001 6.44824 42.221 7.20091 42.9737C7.95359 43.7263 8.97443 44.1492 10.0389 44.1492H32.113L42.1467 34.1155Z"
          stroke="black"
          stroke-width="2.00674"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.02539 20.0679H42.1467"
          stroke="black"
          stroke-width="2.00674"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30.1055 44.1484V36.1214C30.1055 35.057 30.5283 34.0361 31.281 33.2834C32.0337 32.5308 33.0545 32.1079 34.119 32.1079H42.1459"
          stroke="black"
          stroke-width="2.00674"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },

  {
    id: "all",
    label: "All Tasks",
    icon: (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50.9448 27.7875C50.9448 30.8583 49.725 33.8033 47.5536 35.9747C45.3822 38.1461 42.4371 39.366 39.3663 39.366C36.2955 39.366 33.3505 38.1461 31.1791 35.9747C29.0077 33.8033 27.7878 30.8583 27.7878 27.7875C27.7878 24.7167 26.568 21.7716 24.3966 19.6002C22.2252 17.4289 19.2802 16.209 16.2094 16.209C13.1385 16.209 10.1935 17.4289 8.02212 19.6002C5.85073 21.7716 4.63086 24.7167 4.63086 27.7875"
          stroke="black"
          stroke-width="1.30421"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.21 47.9351C13.5384 46.3997 11.5862 43.8659 10.7828 40.8911C9.97934 37.9163 10.3906 34.7442 11.926 32.0726C13.4614 29.401 15.9952 27.4487 18.97 26.6453C21.9448 25.8419 25.1169 26.2531 27.7885 27.7885C29.0961 28.5488 30.5407 29.044 32.0398 29.246C33.5388 29.448 35.0629 29.3527 36.5251 28.9657C37.9874 28.5786 39.359 27.9073 40.5618 26.9902C41.7646 26.073 42.775 24.9279 43.5352 23.6203C44.2955 22.3126 44.7908 20.8681 44.9927 19.369C45.1947 17.87 45.0994 16.3459 44.7124 14.8836C44.3253 13.4214 43.654 12.0497 42.7369 10.847C41.8197 9.64416 40.6746 8.63379 39.367 7.87354"
          stroke="black"
          stroke-width="1.30421"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.209 7.64171C18.8499 6.1063 21.9925 5.68288 24.9456 6.46458C27.8987 7.24628 30.4203 9.16907 31.9557 11.81C33.4911 14.4509 33.9146 17.5935 33.1329 20.5466C32.3512 23.4997 30.4284 26.0213 27.7875 27.5567C25.1466 29.0921 23.2238 31.6137 22.4421 34.5668C21.6604 37.5199 22.0838 40.6626 23.6192 43.3035C25.1546 45.9444 27.6762 47.8671 30.6293 48.6488C33.5824 49.4305 36.7251 49.0071 39.366 47.4717"
          stroke="black"
          stroke-width="1.30421"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M27.7878 50.9458C40.5771 50.9458 50.9448 40.5781 50.9448 27.7888C50.9448 14.9996 40.5771 4.63184 27.7878 4.63184C14.9986 4.63184 4.63086 14.9996 4.63086 27.7888C4.63086 40.5781 14.9986 50.9458 27.7878 50.9458Z"
          stroke="black"
          stroke-width="1.30421"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },

  {
    id: "pending",
    label: "Pending",
    icon: (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.4258 4.63184V13.8946C32.4258 15.123 32.9137 16.301 33.7823 17.1695C34.6508 18.0381 35.8289 18.526 37.0572 18.526H46.32"
          stroke="black"
          stroke-width="1.88386"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M37.056 50.9458H41.6874C42.9157 50.9458 44.0937 50.4578 44.9622 49.5893C45.8308 48.7207 46.3188 47.5427 46.3188 46.3144V16.2103L34.7403 4.63184H13.899C12.6707 4.63184 11.4926 5.11979 10.6241 5.98834C9.75553 6.8569 9.26758 8.03491 9.26758 9.26323V16.2103"
          stroke="black"
          stroke-width="1.88386"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.5273 32.4204V37.5149L22.2325 39.8306"
          stroke="black"
          stroke-width="1.88386"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.529 50.9451C26.2025 50.9451 32.4231 44.7245 32.4231 37.0509C32.4231 29.3774 26.2025 23.1567 18.529 23.1567C10.8554 23.1567 4.63477 29.3774 4.63477 37.0509C4.63477 44.7245 10.8554 50.9451 18.529 50.9451Z"
          stroke="black"
          stroke-width="1.88386"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },

  {
    id: "todo",
    label: "To do",
    icon: (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.1591 6.94727H9.26492C7.98599 6.94727 6.94922 7.98404 6.94922 9.26296V46.3141C6.94922 47.5931 7.98599 48.6298 9.26492 48.6298H23.1591C24.438 48.6298 25.4748 47.5931 25.4748 46.3141V9.26296C25.4748 7.98404 24.438 6.94727 23.1591 6.94727Z"
          stroke="black"
          stroke-width="2.17368"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.2051 6.94727V48.6298"
          stroke="black"
          stroke-width="2.17368"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M47.2436 43.7673C47.7067 44.9251 47.012 46.3146 45.8541 46.7777L41.4543 48.3987C40.2965 48.8618 38.907 48.1671 38.4439 47.0093L25.7076 11.8106C25.2444 10.6528 25.9391 9.26338 27.097 8.80024L31.4968 7.17925C32.6547 6.71611 34.0441 7.41082 34.5072 8.56867L47.2436 43.7673Z"
          stroke="black"
          stroke-width="2.17368"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },

  {
    id: "progress",
    label: "On progress",
    icon: (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.7871 4.63184V13.8946"
          stroke="black"
          strokeWidth="2.02877"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M37.5078 18.0632L44.2233 11.3477"
          stroke="black"
          strokeWidth="2.02877"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M41.6797 27.7896H50.9425"
          stroke="black"
          strokeWidth="2.02877"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M37.5078 37.5146L44.2233 44.2302"
          stroke="black"
          stroke-width="2.02877"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M27.7871 41.6821V50.9449"
          stroke="black"
          stroke-width="2.02877"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.3477 44.2302L18.0632 37.5146"
          stroke="black"
          stroke-width="2.02877"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.62891 27.7896H13.8917"
          stroke="black"
          stroke-width="2.02877"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.3477 11.3477L18.0632 18.0632"
          stroke="black"
          stroke-width="2.02877"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },

  {
    id: "done",
    label: "Done",
    icon: (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44.0004 6.94727H11.5806C9.02277 6.94727 6.94922 9.02081 6.94922 11.5787V43.9984C6.94922 46.5563 9.02277 48.6298 11.5806 48.6298H44.0004C46.5582 48.6298 48.6318 46.5563 48.6318 43.9984V11.5787C48.6318 9.02081 46.5582 6.94727 44.0004 6.94727Z"
          stroke="black"
          stroke-width="2.19107"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.8398 27.7881L25.4712 32.4195L34.734 23.1567"
          stroke="black"
          stroke-width="2.19107"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
];

export default function StatusTabs() {
  return (
    <div className="status-tabs">
      {tabs.map((tab) => (
        <button key={tab.id} className="status-tab">
          <div className="icon">{tab.icon}</div>

          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

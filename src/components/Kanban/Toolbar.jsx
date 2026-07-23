import "./Toolbar.css";

export default function Toolbar() {
  return (
    <div className="toolbar">
      <div className="toolbar-search">
        <div className="icon">
          <svg
            width="84"
            height="84"
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M73.0355 73.0364L57.9414 57.9424"
              stroke="#BDBDBD"
              stroke-width="3.47789"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M38.2548 66.0799C53.6211 66.0799 66.078 53.6231 66.078 38.2568C66.078 22.8904 53.6211 10.4336 38.2548 10.4336C22.8885 10.4336 10.4316 22.8904 10.4316 38.2568C10.4316 53.6231 22.8885 66.0799 38.2548 66.0799Z"
              stroke="#BDBDBD"
              stroke-width="3.47789"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <input placeholder="Search all tasks..." />
      </div>

      <button className="add-task-btn">
        <div className="icon">
          <svg
            width="84"
            height="84"
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.7324 6.95557C48.48 6.95434 55.0823 8.91599 60.7345 12.6014C66.3867 16.2869 70.8448 21.5369 73.5654 27.7118C76.2861 33.8866 77.1517 40.7195 76.0568 47.3777C74.962 54.0359 71.9539 60.2318 67.3993 65.2103"
              stroke="white"
              stroke-width="3.47789"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M41.7324 27.8228V55.6459"
              stroke="white"
              stroke-width="3.47789"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M55.6435 41.7349H27.8203"
              stroke="white"
              stroke-width="3.47789"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.69207 30.8667C7.58384 34.2356 6.99741 37.7542 6.95312 41.3004"
              stroke="white"
              stroke-width="3.47789"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.8418 55.646C11.7946 60.1388 14.6746 64.1684 18.2931 67.4708"
              stroke="white"
              stroke-width="3.47789"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.123 18.2049C17.0931 17.1489 18.1276 16.1539 19.2206 15.2256"
              stroke="white"
              stroke-width="3.47789"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M30.0645 74.4964C38.7373 77.5861 48.2813 77.1108 56.6043 73.1748"
              stroke="white"
              stroke-width="3.47789"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <span>Add task</span>
      </button>
    </div>
  );
}

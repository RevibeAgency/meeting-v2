import "./taskcard.css";
import { supabase } from "../../lib/supabase";

export default function TaskCard({
  id,
  taskNumber,
  assignee,
  topic,
  tag,
  createdDate,
  dueDate,
  description,
  status,
  onStatusChange,
}) {
  const handleTaskComplete = async (e) => {
    const isCompleted = e.target.checked;

    const newStatus = isCompleted ? "completed" : "pending";

    const { error } = await supabase
      .from("tasks")
      .update({
        status: newStatus,
      })
      .eq("id", id);

      if (onStatusChange) {
        onStatusChange();
      }

    if (error) {
      console.error("Task update failed", error);

      return;
    }

    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };
  return (
    <div className={`task-card ${status === "completed" ? "completed" : ""}`}>
      <div className="task-header">
        <div className="checkbox">
          <input
            type="checkbox"
            id={`task-${id}`}
            className="pointer task-checkbox"
            checked={status === "completed"}
            onChange={handleTaskComplete}
          />

          <span className="text-small">{taskNumber}</span>
        </div>

        <div className="button-set">
          <button className="save-btn pointer">
            <span className="text-small">Save</span>
          </button>

          <div className="edit-btn pointer">
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.66675 14H14.0001"
                  stroke="#1B1B1B"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M14.1159 4.54224C14.4683 4.18985 14.6664 3.71188 14.6665 3.21347C14.6665 2.71507 14.4686 2.23704 14.1162 1.88457C13.7638 1.5321 13.2859 1.33405 12.7874 1.33398C12.289 1.33392 11.811 1.53185 11.4585 1.88424L2.56121 10.7836C2.40642 10.9379 2.29195 11.1279 2.22787 11.3369L1.34721 14.2382C1.32998 14.2959 1.32868 14.3571 1.34344 14.4155C1.35821 14.4738 1.38849 14.5271 1.43107 14.5696C1.47366 14.6121 1.52696 14.6423 1.58531 14.657C1.64367 14.6716 1.70491 14.6702 1.76254 14.6529L4.66454 13.7729C4.87332 13.7094 5.06332 13.5956 5.21788 13.4416L14.1159 4.54224Z"
                  fill="#0E0E0E"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="task-details">
        <div className="task-info">
          <div className="tag">
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2738 7.87817L13.4266 5.6615C13.1474 5.32644 13.0071 5.15881 12.8359 5.03837C12.6843 4.93166 12.5149 4.85254 12.3359 4.80437C12.1338 4.75 11.9164 4.75 11.4802 4.75H5.70011C4.81336 4.75 4.36966 4.75 4.03097 4.92257C3.73304 5.07437 3.491 5.31642 3.3392 5.61434C3.16663 5.95303 3.16663 6.39674 3.16663 7.28349V11.7168C3.16663 12.6036 3.16663 13.0467 3.3392 13.3854C3.491 13.6833 3.73304 13.9258 4.03097 14.0776C4.36933 14.25 4.8125 14.25 5.69751 14.25H11.4802C11.9164 14.25 12.1338 14.2499 12.3359 14.1955C12.5149 14.1473 12.6843 14.0681 12.8359 13.9614C13.0071 13.8409 13.1474 13.6737 13.4266 13.3387L15.2738 11.122C15.7546 10.545 15.9945 10.2565 16.0864 9.93449C16.1673 9.65058 16.1673 9.3492 16.0864 9.06529C15.9945 8.74328 15.7546 8.45512 15.2738 7.87817Z"
                  stroke="#5B5B5B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-small">Assignee</span>
          </div>

          <span className="text-small white">{assignee}</span>
        </div>
        {/* TOPIC */}

        <div className="task-info">
          <div className="tag">
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6749 8.96524L15.1405 14.0715H4.2749L3.68115 8.96524H4.57178L4.39366 5.52148H14.8436L14.6655 8.96524H15.6749Z"
                  stroke="#5B5B5B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.4281 14.0723L14.2499 17.5754H4.98746L4.80933 14.0723H14.4281Z"
                  stroke="#5B5B5B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.8625 3.0875V5.52187H2.375V3.0875H5.58126L6.11564 1.78125H13.1813L13.7156 3.0875H16.8625Z"
                  stroke="#5B5B5B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.57178 8.96484H14.6655"
                  stroke="#5B5B5B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span className="text-small">Topic</span>
          </div>

          <span className="text-small white">{topic}</span>
        </div>

        {/* TAG */}

        <div className="task-info">
          <div className="tag">
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2738 7.87817L13.4266 5.6615C13.1474 5.32644 13.0071 5.15881 12.8359 5.03837C12.6843 4.93166 12.5149 4.85254 12.3359 4.80437C12.1338 4.75 11.9164 4.75 11.4802 4.75H5.70011C4.81336 4.75 4.36966 4.75 4.03097 4.92257C3.73304 5.07437 3.491 5.31642 3.3392 5.61434C3.16663 5.95303 3.16663 6.39674 3.16663 7.28349V11.7168C3.16663 12.6036 3.16663 13.0467 3.3392 13.3854C3.491 13.6833 3.73304 13.9258 4.03097 14.0776C4.36933 14.25 4.8125 14.25 5.69751 14.25H11.4802C11.9164 14.25 12.1338 14.2499 12.3359 14.1955C12.5149 14.1473 12.6843 14.0681 12.8359 13.9614C13.0071 13.8409 13.1474 13.6737 13.4266 13.3387L15.2738 11.122C15.7546 10.545 15.9945 10.2565 16.0864 9.93449C16.1673 9.65058 16.1673 9.3492 16.0864 9.06529C15.9945 8.74328 15.7546 8.45512 15.2738 7.87817Z"
                  stroke="#5B5B5B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span className="text-small">Tags</span>
          </div>

          <span className="text-small purple-500">{tag}</span>
        </div>

        {/* CREATED DATE */}

        <div className="task-info">
          <div className="tag">
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.16663 6.33398H15.8333M3.16663 6.33398V13.3008C3.16663 14.1876 3.16663 14.6307 3.3392 14.9694C3.491 15.2673 3.73304 15.5098 4.03097 15.6616C4.36933 15.834 4.8125 15.834 5.69751 15.834H13.3024C14.1874 15.834 14.63 15.834 14.9683 15.6616C15.2662 15.5098 15.5091 15.2673 15.6609 14.9694C15.8333 14.631 15.8333 14.1885 15.8333 13.3035V6.33398M3.16663 6.33398V5.70081C3.16663 4.81406 3.16663 4.37035 3.3392 4.03166C3.491 3.73373 3.73304 3.49169 4.03097 3.33989C4.36966 3.16732 4.81336 3.16732 5.70011 3.16732H6.33329M15.8333 6.33398V5.6982C15.8333 4.81319 15.8333 4.37002 15.6609 4.03166C15.5091 3.73373 15.2662 3.49169 14.9683 3.33989C14.6296 3.16732 14.1869 3.16732 13.3001 3.16732H12.6666M12.6666 1.58398V3.16732M12.6666 3.16732H6.33329M6.33329 1.58398V3.16732"
                  stroke="#5B5B5B"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span className="text-small">Created date</span>
          </div>

          <span className="text-small white">{createdDate}</span>
        </div>

        {/* DUE DATE */}

        <div className="task-info">
          <div className="tag">
            <div className="icon">
              <svg
                width="100%"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.16663 6.33398H15.8333M3.16663 6.33398V13.3008C3.16663 14.1876 3.16663 14.6307 3.3392 14.9694C3.491 15.2673 3.73304 15.5098 4.03097 15.6616C4.36933 15.834 4.8125 15.834 5.69751 15.834H13.3024C14.1874 15.834 14.63 15.834 14.9683 15.6616C15.2662 15.5098 15.5091 15.2673 15.6609 14.9694C15.8333 14.631 15.8333 14.1885 15.8333 13.3035V6.33398M3.16663 6.33398V5.70081C3.16663 4.81406 3.16663 4.37035 3.3392 4.03166C3.491 3.73373 3.73304 3.49169 4.03097 3.33989C4.36966 3.16732 4.81336 3.16732 5.70011 3.16732H6.33329M15.8333 6.33398V5.6982C15.8333 4.81319 15.8333 4.37002 15.6609 4.03166C15.5091 3.73373 15.2662 3.49169 14.9683 3.33989C14.6296 3.16732 14.1869 3.16732 13.3001 3.16732H12.6666M6.33329 3.16732H12.6666M6.33329 3.16732V1.58398M12.6666 3.16732V1.58398M11.875 9.50065L8.70829 12.6673L7.12496 11.084"
                  stroke="#5B5B5B"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span className="text-small">Due date</span>
          </div>

          <span className="text-small white">{dueDate}</span>
        </div>
      </div>

      <textarea className="task-desc" defaultValue={description} />
    </div>
  );
}

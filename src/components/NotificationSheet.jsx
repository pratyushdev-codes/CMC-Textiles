import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { Sheet, Icon, EmptyState } from "@/components/ui";
import { relativeTime } from "@/lib/format";

export default function NotificationSheet({ open, onClose }) {
  const { notifications, markAllRead, unreadCount } = useStore();
  const navigate = useNavigate();

  const go = (n) => {
    onClose();
    if (n.orderId) navigate(`/order/${n.orderId}`);
  };

  return (
    <Sheet open={open} onClose={onClose} title="Notifications">
      {unreadCount > 0 && (
        <button
          onClick={markAllRead}
          className="mb-3 text-[13px] font-semibold text-brand-600 hover:text-brand-700"
        >
          Mark all as read
        </button>
      )}

      {notifications.length === 0 ? (
        <EmptyState
          icon="BellOff"
          title="You're all caught up"
          body="Order updates and replies to your enquiries will appear here."
        />
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n)}
              className={`flex w-full gap-3 rounded-2xl border p-3 text-left transition active:scale-[0.99] ${
                n.read ? "border-line bg-white" : "border-brand-100 bg-brand-50/60"
              }`}
            >
              <div
                className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                  n.read ? "bg-canvas text-ink/40" : "bg-brand-100 text-brand-600"
                }`}
              >
                <Icon name={n.orderId ? "Truck" : "MessageSquare"} size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13.5px] font-700 text-ink">
                    {n.title}
                  </span>
                  {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                </div>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink/60">{n.body}</p>
                <span className="mt-1 block text-[11px] font-medium text-ink/35">
                  {relativeTime(n.time)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </Sheet>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Support.module.css";
import {
  FiSend,
  FiPlusCircle,
  FiRefreshCw,
  FiPaperclip,
  FiMessageSquare,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiUser,
  FiShield,
} from "react-icons/fi";

const API_BASE = "http://localhost:5000/api/support";

function Badge({ status }) {
  const map = {
    Open: "badge text-bg-warning",
    "In Progress": "badge text-bg-info",
    Resolved: "badge text-bg-success",
  };
  return <span className={map[status] || "badge text-bg-secondary"}>{status || "Unknown"}</span>;
}

export default function Support() {
  const [userId, setUserId] = useState("");
  const [activeTab, setActiveTab] = useState("tickets");

  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [loadingTicket, setLoadingTicket] = useState(false);

  const [replyMsg, setReplyMsg] = useState("");
  const [replying, setReplying] = useState(false);

  const [form, setForm] = useState({
    userType: "USER",
    category: "Technical",
    priority: "High",
    subject: "",
    description: "",
    screenshots: [],
  });
  const [creating, setCreating] = useState(false);

  const chatEndRef = useRef(null);

  // ✅ safely read localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const u = JSON.parse(raw);
      // adjust key if your user object uses _id
      setUserId(u?._id || u?.id || "");
    } catch (e) {
      console.error("Invalid user in localStorage", e);
    }
  }, []);

  const canFetch = useMemo(() => userId?.trim()?.length > 5, [userId]);

  async function fetchTickets() {
    if (!canFetch) return;
    setLoadingTickets(true);
    try {
      const res = await fetch(`${API_BASE}/user/${userId}`);
      const data = await res.json();
      const list = data?.tickets || [];
      setTickets(list);

      if (!selectedId && list.length) setSelectedId(list[0]._id);
      if (selectedId && !list.find((x) => x._id === selectedId) && list.length) setSelectedId(list[0]._id);
    } catch (e) {
      console.error(e);
      alert("Tickets fetch failed");
    } finally {
      setLoadingTickets(false);
    }
  }

  async function fetchTicketById(id) {
    if (!id) return;
    setLoadingTicket(true);
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      const data = await res.json();
      setTicket(data?.ticket || null);
    } catch (e) {
      console.error(e);
      alert("Ticket fetch failed");
    } finally {
      setLoadingTicket(false);
    }
  }

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (selectedId) fetchTicketById(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  // auto scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.replies?.length, selectedId]);

  async function sendReply() {
    if (!replyMsg.trim() || !selectedId) return;
    setReplying(true);
    try {
      const res = await fetch(`${API_BASE}/${selectedId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ by: "USER", message: replyMsg, status: "In Progress" }),
      });
      const data = await res.json();
      if (!data?.success) throw new Error("Reply failed");
      setTicket(data.ticket);
      setReplyMsg("");
      fetchTickets();
    } catch (e) {
      console.error(e);
      alert("Reply send failed");
    } finally {
      setReplying(false);
    }
  }

  async function createTicket(e) {
    e.preventDefault();
    if (!form.subject.trim() || !form.description.trim()) {
      alert("Subject & Description required");
      return;
    }
    if (!canFetch) {
      alert("UserId missing");
      return;
    }

    setCreating(true);
    try {
      const fd = new FormData();
      fd.append("userId", userId);
      fd.append("userType", form.userType);
      fd.append("category", form.category);
      fd.append("priority", form.priority);
      fd.append("subject", form.subject);
      fd.append("description", form.description);
      for (const file of form.screenshots) fd.append("screenshots", file);

      const res = await fetch(`${API_BASE}`, { method: "POST", body: fd });
      const data = await res.json();
      if (!data?.success) throw new Error(data?.message || "Create failed");

      setActiveTab("tickets");
      setForm((p) => ({ ...p, subject: "", description: "", screenshots: [] }));
      await fetchTickets();

      const createdId = data?.ticket?._id;
      if (createdId) setSelectedId(createdId);
    } catch (e2) {
      console.error(e2);
      alert("Ticket create failed");
    } finally {
      setCreating(false);
    }
  }

  const statusIcon = (status) => {
    if (status === "Resolved") return <FiCheckCircle className={styles.iconOk} />;
    if (status === "In Progress") return <FiMessageSquare className={styles.iconInfo} />;
    return <FiAlertTriangle className={styles.iconWarn} />;
  };

  const whoIcon = (by) => (by === "ADMIN" ? <FiShield /> : <FiUser />);

  return (
    <div className={`container py-4 ${styles.wrap}`}>
      <div className={styles.header}>
        <div>
          <h2 className={`mb-1 ${styles.title}`}>Support Center</h2>
          <div className={styles.subtitle}>Create tickets, track updates, and chat with support.</div>
        </div>

        <div className="d-flex gap-2 align-items-center flex-wrap">
          <div className={styles.userBox}>
            {/* <div className={styles.userLabel}>UserId</div>
            <input
              className={`form-control form-control-sm ${styles.userInput}`}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter userId"
            /> */}
          </div>

          <button
            className={`btn btn-sm ${styles.btnSoft}`}
            onClick={fetchTickets}
            disabled={loadingTickets || !canFetch}
            title="Refresh tickets"
          >
            <FiRefreshCw className="me-1" />
            Refresh
          </button>

          <button className={`btn btn-sm ${styles.btnGreen}`} onClick={() => setActiveTab("new")} title="New ticket">
            <FiPlusCircle className="me-1" />
            New Ticket
          </button>
        </div>
      </div>

      <div className={`mt-3 ${styles.tabs}`}>
        <button className={`${styles.tab} ${activeTab === "tickets" ? styles.tabActive : ""}`} onClick={() => setActiveTab("tickets")}>
          My Tickets
        </button>
        <button className={`${styles.tab} ${activeTab === "new" ? styles.tabActive : ""}`} onClick={() => setActiveTab("new")}>
          Create Ticket
        </button>
      </div>

      {activeTab === "tickets" ? (
        <div className="row g-3 mt-1">
          <div className="col-12 col-lg-5">
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardTitle}>Tickets</div>
                <div className={styles.cardMeta}>
                  {loadingTickets ? (
                    <span className={styles.pulse}>Loading…</span>
                  ) : (
                    <>
                      <FiClock className="me-1" />
                      {tickets.length} items
                    </>
                  )}
                </div>
              </div>

              <div className={styles.list}>
                {tickets.map((t) => (
                  <button
                    key={t._id}
                    className={`${styles.listItem} ${selectedId === t._id ? styles.listItemActive : ""}`}
                    onClick={() => setSelectedId(t._id)}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="me-2">
                        <div className={styles.itemSubject}>{t.subject}</div>
                        <div className={styles.itemSub}>
                          <span className={styles.muted}>Category:</span> {t.category} •{" "}
                          <span className={styles.muted}>Priority:</span> {t.priority}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          {statusIcon(t.status)}
                          <Badge status={t.status} />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {!loadingTickets && tickets.length === 0 && (
                  <div className={styles.empty}>
                    <div className={styles.emptyIcon}>
                      <FiMessageSquare />
                    </div>
                    <div>
                      No tickets yet. Click <b>New Ticket</b> to create one.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div>
                  <div className={styles.cardTitle}>Conversation</div>
                  <div className={styles.cardMeta}>
                    {loadingTicket ? "Loading ticket..." : ticket?._id ? `TicketId: ${ticket._id}` : "Select a ticket"}
                  </div>
                </div>

                {ticket?.status ? (
                  <div className="d-flex gap-2 align-items-center">
                    <span className={styles.muted}>Status:</span>
                    <Badge status={ticket.status} />
                  </div>
                ) : null}
              </div>

              {!ticket?._id ? (
                <div className={styles.empty}>
                  <div className={styles.emptyIcon}>
                    <FiAlertTriangle />
                  </div>
                  <div>Select a ticket from left to view chat.</div>
                </div>
              ) : (
                <>
                  <div className={styles.detailTop}>
                    <div className={styles.detailSubject}>{ticket.subject}</div>
                    <div className={styles.detailDesc}>{ticket.description}</div>

                    {Array.isArray(ticket.screenshots) && ticket.screenshots.length > 0 && (
                      <div className="mt-3">
                        <div className={styles.attachHead}>
                          <FiPaperclip className="me-1" /> Attachments
                        </div>
                        <div className={styles.attachGrid}>
                          {ticket.screenshots.map((s, idx) => {
                            const href = typeof s === "string" ? s : s?.url;
                            return (
                              <a key={idx} className={styles.attachItem} href={href} target="_blank" rel="noreferrer">
                                <FiPaperclip className="me-1" />
                                Screenshot {idx + 1}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.chatBox}>
                    <div className={`${styles.bubble} ${styles.bubbleSystem}`}>
                      <div className={styles.bubbleBy}>System</div>
                      <div className={styles.bubbleMsg}>We’ve received your request. Support will reply soon.</div>
                    </div>

                    {Array.isArray(ticket.replies) &&
                      ticket.replies.map((r, idx) => (
                        <div
                          key={idx}
                          className={`${styles.bubble} ${r.by === "ADMIN" ? styles.bubbleAdmin : styles.bubbleUser}`}
                        >
                          <div className={styles.bubbleBy}>
                            <span className={styles.byIcon}>{whoIcon(r.by)}</span>
                            {r.by}
                          </div>
                          <div className={styles.bubbleMsg}>{r.message}</div>
                        </div>
                      ))}

                    <div ref={chatEndRef} />
                  </div>

                  <div className={styles.replyBar}>
                    <input
                      className={`form-control ${styles.replyInput}`}
                      placeholder="Type your message..."
                      value={replyMsg}
                      onChange={(e) => setReplyMsg(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") sendReply();
                      }}
                    />
                    <button className={`btn ${styles.btnGreen}`} onClick={sendReply} disabled={replying || !replyMsg.trim()}>
                      <FiSend className="me-1" />
                      {replying ? "Sending..." : "Send"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-3 mt-1">
          <div className="col-12 col-lg-8">
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div>
                  <div className={styles.cardTitle}>Create New Ticket</div>
                  <div className={styles.cardMeta}>Fill details and attach screenshots (optional).</div>
                </div>
              </div>

              <form className="p-3" onSubmit={createTicket}>
                <div className="row g-2">
                  <div className="col-12 col-md-6">
                    <label className={styles.label}>Category</label>
                    <select className="form-select" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
                      <option>Technical</option>
                      <option>Billing</option>
                      <option>Account</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className={styles.label}>Priority</label>
                    <select className="form-select" value={form.priority} onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value }))}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className={styles.label}>Subject</label>
                    <input className="form-control" value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} placeholder="Eg: App crash issue" />
                  </div>

                  <div className="col-12">
                    <label className={styles.label}>Description</label>
                    <textarea className="form-control" rows={5} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Explain the issue..." />
                  </div>

                  <div className="col-12">
                    <label className={styles.label}>
                      Screenshots <span className={styles.muted}>(optional)</span>
                    </label>
                    <input type="file" className="form-control" multiple onChange={(e) => setForm((p) => ({ ...p, screenshots: Array.from(e.target.files || []) }))} />
                    {form.screenshots.length > 0 && (
                      <div className={styles.fileHint}>
                        <FiPaperclip className="me-1" />
                        {form.screenshots.length} file(s) selected
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button className={`btn ${styles.btnGreen}`} disabled={creating}>
                    {creating ? "Creating..." : "Create Ticket"}
                  </button>
                  <button type="button" className={`btn ${styles.btnSoft}`} onClick={() => setActiveTab("tickets")}>
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className={styles.sideCard}>
              <div className={styles.sideTitle}>Tips</div>
              <ul className={styles.sideList}>
                <li>Clear subject + steps to reproduce</li>
                <li>Add screenshot for faster resolution</li>
                <li>Use “High/Urgent” only when needed</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

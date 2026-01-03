import api from "@/services/apiService";
import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaTimesCircle, FaSyncAlt, FaMoneyBillWave } from "react-icons/fa";

/** ✅ Try to find id from different possible keys */
function getWithdrawalId(w) {
  return (
    w?._id ||
    w?.id ||
    w?.withdrawalId ||
    w?.withdrawal?._id ||
    w?.withdrawal?.id ||
    w?._doc?._id ||
    null
  );
}

/** ✅ normalize list response into array */
function normalizeList(resData) {
  // possible shapes: [..] OR {data:[..]} OR {withdrawals:[..]}
  const arr =
    Array.isArray(resData) ? resData :
    Array.isArray(resData?.data) ? resData.data :
    Array.isArray(resData?.withdrawals) ? resData.withdrawals :
    [];

  return arr;
}

export default function Withdrawals() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [items, setItems] = useState([]);

  const [loadingList, setLoadingList] = useState(false);
  const [creating, setCreating] = useState(false);
  const [err, setErr] = useState("");

  const canSubmit = useMemo(() => {
    const n = Number(amount);
    return Number.isFinite(n) && n > 0 && !creating;
  }, [amount, creating]);

  async function fetchWithdrawals() {
    setErr("");
    setLoadingList(true);
    try {
      const res = await api.get("/withdrawals/my");
      const list = normalizeList(res.data);

      // ✅ Helpful debug (check console to see actual keys)
      console.log("Withdrawals API raw:", res.data);
      console.log("Withdrawals normalized list:", list);

      setItems(list);
    } catch (e) {
      setErr(e?.response?.data?.message || e?.message || "Withdrawals load nahi ho rahe.");
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  async function createWithdrawal(e) {
    e.preventDefault();
    setErr("");

    const n = Number(amount);

    if (!Number.isFinite(n) || n <= 0) {
      setErr("Valid amount daalo (e.g. 100).");
      return;
    }

    setCreating(true);
    try {
      const payload = { amount: n };
      if (note?.trim()) payload.note = note.trim();

      console.log("Create withdrawal payload:", payload);

      const res = await api.post("/withdrawals", payload);

      console.log("Create withdrawal response:", res.data);

      const created =
        res.data?.data ||
        res.data?.withdrawal ||
        res.data;

      // ✅ If created is an object add it, else refetch
      if (created && typeof created === "object") {
        setItems((prev) => [created, ...prev]);
      } else {
        await fetchWithdrawals();
      }

      setAmount("");
      setNote("");
    } catch (e) {
      // ✅ show backend validation error if any
      setErr(
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Withdrawal create nahi hua."
      );
    } finally {
      setCreating(false);
    }
  }

  async function cancelWithdrawal(w) {
    setErr("");

    const id = getWithdrawalId(w);

    if (!id) {
      console.log("Cancel clicked but id missing. Item:", w);
      setErr("Cancel nahi ho sakta: Withdrawal ID missing hai (API list me _id nahi aa raha).");
      return;
    }

    try {
      console.log("Cancelling withdrawal id:", id);
      await api.post(`/withdrawals/${id}/cancel`);

      setItems((prev) =>
        prev.map((x) => (getWithdrawalId(x) === id ? { ...x, status: "cancelled" } : x))
      );
    } catch (e) {
      setErr(e?.response?.data?.message || e?.message || "Cancel nahi ho paaya.");
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0 d-flex align-items-center gap-2">
          <FaMoneyBillWave /> Withdrawals
        </h3>

        <button
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
          onClick={fetchWithdrawals}
          disabled={loadingList}
          type="button"
        >
          <FaSyncAlt />
          {loadingList ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {err ? <div className="alert alert-danger">{err}</div> : null}

      <div className="row g-3">
        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-header fw-semibold">New Withdrawal</div>
            <div className="card-body">
              <form onSubmit={createWithdrawal}>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    className="form-control"
                    inputMode="decimal"
                    placeholder="e.g. 500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Note (optional)</label>
                  <input
                    className="form-control"
                    placeholder="Reason / remark"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                  disabled={!canSubmit}
                  type="submit"
                >
                  <FaPlus />
                  {creating ? "Creating..." : "Create Withdrawal"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-header fw-semibold">Withdrawals List</div>
            <div className="card-body p-0">
              {loadingList ? (
                <div className="p-3">Loading...</div>
              ) : items?.length ? (
                <div className="table-responsive">
                  <table className="table table-hover m-0 align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((w, idx) => {
                        const id = getWithdrawalId(w);
                        const status = w?.status ?? w?.state ?? "pending";
                        const createdAt = w?.createdAt
                          ? new Date(w.createdAt).toLocaleString()
                          : "-";

                        const isCancelled = String(status).toLowerCase() === "cancelled";

                        return (
                          <tr key={id || idx}>
                            <td className="text-muted" style={{ maxWidth: 220 }}>
                              <span className="text-truncate d-inline-block" style={{ maxWidth: 220 }}>
                                {id || "—"}
                              </span>
                            </td>
                            <td className="fw-semibold">{w?.amount ?? w?.withdrawAmount ?? "—"}</td>
                            <td>
                              <span className={"badge " + (isCancelled ? "text-bg-secondary" : "text-bg-warning")}>
                                {status}
                              </span>
                            </td>
                            <td className="text-muted">{createdAt}</td>
                            <td className="text-end">
                              <button
                                className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-2"
                                onClick={() => cancelWithdrawal(w)}
                                disabled={isCancelled || !id}
                                type="button"
                                title={!id ? "ID missing" : "Cancel withdrawal"}
                              >
                                <FaTimesCircle />
                                Cancel
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-3 text-muted">No withdrawals found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

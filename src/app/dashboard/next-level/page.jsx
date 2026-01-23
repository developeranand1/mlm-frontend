"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./NextLevel.module.css";

import {
  BsArrowClockwise,
  BsAward,
  BsBullseye,
  BsPeople,
  BsFileEarmarkText,
  BsArrowLeft,
  BsArrowRight,
  BsLink45Deg,
  BsExclamationTriangle,
  BsCheck2Circle,
  BsPerson,
  BsEnvelope,
  BsTelephone,
  BsSliders,
} from "react-icons/bs";
import { getUserRankProgress } from "@/services/rankService";

export default function NextLevel() {
  const [userId, setUserId] = useState(""); // ✅ localStorage se aayega

  const [next, setNext] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payload, setPayload] = useState(null);

  // ✅ localStorage se user read (client-only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user"); // aapka saved user object
      if (!raw) {
        setError("User not found in localStorage (key: 'user').");
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(raw);
      const id = parsed?.id || parsed?._id; // support both
      if (!id) {
        setError("User id missing in localStorage user object.");
        setLoading(false);
        return;
      }

      setUserId(id);
    } catch (e) {
      setError("Invalid localStorage user JSON.");
      setLoading(false);
    }
  }, []);

  const fetchData = async (uid) => {
    try {
      setLoading(true);
      setError("");

      const res = await getUserRankProgress(uid, next);
      if (!res?.success) throw new Error(res?.message || "API unsuccessful");
      setPayload(res);
    } catch (e) {
      setError(e?.message || "Something went wrong");
      setPayload(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ userId & next change pe fetch
  useEffect(() => {
    if (userId) fetchData(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, next]);

  const u = payload?.user;
  const counts = payload?.counts;
  const currentRank = payload?.currentRank;
  const nextRank = payload?.nextRank;
  const nextRanks = payload?.nextRanks || [];

  const initials = (name = "") => {
    const s = String(name).trim();
    if (!s) return "?";
    const parts = s.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("");
  };

  const headerUserName = useMemo(() => u?.name || u?.username || "—", [u]);

  return (
    <div className={styles.page}>
      <div className={`container ${styles.containerFix}`}>
        {/* Header */}
        <div className={`${styles.card} ${styles.header}`}>
          <div>
            <div className={styles.title}>Next Level Progress</div>

            <div className={styles.chips}>
              <span className={styles.chip}>
                <BsPeople /> User: <b>{headerUserName}</b>
              </span>
              <span className={styles.chip}>
                <BsFileEarmarkText /> Next levels: <b>{next}</b>
              </span>
              {/* <span className={styles.chip}>
                <BsPerson /> UserId: <b>{userId || "—"}</b>
              </span> */}
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.field}>
              <span className={styles.label}>Next</span>
              <input
                type="number"
                min={1}
                max={15}
                value={next}
                onChange={(e) => setNext(Math.max(1, Math.min(15, Number(e.target.value || 5))))}
                className={`form-control ${styles.input}`}
              />
            </div>

            <button
              className={`btn btn-success ${styles.btnGreen}`}
              onClick={() => userId && fetchData(userId)}
              disabled={!userId}
            >
              <BsArrowClockwise /> Refresh
            </button>
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className={`${styles.card} ${styles.state}`}>
            <span className={styles.spinner} />
            <span>Loading rank progress…</span>
          </div>
        )}

        {!loading && error && (
          <div className={`${styles.card} ${styles.state} ${styles.error}`}>
            <BsExclamationTriangle />
            <div className={styles.msg}>{error}</div>
            <button
              className={`btn btn-success ${styles.btnGreen}`}
              onClick={() => userId && fetchData(userId)}
              disabled={!userId}
            >
              <BsArrowClockwise /> Try again
            </button>
          </div>
        )}

        {!loading && !error && payload && (
          <>
            {/* User Card */}
            <div className={`${styles.card} ${styles.userCard}`}>
              <div className={styles.userLeft}>
                <div className={styles.avatar}>{initials(u?.name || u?.username)}</div>
                <div>
                  <div className={styles.userName}>
                    {u?.name || u?.username}
                    <span className={`${styles.pill} ${u?.isActive ? styles.ok : styles.bad}`}>
                      {u?.isActive ? <BsCheck2Circle /> : <BsExclamationTriangle />}
                      {u?.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className={styles.meta}>
                    <span><BsPerson /> {u?.username || "—"}</span>
                    <span><BsEnvelope /> {u?.email || "—"}</span>
                    <span><BsTelephone /> {u?.phone || "—"}</span>
                  </div>
                </div>
              </div>

              <div className={styles.counts}>
                <div className={styles.kpi}>
                  <div className={styles.k}><BsArrowLeft /> Left</div>
                  <div className={styles.v}>{counts?.leftCount ?? 0}</div>
                </div>
                <div className={styles.kpi}>
                  <div className={styles.k}><BsArrowRight /> Right</div>
                  <div className={styles.v}>{counts?.rightCount ?? 0}</div>
                </div>
                <div className={styles.kpi}>
                  <div className={styles.k}><BsLink45Deg /> Pairs</div>
                  <div className={styles.v}>{counts?.pairCount ?? 0}</div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className={`${styles.card} ${styles.tableWrap}`}>
              <div className={styles.tableTop}>
                <div className={styles.tableTitle}>
                  <BsBullseye /> Rank Overview
                </div>
              </div>

              <div className="table-responsive">
                <table className={`table ${styles.table}`}>
                  <thead>
                    <tr>
                      <th>Current Rank</th>
                      <th>Next Rank</th>
                      <th>Need (Left/Right)</th>
                      <th>Weak Side</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {currentRank ? (
                          <span className={styles.bold}>
                            <BsAward /> {currentRank.rankName} (#{currentRank.position})
                          </span>
                        ) : (
                          <span className={styles.muted}>— No rank yet</span>
                        )}
                      </td>

                      <td>
                        {nextRank ? (
                          <span className={styles.bold}>
                            <BsBullseye /> {nextRank.rankName} (#{nextRank.position})
                          </span>
                        ) : (
                          <span className={styles.success}>
                            <BsCheck2Circle /> Top rank achieved
                          </span>
                        )}
                      </td>

                      <td>
                        {nextRank ? (
                          <div className={styles.needRow}>
                            <span className={styles.badge}><BsArrowLeft /> {nextRank.needLeft}</span>
                            <span className={styles.badge}><BsArrowRight /> {nextRank.needRight}</span>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td>
                        {nextRank?.weakerSide ? (
                          <span className={styles.weak}>
                            <BsSliders /> {nextRank.weakerSide}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Next Levels */}
              <div className={styles.levelsTitle}>Next {next} Levels</div>

              <div className={styles.levels}>
                {nextRanks.map((n) => (
                  <div key={n.position} className={styles.levelCard}>
                    <div className={styles.levelTop}>
                      <div className={styles.levelName}>#{n.position} {n.rankName}</div>
                      <div className={styles.levelReq}>{n.requiredPairsPerSide}/side</div>
                    </div>

                    <div className={styles.levelBot}>
                      <span className={styles.badge}><BsArrowLeft /> {n.needLeft}</span>
                      <span className={styles.badge}><BsArrowRight /> {n.needRight}</span>
                      {n.weakerSide ? (
                        <span className={styles.miniMuted}><BsSliders /> {n.weakerSide}</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

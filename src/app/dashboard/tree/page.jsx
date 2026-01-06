"use client";

import { use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./tree.module.css";

const API_BASE =  process.env.NEXT_PUBLIC_API_URL 

const StatusBadge = ({ status }) => {
  const s = status || "Pending";
  const cls =
    s === "Approved"
      ? styles.badgeApproved
      : s === "Reject"
      ? styles.badgeReject
      : styles.badgePending;

  return <span className={`${styles.badge} ${cls}`}>{s}</span>;
};

const NodeCard = ({ node }) => {
  if (!node) return <div className={`${styles.card} ${styles.empty}`}>Empty</div>;

  const borderCls =
    node.status === "Approved"
      ? styles.borderApproved
      : node.status === "Reject"
      ? styles.borderReject
      : styles.borderPending;

  return (
    <div className={`${styles.card} ${borderCls} ${node.isActive === false ? styles.inactive : ""}`}>
      <div className={styles.avatar}>
        <span className={`${styles.dot} ${node.isActive === false ? styles.dotOff : ""}`} />
      </div>

      <div className={styles.meta}>
        <div className={styles.name} title={node.name}>
          {node.name}
        </div>

        <div className={styles.row}>
          <StatusBadge status={node.status} />
          <span className={`${styles.chip} ${styles.chipGray}`}>{node.username || "-"}</span>
          {node.referralCode ? <span className={styles.chip}>{node.referralCode}</span> : null}
        </div>

        <div className={styles.stats}>
          <span className={styles.stat}>L: {node.leftCount ?? 0}</span>
          <span className={styles.stat}>R: {node.rightCount ?? 0}</span>
          <span className={styles.stat}>Pairs: {node.pairCount ?? 0}</span>
        </div>

        {node.referredBy?.name ? (
          <div className={styles.referredBy}>
            Referred By: <b>{node.referredBy.name}</b>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const TreeBranch = ({ node }) => {
  if (!node) return null;

  const hasLeft = !!node.children?.left;
  const hasRight = !!node.children?.right;
  const hasAnyChild = hasLeft || hasRight;

  return (
    <div className={styles.nodeWrap}>
      <NodeCard node={node} />

      {hasAnyChild && (
        <>
          {/* connector from parent to children */}
          <div className={styles.connectorTop}>
            <div className={styles.vLine} />
            <div className={styles.hLine} />
          </div>

          <div className={styles.children}>
            <div className={styles.childCol}>
              {hasLeft ? <TreeBranch node={node.children.left} /> : <NodeCard node={null} />}
            </div>

            <div className={styles.childCol}>
              {hasRight ? <TreeBranch node={node.children.right} /> : <NodeCard node={null} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function Tree() {
  const [loading, setLoading] = useState(true);
  const [tree, setTree] = useState(null);
  const [error, setError] = useState("");

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    setError("localStorage me user nahi mila");
    setLoading(false);
    return;
  }

  let userId = null;

  try {
    const userObj = JSON.parse(storedUser);

    // support all common cases
    userId = userObj?.id || userObj?._id;
  } catch (err) {
    setError("Invalid user data in localStorage");
    setLoading(false);
    return;
  }

  if (!userId) {
    setError("userId nahi mila localStorage se");
    setLoading(false);
    return;
  }

  const url = `${API_BASE}users/users/${userId}/tree?depth=10`;

  (async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Tree API failed");
      }

      setTree(data.tree);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  })();
}, []);


  return (
    <div className={`container-fluid ${styles.page}`}>
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h4 className="mb-1">User Tree</h4>
            <div className={styles.sub}>Binary Tree View (Left / Right)</div>
          </div>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => window.location.reload()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : loading ? (
          <div className="alert alert-info">Loading tree...</div>
        ) : !tree ? (
          <div className="alert alert-warning">Tree not found.</div>
        ) : (
          <div className={styles.treeCanvas}>
            <TreeBranch node={tree} />
          </div>
        )}
      </div>
    </div>
  );
}

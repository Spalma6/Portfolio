import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../src/api";
import { useAuth } from "../src/useAuth";

const resourceDefinitions = [
  {
    key: "projects",
    label: "Projects",
    fields: [
      ["title", "Title", "text"],
      ["completionDate", "Completion date", "date"],
      ["description", "Description", "textarea"],
    ],
  },
  {
    key: "qualifications",
    label: "Qualifications",
    fields: [
      ["title", "Title", "text"],
      ["completionDate", "Completion date", "date"],
      ["description", "Description", "textarea"],
    ],
  },
  {
    key: "contacts",
    label: "Contacts",
    fields: [
      ["firstName", "First name", "text"],
      ["lastName", "Last name", "text"],
      ["phone", "Phone", "tel"],
      ["email", "Email", "email"],
      ["message", "Message", "textarea"],
    ],
  },
];

const emptyValues = (fields) => Object.fromEntries(fields.map(([name]) => [name, ""]));

function ResourcePanel({ definition }) {
  const [records, setRecords] = useState([]);
  const [values, setValues] = useState(() => emptyValues(definition.fields));
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      setRecords(await apiRequest(`/api/${definition.key}`));
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [definition.key]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const reset = () => {
    setValues(emptyValues(definition.fields));
    setEditingId(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    const wasEditing = Boolean(editingId);
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const path = editingId ? `/api/${definition.key}/${editingId}` : `/api/${definition.key}`;
      await apiRequest(path, {
        method: wasEditing ? "PUT" : "POST",
        body: JSON.stringify(values),
      });
      reset();
      await loadRecords();
      setNotice(`${definition.label.slice(0, -1)} ${wasEditing ? "updated" : "created"} successfully.`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const edit = (record) => {
    const nextValues = Object.fromEntries(definition.fields.map(([name]) => {
      const value = record[name] || "";
      return [name, name === "completionDate" ? value.slice(0, 10) : value];
    }));
    setValues(nextValues);
    setEditingId(record._id);
    setNotice("");
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    setError("");
    try {
      await apiRequest(`/api/${definition.key}/${id}`, { method: "DELETE" });
      await loadRecords();
      setNotice("Record deleted successfully.");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <h2>{definition.label}</h2>
        <span>{records.length} record{records.length === 1 ? "" : "s"}</span>
      </div>
      <form className="resource-form" onSubmit={submit}>
        {definition.fields.map(([name, label, type]) => (
          <label key={name}>{label}
            {type === "textarea"
              ? <textarea required name={name} rows="3" value={values[name]} onChange={(event) => setValues({ ...values, [name]: event.target.value })} />
              : <input required type={type} name={name} value={values[name]} onChange={(event) => setValues({ ...values, [name]: event.target.value })} />}
          </label>
        ))}
        <div className="form-actions">
          <button className="button button-dark" disabled={saving} type="submit">{saving ? "Saving..." : editingId ? "Update record" : "Create record"}</button>
          {editingId && <button className="button button-outline" type="button" onClick={reset}>Cancel</button>}
        </div>
      </form>
      {loading && <p className="form-note">Loading records...</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {notice && <p className="form-success" role="status">{notice}</p>}
      <div className="admin-records">
        {!loading && records.length === 0 && <p className="form-note">No records yet.</p>}
        {records.map((record) => (
          <article className="admin-record" key={record._id}>
            <div>
              <strong>{record.title || `${record.firstName} ${record.lastName}`}</strong>
              <p>{record.description || record.message || record.email}</p>
            </div>
            <div className="form-actions">
              <button className="text-button" type="button" onClick={() => edit(record)}>Edit</button>
              <button className="text-button danger" type="button" onClick={() => remove(record._id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function AdminDashboard() {
  const { user, isAdmin, signOut } = useAuth();

  if (!user || !isAdmin) {
    return (
      <section className="page-pad inner-page">
        <div className="page-intro">
          <p className="eyebrow">Restricted area</p>
          <h1>Administrator access <em>required.</em></h1>
          <p className="lede">Sign in with an administrator account to manage portfolio records.</p>
          <Link className="button button-dark" to="/signin">Sign in ↗</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-pad inner-page admin-page">
      <div className="page-intro">
        <p className="eyebrow">Administrator dashboard</p>
        <h1>Manage the <em>portfolio.</em></h1>
        <p className="lede">Create, edit, and remove projects, qualifications, and contact submissions.</p>
        <button className="button button-outline" type="button" onClick={signOut}>Sign out</button>
      </div>
      <div className="admin-grid">
        {resourceDefinitions.map((definition) => <ResourcePanel key={definition.key} definition={definition} />)}
      </div>
    </section>
  );
}

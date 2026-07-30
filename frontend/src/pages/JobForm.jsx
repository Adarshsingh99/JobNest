import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addJob, updateJob, getJobById } from '../api/jobApi';

const EMPTY_FORM = {
  postId: '',
  postProfile: '',
  postDesc: '',
  reqExperience: '',
  postTechStack: '',
};

export default function JobForm({ addToast }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEdit) return;
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await getJobById(id);
        const job = res.data;
        setForm({
          postId: job.postId,
          postProfile: job.postProfile || '',
          postDesc: job.postDesc || '',
          reqExperience: job.reqExperience ?? '',
          postTechStack: (job.postTechStack || []).join(', '),
        });
      } catch {
        addToast('Failed to load job for editing.', 'error');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, isEdit, addToast, navigate]);

  const validate = () => {
    const e = {};
    if (!form.postId) e.postId = 'Post ID is required';
    if (isNaN(Number(form.postId)) || Number(form.postId) <= 0) e.postId = 'Post ID must be a positive number';
    if (!form.postProfile.trim()) e.postProfile = 'Job title is required';
    if (!form.postDesc.trim()) e.postDesc = 'Description is required';
    if (form.reqExperience === '') e.reqExperience = 'Experience is required';
    if (isNaN(Number(form.reqExperience)) || Number(form.reqExperience) < 0) e.reqExperience = 'Must be 0 or more';
    if (!form.postTechStack.trim()) e.postTechStack = 'At least one technology is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    const payload = {
      postId: parseInt(form.postId),
      postProfile: form.postProfile.trim(),
      postDesc: form.postDesc.trim(),
      reqExperience: parseInt(form.reqExperience),
      postTechStack: form.postTechStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isEdit) {
        await updateJob(payload);
        addToast('Job updated successfully!', 'success');
      } else {
        await addJob(payload);
        addToast('Job posted successfully!', 'success');
      }
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong.';
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="form-page">
        <div className="loading" style={{ paddingTop: '4rem' }}>
          <div className="spinner" />
          <span className="loading__text">Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page page-enter">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="form-card">
        <div className="form-card__banner" />
        <div className="form-card__body">
          <h1 className="form-card__title">
            {isEdit ? '✏️ Edit Job Post' : '🚀 Post a New Job'}
          </h1>
          <p className="form-card__subtitle">
            {isEdit
              ? 'Update the details for this job posting.'
              : 'Fill in the details below to create a new job listing.'}
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              {/* Post ID */}
              <div className="form-group">
                <label className="form-label" htmlFor="postId">Post ID</label>
                <input
                  id="postId"
                  name="postId"
                  type="number"
                  className="form-input"
                  placeholder="e.g. 6"
                  value={form.postId}
                  onChange={handleChange}
                  disabled={isEdit}
                  style={isEdit ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                />
                {errors.postId && (
                  <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.postId}</div>
                )}
              </div>

              {/* Experience */}
              <div className="form-group">
                <label className="form-label" htmlFor="reqExperience">Experience (years)</label>
                <input
                  id="reqExperience"
                  name="reqExperience"
                  type="number"
                  min="0"
                  className="form-input"
                  placeholder="e.g. 3"
                  value={form.reqExperience}
                  onChange={handleChange}
                />
                {errors.reqExperience && (
                  <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.reqExperience}</div>
                )}
              </div>
            </div>

            {/* Job Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="postProfile">Job Title / Profile</label>
              <input
                id="postProfile"
                name="postProfile"
                type="text"
                className="form-input"
                placeholder="e.g. Senior React Developer"
                value={form.postProfile}
                onChange={handleChange}
              />
              {errors.postProfile && (
                <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.postProfile}</div>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="postDesc">Description</label>
              <textarea
                id="postDesc"
                name="postDesc"
                className="form-input form-textarea"
                placeholder="Describe the role, responsibilities, and requirements…"
                value={form.postDesc}
                onChange={handleChange}
              />
              {errors.postDesc && (
                <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.postDesc}</div>
              )}
            </div>

            {/* Tech Stack */}
            <div className="form-group">
              <label className="form-label" htmlFor="postTechStack">Tech Stack</label>
              <input
                id="postTechStack"
                name="postTechStack"
                type="text"
                className="form-input"
                placeholder="e.g. React, Node.js, PostgreSQL, Docker"
                value={form.postTechStack}
                onChange={handleChange}
              />
              <div className="form-hint">Separate technologies with commas</div>
              {errors.postTechStack && (
                <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.postTechStack}</div>
              )}
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-form-btn"
                className="btn btn--primary"
                disabled={submitting}
              >
                {submitting
                  ? '⏳ Saving…'
                  : isEdit
                  ? '✅ Update Job'
                  : '🚀 Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

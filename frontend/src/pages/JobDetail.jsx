import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, deleteJob } from '../api/jobApi';
import ConfirmDialog from '../components/ConfirmDialog';

const profileIcons = {
  'software': '💻', 'frontend': '🎨', 'backend': '⚙️',
  'data': '📊', 'network': '🌐', 'ux': '🖌️', 'devops': '🚀',
  'mobile': '📱', 'cloud': '☁️', 'security': '🔒',
};

function getIcon(profile) {
  if (!profile) return '💼';
  const key = Object.keys(profileIcons).find((k) =>
    profile.toLowerCase().includes(k)
  );
  return key ? profileIcons[key] : '💼';
}

export default function JobDetail({ addToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await getJobById(id);
        setJob(res.data);
      } catch {
        addToast('Failed to load job details.', 'error');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, addToast, navigate]);

  const handleDelete = async () => {
    try {
      await deleteJob(id);
      addToast('Job post deleted.', 'success');
      navigate('/');
    } catch {
      addToast('Failed to delete.', 'error');
      setShowConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-page">
        <div className="loading" style={{ paddingTop: '4rem' }}>
          <div className="spinner" />
          <span className="loading__text">Loading job details…</span>
        </div>
      </div>
    );
  }

  if (!job || !job.postId) {
    return (
      <div className="detail-page">
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <div className="empty-state__title">Job not found</div>
          <button className="btn btn--secondary" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page page-enter">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-card">
        <div className="detail-card__banner" />
        <div className="detail-card__body">
          {/* Header */}
          <div className="detail-card__header">
            <div className="detail-card__title-group">
              <div className="detail-card__icon">{getIcon(job.postProfile)}</div>
              <div>
                <div className="detail-card__id-label">Job Post #{job.postId}</div>
                <h1 className="detail-card__title">{job.postProfile}</h1>
              </div>
            </div>
            <div className="detail-card__actions">
              <button
                id="edit-job-btn"
                className="btn btn--primary"
                onClick={() => navigate(`/edit/${job.postId}`)}
              >
                ✏️ Edit
              </button>
              <button
                id="delete-job-btn"
                className="btn btn--danger"
                onClick={() => setShowConfirm(true)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>

          <div className="detail-divider" />

          {/* Description */}
          <div className="detail-section-label">Description</div>
          <p className="detail-desc">{job.postDesc}</p>

          <div className="detail-divider" />

          {/* Experience */}
          <div className="detail-section-label">Experience Required</div>
          <div className="detail-exp">
            🎯 {job.reqExperience} {job.reqExperience === 1 ? 'year' : 'years'} of experience
          </div>

          <div className="detail-divider" />

          {/* Tech Stack */}
          <div className="detail-section-label">Tech Stack</div>
          <div className="detail-tech-stack">
            {(job.postTechStack || []).map((tech) => (
              <span key={tech} className="detail-tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Delete Job Post"
          message={`Permanently delete "${job.postProfile}" (Post #${job.postId})?`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

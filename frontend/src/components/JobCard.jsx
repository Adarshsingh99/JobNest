import { useNavigate } from 'react-router-dom';

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

const BADGE_COLORS = ['', '--cyan', '--pink', '', '--cyan'];

export default function JobCard({ job, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(job.postId);
  };

  return (
    <div
      className="job-card page-enter"
      onClick={() => navigate(`/job/${job.postId}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/job/${job.postId}`)}
    >
      <div className="job-card__header">
        <div className="job-card__icon">{getIcon(job.postProfile)}</div>
        <span className="job-card__id">#{job.postId}</span>
      </div>

      <div>
        <div className="job-card__title">{job.postProfile}</div>
      </div>

      <div className="job-card__desc">{job.postDesc}</div>

      <div className="job-card__meta">
        <span className="job-card__exp">
          <span className="job-card__exp-dot" />
          {job.reqExperience} {job.reqExperience === 1 ? 'yr' : 'yrs'} experience
        </span>
      </div>

      <div className="job-card__tech-stack">
        {(job.postTechStack || []).map((tech, i) => (
          <span
            key={tech}
            className={`tech-badge${BADGE_COLORS[i % BADGE_COLORS.length]}`}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="job-card__footer">
        <span className="job-card__view-btn">
          View Details →
        </span>
        <button
          className="job-card__delete-btn"
          onClick={handleDelete}
          title="Delete job"
          aria-label="Delete job"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

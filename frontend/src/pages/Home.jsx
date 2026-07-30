import { useState, useEffect, useCallback } from 'react';
import JobCard from '../components/JobCard';
import ConfirmDialog from '../components/ConfirmDialog';
import { getAllJobs, searchJobs, deleteJob, loadSampleData } from '../api/jobApi';

export default function Home({ addToast }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [confirmId, setConfirmId] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllJobs();
      setJobs(res.data);
    } catch {
      addToast('Failed to load jobs. Is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setActiveSearch(searchTerm);
    try {
      const res = await searchJobs(searchTerm.trim());
      setJobs(res.data);
    } catch {
      addToast('Search failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setActiveSearch('');
    fetchJobs();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleDelete = async () => {
    try {
      await deleteJob(confirmId);
      setJobs((prev) => prev.filter((j) => j.postId !== confirmId));
      addToast('Job post deleted successfully.', 'success');
    } catch {
      addToast('Failed to delete job.', 'error');
    } finally {
      setConfirmId(null);
    }
  };

  const handleLoadData = async () => {
    setLoadingData(true);
    try {
      await loadSampleData();
      addToast('Sample data loaded!', 'success');
      fetchJobs();
    } catch {
      addToast('Failed to load sample data.', 'error');
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Live Job Listings
        </div>
        <h1 className="hero__title">
          Find Your{' '}
          <span className="hero__title-gradient">Dream Job</span>
          <br />
          Today
        </h1>
        <p className="hero__subtitle">
          Browse curated tech opportunities. Search by skill, role, or technology stack.
        </p>

        {/* Search */}
        <div className="search-bar">
          <div className="search-bar__input-wrap">
            <span className="search-bar__icon">🔍</span>
            <input
              id="search-input"
              type="text"
              className="search-bar__input"
              placeholder="Search by role, tech, keyword…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button className="search-bar__btn" onClick={handleSearch} id="search-btn">
            Search
          </button>
          {activeSearch && (
            <button className="search-bar__clear" onClick={handleClear} id="clear-btn">
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Stats */}
      {!loading && (
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-item__number">{jobs.length}</span>
            <span>Jobs Available</span>
          </div>
          <div className="stat-item">
            <span className="stat-item__number">
              {[...new Set(jobs.flatMap((j) => j.postTechStack || []))].length}
            </span>
            <span>Technologies</span>
          </div>
          {activeSearch && (
            <div className="stat-item">
              <span>Results for "</span>
              <span className="stat-item__number">{activeSearch}</span>
              <span>"</span>
            </div>
          )}
        </div>
      )}

      {/* Job Listings */}
      <div className="section">
        <div className="section__header">
          <div>
            <h2 className="section__title">
              {activeSearch ? `Search Results` : 'All Opportunities'}
              {!loading && (
                <span className="section__count"> — {jobs.length} found</span>
              )}
            </h2>
          </div>
          <button
            className="load-btn"
            onClick={handleLoadData}
            disabled={loadingData}
            id="load-sample-btn"
          >
            {loadingData ? '⏳' : '⚡'} Load Sample Data
          </button>
        </div>

        <div className="jobs-grid">
          {loading ? (
            <div className="loading">
              <div className="spinner" />
              <span className="loading__text">Fetching jobs…</span>
            </div>
          ) : jobs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">📭</div>
              <div className="empty-state__title">
                {activeSearch ? 'No results found' : 'No jobs yet'}
              </div>
              <div className="empty-state__subtitle">
                {activeSearch
                  ? `Try a different keyword.`
                  : `Click "Load Sample Data" to add demo posts.`}
              </div>
            </div>
          ) : (
            jobs.map((job) => (
              <JobCard
                key={job.postId}
                job={job}
                onDelete={(id) => setConfirmId(id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      {confirmId !== null && (
        <ConfirmDialog
          title="Delete Job Post"
          message={`Are you sure you want to delete job #${confirmId}? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </>
  );
}

import { memo, useState, useCallback } from 'react';
import { FiExternalLink, FiMaximize2, FiX, FiCheckCircle, FiMapPin, FiGlobe, FiBarChart2, FiUsers } from 'react-icons/fi';
import { clientProjects } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import './ClientProjects.css';

function ClientProjects() {
  const bgStyle = backgrounds?.projects ? { backgroundImage: `url(${backgrounds.projects})` } : undefined;
  
  const [activeTabMap, setActiveTabMap] = useState({});
  const [modalData, setModalData] = useState(null);

  const toggleTab = useCallback((projectId, tab) => {
    setActiveTabMap((prev) => ({ ...prev, [projectId]: tab }));
  }, []);

  const openModal = useCallback((imgUrl, title) => {
    setModalData({ imgUrl, title });
  }, []);

  const closeModal = useCallback(() => {
    setModalData(null);
  }, []);

  return (
    <section id="client-projects" className="section section--ink client-projects" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading
          eyebrow={clientProjects?.eyebrow || 'Featured Work'}
          title={clientProjects?.title || 'Valuable Live Projects'}
          description={clientProjects?.description}
        />

        <div className="client-projects__grid">
          {clientProjects.items.map((project) => {
            const activeTab = activeTabMap[project.id] || 'publicUI';
            const currentImg = project.images[activeTab] || project.images.publicUI;

            const tabLabels = {
              publicUI: 'Public Site',
              adminAnalytics: 'Admin Analytics',
              adminEnquiry: 'Enquiry Management'
            };

            return (
              <Reveal key={project.id} className="client-card">
                {/* Left: Dual Preview Screenshot Container */}
                <div className="client-card__preview-wrapper">
                  <div className="client-card__tabs" role="tablist" aria-label="Screenshot view selector">
                    <button
                      className={`client-card__tab ${activeTab === 'publicUI' ? 'client-card__tab--active' : ''}`}
                      onClick={() => toggleTab(project.id, 'publicUI')}
                      role="tab"
                      aria-selected={activeTab === 'publicUI'}
                    >
                      <FiGlobe size={13} /> Public Site
                    </button>
                    {project.images.adminAnalytics && (
                      <button
                        className={`client-card__tab ${activeTab === 'adminAnalytics' ? 'client-card__tab--active' : ''}`}
                        onClick={() => toggleTab(project.id, 'adminAnalytics')}
                        role="tab"
                        aria-selected={activeTab === 'adminAnalytics'}
                      >
                        <FiBarChart2 size={13} /> Admin Analytics
                      </button>
                    )}
                    {project.images.adminEnquiry && (
                      <button
                        className={`client-card__tab ${activeTab === 'adminEnquiry' ? 'client-card__tab--active' : ''}`}
                        onClick={() => toggleTab(project.id, 'adminEnquiry')}
                        role="tab"
                        aria-selected={activeTab === 'adminEnquiry'}
                      >
                        <FiUsers size={13} /> Enquiry Panel
                      </button>
                    )}
                  </div>

                  <div className="client-card__image-container">
                    <img
                      src={currentImg}
                      alt={`${project.title} (${tabLabels[activeTab] || 'Preview'})`}
                      className="client-card__img"
                      loading="lazy"
                      decoding="async"
                      width="500"
                      height="312"
                    />
                    <button
                      className="client-card__view-modal-btn"
                      onClick={() => openModal(currentImg, `${project.title} — ${tabLabels[activeTab] || 'Screenshot'}`)}
                      aria-label="Expand screenshot full screen"
                    >
                      <FiMaximize2 size={13} /> Full View
                    </button>
                  </div>
                </div>

                {/* Right: Project Details Content */}
                <div className="client-card__content">
                  <div className="client-card__badge-row">
                    <span className="client-card__role-badge">{project.role}</span>
                    <span className="client-card__location-badge">
                      <FiMapPin size={13} /> {project.location}
                    </span>
                  </div>

                  <h3 className="client-card__title">{project.title}</h3>
                  <p className="client-card__desc">{project.description}</p>

                  <ul className="client-card__deliverables">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="client-card__deliverable-item">
                        <FiCheckCircle className="client-card__check-icon" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="client-card__stack">
                    {project.stack.map((tech) => (
                      <span key={tech} className="client-card__stack-item">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="client-card__actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn--solid"
                      >
                        <FiExternalLink size={15} /> Visit Live Site
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalData && (
        <div className="client-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="client-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="client-modal-header">
              <h4 className="client-modal-title">{modalData.title}</h4>
              <button className="client-modal-close" onClick={closeModal} aria-label="Close modal">
                <FiX size={20} />
              </button>
            </div>
            <div className="client-modal-body">
              <img src={modalData.imgUrl} alt={modalData.title} className="client-modal-img" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(ClientProjects);

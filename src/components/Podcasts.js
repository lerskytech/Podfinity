import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const podcastsData = [
    { id: 'JMpUT74pRSo', ep: 1, title: 'Navy SEAL Marty Strong on War, Leadership & Life After Combat', duration: '42:45', views: '21 views', date: '6 days ago' },
    { id: 'z8Hrdz2bncw', ep: 2, title: 'Sgt. Maj. Guy Gravino on Combat, Recovery & Brotherhood Beyond the Battle', duration: '30:35', views: '25 views', date: '6 days ago' },
    { id: '7SyCV8rWHMk', ep: 3, title: 'Navy SEAL Hector Delgado on Healing, Service & Saving Warriors After the Fight', duration: '21:51', views: '15 views', date: '6 days ago' }
];

const Podcasts = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const openModal = (videoId) => setSelectedVideo(videoId);
    const closeModal = () => setSelectedVideo(null);

    return (
        <AnimatedSection id="podcasts" className="podcasts-section">
            <h2 className="section-title">Latest Episodes</h2>
            <div className="podcasts-grid">
                {podcastsData.map(podcast => (
                    <div key={podcast.id} className="podcast-card" onClick={() => openModal(podcast.id)}>
                        <div className="podcast-thumbnail">
                            <img src={`https://img.youtube.com/vi/${podcast.id}/hqdefault.jpg`} alt={podcast.title} />
                            <div className="play-icon-wrapper"><div className="play-icon"></div></div>
                            <span className="duration-badge">{podcast.duration}</span>
                        </div>
                        <div className="podcast-info">
                            <h3>EP. {podcast.ep}: {podcast.title}</h3>
                            <div className="podcast-meta"><span>{podcast.views}</span> &bull; <span>{podcast.date}</span></div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedVideo && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={closeModal}>&times;</button>
                        <div className="video-container">
                            <iframe src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Embedded YouTube Video"></iframe>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .podcasts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
                .podcast-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 15px; overflow: hidden; cursor: pointer; transition: all 0.3s ease; text-align: left; }
                .podcast-card:hover { transform: translateY(-10px); box-shadow: 0 0 30px rgba(var(--accent-color-rgb), 0.7); }
                .podcast-thumbnail { position: relative; }
                .podcast-thumbnail img { width: 100%; height: auto; display: block; }
                .play-icon-wrapper { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.4); opacity: 0; transition: opacity 0.3s ease; }
                .podcast-card:hover .play-icon-wrapper { opacity: 1; }
                .play-icon { width: 0; height: 0; border-style: solid; border-width: 20px 0 20px 35px; border-color: transparent transparent transparent white; }
                .duration-badge { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 5px; font-size: 0.8rem; }
                .podcast-info { padding: 1.5rem; }
                .podcast-info h3 { font-size: 1.1rem; margin-bottom: 0.75rem; }
                .podcast-meta { color: var(--text-color-secondary); font-size: 0.9rem; }
                .modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
                .modal-content { position: relative; width: 90%; max-width: 960px; }
                .close-modal { position: absolute; top: -45px; right: -10px; background: none; border: none; color: white; font-size: 3rem; cursor: pointer; }
                .video-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; }
                .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
            `}</style>
        </AnimatedSection>
    );
};

export default Podcasts;

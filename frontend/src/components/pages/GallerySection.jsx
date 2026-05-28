import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, 
  Play, 
  X, 
  Image as ImageIcon, 
  Video as VideoIcon,
  ChevronRight,
  Filter
} from 'lucide-react';

const GallerySection = () => {
  const [activeTab, setActiveTab] = useState('images');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaData, setMediaData] = useState({ images: [], videos: [] });
  const [filter, setFilter] = useState('All');
  const [hoveredVideo, setHoveredVideo] = useState(null);

  useEffect(() => {
    // Fetch media manifest
    fetch('/gallery/media.json')
      .then(res => res.json())
      .then(data => setMediaData(data))
      .catch(err => console.error('Error fetching media:', err));
  }, []);

  const categories = ['All', ...new Set(mediaData.images.map(img => img.category))];

  const filteredImages = filter === 'All' 
    ? mediaData.images 
    : mediaData.images.filter(img => img.category === filter);

  return (
    <section className="py-20 bg-gradient-to-b from-navy-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 text-gold-700 rounded-full mb-6 border border-gold-500/20"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Our Gallery</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-navy-900 mb-6"
          >
            Campus <span className="text-gold-600">Life & Memories</span>
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full mb-8"
          />
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-2xl shadow-xl shadow-navy-100/50 border border-navy-100 flex gap-2">
            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === 'images' 
                ? 'bg-navy-900 text-white shadow-lg' 
                : 'text-navy-600 hover:bg-navy-50'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              Image Gallery
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === 'videos' 
                ? 'bg-navy-900 text-white shadow-lg' 
                : 'text-navy-600 hover:bg-navy-50'
              }`}
            >
              <VideoIcon className="w-5 h-5" />
              Video Gallery
            </button>
          </div>
        </div>

        {/* Image Gallery Content */}
        {activeTab === 'images' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                    filter === cat
                    ? 'bg-gold-500 border-gold-500 text-navy-900 shadow-lg'
                    : 'bg-white border-navy-100 text-navy-600 hover:border-gold-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry/Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode='popLayout'>
                {filteredImages.map((img, index) => (
                  <motion.div
                    key={img.src}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20"
                    onClick={() => setSelectedMedia({ ...img, type: 'image' })}
                  >
                    {/* Glassmorphism Overlay */}
                    <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-navy-900/40 transition-all duration-500 z-10" />
                    
                    {/* Image */}
                    <img
                      src={img.src}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Content on Hover */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="backdrop-blur-md bg-white/20 p-4 rounded-xl border border-white/30 shadow-2xl">
                        <span className="text-gold-400 text-xs font-bold uppercase tracking-wider mb-1 block">{img.category}</span>
                        <h4 className="text-white font-bold text-lg mb-2">{img.title}</h4>
                        <div className="flex items-center text-white/80 text-sm font-medium">
                          View Fullscreen <Maximize2 className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Video Gallery Content */}
        {activeTab === 'videos' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {mediaData.videos.map((video, index) => (
              <motion.div
                key={video.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-[2rem] overflow-hidden bg-navy-900 shadow-2xl border border-navy-800"
                onMouseEnter={() => setHoveredVideo(video.src)}
                onMouseLeave={() => setHoveredVideo(null)}
                onClick={() => setSelectedMedia({ ...video, type: 'video' })}
              >
                {/* Video/Thumbnail Container */}
                <div className="relative aspect-video overflow-hidden">
                  {hoveredVideo === video.src ? (
                    <video
                      src={video.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover scale-105"
                    />
                  ) : (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                    />
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/30 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-navy-900 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent opacity-60 z-10" />
                </div>

                {/* Content */}
                <div className="p-6 relative z-30">
                  <h4 className="text-white font-bold text-xl mb-2 group-hover:text-gold-400 transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center text-navy-300 text-sm">
                    <span>Campus Video Highlights</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/95 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-full overflow-hidden rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                />
              ) : (
                <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden">
                  <video
                    src={selectedMedia.src}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                </div>
              )}
              
              <div className="p-6 bg-gradient-to-t from-navy-900 to-transparent text-white absolute bottom-0 left-0 right-0">
                <h3 className="text-2xl font-bold font-heading mb-1">{selectedMedia.title}</h3>
                {selectedMedia.category && (
                  <span className="text-gold-400 font-medium uppercase tracking-widest text-sm">{selectedMedia.category}</span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
};

export default GallerySection;

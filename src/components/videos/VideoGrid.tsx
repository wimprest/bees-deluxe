interface VideoData {
  _id: string;
  title?: string;
  youtubeId?: string;
  description?: string;
  featured?: boolean;
}

interface VideoGridProps {
  videos: VideoData[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  const featuredVideos = videos.filter((v) => v.featured);
  const gridVideos = videos.filter((v) => !v.featured);

  return (
    <div className="mt-12">
      {/* Featured videos — full width */}
      {featuredVideos.map((video) => (
        <div key={video._id} className="mb-8">
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={video.title ?? "Bees Deluxe video"}
              className="h-full w-full"
            />
          </div>
          <h3 className="mt-2 font-heading text-base text-brand-white">
            {video.title}
          </h3>
          {video.description && (
            <p className="mt-1 text-sm text-brand-muted">
              {video.description}
            </p>
          )}
        </div>
      ))}

      {/* Grid videos — 2 columns desktop, 1 mobile */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {gridVideos.map((video) => (
          <div key={video._id}>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title={video.title ?? "Bees Deluxe video"}
                className="h-full w-full"
              />
            </div>
            <p className="mt-2 text-sm text-brand-white">{video.title}</p>
          </div>
        ))}
      </div>

      {/* YouTube CTA */}
      <div className="mt-8">
        <a
          href="https://www.youtube.com/@beesdeluxe/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-sm uppercase tracking-wide text-brand-teal transition-colors hover:text-brand-teal-light"
        >
          More Bees Deluxe videos &rarr;
        </a>
      </div>
    </div>
  );
}

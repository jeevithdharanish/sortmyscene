import Link from "next/link";
import { Button } from "@/components/ui/button";

// Pre-determined crowd silhouette dimensions
const crowdSilhouettes = [
  { width: 18, height: 45 },
  { width: 12, height: 55 },
  { width: 20, height: 40 },
  { width: 14, height: 60 },
  { width: 16, height: 50 },
  { width: 22, height: 35 },
  { width: 13, height: 58 },
  { width: 19, height: 42 },
  { width: 15, height: 52 },
  { width: 21, height: 38 },
  { width: 11, height: 62 },
  { width: 17, height: 48 },
  { width: 23, height: 33 },
  { width: 14, height: 56 },
  { width: 18, height: 44 },
  { width: 12, height: 59 },
  { width: 20, height: 41 },
  { width: 16, height: 53 },
  { width: 22, height: 36 },
  { width: 13, height: 57 },
];

// Pre-determined disco ball tile opacities
const discoTileOpacities = [
  0.5, 0.7, 0.4, 0.6, 0.8, 0.5,
  0.6, 0.4, 0.7, 0.5, 0.6, 0.4,
  0.7, 0.5, 0.4, 0.8, 0.6, 0.5,
  0.4, 0.6, 0.5, 0.7, 0.4, 0.6,
  0.5, 0.8, 0.6, 0.4, 0.7, 0.5,
  0.6, 0.5, 0.4, 0.6, 0.8, 0.5,
];

export function HeroSection() {
  return (
    <section className="min-h-screen bg-black flex items-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Discover</span>
              <br />
              <span className="bg-linear-to-r from-purple-500 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                Premium Events
              </span>
              <br />
              <span className="text-white">In India</span>
            </h1>
            <div>
              <Link href="/events">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
                >
                  Explore All Events!
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image Collage */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
              {/* Main circular image */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <div className="w-full h-full bg-linear-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center relative">
                  {/* Concert silhouettes effect */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3">
                    {/* Crowd silhouette simulation */}
                    <div className="flex justify-center gap-1 h-full items-end pb-4">
                      {crowdSilhouettes.map((silhouette, i) => (
                        <div
                          key={i}
                          className="bg-black/90 rounded-t-full"
                          style={{
                            width: `${silhouette.width}px`,
                            height: `${silhouette.height}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Stage lights effect */}
                  <div className="absolute top-10 left-1/4 w-20 h-40 bg-linear-to-b from-cyan-400/60 to-transparent blur-xl rotate-12"></div>
                  <div className="absolute top-10 right-1/4 w-20 h-40 bg-linear-to-b from-purple-400/60 to-transparent blur-xl -rotate-12"></div>
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-32 bg-linear-to-b from-pink-400/60 to-transparent blur-xl"></div>
                </div>
              </div>

              {/* Disco ball accent */}
              <div className="absolute -top-4 right-8 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/30">
                <div className="w-full h-full bg-linear-to-br from-yellow-300 via-amber-200 to-orange-300 relative">
                  {/* Disco ball pattern */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-px">
                    {discoTileOpacities.map((opacity, i) => (
                      <div
                        key={i}
                        className="bg-white/40 rounded-sm"
                        style={{ opacity }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/30 to-transparent"></div>
                </div>
              </div>

              {/* Bottom accent circle */}
              <div className="absolute -bottom-8 left-8 w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-lg shadow-blue-500/30">
                <div className="w-full h-full bg-linear-to-br from-blue-600 via-cyan-400 to-purple-500 relative">
                  {/* DJ lights effect */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/30 rounded-full blur-md animate-pulse"></div>
                  </div>
                  <div className="absolute top-2 left-2 w-3 h-3 bg-cyan-300 rounded-full blur-sm"></div>
                  <div className="absolute bottom-3 right-3 w-4 h-4 bg-pink-400 rounded-full blur-sm"></div>
                </div>
              </div>

              {/* Glow effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial from-purple-500/20 via-transparent to-transparent blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-purple-900/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-linear-to-tr from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
    </section>
  );
}

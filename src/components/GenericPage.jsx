import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GenericPage({ title, subtitle, image }) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-[#0c0c0c] text-white pt-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="relative h-[60vh] rounded-[40px] overflow-hidden mb-16">
                    <img
                        src={image || "https://images.unsplash.com/photo-1570215777329-31846baaa7df?q=80&w=2787&auto=format&fit=crop"}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="font-serif text-6xl md:text-8xl mb-4 text-white drop-shadow-2xl">{title}</h1>
                            <p className="font-sans text-xl tracking-widest uppercase opacity-90">{subtitle}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
                    <div>
                        <h2 className="font-serif text-4xl mb-6">Perfection in Every Detail</h2>
                        <p className="font-sans text-lg opacity-70 leading-relaxed mb-6">
                            At RefindRide.Detailing, we believe that your vehicle is more than just transportation; it's an extension of your personality and a significant investment.
                            Our master detailers are dedicated to preserving and enhancing the beauty of your automobile.
                        </p>
                        <p className="font-sans text-lg opacity-70 leading-relaxed">
                            Whether you drive a daily commuter, a classic collectable, or a modern supercar,
                            we apply the same level of precision and care to ensure a showroom-quality finish that lasts.
                        </p>
                    </div>
                    <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
                        <h3 className="font-sans font-bold text-xl mb-6 uppercase tracking-wider">Page Highlights</h3>
                        <ul className="space-y-4 font-sans opacity-80">
                            <li className="flex items-center gap-4">
                                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                                Certified Installers
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                                Premium Products
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                                Climate Controlled Studio
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                                Satisfaction Guaranteed
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

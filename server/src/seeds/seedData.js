// Seed dataset for SmartShop Knowledge Graph

const categories = [
  {
    name: 'Computing & Productivity',
    slug: 'computing',
    description: 'High-performance laptops, monitors, ergonomic peripherals, and workstation accessories.',
    icon: 'Laptop',
    color: '#3b82f6'
  },
  {
    name: 'Audio & Acoustics',
    slug: 'audio',
    description: 'Studio headphones, noise-canceling earbuds, DACs, and high-fidelity sound gear.',
    icon: 'Headphones',
    color: '#8b5cf6'
  },
  {
    name: 'Gaming & VR',
    slug: 'gaming',
    description: 'Mechanical keyboards, ultra-fast gaming mice, headsets, and immersive accessories.',
    icon: 'Gamepad2',
    color: '#ec4899'
  },
  {
    name: 'Smart Living & IoT',
    slug: 'smart-home',
    description: 'Smart ambient lighting, automated hubs, environmental sensors, and smart plugs.',
    icon: 'Home',
    color: '#10b981'
  },
  {
    name: 'Health & Fitness',
    slug: 'fitness',
    description: 'GPS multisport smartwatches, biometric trackers, and active lifestyle accessories.',
    icon: 'Activity',
    color: '#f97316'
  },
  {
    name: 'Photography & Content Creation',
    slug: 'creator',
    description: 'Mirrorless cameras, 4K webcams, studio microphones, and streaming lighting.',
    icon: 'Camera',
    color: '#06b6d4'
  }
];

const interests = [
  {
    name: 'Remote Work & Productivity',
    slug: 'remote-work',
    description: 'Optimizing home workspace efficiency, dual monitors, and multitasking tools.',
    categoryHint: 'Computing & Productivity',
    color: '#3b82f6'
  },
  {
    name: 'High-Fidelity Audio',
    slug: 'hi-fi-audio',
    description: 'Audiophile listening, lossless acoustics, and studio-grade sound reproduction.',
    categoryHint: 'Audio & Acoustics',
    color: '#8b5cf6'
  },
  {
    name: 'Competitive Gaming',
    slug: 'competitive-gaming',
    description: 'Low-latency peripherals, esports hardware, and RGB mechanical gear.',
    categoryHint: 'Gaming & VR',
    color: '#ec4899'
  },
  {
    name: 'Smart Home Automation',
    slug: 'smart-home-automation',
    description: 'Voice-controlled devices, smart illumination, and automated routines.',
    categoryHint: 'Smart Living & IoT',
    color: '#10b981'
  },
  {
    name: 'Endurance Fitness & Running',
    slug: 'fitness-running',
    description: 'Cardio tracking, recovery metrics, lightweight sports gear, and heart-rate monitoring.',
    categoryHint: 'Health & Fitness',
    color: '#f97316'
  },
  {
    name: 'Digital Content Creation',
    slug: 'content-creation',
    description: 'Podcasting, YouTube streaming, video editing, and pro creator lighting.',
    categoryHint: 'Photography & Content Creation',
    color: '#06b6d4'
  },
  {
    name: 'Ergonomics & Posture',
    slug: 'ergonomics',
    description: 'Wrist support, vertical mice, monitor arms, and posture alignment.',
    categoryHint: 'Computing & Productivity',
    color: '#6366f1'
  },
  {
    name: 'Minimalist Tech Setup',
    slug: 'minimalist-tech',
    description: 'Clean cable-free desks, sleek wireless gear, and compact modern devices.',
    categoryHint: 'Computing & Productivity',
    color: '#64748b'
  }
];

const products = [
  // Computing & Productivity
  {
    slug: 'probook-16-laptop',
    name: 'ProBook Ultra 16 Laptop',
    category: 'Computing & Productivity',
    price: 1499,
    originalPrice: 1699,
    rating: 4.8,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    description: 'Flagship 16-inch aluminum workstation powered by 12-core processor with 32GB RAM and Liquid Retina display.',
    features: ['16-inch 120Hz Retina Display', '32GB Unified Memory', '1TB NVMe Gen4 SSD', '20-hour battery life'],
    badge: 'Bestseller',
    matchingInterests: ['Remote Work & Productivity', 'Digital Content Creation']
  },
  {
    slug: 'ergonomic-wireless-mouse',
    name: 'MasterGlide Ergonomic Mouse',
    category: 'Computing & Productivity',
    price: 99,
    originalPrice: 119,
    rating: 4.7,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    description: 'Scientifically sculpted vertical grip mouse reducing wrist strain with electromagnetic precision scroll.',
    features: ['57-degree natural handshake angle', '4000 DPI sensor', 'Multi-device Bluetooth & 2.4GHz', 'USB-C fast charge'],
    badge: 'Ergonomic Choice',
    matchingInterests: ['Ergonomics & Posture', 'Remote Work & Productivity', 'Minimalist Tech Setup']
  },
  {
    slug: 'ultrawide-curved-monitor',
    name: 'Horizon 34" Curved WQHD Monitor',
    category: 'Computing & Productivity',
    price: 549,
    originalPrice: 629,
    rating: 4.9,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    description: 'Immersive 34-inch panoramic curved display with 99% sRGB color accuracy, USB-C 90W PD hub.',
    features: ['3440 x 1440 WQHD resolution', '1500R curvature', 'USB-C Single Cable docking', 'Built-in KVM switch'],
    badge: 'Staff Pick',
    matchingInterests: ['Remote Work & Productivity', 'Digital Content Creation']
  },
  {
    slug: 'thunderbolt-docking-station',
    name: 'OmniPort 12-in-1 Thunderbolt 4 Dock',
    category: 'Computing & Productivity',
    price: 189,
    originalPrice: 219,
    rating: 4.6,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: 'Connect dual 4K monitors, high-speed NVMe storage, Gigabit LAN, and 96W charging with a single cable.',
    features: ['Dual 4K@60Hz display support', '40Gbps Thunderbolt 4 speed', '96W Host Power Delivery', 'Aluminum heat-dissipation chassis'],
    badge: 'Pro Accessory',
    matchingInterests: ['Remote Work & Productivity', 'Minimalist Tech Setup']
  },

  // Audio & Acoustics
  {
    slug: 'acoustic-pro-headphones',
    name: 'AcousticPro Studio Noise-Canceling Headphones',
    category: 'Audio & Acoustics',
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 884,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Premium wireless over-ear headphones with custom planar magnetic drivers, adaptive ANC, and 40h playtime.',
    features: ['Active Noise Cancellation', 'Custom 40mm planar drivers', 'Lossless LDAC audio codec', 'Memory foam earcups'],
    badge: 'Top Rated',
    matchingInterests: ['High-Fidelity Audio', 'Remote Work & Productivity']
  },
  {
    slug: 'audiophile-desktop-dac',
    name: 'SoundCraft Hi-Res Desktop DAC & Amp',
    category: 'Audio & Acoustics',
    price: 179,
    originalPrice: 199,
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    description: 'High-resolution digital-to-analog converter supporting 32-bit/768kHz and DSD512 for studio monitors.',
    features: ['ESS Sabre ES9038Q2M chip', 'Balanced 4.4mm + 6.35mm outputs', 'CNC anodized chassis', 'Zero background noise'],
    badge: 'Audiophile',
    matchingInterests: ['High-Fidelity Audio']
  },
  {
    slug: 'puretone-earbuds',
    name: 'PureTone ANC Wireless Earbuds',
    category: 'Audio & Acoustics',
    price: 159,
    originalPrice: 179,
    rating: 4.6,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    description: 'Pocket-sized true wireless earbuds with transparent spatial audio, wind cancellation, and wireless charging case.',
    features: ['Active Transparency mode', 'IPX5 water & sweat resistance', '32-hour total battery life', 'Multipoint pairing'],
    badge: 'Commuter Pick',
    matchingInterests: ['Endurance Fitness & Running', 'Remote Work & Productivity']
  },
  {
    slug: 'headphone-stand-with-charger',
    name: 'AeroStand Aluminum Stand with Qi Charger',
    category: 'Audio & Acoustics',
    price: 49,
    originalPrice: 59,
    rating: 4.5,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
    description: 'Minimalist weighted headphone stand with integrated 15W MagSafe-compatible wireless charging base.',
    features: ['Aviation-grade aluminum rod', '15W wireless fast charge pad', 'Curved silicone cradle', 'Anti-slip rubber base'],
    badge: 'Accessory',
    matchingInterests: ['High-Fidelity Audio', 'Minimalist Tech Setup']
  },

  // Gaming & VR
  {
    slug: 'vortex-mechanical-keyboard',
    name: 'Vortex RGB Hot-Swap Mechanical Keyboard',
    category: 'Gaming & VR',
    price: 139,
    originalPrice: 159,
    rating: 4.8,
    reviewsCount: 630,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    description: '75% layout mechanical gaming keyboard with pre-lubed linear switches, gasket mount, and per-key RGB.',
    features: ['Hot-swappable PCB (3/5 pin)', 'Sound-dampening silicone gaskets', 'South-facing RGB LEDs', 'Tri-mode connectivity'],
    badge: 'Popular',
    matchingInterests: ['Competitive Gaming', 'Remote Work & Productivity']
  },
  {
    slug: 'pulse-wireless-gaming-mouse',
    name: 'Pulse 49g Ultralight Gaming Mouse',
    category: 'Gaming & VR',
    price: 89,
    originalPrice: 109,
    rating: 4.7,
    reviewsCount: 389,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    description: 'Sub-50 gram wireless esports mouse with 26,000 DPI optical sensor and optical switches rated for 90M clicks.',
    features: ['49g featherweight shell', 'PAW3395 26K DPI optical sensor', '1000Hz polling rate', 'Pure PTFE glide skates'],
    badge: 'Esports Ready',
    matchingInterests: ['Competitive Gaming']
  },
  {
    slug: 'speedweave-gaming-mousepad',
    name: 'SpeedWeave XL Desk Mat (900x400mm)',
    category: 'Gaming & VR',
    price: 34,
    originalPrice: 42,
    rating: 4.9,
    reviewsCount: 810,
    image: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=600&q=80',
    description: 'Precision hybrid surface desk mat engineered for micro-adjustments and swift glides with stitched edges.',
    features: ['Micro-knit water-repellent surface', 'Non-slip natural rubber base', 'Anti-fray seamless stitching', '900 x 400 x 4mm dimensions'],
    badge: 'Essential',
    matchingInterests: ['Competitive Gaming', 'Minimalist Tech Setup']
  },
  {
    slug: 'vr-headset-quest-mount',
    name: 'AeroGrip Elite Strap for VR',
    category: 'Gaming & VR',
    price: 59,
    originalPrice: 69,
    rating: 4.6,
    reviewsCount: 204,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=600&q=80',
    description: 'Ergonomic counter-balance head strap with built-in 5000mAh battery pack extending playtime by 3 hours.',
    features: ['Built-in 5000mAh extended battery', 'Dial-adjustment fit wheel', 'Memory foam rear cushion', 'Even weight distribution'],
    badge: 'VR Gear',
    matchingInterests: ['Competitive Gaming']
  },

  // Smart Living & IoT
  {
    slug: 'luma-smart-rgb-lightbar',
    name: 'LumaGlow Smart LED Desk Lightbar',
    category: 'Smart Living & IoT',
    price: 69,
    originalPrice: 79,
    rating: 4.7,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    description: 'Monitor-mounted asymmetrical optical task lightbar with ambient rear RGB backlighting and wireless desktop dial.',
    features: ['Zero screen glare optical design', 'Wireless desktop control dial', 'RGB ambient sync backlighting', 'Matter & Apple Home compatible'],
    badge: 'Desk Must-Have',
    matchingInterests: ['Smart Home Automation', 'Remote Work & Productivity', 'Minimalist Tech Setup']
  },
  {
    slug: 'homepulse-hub',
    name: 'HomePulse Universal Matter Hub',
    category: 'Smart Living & IoT',
    price: 119,
    originalPrice: 139,
    rating: 4.6,
    reviewsCount: 178,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Unified smart home coordinator bridging Zigbee, Thread, Z-Wave, and Wi-Fi devices into one responsive automation system.',
    features: ['Thread border router capability', 'Local automation execution', 'Zigbee 3.0 & BLE radios', 'Voice assistant integration'],
    badge: 'Smart Center',
    matchingInterests: ['Smart Home Automation']
  },
  {
    slug: 'smart-ambient-bulb-pack',
    name: 'AuraColor Smart Light Bulb 4-Pack',
    category: 'Smart Living & IoT',
    price: 49,
    originalPrice: 65,
    rating: 4.8,
    reviewsCount: 680,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80',
    description: '16 million colors with tunable white (2200K - 6500K) and circadian rhythm scheduling.',
    features: ['16M colors + tunable white', '800 lumens per bulb (60W eq)', 'Schedule & scene triggers', 'No separate bridge needed'],
    badge: 'Value Pack',
    matchingInterests: ['Smart Home Automation']
  },
  {
    slug: 'smart-energy-monitoring-plug',
    name: 'PowerTrack Smart Energy Plug 2-Pack',
    category: 'Smart Living & IoT',
    price: 29,
    originalPrice: 35,
    rating: 4.5,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=600&q=80',
    description: 'Compact 15A smart plugs with live power wattage tracking, historical consumption graphs, and timer shutoff.',
    features: ['Real-time power monitoring', 'Overload thermal protection', 'Voice control support', 'Compact slim profile'],
    badge: 'Eco Smart',
    matchingInterests: ['Smart Home Automation']
  },

  // Health & Fitness
  {
    slug: 'apex-multisport-gps-watch',
    name: 'Apex Runner Pro Multisport GPS Watch',
    category: 'Health & Fitness',
    price: 399,
    originalPrice: 449,
    rating: 4.9,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    description: 'Titanium bezel sports watch with dual-frequency GNSS, ECG heart-rate tracking, offline topo maps, and 14-day battery.',
    features: ['Dual-frequency multiband GPS', 'Heart Rate Variability & SpO2', '100m water resistance (10 ATM)', '14 days smartwatch battery'],
    badge: 'Athlete Grade',
    matchingInterests: ['Endurance Fitness & Running']
  },
  {
    slug: 'biostrap-chest-heart-rate-monitor',
    name: 'BioPulse ECG Chest Strap Heart Rate Monitor',
    category: 'Health & Fitness',
    price: 69,
    originalPrice: 79,
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=600&q=80',
    description: 'Laboratory-accurate electrocardiogram chest strap with ANT+ and dual Bluetooth broadcasting.',
    features: ['ECG-grade sensor accuracy', 'Dual simultaneous Bluetooth channels', 'Washable elastic chest strap', '400-hour battery life'],
    badge: 'Precision',
    matchingInterests: ['Endurance Fitness & Running']
  },
  {
    slug: 'deep-tissue-percussion-massager',
    name: 'PulseRelief Mini Percussion Massage Gun',
    category: 'Health & Fitness',
    price: 89,
    originalPrice: 110,
    rating: 4.7,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80',
    description: 'Compact 500g brushless motor massage gun delivering 3200 RPM for fast muscle recovery and soreness relief.',
    features: ['Brushless 45W high-torque motor', '4 interchangeable head attachments', 'Ultra-quiet <40dB operation', 'Aluminum carrying case'],
    badge: 'Recovery',
    matchingInterests: ['Endurance Fitness & Running', 'Ergonomics & Posture']
  },
  {
    slug: 'smart-body-composition-scale',
    name: 'SmartScale Pro Body Composition Scale',
    category: 'Health & Fitness',
    price: 59,
    originalPrice: 69,
    rating: 4.6,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    description: 'Dual-frequency BIA scale tracking body fat percentage, muscle mass, visceral fat, and hydration synced via Wi-Fi.',
    features: ['14 bio-impedance body metrics', 'Automatic multi-user detection', 'Wi-Fi & Bluetooth instant sync', 'Tempered glass ITO surface'],
    badge: 'Fitness Tech',
    matchingInterests: ['Endurance Fitness & Running']
  },

  // Photography & Content Creation
  {
    slug: 'lumix-creator-camera',
    name: 'CineCam 4K Creator Mirrorless Camera',
    category: 'Photography & Content Creation',
    price: 899,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    description: 'Compact APS-C mirrorless camera featuring 4K 60fps 10-bit recording, flip-out touchscreen, and real-time eye autofocus.',
    features: ['4K@60p 10-bit internal video', 'Flip-out vari-angle LCD', 'Real-time phase-detect AF', 'Clean HDMI live-feed output'],
    badge: 'Creator Top Choice',
    matchingInterests: ['Digital Content Creation']
  },
  {
    slug: 'studio-cardioid-microphone',
    name: 'VoiceWave Pro USB-C Studio Microphone',
    category: 'Photography & Content Creation',
    price: 129,
    originalPrice: 149,
    rating: 4.8,
    reviewsCount: 495,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    description: 'Broadcast-grade condenser capsule with internal pop filter, zero-latency monitoring, and tap-to-mute sensor.',
    features: ['24-bit/96kHz recording resolution', 'Cardioid & omni polar patterns', 'Touch tap-to-mute with LED indicator', 'Heavy metal desktop base'],
    badge: 'Streamer Favorite',
    matchingInterests: ['Digital Content Creation', 'Remote Work & Productivity', 'High-Fidelity Audio']
  },
  {
    slug: 'bi-color-key-light',
    name: 'GlowPanel Edge-Lit Streaming Key Light',
    category: 'Photography & Content Creation',
    price: 109,
    originalPrice: 129,
    rating: 4.7,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    description: 'Professional edge-lit desk clamp LED panel delivering soft glare-free illumination with app and Wi-Fi control.',
    features: ['2800 Lumens edge-lit diffused beam', 'Color temperature 2900K - 7000K', 'Heavy-duty desk clamp pole', 'Smartphone app and desktop control'],
    badge: 'Studio Gear',
    matchingInterests: ['Digital Content Creation', 'Remote Work & Productivity']
  },
  {
    slug: 'carbon-fiber-tripod',
    name: 'AeroTripod Carbon Fiber Travel Tripod',
    category: 'Photography & Content Creation',
    price: 149,
    originalPrice: 179,
    rating: 4.8,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=600&q=80',
    description: 'Weighing only 1.1kg with Arca-Swiss ball head, 360-degree panoramic panning, and invertible center column.',
    features: ['8-layer carbon fiber legs', 'Arca-Swiss precision ball head', '10kg max payload capacity', 'Folds down to 35cm'],
    badge: 'Travel Pro',
    matchingInterests: ['Digital Content Creation']
  }
];

const customers = [
  {
    name: 'Alex Rivera',
    email: 'alex.rivera@techflow.dev',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'Senior Software Engineer',
    bio: 'Full-stack developer working remotely. Passionate about productivity tools, clean desk aesthetics, and ergonomic gear.',
    preferredCategories: ['Computing & Productivity', 'Smart Living & IoT'],
    interests: ['Remote Work & Productivity', 'Ergonomics & Posture', 'Minimalist Tech Setup'],
    purchases: ['probook-16-laptop'] // Initially purchased the laptop!
  },
  {
    name: 'Sophia Chen',
    email: 'sophia.chen@soundstudio.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    role: 'Audio Producer & Musician',
    bio: 'Music producer and sound designer obsessed with pristine audio reproduction, studio monitoring, and acoustic fidelity.',
    preferredCategories: ['Audio & Acoustics'],
    interests: ['High-Fidelity Audio', 'Digital Content Creation'],
    purchases: ['acoustic-pro-headphones'] // Initially purchased the headphones!
  },
  {
    name: 'Marcus Vance',
    email: 'marcus.vance@esportszone.gg',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'Competitive Esports Player',
    bio: 'Touring FPS tournament player seeking lowest latency peripherals, rapid-trigger keyboards, and featherweight mice.',
    preferredCategories: ['Gaming & VR'],
    interests: ['Competitive Gaming', 'Minimalist Tech Setup'],
    purchases: ['vortex-mechanical-keyboard'] // Initially purchased the gaming keyboard!
  },
  {
    name: 'Elena Rostova',
    email: 'elena.rostova@smarthaven.net',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    role: 'IoT Architect & Home Innovator',
    bio: 'Enthusiast automating every room in her home. Loves smart lighting routines, energy tracking, and Matter integration.',
    preferredCategories: ['Smart Living & IoT'],
    interests: ['Smart Home Automation', 'Minimalist Tech Setup'],
    purchases: ['homepulse-hub'] // Initially purchased the smart hub!
  },
  {
    name: 'Liam O’Connor',
    email: 'liam.runner@marathontraining.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    role: 'Marathon Runner & Triathlete',
    bio: 'Distance runner training 6 days a week. Focuses on pacing metrics, recovery tracking, and high-performance sports accessories.',
    preferredCategories: ['Health & Fitness', 'Audio & Acoustics'],
    interests: ['Endurance Fitness & Running', 'High-Fidelity Audio'],
    purchases: ['apex-multisport-gps-watch'] // Initially purchased the GPS watch!
  },
  {
    name: 'Maya Patel',
    email: 'maya.patel@creativevlog.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    role: 'YouTube Creator & Streamer',
    bio: 'Tech reviewer and educator building a home broadcast studio. Always looking for cameras, pro lighting, and crisp audio.',
    preferredCategories: ['Photography & Content Creation', 'Computing & Productivity'],
    interests: ['Digital Content Creation', 'Remote Work & Productivity'],
    purchases: ['lumix-creator-camera'] // Initially purchased the camera!
  },
  {
    name: 'Daniel Kim',
    email: 'daniel.kim@deskminimal.org',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    role: 'Product Designer',
    bio: 'UX designer striving for clean minimalism and ergonomic health during long CAD and prototyping sessions.',
    preferredCategories: ['Computing & Productivity', 'Smart Living & IoT'],
    interests: ['Ergonomics & Posture', 'Remote Work & Productivity', 'Smart Home Automation'],
    purchases: ['ultrawide-curved-monitor'] // Initially purchased the ultrawide monitor!
  },
  {
    name: 'Zoe Washington',
    email: 'zoe.washington@hybridfitness.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    role: 'Hybrid Athlete & Wellness Coach',
    bio: 'Fitness instructor and podcast host balancing active training with recording online workout guides.',
    preferredCategories: ['Health & Fitness', 'Photography & Content Creation'],
    interests: ['Endurance Fitness & Running', 'Digital Content Creation', 'Ergonomics & Posture'],
    purchases: ['deep-tissue-percussion-massager'] // Initially purchased massager!
  }
];

// Explicit Semantic Product Relationships:
// Accessories: Product A HAS_ACCESSORY Product B
const accessories = [
  // ProBook 16 Laptop accessories
  { from: 'probook-16-laptop', to: 'ergonomic-wireless-mouse', description: 'Ergonomic navigation accessory for ProBook laptop' },
  { from: 'probook-16-laptop', to: 'thunderbolt-docking-station', description: 'Single-cable multiport dock expansion' },
  { from: 'probook-16-laptop', to: 'ultrawide-curved-monitor', description: 'Secondary external ultrawide display' },

  // AcousticPro Headphones accessories
  { from: 'acoustic-pro-headphones', to: 'audiophile-desktop-dac', description: 'Hi-Res DAC amplifier driving planar headphones' },
  { from: 'acoustic-pro-headphones', to: 'headphone-stand-with-charger', description: 'Aluminum desk stand with integrated wireless charging' },

  // Vortex Mechanical Keyboard accessories
  { from: 'vortex-mechanical-keyboard', to: 'pulse-wireless-gaming-mouse', description: 'Matching ultra-fast esports mouse' },
  { from: 'vortex-mechanical-keyboard', to: 'speedweave-gaming-mousepad', description: 'Extended desk mat pairing for keyboard and mouse' },

  // HomePulse Hub accessories
  { from: 'homepulse-hub', to: 'smart-ambient-bulb-pack', description: 'Color smart light bulbs managed via HomePulse Hub' },
  { from: 'homepulse-hub', to: 'smart-energy-monitoring-plug', description: 'Matter-controlled energy monitoring plugs' },
  { from: 'homepulse-hub', to: 'luma-smart-rgb-lightbar', description: 'Ambient lighting integrated with smart home scenes' },

  // Apex Multisport GPS Watch accessories
  { from: 'apex-multisport-gps-watch', to: 'biostrap-chest-heart-rate-monitor', description: 'Precision ECG chest strap pairing with GPS watch' },
  { from: 'apex-multisport-gps-watch', to: 'puretone-earbuds', description: 'Sweat-resistant wireless earbuds for running' },

  // Lumix Creator Camera accessories
  { from: 'lumix-creator-camera', to: 'carbon-fiber-tripod', description: 'Lightweight carbon fiber tripod for camera stability' },
  { from: 'lumix-creator-camera', to: 'bi-color-key-light', description: 'Studio key lighting for video broadcasting' },
  { from: 'lumix-creator-camera', to: 'studio-cardioid-microphone', description: 'Pro condenser microphone for studio video audio' }
];

// Related products: Product A RELATED_TO Product B (bidirectional/peer affinity)
const relatedProducts = [
  { from: 'probook-16-laptop', to: 'vortex-mechanical-keyboard', description: 'Mechanical keyboard upgrade for laptop productivity' },
  { from: 'ultrawide-curved-monitor', to: 'luma-smart-rgb-lightbar', description: 'Screen lightbar mounted directly on curved monitor' },
  { from: 'acoustic-pro-headphones', to: 'puretone-earbuds', description: 'Mobile wireless earbuds companion to studio headphones' },
  { from: 'pulse-wireless-gaming-mouse', to: 'vr-headset-quest-mount', description: 'Immersive gaming peripheral pairing' },
  { from: 'bi-color-key-light', to: 'studio-cardioid-microphone', description: 'Core studio streaming equipment combo' },
  { from: 'deep-tissue-percussion-massager', to: 'smart-body-composition-scale', description: 'Comprehensive athletic recovery and health tracking' },
  { from: 'ergonomic-wireless-mouse', to: 'speedweave-gaming-mousepad', description: 'Smooth glide surface for ergonomic mouse' },
  { from: 'luma-smart-rgb-lightbar', to: 'smart-ambient-bulb-pack', description: 'Synchronized ambient room lighting' }
];

module.exports = {
  categories,
  interests,
  products,
  customers,
  accessories,
  relatedProducts
};

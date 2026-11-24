/**
 * Popular Jana Neethi Medicals & Surgicals — Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    const header = document.getElementById('header');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const openMobileBtn = document.getElementById('openMobileMenu');
    const closeMobileBtn = document.getElementById('closeMobileMenu');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    const modal = document.getElementById('appModal');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const openSearchBtn = document.getElementById('openSearchBtn');

    // Sticky header elevation (rAF-throttled to avoid forced synchronous reflow)
    let scrollTicking = false;
    const updateHeaderShadow = () => {
        scrollTicking = false;
        header.classList.toggle('scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            scrollTicking = true;
            window.requestAnimationFrame(updateHeaderShadow);
        }
    }, { passive: true });

    // Mobile drawer controls
    const setDrawerOpen = (isOpen) => {
        mobileDrawer.classList.toggle('open', isOpen);
        mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    openMobileBtn?.addEventListener('click', () => setDrawerOpen(true));
    closeMobileBtn?.addEventListener('click', () => setDrawerOpen(false));
    mobileBackdrop?.addEventListener('click', () => setDrawerOpen(false));
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => setDrawerOpen(false));
    });

    // Data for interactive modals
    const SERVICE_DATA = {
        medicines: {
            badge: 'PHARMACY & JAN AUSHADHI',
            title: 'Medicines',
            lead: '100% genuine prescription medicines, Jan Aushadhi generics, OTC essentials, and daily healthcare supplements with fast home delivery.',
            items: [
                'Prescription & Chronic Care',
                'Jan Aushadhi Generic Medicines',
                'Vitamins & Health Supplements',
                'Diabetes & Cardiac Care',
                'Baby & Maternal Care',
                'Same-Day Home Delivery'
            ],
            waText: 'Hello Popular Jana Neethi Medicals, I would like to order medicines.'
        },
        surgicals: {
            badge: 'HOSPITAL & CLINICAL SUPPLIES',
            title: 'Surgical Products',
            lead: 'Complete range of sterile surgical instruments, disposables, wound-care dressings, and clinic consumables for hospitals and home nursing.',
            items: [
                'Stainless Steel Surgical Instruments',
                'Sterile Gauze, Bandages & Dressings',
                'Nitrile & Latex Medical Gloves',
                'IV Sets, Syringes & Catheters',
                'Orthopedic Braces & Supports',
                'Bulk Clinic & Hospital Supply'
            ],
            waText: 'Hello Popular Jana Neethi Medicals, I would like to enquire about surgical products.'
        },
        equipment: {
            badge: 'HOME & CLINICAL DEVICES',
            title: 'Medical Equipment',
            lead: 'Certified diagnostic and patient-monitoring equipment from trusted healthcare brands for accurate monitoring at home or clinic.',
            items: [
                'Digital BP Monitors',
                'Pulse Oximeters & Thermometers',
                'Nebulizers & Steamers',
                'Glucometers & Test Strips',
                'Stethoscopes & Diagnostic Kits',
                'Mobility Aids & Walkers'
            ],
            waText: 'Hello Popular Jana Neethi Medicals, I would like to enquire about medical equipment.'
        },
        emi: {
            badge: 'EMI AVAILABLE',
            title: 'EMI Shopping for Medical Equipment',
            lead: 'Bring home essential high-value medical equipment without upfront financial strain. Flexible, easy EMI plans available across our stores.',
            items: [
                'Oxygen Concentrators (5L / 10L)',
                'CPAP & BiPAP Machines',
                'Multi-Parameter Patient Monitors',
                'Motorized Hospital Beds',
                'Air Mattresses & Suction Units',
                'Quick In-Store EMI Approval'
            ],
            waText: 'Hello Popular Jana Neethi Medicals, I would like to know about EMI options for medical equipment.'
        },
        rental: {
            badge: 'RENTAL SERVICE',
            title: 'Medical Equipment Rental',
            lead: 'Sanitized, well-maintained hospital and home-care equipment available on affordable daily, weekly, or monthly rental plans.',
            items: [
                'Fowler & Semi-Fowler Hospital Beds',
                'Foldable & Reclining Wheelchairs',
                'Oxygen Concentrators & Cylinders',
                'BiPAP / CPAP & Nebulizers',
                'Air Beds & Anti-Decubitus Mattresses',
                'Doorstep Delivery & Setup'
            ],
            waText: 'Hello Popular Jana Neethi Medicals, I would like to enquire about medical equipment rental.'
        }
    };

    const STORES = [
        {
            name: 'Jan Aushadhi Kendra — Angadippuram',
            address: 'Calicut road, Angadippuram, Kerala 679321',
            hours: 'Mon – Sat · Opens at 9:30 AM',
            maps: 'https://www.google.com/maps/search/?api=1&query=Jan+Aushadhi+Kendra+Calicut+road+Angadippuram+Kerala+679321'
        },
        {
            name: 'Popular Jananeethi Medicals and Surgicals',
            address: 'OOTTY ROAD, State Highway 39, Perintalmanna, Kerala 679322',
            hours: 'Mon – Sat · Opens at 9:30 AM',
            maps: 'https://www.google.com/maps/search/?api=1&query=Popular+Jananeethi+Medicals+and+Surgicals+Ootty+Road+Perintalmanna+Kerala+679322'
        },
        {
            name: 'Pradhan Mantri Jan Aushadhi Kendra — Shanti Nagar',
            address: 'Shanti Nagar, Perintalmanna, Kerala 679322',
            hours: 'Mon – Sat · Opens at 9:30 AM',
            maps: 'https://www.google.com/maps/search/?api=1&query=Pradhan+Mantri+Jan+Aushadhi+Kendra+Shanti+Nagar+Perintalmanna+Kerala+679322'
        },
        {
            name: 'Prime Minister Jan Aushadhi Center — Moulana Hospital',
            address: 'Opposite Moulana Hospitals, Perinthalmanna, Malappuram, Kerala 679322',
            hours: 'Mon – Sat · Opens at 9:30 AM',
            maps: 'https://www.google.com/maps/search/?api=1&query=Moulana+Hospital+Perinthalmanna+Kerala+679322'
        }
    ];

    const openModal = (html) => {
        modalBody.innerHTML = html;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (window.lucide) {
            lucide.createIcons();
        }
    };

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    modalCloseBtn?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('open')) closeModal();
            if (mobileDrawer.classList.contains('open')) setDrawerOpen(false);
        }
    });

    const openServiceModal = (key) => {
        const data = SERVICE_DATA[key];
        if (!data) return;
        const waUrl = `https://wa.me/918943226001?text=${encodeURIComponent(data.waText)}`;
        openModal(`
            <span class="modal-badge">${data.badge}</span>
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-lead">${data.lead}</p>
            <ul class="modal-list">
                ${data.items.map((item) => `<li>${item}</li>`).join('')}
            </ul>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-red">
                <span>Enquire on WhatsApp</span>
                <i data-lucide="arrow-right"></i>
            </a>
        `);
    };

    const openStoresModal = (isAbout = false) => {
        const headerHtml = isAbout
            ? `
                <span class="modal-badge">ABOUT &amp; CONTACT</span>
                <h3 class="modal-title">Popular Jana Neethi Medicals &amp; Surgicals</h3>
                <p class="modal-lead">
                    Your trusted healthcare partner across Perinthalmanna and Angadippuram — offering genuine prescription &amp; Jan Aushadhi medicines, surgical supplies, medical equipment on EMI, home-care equipment rentals, and reliable home delivery.
                </p>
              `
            : `
                <span class="modal-badge">MULTIPLE OUTLETS</span>
                <h3 class="modal-title">Our Store Network</h3>
                <p class="modal-lead">Visit any of our Popular Jana Neethi &amp; Jan Aushadhi outlets for medicines, surgicals, EMI shopping, or equipment rentals.</p>
              `;

        openModal(`
            ${headerHtml}
            <div class="modal-stores-list">
                ${STORES.map((s) => `
                    <div class="modal-store-item">
                        <h4>${s.name}</h4>
                        <p>${s.address}<br><strong>Hours:</strong> ${s.hours}</p>
                        <a href="${s.maps}" target="_blank" rel="noopener noreferrer" class="store-btn" style="display:inline-flex; flex:none; padding:7px 14px;">
                            <i data-lucide="map-pin"></i>
                            <span>Get Directions</span>
                        </a>
                    </div>
                `).join('')}
            </div>
        `);
    };

    const openSearchModal = () => {
        const searchable = [
            ...Object.entries(SERVICE_DATA).map(([key, val]) => ({
                type: 'service',
                key,
                title: val.title,
                subtitle: val.items.slice(0, 3).join(' · ')
            })),
            ...STORES.map((s) => ({
                type: 'store',
                url: s.maps,
                title: s.name,
                subtitle: s.address
            }))
        ];

        openModal(`
            <span class="modal-badge">QUICK SEARCH</span>
            <h3 class="modal-title">Search Products &amp; Stores</h3>
            <div class="search-input-wrap">
                <i data-lucide="search" style="width:18px;height:18px;color:#B81421;"></i>
                <input type="text" id="quickSearchInput" placeholder="Try 'oxygen', 'hospital bed', 'EMI', 'Angadippuram'..." autocomplete="off">
            </div>
            <div class="search-results" id="quickSearchResults"></div>
        `);

        const input = document.getElementById('quickSearchInput');
        const resultsEl = document.getElementById('quickSearchResults');

        const renderResults = (q) => {
            const term = q.trim().toLowerCase();
            const matches = searchable.filter(
                (item) =>
                    !term ||
                    item.title.toLowerCase().includes(term) ||
                    item.subtitle.toLowerCase().includes(term)
            );
            if (!matches.length) {
                resultsEl.innerHTML = `<p class="modal-lead" style="margin:8px 0;">No matches found. Send your requirement directly on WhatsApp!</p>`;
                return;
            }
            resultsEl.innerHTML = matches
                .slice(0, 6)
                .map((m, idx) => `
                    <button type="button" class="search-result-item" data-search-idx="${idx}">
                        <div>
                            <strong>${m.title}</strong>
                            <span>${m.subtitle}</span>
                        </div>
                        <i data-lucide="chevron-right" style="width:16px;height:16px;color:#B81421;flex-shrink:0;"></i>
                    </button>
                `)
                .join('');
            if (window.lucide) lucide.createIcons();

            resultsEl.querySelectorAll('.search-result-item').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const item = matches[Number(btn.dataset.searchIdx)];
                    if (item.type === 'service') {
                        openServiceModal(item.key);
                    } else {
                        window.open(item.url, '_blank', 'noopener,noreferrer');
                    }
                });
            });
        };

        renderResults('');
        input?.focus();
        input?.addEventListener('input', (e) => renderResults(e.target.value));
    };

    // Bind triggers
    document.querySelectorAll('[data-service-modal]').forEach((el) => {
        const handler = (e) => {
            e.preventDefault();
            openServiceModal(el.getAttribute('data-service-modal'));
        };
        el.addEventListener('click', handler);
        if (el.getAttribute('role') === 'button') {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handler(e);
                }
            });
        }
    });

    document.querySelectorAll('[data-open-modal]').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const target = el.getAttribute('data-open-modal');
            openStoresModal(target === 'about');
        });
    });

    openSearchBtn?.addEventListener('click', openSearchModal);
});

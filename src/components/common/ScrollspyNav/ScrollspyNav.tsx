import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './ScrollspyNav.css';

export type ScrollspySection = {
  id: string;
  label: string;
};

type Props = {
  sections: ScrollspySection[];
};

type IndicatorRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

// A slim, sticky in-page navigation bar. Highlights the section currently
// scrolled into view (scrollspy) and smooth-scrolls to a section on click.
// The active highlight is a single pill that slides between items; clicking
// also paints the target with a faint "pending" background until the scroll
// catches up, so it's obvious where you're headed mid-scroll.
export default function ScrollspyNav({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const pendingRef = useRef<string | null>(null);
  const pendingTimer = useRef<number | null>(null);

  const clearPending = () => {
    pendingRef.current = null;
    if (pendingTimer.current) {
      window.clearTimeout(pendingTimer.current);
      pendingTimer.current = null;
    }
    setPendingId(null);
  };

  // Scrollspy: track which section's top has passed under the sticky bar.
  useEffect(() => {
    // The bar parks at `top: env(safe-area-inset-top)`, not at 0, so its resting
    // bottom edge is inset + height. getComputedStyle resolves the env() to px
    // for us (0 outside a standalone PWA), keeping this in step with the CSS.
    const getOffset = () => {
      const nav = navRef.current;
      if (!nav) return 16 + 16;
      const stickyTop = parseFloat(getComputedStyle(nav).top) || 0;
      return stickyTop + nav.offsetHeight + 16 + 16;
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = getOffset();
      let current = sections[0]?.id ?? '';

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 1) {
          current = section.id;
        }
      }

      // When scrolled to the very bottom, force the last section active even
      // if its top never crosses the line (short final section).
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        current = sections[sections.length - 1]?.id ?? current;
      }

      setActiveId(current);

      // Arrived at the click target -> drop the "pending" hint.
      if (pendingRef.current && current === pendingRef.current) {
        clearPending();
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  // If the user takes over scrolling, abandon the pending hint.
  useEffect(() => {
    const onManualScroll = () => {
      if (pendingRef.current) clearPending();
    };
    window.addEventListener('wheel', onManualScroll, { passive: true });
    window.addEventListener('touchstart', onManualScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', onManualScroll);
      window.removeEventListener('touchstart', onManualScroll);
    };
  }, []);

  // Keep the sliding pill aligned to the active link.
  useLayoutEffect(() => {
    const el = linkRefs.current.get(activeId);
    if (!el) return;
    setIndicator({
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
    });
  }, [activeId, sections]);

  useEffect(() => {
    const onResize = () => {
      const el = linkRefs.current.get(activeId);
      if (!el) return;
      setIndicator({
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight,
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeId]);

  useEffect(() => () => {
    if (pendingTimer.current) window.clearTimeout(pendingTimer.current);
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Already the active section -> no travel, so skip the pending hint.
    if (id === activeId) {
      clearPending();
      return;
    }

    pendingRef.current = id;
    setPendingId(id);
    if (pendingTimer.current) window.clearTimeout(pendingTimer.current);
    // Safety net in case the smooth scroll never lands exactly on target.
    pendingTimer.current = window.setTimeout(clearPending, 1500);
  };

  return (
    <nav className="scrollspy-nav" ref={navRef} aria-label="Section navigation">
      <div className="scrollspy-nav-inner">
        {indicator && (
          <span
            className="scrollspy-indicator"
            style={{
              transform: `translate(${indicator.left}px, ${indicator.top}px)`,
              width: indicator.width,
              height: indicator.height,
            }}
            aria-hidden="true"
          />
        )}
        {sections.map((section) => {
          const classes = [
            'scrollspy-link',
            activeId === section.id ? 'active' : '',
            pendingId === section.id ? 'pending' : '',
          ].filter(Boolean).join(' ');
          return (
            <a
              key={section.id}
              ref={(el) => {
                if (el) linkRefs.current.set(section.id, el);
                else linkRefs.current.delete(section.id);
              }}
              href={`#${section.id}`}
              className={classes}
              onClick={(e) => handleClick(e, section.id)}
            >
              {section.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

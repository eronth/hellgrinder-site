import { Link } from "react-router-dom";
import "./LoreSubNav.css";

type LoreSubPage = "story" | "setting";

type Props = {
  current: LoreSubPage;
};

export default function LoreSubNav({ current }: Props) {
  return (
    <nav className="lore-sub-nav" aria-label="Lore section navigation">
      <Link to="/lore" className="lore-sub-nav-back">
        ← Lore
      </Link>
      <span className="lore-sub-nav-divider" aria-hidden="true">›</span>
      <div className="lore-sub-nav-tabs" role="tablist">
        <Link
          to="/lore/story"
          className={`lore-sub-nav-tab${current === "story" ? " active" : ""}`}
          aria-current={current === "story" ? "page" : undefined}
          role="tab"
          aria-selected={current === "story"}
        >
          Story
        </Link>
        <Link
          to="/lore/setting"
          className={`lore-sub-nav-tab${current === "setting" ? " active" : ""}`}
          aria-current={current === "setting" ? "page" : undefined}
          role="tab"
          aria-selected={current === "setting"}
        >
          Setting
        </Link>
      </div>
    </nav>
  );
}

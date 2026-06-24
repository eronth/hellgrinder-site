import { Link } from "react-router-dom";
import "./SubPageNav.css";

type SubPage = {
  label: string;
  path: string;
};

type Props = {
  parentLabel: string;
  parentPath: string;
  subPages: SubPage[];
  currentPath: string;
};

export default function SubPageNav({ parentLabel, parentPath, subPages, currentPath }: Props) {
  return (
    <nav className="sub-page-nav" aria-label={`${parentLabel} section navigation`}>
      <Link to={parentPath} className="sub-page-nav-back">
        ← {parentLabel}
      </Link>
      <span className="sub-page-nav-divider" aria-hidden="true">›</span>
      <div className="sub-page-nav-tabs" role="tablist">
        {subPages.map((page) => {
          const isActive = currentPath === page.path;
          return (
            <Link
              key={page.path}
              to={page.path}
              className={`sub-page-nav-tab${isActive ? " active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              role="tab"
              aria-selected={isActive}
            >
              {page.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

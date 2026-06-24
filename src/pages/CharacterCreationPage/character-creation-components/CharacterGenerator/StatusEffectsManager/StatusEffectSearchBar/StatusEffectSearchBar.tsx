import './StatusEffectSearchBar.css';

type Props = {
  searchFilterReactState: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
};
export default function StatusEffectSearchBar({
  searchFilterReactState: [searchFilter, setSearchFilter]
}: Props) {
  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="Search status effects..."
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        className="search-input"
      />
    </div>
  )
}

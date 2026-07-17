import './Safelight.css';
import chipImg from '../../../assets/safelight/chips.png';
import shardImg from '../../../assets/safelight/shard.png';
import gemstoneImg from '../../../assets/safelight/gemstone.png';
import geodeImg from '../../../assets/safelight/geode.png';
import clusterImg from '../../../assets/safelight/cluster.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGem } from '@fortawesome/free-solid-svg-icons';

/* The five graded forms of Safelight, smallest to largest. Each carries its
   own gem image; per-tier render sizes live in Safelight.css. */
const SAFELIGHT_TIERS = [
  { name: 'Chip', img: chipImg },
  { name: 'Shard', img: shardImg },
  { name: 'Gemstone', img: gemstoneImg },
  { name: 'Geode', img: geodeImg },
  { name: 'Cluster', img: clusterImg },
];

type Props = {
  tier?: number;
  /** Renders the plural ("Safelight Shards"). */
  plural?: boolean;
};

export default function Safelight({ tier = 1, plural }: Props) {
  const { name, /*img*/ } = SAFELIGHT_TIERS[tier];
  return (
    <span className={`safelight-keyword safelight-${name.toLowerCase()}`}>
      {/* TODO: Add a gem icon. */}
      {/* <FontAwesomeIcon icon={faGem} className="safelight-icon" /> */}
      {/* <img className="safelight-glyph" src={img} alt="" aria-hidden="true" /> */}
      <span className="safelight-label">Safelight {name}{plural ? 's' : ''}</span>
    </span>
  );
}

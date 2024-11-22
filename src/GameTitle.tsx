import { Link } from "react-router-dom";

type Pretext = {
  pre: string;
  over?: boolean
  above?: boolean
} | null;

type Posttext = {
  post: string;
  below?: boolean
  under?: boolean
} | null;

type Props = {
  isIndex?: boolean;
}

export default function GameTitle({isIndex}: Props) {

  const getRandInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  function getRandElement<T>(arr: T[]): T { return arr[getRandInt(0, arr.length - 1)]; }
  function title(css: string, pretext?: Pretext, posttext?: Posttext, name?: string): JSX.Element {
    const pre = <>{pretext ? <span className='before-title'>{pretext.pre}</span> : null}</>;
    const post = <>{posttext ? <span className='after-title'>{posttext.post}</span> : null}</>;

    const isPreOver = pretext?.over || pretext?.above;
    const isPostUnder = posttext?.below || posttext?.under;

    name = name || 'Hellgrinder';
    const firstLetter = name[0];
    const finalLetter = name[name.length - 1];
    const middleLetters = name.slice(1, name.length - 1);

    css = css + (isIndex ? ' index-title' : '');

    return (
      <Link to="/" className='title-link'>
        <h1 className={css} title="Hellgrinder">
          
          {isPreOver ? pre : null}
          <span className='inline-title'>
            {isPreOver ? null : <>{pre}&nbsp;</>}

            <span className='title'>
              <span className='first-letter'>{firstLetter}</span>
              {middleLetters}
              <span className='final-letter'>{finalLetter}</span>
            </span>

            {isPostUnder ? null : <>&nbsp;{post}</>}
          </span>
          {isPostUnder ? post : null}

        </h1>
      </Link>
    );
  }
  
  function quickTitleWrapper(css: string, element: JSX.Element): JSX.Element {
    return (
      <Link to="/" className='title-link'>
        <h1 className={css} title="Hellgrinder">
          {element}
        </h1>
      </Link>
    );
  }
  const dotIOTitle = (<>
    <span>
      <span className="hell">hell</span>
      <span className="grinder">grinder</span>
      <span className="io">.io</span>
    </span>
  </>);

  const stund = (<span className="star">✦</span>);
  const individualSpiritLetterElement = (letter: string, alignment: "top" | "bot"): JSX.Element => {
    const topLet = (alignment === "top") 
      ? letter
      : stund;
    const botLet = (alignment === "bot")
      ? letter
      : stund;
    return (
      <div className="individual-letter">
        <div className="letter top-letter">{topLet}</div>
        <div className="letter bottom-letter">{botLet}</div>
      </div>
    );
  };
  const spiritTitle = (<>
    <div>
      <div className="spirit">
        {individualSpiritLetterElement('S', 'top')}
        {individualSpiritLetterElement('P', 'bot')}
        {individualSpiritLetterElement('I', 'top')}
        {individualSpiritLetterElement('R', 'bot')}
        {individualSpiritLetterElement('I', 'top')}
        {individualSpiritLetterElement('T', 'bot')}
      </div>
    </div>
    <div className="title">Hellgrinder</div>
  </>);

  const barcodeData = (<>12345</>);

  const barcodeTitle = (<>
    <div className="barcode-holder">
      <div className="upper-barcode">
        <span>{barcodeData}</span>
        <span className="title">Hellgrinder</span>
        <span>{barcodeData}</span>
      </div>
      <div className="lower-barcode">
        {/* <span>{barcodeData}</span> */}
        <span className="title ss">Hellgrinder</span>
        {/* <span>{barcodeData}</span> */}
      </div>
    </div>
  </>);

  const broughtToYouBy = (<>
    <div className="brought-to-you">
      <div className="brought-by">Brought to you by:</div>
      <div className="lemon-regular">Hellgrinder</div>
    </div>
  </>);

  const titlesDesigns: JSX.Element[] = [
    title('lancelot', {pre: 'The Tales of', above: true}, null),
    title('lancelot2', {pre:'A'}, {post:'Story'}, "Hellgrinder's"),
    title('eagle-lake', {pre: 'The', over: true}, {post:'Saga', below: true}),
    title('girassol', {pre:'The'}, {post:'Chronicles'}),
    title('rye'),
    title('cutive-mono-regular', null, {post: 'Files.'}, ),
    title('goblin-one-regular', {pre: "It's the", above: true}, {post: "Game"}),
    title('noto-serif-oriya-100', null, null, 'Hellgrinder.'),
    title('emilys-candy-regular', {pre: 'A'}, {post: 'World'}, "Hellgrinder's"),
    title('life-savers-regular', {pre: 'My'}, {post: 'Life'}),
    title('life-savers-bold', {pre: 'My'}, {post: 'Life'}),
    title('life-savers-extrabold', {pre: 'My'}, {post: 'Life'}),
    title('spicy-rice-regular', {pre: 'That', above: true}, {post: 'Game', below: true}),
    title('cinzel-400', {pre: 'The Story of', above: true}),
    title('quintessential-regular', {pre: 'Once Upon A', above: true}),
    title('eater-regular horror', {pre: 'The Unholy', above: true}),
    title('fontdiner-swanky-regular', {pre: 'The Grand \'ol', above: true}),
    title('risque-regular', {pre: '✶'}, {post: '✶'}),
    title('kalnia-100', {pre: 'That\'s'}, null, 'Hellgrinder!'),
    title('croissant-one-regular', {pre: 'A'}, {post: 'for Two'}),
    title('cinzel-decorative-regular', {pre: 'The end of', above: true}, null, 'hellgrinder'),
    title('cinzel-decorative-regular2', null, null, 'HellgrindeR'),
    title('metamorphous-regular', null, {post: 'Oracle'}),
    title('shrikhand-regular', {pre: "What about", above: true}, null, 'Hellgrinder?'),
    title('cormorant-sc-light', null, null, "Hell's Grinder"),
    title('cormorant-unicase-light'),
    title('della-respira-regular', {pre: 'The Unending Torment of', above: true}),
    title('sedan-sc-regular', {pre: 'The Tome of', above: true}, null, 'HellgrindeR'),
    title('castoro-titling-regular'),
    title('kranky-regular', {pre: 'The'}, {post: 'Pocketbook'}, 'Hellgrinder\'s'),
    title('diplomata-sc-regular', null, null, 'Hell and Grinder'),
    title('elsie-swash-caps-regular', {pre: 'A'}, {post: 'Romance'}, "Hellgrinder"),
    title('almendra-regular',
      null, 
      {
        post: 'When the toils of Hell doth grind thee unto dust, '
          + 'thou shalt, henceforth and in kind, grind hell beneath thine own heel.',
        below: true
      },
      'Hellgrinder'
    ),
    title('federant-regular', {pre: 'To'}, {post: 'and Back'}),
    title('gideon-roman-regular', {pre: 'The Depths of'}),
    title('anton-sc-regular', null, null, 'HellgrindeR'),
    title('almendra-display-regular', {pre: 'Musings on'}),
    title('chonburi-regular', null, null, 'Hellgrinder.'),
    title('almendra-sc-regular', {pre: 'A Companion Guide on how to survive your dive into', above: true}, null, 'The Hellgrinder'),
    title('bebas-neue-regular', null, null, 'Hellgrinder'),
    title('merriweather-light', {pre: 'How to'}, null, 'Grind your Hell'),
    title('big-shoulders-display-100', {pre: 'Like, Comment, ', above: true}, null, 'and Hellgrind'),
    title('roboto-regular', {pre: 'Like, Comment, ', above: true}, null, 'and Hellgrind'),
    quickTitleWrapper('?? dot-io', dotIOTitle),
    title('jolly-lodger-regular', {pre: 'The haunting melody of', above: true}, null ),
    title('sixtyfour-convergence'),
    title('henny-penny-regular', {pre: 'Welcome to', above: true}, null, 'Hellgrinder!'),
    title('nosifer-regular'),
    title('metal-mania-regular'),
    title('trade-winds-regular', {pre: 'Highway to'}),
    title('creepster-regular', {pre: 'The Harrowing', above: true}),
    title('grenze-gotisch', {pre: 'I cast'}, null, 'Hellgrinder!'),
    title('mystery-quest-regular'),
    quickTitleWrapper('faculty-glyphic-regular', spiritTitle),
    title('tapestry-regular'),
    title('edu-au-vic-wa-nt-pre-400'),
    title('bangers-regular', {pre: 'The Invincible', above: true}, null, 'Hellgrinder!'),
    quickTitleWrapper('barcoded', barcodeTitle),
    title('julius-sans-one-regular'),
    title('afacad-flux-100', {pre: 'See no'}),
    title('afacad-flux-100', {pre: 'Hear no'}),
    title('afacad-flux-100', {pre: 'Speak no'}),
    quickTitleWrapper('btyb', broughtToYouBy),
    title('kalnia-glaze-100'),
    title('sour-gummy-400', {pre: 'The Amazing', above: true}, null, 'Hellgrinder!'),
    title('doto-300'),
    title('jetbrains-mono-100'),
    // He🏒🏒grinder
    // The Beginning of the End: Hellgrinder
  ];

  return (<div className='title-region'>{getRandElement(titlesDesigns)}</div>);
}

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

export default function GameTitle() {

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

    return (
      <h1 className={css} title="Hellgrinder">
        
        {isPreOver ? pre : null}
        <span className='title'>
          {isPreOver ? null : <>{pre}&nbsp;</>}

          <span className='first-letter'>{firstLetter}</span>
          {middleLetters}
          <span className='final-letter'>{finalLetter}</span>

          {isPostUnder ? null : <>&nbsp;{post}</>}
        </span>
        {isPostUnder ? post : null}

      </h1>
    );
  }

  const titlesDesigns: JSX.Element[] = [
    title('lancelot', {pre: 'The Tales of', above: true}, null),
    //title('lancelot', {pre:'A'}, {post:'Story'}, "Hellgrinder's"),
    // title('eagle-lake', {pre: 'The', over: true}, {post:'Saga', below: true}),
    // title('girassol', {pre:'The'}, {post:'Chronicles'}),
    // title('rye'),
    // title('cutive-mono-regular', null, {post: 'Files.'}, ),
    // title('goblin-one-regular', {pre: "It's the", above: true}, {post: "Show"}),
    // title('noto-serif-oriya-100', null, null, 'Hellgrinder.'),
    // title('emilys-candy-regular', {pre: 'A'}, {post: 'World'}, "Hellgrinder's"),
    // title('life-savers-regular', {pre: 'My'}, {post: 'Life'}),
    // title('life-savers-bold', {pre: 'My'}, {post: 'Life'}),
    // title('life-savers-extrabold', {pre: 'My'}, {post: 'Life'}),
    // title('spicy-rice-regular', {pre: 'That', above: true}, {post: 'Show', below: true}),
    // title('cinzel-400', {pre: 'The Story of', above: true}),
    // title('quintessential-regular', {pre: 'Once Upon A', above: true}),
    // title('eater-regular', {pre: 'The Unholy', above: true}),
    // title('fontdiner-swanky-regular', {pre: 'The Grand \'ol', above: true}),
    // title('risque-regular', {pre: '✶'}, {post: '✶'}),
    // title('kalnia-100', {pre: 'That\'s'}, null, 'Hellgrinder!'),
    // title('croissant-one-regular', {pre: 'A'}, {post: 'for Two'}),
    // title('cinzel-decorative-regular', {pre: 'The end of', above: true}, null, 'hellgrinder'),
    // title('cinzel-decorative-regular2', null, null, 'HellgrindeR'),
    // title('metamorphous-regular', null, {post: 'Oracle'}),
    // title('shrikhand-regular', {pre: "What about", above: true}, null, 'Hellgrinder?'),
    // title('cormorant-sc-light', null, null, "Hell's Grinder"),
    // title('cormorant-unicase-light'),
    // title('della-respira-regular', {pre: 'The Unending Torment of', above: true}),
    // title('sedan-sc-regular', {pre: 'The Tome of', above: true}, null, 'HellgrindeR'),
    // title('castoro-titling-regular'),
    // title('kranky-regular', {pre: 'The'}, {post: 'Companion'}, 'Hellgrinder\'s'),
    // title('diplomata-sc-regular', null, null, 'Hell and Grinder'),
    // title('elsie-swash-caps-regular', {pre: 'A'}, {post: 'Romance'}, "Hellgrinder"),
    // title('almendra-regular',
    //   null,
    //   {post: 'When the toils of Hell doth grind thee unto dust, '
    //     + 'thou shalt, henceforth and in kind, '
    //     + 'grind hell beneath thine own heel.', below: true},
    //   'Hellgrinder'),
    // title('federant-regular', {pre: 'To'}, {post: 'and Back'}),
    // title('gideon-roman-regular', {pre: 'The Depths of'}),
    // title('anton-sc-regular', null, null, 'HellgrindeR'),
    // title('almendra-display-regular', {pre: 'Musings on'}),
    // title('chonburi-regular', null, null, 'Hellgrinder.'),
    // title('almendra-sc-regular', {pre: 'A Companion Guide on how to survive your dive into', above: true}, null, 'The Hellgrinder'),
    // title('bebas-neue-regular', null, null, 'Hellgrinder'),
    // title('merriweather-light', {pre: 'How to'}, null, 'Grind your Hell'),

  ];

  return (<span className='title-region'>{getRandElement(titlesDesigns)}</span>);
}